// ---------------------------------------------------------------------------
// MedFin – PSLF Scenario Engine
// ---------------------------------------------------------------------------

import type { LoanScenario } from '../types';
import { calculateIDRPayment, calculateStandardPayment, type IDRPlan } from './idr';

export interface PSLFScenarioInput {
  /** Total student loan balance at start of repayment */
  totalDebt: number;
  /** Weighted average interest rate (decimal, e.g., 0.075) */
  interestRate: number;
  /** Residency/fellowship training years remaining */
  trainingYears: number;
  /** Additional fellowship years (0 if none) */
  fellowshipYears: number;
  /** Career setting after training: 'academic' | 'private' | 'hospital' */
  postTrainingCareer: 'academic' | 'private' | 'hospital';
  /** Expected attending salary */
  attendingSalary: number;
  /** Current resident/fellow salary */
  residentSalary: number;
  /** Family size for IDR calculation */
  familySize: number;
  /** IDR plan type */
  plan: IDRPlan;
  /** Whether post-training employer is PSLF-eligible (501c3) */
  postTrainingPSLFEligible: boolean;
  /** Estimated annual salary increases during training (decimal) */
  annualRaiseRate?: number;
  /** Refinance interest rate (for aggressive refinance scenario) */
  refinanceRate?: number;
}

/**
 * Generate three loan repayment scenarios for comparison:
 * 1. PSLF Pursuit – Stay on IDR, target 120 qualifying payments
 * 2. Aggressive Refinance – Refinance after training, pay aggressively
 * 3. Standard IDR (no PSLF) – Stay on IDR for 20-25 years, get taxable forgiveness
 *
 * Each scenario models month-by-month balance changes including interest accrual.
 *
 * @returns Array of three LoanScenario objects
 */
export function calculateLoanScenarios(input: PSLFScenarioInput): LoanScenario[] {
  const raiseRate = input.annualRaiseRate ?? 0.03;
  const refiRate = input.refinanceRate ?? 0.05;

  return [
    calculatePSLFScenario(input, raiseRate),
    calculateAggressiveRefinanceScenario(input, refiRate, raiseRate),
    calculateStandardIDRScenario(input, raiseRate),
  ];
}

// ---------------------------------------------------------------------------
// Scenario 1: PSLF Pursuit
// ---------------------------------------------------------------------------

function calculatePSLFScenario(
  input: PSLFScenarioInput,
  raiseRate: number,
): LoanScenario {
  const totalTraining = input.trainingYears + input.fellowshipYears;
  let balance = input.totalDebt;
  const monthlyRate = input.interestRate / 12;
  const monthlyPayments: number[] = [];
  let totalPaid = 0;
  let qualifyingPayments = 0;

  // Phase 1: Training (IDR payments, PSLF-qualifying)
  for (let year = 0; year < totalTraining; year++) {
    const salary = input.residentSalary * Math.pow(1 + raiseRate, year);
    const monthlyPayment = calculateIDRPayment(salary, input.familySize, input.plan);

    for (let month = 0; month < 12; month++) {
      const interest = balance * monthlyRate;
      const principalPaid = Math.max(0, monthlyPayment - interest);
      balance = balance + interest - monthlyPayment;
      if (balance < 0) balance = 0;

      monthlyPayments.push(monthlyPayment);
      totalPaid += monthlyPayment;
      qualifyingPayments++;
    }
  }

  // Phase 2: Post-training (need 120 total qualifying payments)
  const remainingPayments = Math.max(0, 120 - qualifyingPayments);

  if (input.postTrainingPSLFEligible && remainingPayments > 0) {
    // Continue at academic/hospital employer (PSLF-eligible)
    const attendingIDR = calculateIDRPayment(
      input.attendingSalary,
      input.familySize,
      input.plan,
    );
    // Cap at standard 10-year payment (IDR plans cap at this)
    const standardPayment = calculateStandardPayment(input.totalDebt, input.interestRate, 10);
    const cappedPayment = Math.min(attendingIDR, standardPayment);

    for (let month = 0; month < remainingPayments; month++) {
      const interest = balance * monthlyRate;
      balance = balance + interest - cappedPayment;
      if (balance < 0) balance = 0;

      monthlyPayments.push(cappedPayment);
      totalPaid += cappedPayment;
      qualifyingPayments++;
    }
  } else if (!input.postTrainingPSLFEligible) {
    // Not eligible post-training – this scenario assumes they find PSLF employer
    // Model as if they stay PSLF-eligible for simplicity
    const attendingIDR = calculateIDRPayment(
      input.attendingSalary,
      input.familySize,
      input.plan,
    );
    const standardPayment = calculateStandardPayment(input.totalDebt, input.interestRate, 10);
    const cappedPayment = Math.min(attendingIDR, standardPayment);

    for (let month = 0; month < remainingPayments; month++) {
      const interest = balance * monthlyRate;
      balance = balance + interest - cappedPayment;
      if (balance < 0) balance = 0;

      monthlyPayments.push(cappedPayment);
      totalPaid += cappedPayment;
    }
  }

  const amountForgiven = Math.max(0, balance);
  const yearsToComplete = 10; // PSLF is always 10 years (120 payments)

  return {
    name: 'PSLF Pursuit',
    description:
      'Stay on income-driven repayment at a qualifying 501(c)(3) employer for 120 payments (10 years). Remaining balance is forgiven tax-free.',
    totalPaid: Math.round(totalPaid),
    monthlyPayments,
    amountForgiven: Math.round(amountForgiven),
    yearsToComplete,
    finalBalance: 0, // forgiven
    totalInterestPaid: Math.round(totalPaid - input.totalDebt + amountForgiven),
  };
}

// ---------------------------------------------------------------------------
// Scenario 2: Aggressive Refinance After Training
// ---------------------------------------------------------------------------

function calculateAggressiveRefinanceScenario(
  input: PSLFScenarioInput,
  refiRate: number,
  raiseRate: number,
): LoanScenario {
  const totalTraining = input.trainingYears + input.fellowshipYears;
  let balance = input.totalDebt;
  const trainingMonthlyRate = input.interestRate / 12;
  const monthlyPayments: number[] = [];
  let totalPaid = 0;

  // Phase 1: Training – minimum payments (interest accrues!)
  for (let year = 0; year < totalTraining; year++) {
    const salary = input.residentSalary * Math.pow(1 + raiseRate, year);
    const monthlyPayment = calculateIDRPayment(salary, input.familySize, input.plan);

    for (let month = 0; month < 12; month++) {
      const interest = balance * trainingMonthlyRate;
      balance = balance + interest - monthlyPayment;
      if (balance < 0) balance = 0;

      monthlyPayments.push(monthlyPayment);
      totalPaid += monthlyPayment;
    }
  }

  // Phase 2: Refinance to private loan at lower rate, pay off in 5 years
  const refiBalance = balance;
  const refiMonthlyRate = refiRate / 12;
  const refiTerm = 60; // 5 years
  const refiPayment = refiBalance > 0
    ? (refiBalance * refiMonthlyRate * Math.pow(1 + refiMonthlyRate, refiTerm)) /
      (Math.pow(1 + refiMonthlyRate, refiTerm) - 1)
    : 0;

  for (let month = 0; month < refiTerm; month++) {
    const interest = balance * refiMonthlyRate;
    balance = balance + interest - refiPayment;
    if (balance < 0) balance = 0;

    monthlyPayments.push(Math.round(refiPayment * 100) / 100);
    totalPaid += refiPayment;
  }

  return {
    name: 'Aggressive Refinance',
    description: `Minimum IDR payments during training, then refinance to ${(refiRate * 100).toFixed(1)}% private loan and pay off in 5 years with attending salary. No forgiveness; lose PSLF eligibility.`,
    totalPaid: Math.round(totalPaid),
    monthlyPayments,
    amountForgiven: 0,
    yearsToComplete: totalTraining + 5,
    finalBalance: 0,
    totalInterestPaid: Math.round(totalPaid - input.totalDebt),
  };
}

// ---------------------------------------------------------------------------
// Scenario 3: Standard IDR (no PSLF, taxable forgiveness at 20-25 years)
// ---------------------------------------------------------------------------

function calculateStandardIDRScenario(
  input: PSLFScenarioInput,
  raiseRate: number,
): LoanScenario {
  const totalTraining = input.trainingYears + input.fellowshipYears;
  const idrTermYears = input.plan === 'ICR' ? 25 : 20; // PAYE = 20, IBR(new) = 20, ICR = 25
  const totalMonths = idrTermYears * 12;
  let balance = input.totalDebt;
  const monthlyRate = input.interestRate / 12;
  const monthlyPayments: number[] = [];
  let totalPaid = 0;

  for (let month = 0; month < totalMonths; month++) {
    const yearIndex = Math.floor(month / 12);
    let salary: number;

    if (yearIndex < totalTraining) {
      salary = input.residentSalary * Math.pow(1 + raiseRate, yearIndex);
    } else {
      const attendingYears = yearIndex - totalTraining;
      salary = input.attendingSalary * Math.pow(1 + raiseRate, attendingYears);
    }

    const monthlyPayment = calculateIDRPayment(salary, input.familySize, input.plan);
    // Cap at standard 10-year payment
    const standardPayment = calculateStandardPayment(input.totalDebt, input.interestRate, 10);
    const cappedPayment = Math.min(monthlyPayment, standardPayment);

    const interest = balance * monthlyRate;
    balance = balance + interest - cappedPayment;
    if (balance < 0) balance = 0;

    monthlyPayments.push(cappedPayment);
    totalPaid += cappedPayment;

    if (balance <= 0) break;
  }

  const amountForgiven = Math.max(0, balance);

  return {
    name: 'Standard IDR (No PSLF)',
    description: `Stay on ${input.plan} for ${idrTermYears} years without targeting PSLF. Any remaining balance after ${idrTermYears} years is forgiven but taxed as ordinary income ("tax bomb").`,
    totalPaid: Math.round(totalPaid),
    monthlyPayments,
    amountForgiven: Math.round(amountForgiven),
    yearsToComplete: idrTermYears,
    finalBalance: 0,
    totalInterestPaid: Math.round(totalPaid - input.totalDebt + amountForgiven),
  };
}

/**
 * Quick helper: estimate the "tax bomb" on IDR forgiveness.
 * Forgiven amount is taxed as ordinary income in the year of forgiveness.
 *
 * @param forgivenAmount Amount forgiven
 * @param estimatedTaxRate Estimated marginal tax rate at time of forgiveness
 */
export function estimateTaxBomb(forgivenAmount: number, estimatedTaxRate = 0.35): number {
  return Math.round(forgivenAmount * estimatedTaxRate);
}
