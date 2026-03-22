// ---------------------------------------------------------------------------
// MedFin – Net Worth Projector
// ---------------------------------------------------------------------------

import type { UserProfile, NetWorthProjection } from '../types';
import { getSpecialtyById } from '../data/specialties';
import { calculateIDRPayment } from './idr';
import { calculateTaxes } from './taxes';

export interface NetWorthProjectionInput {
  /** Starting loan balance */
  totalDebt: number;
  /** Starting savings */
  savings: number;
  /** Starting retirement balance */
  retirementBalance: number;
  /** Other debts (car, credit card) */
  otherDebts: number;
  /** Average loan interest rate (decimal) */
  loanInterestRate: number;
  /** Specialty ID for salary lookup */
  specialtyId: string;
  /** Current PGY level */
  currentPGY: number;
  /** Total residency years */
  residencyYears: number;
  /** Fellowship years (0 if none) */
  fellowshipYears: number;
  /** Current resident salary */
  residentSalary: number;
  /** Annual resident salary increase (decimal) */
  residentRaiseRate: number;
  /** Post-training career type */
  careerType: 'academic' | 'privatePractice' | 'hospitalEmployed';
  /** Filing status */
  filingStatus: 'single' | 'married_jointly' | 'married_separately' | 'head_of_household';
  /** Family size */
  familySize: number;
  /** Birth year (for age calculation) */
  birthYear: number;
  /** Whether pursuing PSLF */
  pursuingPSLF: boolean;
  /** Investment return rate assumption (decimal) */
  investmentReturnRate?: number;
  /** Annual savings rate as attending (% of gross) */
  attendingSavingsRate?: number;
}

/**
 * Project year-by-year net worth from current state through attending years.
 *
 * Models:
 * - Loan balance growth during training (interest accrual on IDR)
 * - Salary trajectory (resident raises → attending jump)
 * - Retirement contributions and growth
 * - Savings accumulation
 * - PSLF forgiveness at year 10 if applicable
 *
 * @param profile User profile or projection input
 * @param years Number of years to project
 * @returns Array of NetWorthProjection objects, one per year
 */
export function projectNetWorth(
  input: NetWorthProjectionInput,
  years: number = 20,
): NetWorthProjection[] {
  const projections: NetWorthProjection[] = [];
  const currentYear = new Date().getFullYear();
  const investmentReturn = input.investmentReturnRate ?? 0.07;
  const attendingSavingsRate = input.attendingSavingsRate ?? 0.20;

  const totalTrainingRemaining = (input.residencyYears - input.currentPGY) + input.fellowshipYears;

  // Look up attending salary
  const specialty = getSpecialtyById(input.specialtyId);
  let attendingSalary: number;
  if (specialty) {
    attendingSalary = specialty.salaryRanges[input.careerType]?.median ?? 350000;
  } else {
    attendingSalary = 350000;
  }

  // State variables
  let loanBalance = input.totalDebt;
  let savings = input.savings;
  let retirementBalance = input.retirementBalance;
  let otherDebts = input.otherDebts;
  const monthlyLoanRate = input.loanInterestRate / 12;

  // PSLF tracking
  let pslfPaymentCount = (input.currentPGY - 1) * 12; // assume prior years counted
  let pslfForgiven = false;

  for (let y = 0; y < years; y++) {
    const yearNum = currentYear + y;
    const age = yearNum - input.birthYear;
    const yearsIntoTraining = y;
    const isTraining = yearsIntoTraining < totalTrainingRemaining;

    let grossIncome: number;
    let label: string;

    if (isTraining) {
      const pgyInYear = input.currentPGY + y;
      grossIncome = input.residentSalary * Math.pow(1 + input.residentRaiseRate, y);
      label = `PGY-${pgyInYear} (Resident)`;
    } else {
      const attendingYear = y - totalTrainingRemaining;
      grossIncome = attendingSalary * Math.pow(1.03, attendingYear); // 3% annual raises
      label = attendingYear === 0 ? 'First Attending Year' : `Attending Year ${attendingYear + 1}`;
    }

    // Calculate taxes
    const taxes = calculateTaxes({
      grossIncome,
      state: 'NY',
      city: 'NYC',
      filingStatus: input.filingStatus,
      dependents: Math.max(0, input.familySize - 1),
      retirementContributions: isTraining ? 0 : Math.min(23500, grossIncome * 0.10),
    });

    const netIncome = grossIncome - taxes.totalTax;

    // --- Loan calculations ---
    if (loanBalance > 0 && !pslfForgiven) {
      if (isTraining || (input.pursuingPSLF && !pslfForgiven)) {
        // IDR payments during training and PSLF pursuit
        const idrPayment = calculateIDRPayment(grossIncome, input.familySize, 'PAYE');
        for (let m = 0; m < 12; m++) {
          const interest = loanBalance * monthlyLoanRate;
          loanBalance = loanBalance + interest - idrPayment;
          if (loanBalance < 0) loanBalance = 0;
          pslfPaymentCount++;
        }

        // PSLF forgiveness at 120 payments
        if (input.pursuingPSLF && pslfPaymentCount >= 120 && !pslfForgiven) {
          pslfForgiven = true;
          loanBalance = 0;
        }
      } else {
        // Post-training, no PSLF: aggressive payoff
        const annualLoanPayment = grossIncome * 0.20; // 20% of gross toward loans
        for (let m = 0; m < 12; m++) {
          const interest = loanBalance * monthlyLoanRate;
          const payment = Math.min(loanBalance + interest, annualLoanPayment / 12);
          loanBalance = loanBalance + interest - payment;
          if (loanBalance < 0) loanBalance = 0;
        }
      }
    }

    // --- Savings ---
    if (isTraining) {
      // Residents save modestly
      const monthlySavings = Math.max(0, (netIncome / 12) * 0.05); // ~5% of net
      savings += monthlySavings * 12;
    } else {
      // Attendings save more aggressively
      const annualSavings = grossIncome * attendingSavingsRate * 0.3; // liquid savings portion
      savings += annualSavings;
    }

    // --- Retirement ---
    if (isTraining) {
      // Roth IRA only
      const rothContribution = Math.min(7000, netIncome * 0.10);
      retirementBalance = retirementBalance * (1 + investmentReturn) + rothContribution;
    } else {
      // 403b/401k + backdoor Roth + growth
      const maxRetirement = 23500 + 7000; // 401k + Roth IRA
      const retirementContribution = Math.min(maxRetirement, grossIncome * 0.15);
      retirementBalance = retirementBalance * (1 + investmentReturn) + retirementContribution;
    }

    // --- Other debts (simple payoff) ---
    if (otherDebts > 0) {
      otherDebts = Math.max(0, otherDebts - (isTraining ? 1200 : 6000));
    }

    // --- Net worth ---
    const netWorth = savings + retirementBalance - loanBalance - otherDebts;

    projections.push({
      year: yearNum,
      age,
      label,
      grossIncome: Math.round(grossIncome),
      netIncome: Math.round(netIncome),
      loanBalance: Math.round(loanBalance),
      retirementBalance: Math.round(retirementBalance),
      savings: Math.round(savings),
      netWorth: Math.round(netWorth),
    });
  }

  return projections;
}

/**
 * Convenience wrapper: project net worth directly from a UserProfile.
 */
export function projectNetWorthFromProfile(
  profile: UserProfile,
  years = 20,
): NetWorthProjection[] {
  const specialty = getSpecialtyById(profile.specialty.toLowerCase().replace(/\s+/g, '_'));
  const residencyYears = specialty?.trainingLength ?? 4;

  return projectNetWorth(
    {
      totalDebt: profile.totalDebt,
      savings: profile.savings,
      retirementBalance: profile.retirementBalance,
      otherDebts: profile.otherDebts,
      loanInterestRate: profile.avgInterestRate / 100,
      specialtyId: profile.specialty.toLowerCase().replace(/\s+/g, '_'),
      currentPGY: profile.pgyLevel,
      residencyYears,
      fellowshipYears: 0,
      residentSalary: 75000,
      residentRaiseRate: 0.03,
      careerType: 'hospitalEmployed',
      filingStatus: profile.filingStatus,
      familySize: 1 + profile.dependents,
      birthYear: profile.birthYear,
      pursuingPSLF: true,
    },
    years,
  );
}
