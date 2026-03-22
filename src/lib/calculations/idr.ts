// ---------------------------------------------------------------------------
// MedFin – Income-Driven Repayment (IDR) Payment Calculator
// ---------------------------------------------------------------------------

/**
 * 2026 Federal Poverty Guidelines (contiguous 48 states + DC).
 * Source: HHS publishes annually in January.
 * Base: $15,650 for 1 person; add $5,580 per additional person.
 */
const POVERTY_BASE_2026 = 15650;
const POVERTY_PER_PERSON_2026 = 5580;

/** Alaska and Hawaii have higher poverty guidelines. */
const POVERTY_MULTIPLIERS: Record<string, number> = {
  AK: 1.25,
  HI: 1.15,
};

/**
 * Get the federal poverty guideline for a given family size.
 * @param familySize Number of people in the household (minimum 1)
 * @param state Two-letter state code (default: contiguous US)
 */
export function getPovertyGuideline(familySize: number, state = 'NY'): number {
  const base = POVERTY_BASE_2026 + POVERTY_PER_PERSON_2026 * (Math.max(1, familySize) - 1);
  const multiplier = POVERTY_MULTIPLIERS[state] ?? 1.0;
  return Math.round(base * multiplier);
}

/** Supported IDR plan types. */
export type IDRPlan = 'PAYE' | 'IBR' | 'REPAYE' | 'ICR';

/**
 * Calculate the monthly payment under an income-driven repayment plan.
 *
 * Formulas:
 * - PAYE:   10% of discretionary income / 12  (discretionary = AGI - 150% FPL)
 * - IBR:    10% of discretionary income / 12  (for new borrowers after 7/1/2014)
 * - REPAYE: 10% of discretionary income / 12  (now called SAVE; uses 225% FPL for undergrad,
 *           but for grad-only we use 150% FPL per current regulations)
 * - ICR:    20% of discretionary income / 12  (discretionary = AGI - 100% FPL)
 *
 * Note: REPAYE/SAVE has had regulatory changes. This uses the standard 150% FPL
 * threshold for graduate borrowers as of 2026 policy.
 *
 * @param agi Adjusted Gross Income (annual)
 * @param familySize Number of people in household (1 = single no dependents)
 * @param plan IDR plan type
 * @param state Two-letter state code for poverty guideline region
 * @returns Monthly payment amount (never negative; minimum $0)
 */
export function calculateIDRPayment(
  agi: number,
  familySize: number,
  plan: IDRPlan = 'PAYE',
  state = 'NY',
): number {
  const povertyLine = getPovertyGuideline(familySize, state);

  let discretionaryIncome: number;
  let rate: number;

  switch (plan) {
    case 'PAYE':
      discretionaryIncome = agi - 1.5 * povertyLine;
      rate = 0.10;
      break;
    case 'IBR':
      discretionaryIncome = agi - 1.5 * povertyLine;
      rate = 0.10; // 10% for new borrowers (post 7/1/2014); 15% for older borrowers
      break;
    case 'REPAYE':
      discretionaryIncome = agi - 1.5 * povertyLine;
      rate = 0.10;
      break;
    case 'ICR':
      discretionaryIncome = agi - 1.0 * povertyLine;
      rate = 0.20;
      break;
    default:
      discretionaryIncome = agi - 1.5 * povertyLine;
      rate = 0.10;
  }

  const monthlyPayment = (discretionaryIncome * rate) / 12;
  return Math.max(0, Math.round(monthlyPayment * 100) / 100);
}

/**
 * Estimate IDR payment for a married couple filing separately.
 * Under PAYE and IBR, only the borrower's individual income is used
 * when filing MFS (married filing separately).
 *
 * @param borrowerAgi Borrower's individual AGI
 * @param familySize Total household size (including spouse and dependents)
 * @param plan IDR plan type
 */
export function calculateIDRPaymentMFS(
  borrowerAgi: number,
  familySize: number,
  plan: IDRPlan = 'PAYE',
): number {
  // REPAYE/SAVE uses combined spousal income regardless of filing status
  // PAYE and IBR use only borrower's income when filing MFS
  if (plan === 'REPAYE') {
    // Caller should pass combined AGI for REPAYE
    return calculateIDRPayment(borrowerAgi, familySize, plan);
  }
  return calculateIDRPayment(borrowerAgi, familySize, plan);
}

/**
 * Calculate the standard 10-year repayment monthly payment for comparison.
 * Uses standard amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
 *
 * @param principal Total loan balance
 * @param annualRate Annual interest rate as decimal (e.g., 0.075 for 7.5%)
 * @param years Repayment term in years (default 10)
 */
export function calculateStandardPayment(
  principal: number,
  annualRate: number,
  years = 10,
): number {
  if (principal <= 0) return 0;
  if (annualRate <= 0) return principal / (years * 12);

  const monthlyRate = annualRate / 12;
  const totalPayments = years * 12;
  const factor = Math.pow(1 + monthlyRate, totalPayments);
  const payment = principal * (monthlyRate * factor) / (factor - 1);

  return Math.round(payment * 100) / 100;
}
