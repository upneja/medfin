// ---------------------------------------------------------------------------
// MedFin – Default Profile (Demo / Testing)
// ---------------------------------------------------------------------------

import type { UserProfile } from '../types';

/**
 * Default profile modeled after Alif Manon:
 * - PGY-1 Anesthesiology resident at NYU Langone Brooklyn
 * - Rutgers Medical School graduate
 * - Single, no dependents
 * - ~$315K in student loans (federal Direct + Grad PLUS)
 * - Living in NYC, renting, no car
 */
export const ALIF_DEFAULTS: Partial<UserProfile> = {
  // Identity
  name: 'Alif',
  birthYear: 1998,
  maritalStatus: 'single',
  dependents: 0,

  // Training
  medicalSchool: 'Rutgers Medical School',
  program: 'NYU Langone Brooklyn',
  specialty: 'Anesthesiology',
  pgyLevel: 1,
  categorical: true,
  fellowshipInterest: 'unsure',

  // Loans
  totalDebt: 315000,
  federalDirect: 189000,
  gradPlus: 126000,
  privateLoan: 0,
  avgInterestRate: 7.5,
  loanServicer: 'MOHELA',
  loanStatus: 'grace',
  consolidated: false,

  // Taxes & Income
  filingStatus: 'single',
  spouseIncome: 0,
  savings: 5000,
  creditScore: 'good',
  retirementBalance: 0,
  otherDebts: 0,

  // Housing & Transport
  housingSituation: 'looking',
  rentBudget: 2000,
  hasCar: false,
  carPayment: 0,
  multiSite: true,

  // Insurance
  hasDisability: 'no',
  hasLife: 'no',
  healthPlan: 'UnitedHealthcare (NYU)',

  // Goals & Preferences
  careerVision: 'Open to academic or private practice; exploring fellowships',
  geoPreference: 'Northeast US preferred, open to others',
  topConcerns: ['student_loans', 'disability_insurance', 'budgeting', 'pslf'],
  financialStyle: 'balanced',
  riskTolerance: 'moderate',

  // Meta
  onboardingStep: 0,
};

/**
 * Create a complete UserProfile by merging partial input with sensible defaults.
 */
export function createProfileWithDefaults(partial: Partial<UserProfile> = {}): UserProfile {
  const base: UserProfile = {
    name: '',
    birthYear: 1996,
    maritalStatus: 'single',
    dependents: 0,
    medicalSchool: '',
    program: '',
    specialty: '',
    pgyLevel: 1,
    categorical: true,
    fellowshipInterest: 'none',
    totalDebt: 0,
    federalDirect: 0,
    gradPlus: 0,
    privateLoan: 0,
    avgInterestRate: 7.0,
    loanServicer: '',
    loanStatus: 'grace',
    consolidated: false,
    filingStatus: 'single',
    spouseIncome: 0,
    savings: 0,
    creditScore: 'good',
    retirementBalance: 0,
    otherDebts: 0,
    housingSituation: 'looking',
    rentBudget: 1500,
    hasCar: false,
    carPayment: 0,
    multiSite: false,
    hasDisability: 'no',
    hasLife: 'no',
    healthPlan: '',
    careerVision: '',
    geoPreference: '',
    topConcerns: [],
    financialStyle: 'balanced',
    riskTolerance: 'moderate',
    onboardingStep: 0,
  };

  return { ...base, ...partial };
}
