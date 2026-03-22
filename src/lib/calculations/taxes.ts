// ---------------------------------------------------------------------------
// MedFin – Tax Estimation Engine (2026)
// ---------------------------------------------------------------------------

import type { TaxBreakdown } from '../types';

// ---------------------------------------------------------------------------
// 2026 Federal Income Tax Brackets
// (Estimated – assumes TCJA provisions expire or are extended with inflation adjustments)
// ---------------------------------------------------------------------------

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

const FEDERAL_BRACKETS_SINGLE: TaxBracket[] = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

const FEDERAL_BRACKETS_MFJ: TaxBracket[] = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: Infinity, rate: 0.37 },
];

// Standard deductions (2026 estimated with inflation adjustment)
const STANDARD_DEDUCTION: Record<string, number> = {
  single: 15000,
  married_jointly: 30000,
  married_separately: 15000,
  head_of_household: 22500,
};

// ---------------------------------------------------------------------------
// New York State Tax Brackets (2026 estimated)
// ---------------------------------------------------------------------------

const NY_STATE_BRACKETS: TaxBracket[] = [
  { min: 0, max: 8500, rate: 0.04 },
  { min: 8500, max: 11700, rate: 0.045 },
  { min: 11700, max: 13900, rate: 0.0525 },
  { min: 13900, max: 80650, rate: 0.0585 },
  { min: 80650, max: 215400, rate: 0.0625 },
  { min: 215400, max: 1077550, rate: 0.0685 },
  { min: 1077550, max: 5000000, rate: 0.0965 },
  { min: 5000000, max: 25000000, rate: 0.103 },
  { min: 25000000, max: Infinity, rate: 0.109 },
];

// NY standard deduction
const NY_STANDARD_DEDUCTION: Record<string, number> = {
  single: 8000,
  married_jointly: 16050,
  married_separately: 8000,
  head_of_household: 11200,
};

// ---------------------------------------------------------------------------
// NYC City Tax Brackets (2026 estimated)
// ---------------------------------------------------------------------------

const NYC_CITY_BRACKETS: TaxBracket[] = [
  { min: 0, max: 12000, rate: 0.03078 },
  { min: 12000, max: 25000, rate: 0.03762 },
  { min: 25000, max: 50000, rate: 0.03819 },
  { min: 50000, max: Infinity, rate: 0.03876 },
];

// ---------------------------------------------------------------------------
// NJ State Tax Brackets (for comparison)
// ---------------------------------------------------------------------------

const NJ_STATE_BRACKETS: TaxBracket[] = [
  { min: 0, max: 20000, rate: 0.014 },
  { min: 20000, max: 35000, rate: 0.0175 },
  { min: 35000, max: 40000, rate: 0.035 },
  { min: 40000, max: 75000, rate: 0.05525 },
  { min: 75000, max: 500000, rate: 0.0637 },
  { min: 500000, max: 1000000, rate: 0.0897 },
  { min: 1000000, max: Infinity, rate: 0.1075 },
];

// ---------------------------------------------------------------------------
// FICA Constants (2026 estimated)
// ---------------------------------------------------------------------------

const SOCIAL_SECURITY_RATE = 0.062;
const SOCIAL_SECURITY_WAGE_BASE = 168600;
const MEDICARE_RATE = 0.0145;
const ADDITIONAL_MEDICARE_RATE = 0.009; // applies above $200K single / $250K MFJ
const ADDITIONAL_MEDICARE_THRESHOLD_SINGLE = 200000;
const ADDITIONAL_MEDICARE_THRESHOLD_MFJ = 250000;

// ---------------------------------------------------------------------------
// Tax Calculation Functions
// ---------------------------------------------------------------------------

/**
 * Calculate tax using progressive brackets.
 */
function calculateProgressiveTax(taxableIncome: number, brackets: TaxBracket[]): number {
  if (taxableIncome <= 0) return 0;

  let tax = 0;
  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break;
    const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
    tax += taxableInBracket * bracket.rate;
  }
  return tax;
}

/**
 * Calculate FICA taxes (Social Security + Medicare).
 */
function calculateFICA(
  grossIncome: number,
  filingStatus: string,
): { socialSecurity: number; medicare: number; total: number } {
  const socialSecurity = Math.min(grossIncome, SOCIAL_SECURITY_WAGE_BASE) * SOCIAL_SECURITY_RATE;

  const medicareThreshold =
    filingStatus === 'married_jointly'
      ? ADDITIONAL_MEDICARE_THRESHOLD_MFJ
      : ADDITIONAL_MEDICARE_THRESHOLD_SINGLE;

  let medicare = grossIncome * MEDICARE_RATE;
  if (grossIncome > medicareThreshold) {
    medicare += (grossIncome - medicareThreshold) * ADDITIONAL_MEDICARE_RATE;
  }

  return {
    socialSecurity: Math.round(socialSecurity * 100) / 100,
    medicare: Math.round(medicare * 100) / 100,
    total: Math.round((socialSecurity + medicare) * 100) / 100,
  };
}

export interface TaxCalculationInput {
  /** Annual gross income */
  grossIncome: number;
  /** State of residence (two-letter code) */
  state: string;
  /** City for local tax ('NYC' or empty) */
  city: string;
  /** Federal filing status */
  filingStatus: 'single' | 'married_jointly' | 'married_separately' | 'head_of_household';
  /** Number of dependents (for potential credits) */
  dependents: number;
  /** Annual pre-tax retirement contributions (403b, 401k) */
  retirementContributions: number;
  /** Student loan interest deduction (up to $2,500 if eligible) */
  studentLoanInterest?: number;
}

/**
 * Calculate complete federal, state, city, and FICA tax breakdown.
 *
 * @returns TaxBreakdown with all tax components and monthly take-home pay
 */
export function calculateTaxes(input: TaxCalculationInput): TaxBreakdown {
  const {
    grossIncome,
    state,
    city,
    filingStatus,
    retirementContributions,
    studentLoanInterest = 0,
  } = input;

  // --- Federal ---
  const federalBrackets =
    filingStatus === 'married_jointly' ? FEDERAL_BRACKETS_MFJ : FEDERAL_BRACKETS_SINGLE;

  const federalStdDeduction = STANDARD_DEDUCTION[filingStatus] ?? STANDARD_DEDUCTION.single;

  // Pre-tax deductions reduce AGI
  const agi = grossIncome - retirementContributions;

  // Student loan interest deduction (phases out above $85K single / $175K MFJ)
  const loanInterestDeduction = agi <= 85000 ? Math.min(studentLoanInterest, 2500) : 0;

  const federalTaxableIncome = Math.max(0, agi - federalStdDeduction - loanInterestDeduction);
  const federalTax = calculateProgressiveTax(federalTaxableIncome, federalBrackets);

  // --- State ---
  let stateTax = 0;
  if (state === 'NY') {
    const nyStdDeduction = NY_STANDARD_DEDUCTION[filingStatus] ?? NY_STANDARD_DEDUCTION.single;
    const nyTaxableIncome = Math.max(0, agi - nyStdDeduction);
    stateTax = calculateProgressiveTax(nyTaxableIncome, NY_STATE_BRACKETS);
  } else if (state === 'NJ') {
    // NJ has no standard deduction but has personal exemptions ($1,000 per person)
    const njExemptions = 1000 * (1 + input.dependents);
    const njTaxableIncome = Math.max(0, agi - njExemptions);
    stateTax = calculateProgressiveTax(njTaxableIncome, NJ_STATE_BRACKETS);
  }

  // --- City ---
  let cityTax = 0;
  if (city === 'NYC' && state === 'NY') {
    const nycTaxableIncome = Math.max(0, agi - (NY_STANDARD_DEDUCTION[filingStatus] ?? 8000));
    cityTax = calculateProgressiveTax(nycTaxableIncome, NYC_CITY_BRACKETS);
  }

  // --- FICA ---
  const fica = calculateFICA(grossIncome, filingStatus);

  // --- Totals ---
  const totalTax = Math.round(federalTax + stateTax + cityTax + fica.total);
  const effectiveRate = grossIncome > 0 ? totalTax / grossIncome : 0;
  const monthlyTakeHome = Math.round((grossIncome - totalTax - retirementContributions) / 12);

  return {
    federal: Math.round(federalTax),
    state: Math.round(stateTax),
    city: Math.round(cityTax),
    fica: Math.round(fica.total),
    totalTax,
    effectiveRate: Math.round(effectiveRate * 10000) / 10000, // 4 decimal places
    monthlyTakeHome,
  };
}

/**
 * Quick helper: get marginal federal tax rate for a given income and filing status.
 */
export function getMarginalFederalRate(
  taxableIncome: number,
  filingStatus: 'single' | 'married_jointly' | 'married_separately' | 'head_of_household' = 'single',
): number {
  const brackets =
    filingStatus === 'married_jointly' ? FEDERAL_BRACKETS_MFJ : FEDERAL_BRACKETS_SINGLE;

  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncome > brackets[i].min) {
      return brackets[i].rate;
    }
  }
  return brackets[0].rate;
}
