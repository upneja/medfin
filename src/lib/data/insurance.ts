// ---------------------------------------------------------------------------
// MedFin – Insurance Data & Recommendations
// ---------------------------------------------------------------------------

import type { InsuranceGap } from '../types';

// ---------------------------------------------------------------------------
// Disability Insurance Carriers & Products
// ---------------------------------------------------------------------------

export interface DisabilityCarrier {
  name: string;
  product: string;
  ownOccupation: boolean;
  specialtySpecific: boolean;
  futureIncreaseOption: boolean;
  residualBenefit: boolean;
  costOfLivingRider: boolean;
  estimatedMonthlyPremium: { male: number; female: number };
  notes: string;
  rating: string;
}

export const DISABILITY_CARRIERS: DisabilityCarrier[] = [
  {
    name: 'Guardian',
    product: 'ProVider Plus',
    ownOccupation: true,
    specialtySpecific: true,
    futureIncreaseOption: true,
    residualBenefit: true,
    costOfLivingRider: true,
    estimatedMonthlyPremium: { male: 110, female: 150 },
    notes: 'Top choice for physicians. True own-occ definition. Excellent claims history. Widely recommended by WCI.',
    rating: 'A++ (AM Best)',
  },
  {
    name: 'MassMutual',
    product: 'Radius Choice',
    ownOccupation: true,
    specialtySpecific: true,
    futureIncreaseOption: true,
    residualBenefit: true,
    costOfLivingRider: true,
    estimatedMonthlyPremium: { male: 105, female: 145 },
    notes: 'Strong own-occ definition. Competitive pricing. Good rider options. Mutual company (policyholder-owned).',
    rating: 'A++ (AM Best)',
  },
  {
    name: 'The Standard',
    product: 'Platinum Advantage',
    ownOccupation: true,
    specialtySpecific: true,
    futureIncreaseOption: true,
    residualBenefit: true,
    costOfLivingRider: true,
    estimatedMonthlyPremium: { male: 100, female: 140 },
    notes: 'Often the most affordable. True own-occ. Good for budget-conscious residents. Slightly less name recognition.',
    rating: 'A (AM Best)',
  },
  {
    name: 'Principal',
    product: 'Own Occupation Plus',
    ownOccupation: true,
    specialtySpecific: true,
    futureIncreaseOption: true,
    residualBenefit: true,
    costOfLivingRider: true,
    estimatedMonthlyPremium: { male: 108, female: 148 },
    notes: 'Solid option. Good claims experience. Competitive with multi-life discounts through medical associations.',
    rating: 'A+ (AM Best)',
  },
  {
    name: 'Ameritas',
    product: 'DInamic Foundation',
    ownOccupation: true,
    specialtySpecific: true,
    futureIncreaseOption: true,
    residualBenefit: true,
    costOfLivingRider: true,
    estimatedMonthlyPremium: { male: 95, female: 135 },
    notes: 'Often the cheapest option. True own-occ. Good for maximizing benefit on a resident budget.',
    rating: 'A (AM Best)',
  },
];

// ---------------------------------------------------------------------------
// Specialty Risk Data (for disability insurance context)
// ---------------------------------------------------------------------------

export interface SpecialtyRisk {
  specialty: string;
  disabilityClaimRate: number; // % of physicians who file a claim before age 65
  mostCommonClaims: string[];
  averageClaimDuration: string;
  occupationClass: string; // insurance classification (4A, 5A, 6A)
}

export const SPECIALTY_RISKS: SpecialtyRisk[] = [
  {
    specialty: 'anesthesiology',
    disabilityClaimRate: 0.33,
    mostCommonClaims: ['Musculoskeletal (back, neck)', 'Needle stick / infectious disease', 'Substance use disorders', 'Neurological conditions'],
    averageClaimDuration: '2-5 years',
    occupationClass: '5A',
  },
  {
    specialty: 'general_surgery',
    disabilityClaimRate: 0.38,
    mostCommonClaims: ['Musculoskeletal (hand, shoulder)', 'Eye injuries', 'Needle stick', 'Burnout/mental health'],
    averageClaimDuration: '3-7 years',
    occupationClass: '4A',
  },
  {
    specialty: 'internal_medicine',
    disabilityClaimRate: 0.30,
    mostCommonClaims: ['Musculoskeletal', 'Cancer', 'Cardiovascular', 'Mental health'],
    averageClaimDuration: '2-4 years',
    occupationClass: '6A',
  },
  {
    specialty: 'orthopedic_surgery',
    disabilityClaimRate: 0.40,
    mostCommonClaims: ['Hand/wrist injuries', 'Shoulder injuries', 'Cervical disc disease', 'Neurological'],
    averageClaimDuration: '3-8 years',
    occupationClass: '4A',
  },
  {
    specialty: 'emergency_medicine',
    disabilityClaimRate: 0.35,
    mostCommonClaims: ['Musculoskeletal', 'Infectious disease exposure', 'Mental health / PTSD', 'Substance use'],
    averageClaimDuration: '2-5 years',
    occupationClass: '4A',
  },
];

// ---------------------------------------------------------------------------
// Life Insurance Recommendations
// ---------------------------------------------------------------------------

export interface LifeInsuranceGuideline {
  scenario: string;
  recommended: boolean;
  coverageAmount: string;
  termLength: string;
  estimatedMonthlyCost: number;
  reasoning: string;
}

export const LIFE_INSURANCE_GUIDELINES: LifeInsuranceGuideline[] = [
  {
    scenario: 'Single, no dependents, no co-signer on loans',
    recommended: false,
    coverageAmount: 'N/A',
    termLength: 'N/A',
    estimatedMonthlyCost: 0,
    reasoning: 'Federal student loans are discharged at death. With no dependents or co-signers, life insurance is not necessary. Employer-provided coverage (1-1.5x salary) is sufficient.',
  },
  {
    scenario: 'Single, no dependents, parent co-signed private loans',
    recommended: true,
    coverageAmount: 'Amount of co-signed loans',
    termLength: '10-year term',
    estimatedMonthlyCost: 15,
    reasoning: 'Co-signed private loans do NOT get discharged at death. Protect your co-signer with a term policy covering the loan balance.',
  },
  {
    scenario: 'Married, no kids',
    recommended: true,
    coverageAmount: '$500K-$1M',
    termLength: '20-year term',
    estimatedMonthlyCost: 25,
    reasoning: 'Protect spouse from loss of income. Coverage should replace 5-10 years of attending income potential.',
  },
  {
    scenario: 'Married with children',
    recommended: true,
    coverageAmount: '$1M-$2M',
    termLength: '20-30 year term',
    estimatedMonthlyCost: 40,
    reasoning: 'Replace income through children reaching adulthood. Factor in childcare, education, mortgage, and lost attending earnings.',
  },
];

// ---------------------------------------------------------------------------
// Insurance Gap Analysis
// ---------------------------------------------------------------------------

/**
 * Analyze insurance gaps based on user profile.
 * Returns a prioritized list of gaps with recommendations.
 */
export function analyzeInsuranceGaps(params: {
  hasDisability: 'yes' | 'no' | 'unsure';
  hasLife: 'yes' | 'no' | 'unsure';
  maritalStatus: string;
  dependents: number;
  totalDebt: number;
  privateLoan: number;
  housingSituation: string;
  specialty: string;
}): InsuranceGap[] {
  const gaps: InsuranceGap[] = [];

  // 1. Disability insurance (almost always critical for physicians)
  if (params.hasDisability !== 'yes') {
    const risk = SPECIALTY_RISKS.find((r) => r.specialty === params.specialty);
    const claimRate = risk ? `${Math.round(risk.disabilityClaimRate * 100)}%` : '~33%';

    gaps.push({
      type: 'disability',
      severity: 'critical',
      currentCoverage: params.hasDisability === 'no'
        ? 'No individual disability insurance (group LTD only)'
        : 'Unsure of current coverage',
      recommendedCoverage: 'Own-occupation, specialty-specific policy with future increase option',
      estimatedMonthlyCost: 120,
      reasoning: `${claimRate} of physicians file a disability claim before age 65. Group LTD (60% of salary) is not own-occupation and is not portable. An individual policy locks in your insurability while young and healthy. This is the single most important insurance purchase for a resident.`,
      recommendedCarriers: ['Guardian', 'MassMutual', 'The Standard', 'Principal', 'Ameritas'],
    });
  }

  // 2. Life insurance
  const needsLife =
    params.maritalStatus === 'married' ||
    params.dependents > 0 ||
    params.privateLoan > 0;

  if (needsLife && params.hasLife !== 'yes') {
    let severity: 'critical' | 'important' = 'important';
    let coverage = '$500K-$1M 20-year term';
    let cost = 25;

    if (params.dependents > 0) {
      severity = 'critical';
      coverage = '$1M-$2M 20-30 year term';
      cost = 40;
    } else if (params.privateLoan > 0) {
      coverage = `At minimum ${formatCurrencySimple(params.privateLoan)} to cover co-signed loans`;
      cost = 15;
    }

    gaps.push({
      type: 'life',
      severity,
      currentCoverage: 'Employer-provided group life only (1-1.5x salary)',
      recommendedCoverage: coverage,
      estimatedMonthlyCost: cost,
      reasoning: params.dependents > 0
        ? 'With dependents, you need individual term life to replace your future attending income and cover family expenses.'
        : params.privateLoan > 0
          ? 'Private student loans with co-signers are NOT discharged at death. Protect your co-signer.'
          : 'A spouse would lose your income contribution. Term life is inexpensive for healthy young physicians.',
      recommendedCarriers: ['Haven Life (online)', 'Policygenius (broker)', 'Ladder Life (online)'],
    });
  }

  // 3. Renters insurance
  if (params.housingSituation === 'renting') {
    gaps.push({
      type: 'renters',
      severity: 'nice-to-have',
      currentCoverage: 'Unknown',
      recommendedCoverage: '$30K-$50K personal property, $100K liability',
      estimatedMonthlyCost: 15,
      reasoning: 'Renters insurance is inexpensive ($12-20/mo) and covers personal belongings, liability, and temporary housing if your apartment becomes uninhabitable.',
      recommendedCarriers: ['Lemonade', 'State Farm', 'USAA (if eligible)'],
    });
  }

  return gaps;
}

function formatCurrencySimple(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}
