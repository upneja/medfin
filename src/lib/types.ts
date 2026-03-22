// ---------------------------------------------------------------------------
// MedFin – Core Type Definitions
// ---------------------------------------------------------------------------

/** Full user profile collected during onboarding and updated over time. */
export interface UserProfile {
  // Identity
  name: string;
  birthYear: number;
  maritalStatus: 'single' | 'partnered' | 'married' | 'divorced';
  dependents: number;

  // Training
  medicalSchool: string;
  program: string;
  specialty: string;
  pgyLevel: number;
  categorical: boolean;
  fellowshipInterest: string;

  // Loans
  totalDebt: number;
  federalDirect: number;
  gradPlus: number;
  privateLoan: number;
  avgInterestRate: number;
  loanServicer: string;
  loanStatus: string;
  consolidated: boolean;

  // Taxes & Income
  filingStatus: 'single' | 'married_jointly' | 'married_separately' | 'head_of_household';
  spouseIncome: number;
  savings: number;
  creditScore: string;
  retirementBalance: number;
  otherDebts: number;

  // Housing & Transport
  housingSituation: 'renting' | 'with_family' | 'owns' | 'looking';
  rentBudget: number;
  hasCar: boolean;
  carPayment: number;
  multiSite: boolean;

  // Insurance
  hasDisability: 'yes' | 'no' | 'unsure';
  hasLife: 'yes' | 'no' | 'unsure';
  healthPlan: string;

  // Goals & Preferences
  careerVision: string;
  geoPreference: string;
  topConcerns: string[];
  financialStyle: 'minimalist' | 'balanced' | 'maximizer';
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';

  // Meta
  onboardingStep: number;
}

// ---------------------------------------------------------------------------
// Program & Specialty
// ---------------------------------------------------------------------------

/** Residency program information. */
export interface ProgramData {
  id: string;
  name: string;
  institution: string;
  city: string;
  state: string;
  specialty: string;
  trainingYears: number;
  pgySalaries: number[];
  pslfEligible: boolean;
  taxStatus: string;
  benefits: ProgramBenefits;
  rotationSites: string[];
}

export interface ProgramBenefits {
  healthInsurance: string;
  retirement: RetirementBenefit;
  lifeInsurance: string;
  disabilityInsurance: string;
  vacation: string;
  meals: string;
  parking: string;
  educationStipend: number;
  otherPerks: string[];
}

export interface RetirementBenefit {
  type: string;
  provider: string;
  matchPercent: number;
  matchDescription: string;
}

/** Specialty-level data. */
export interface SpecialtyData {
  id: string;
  name: string;
  trainingLength: number;
  salaryRanges: SalaryRanges;
  fellowships: FellowshipInfo[];
  boardExamTimeline: BoardExam[];
}

export interface SalaryRanges {
  academic: { low: number; median: number; high: number };
  privatePractice: { low: number; median: number; high: number };
  hospitalEmployed: { low: number; median: number; high: number };
}

export interface FellowshipInfo {
  name: string;
  additionalYears: number;
  salaryImpactPercent: number;
  description: string;
}

export interface BoardExam {
  name: string;
  typicalPgyYear: number;
  month: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Housing
// ---------------------------------------------------------------------------

export interface NeighborhoodData {
  id: string;
  name: string;
  borough: string;
  medianStudioRent: number;
  median1BRRent: number;
  transitTimes: TransitTime[];
  walkabilityScore: number;
  bikeabilityScore: number;
  groceryAccess: string;
  safetyNotes: string;
  highlights: string[];
}

export interface TransitTime {
  destination: string;
  minutes: number;
  transitType: string;
  notes: string;
}

// ---------------------------------------------------------------------------
// Budget
// ---------------------------------------------------------------------------

export interface BudgetItem {
  category: string;
  subcategory: string;
  amount: number;
  frequency: 'monthly' | 'annual' | 'one-time';
  isFixed: boolean;
  notes: string;
}

export interface BudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  surplus: number;
  savingsRate: number;
  items: BudgetItem[];
  recommendations: string[];
}

// ---------------------------------------------------------------------------
// Loans & Scenarios
// ---------------------------------------------------------------------------

export interface LoanScenario {
  name: string;
  description: string;
  totalPaid: number;
  monthlyPayments: number[];
  amountForgiven: number;
  yearsToComplete: number;
  finalBalance: number;
  totalInterestPaid: number;
}

// ---------------------------------------------------------------------------
// Timeline & Milestones
// ---------------------------------------------------------------------------

export interface TimelineMilestone {
  id: string;
  pgyYear: number;
  month: number;
  category: 'clinical' | 'financial' | 'career' | 'exam' | 'administrative';
  title: string;
  description: string;
  deadline: boolean;
  actionItems: string[];
}

// ---------------------------------------------------------------------------
// Insurance
// ---------------------------------------------------------------------------

export interface InsuranceGap {
  type: 'disability' | 'life' | 'umbrella' | 'renters';
  severity: 'critical' | 'important' | 'nice-to-have';
  currentCoverage: string;
  recommendedCoverage: string;
  estimatedMonthlyCost: number;
  reasoning: string;
  recommendedCarriers: string[];
}

// ---------------------------------------------------------------------------
// Tax
// ---------------------------------------------------------------------------

export interface TaxBreakdown {
  federal: number;
  state: number;
  city: number;
  fica: number;
  totalTax: number;
  effectiveRate: number;
  monthlyTakeHome: number;
}

// ---------------------------------------------------------------------------
// Net Worth
// ---------------------------------------------------------------------------

export interface NetWorthProjection {
  year: number;
  age: number;
  label: string;
  grossIncome: number;
  netIncome: number;
  loanBalance: number;
  retirementBalance: number;
  savings: number;
  netWorth: number;
}

// ---------------------------------------------------------------------------
// Housing Analysis
// ---------------------------------------------------------------------------

export interface HousingAnalysis {
  neighborhoodId: string;
  neighborhoodName: string;
  monthlyRent: number;
  rentToIncomeRatio: number;
  annualHousingCost: number;
  annualTransportCost: number;
  totalAnnualCost: number;
  affordable: boolean;
  notes: string[];
}
