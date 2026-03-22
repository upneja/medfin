// ---------------------------------------------------------------------------
// MedFin – Residency Program Data
// ---------------------------------------------------------------------------

import type { ProgramData } from '../types';

export const PROGRAMS: ProgramData[] = [
  // -------------------------------------------------------------------------
  // NYU Langone Brooklyn – Anesthesiology (primary program)
  // -------------------------------------------------------------------------
  {
    id: 'nyu-brooklyn-anesthesiology',
    name: 'NYU Langone Brooklyn Anesthesiology',
    institution: 'NYU Langone Health',
    city: 'Brooklyn',
    state: 'NY',
    specialty: 'anesthesiology',
    trainingYears: 4,
    pgySalaries: [75000, 77000, 79000, 82000],
    pslfEligible: true,
    taxStatus: '501(c)(3)',
    benefits: {
      healthInsurance: 'UnitedHealthcare (Choice Plus or Choice EPO)',
      retirement: {
        type: '403(b)',
        provider: 'TIAA',
        matchPercent: 0,
        matchDescription: 'No employer match during residency',
      },
      lifeInsurance: '1.5x annual salary, employer-paid',
      disabilityInsurance: 'Group LTD at 60% of salary, employer-paid',
      vacation: '4 weeks PTO per year',
      meals: 'Free meals while on duty in hospital cafeteria',
      parking: 'Discounted parking available; most residents use transit',
      educationStipend: 1500,
      otherPerks: [
        'NYC transit pre-tax benefit',
        'Employee Assistance Program (EAP)',
        'Access to NYU gym facilities',
        'Malpractice insurance (tail coverage included)',
        'Board exam fee reimbursement (BASIC, ADVANCED)',
        'Simulation center access',
      ],
    },
    rotationSites: [
      'NYU Langone Hospital – Brooklyn (primary)',
      'Tisch Hospital / Kimmel Pavilion (Manhattan)',
      'Bellevue Hospital Center (Manhattan)',
      'VA NY Harbor – Manhattan Campus',
    ],
  },

  // -------------------------------------------------------------------------
  // MGH – Anesthesiology
  // -------------------------------------------------------------------------
  {
    id: 'mgh-anesthesiology',
    name: 'Massachusetts General Hospital Anesthesiology',
    institution: 'Mass General Brigham',
    city: 'Boston',
    state: 'MA',
    specialty: 'anesthesiology',
    trainingYears: 4,
    pgySalaries: [78000, 80500, 83000, 86000],
    pslfEligible: true,
    taxStatus: '501(c)(3)',
    benefits: {
      healthInsurance: 'Mass General Brigham Health Plan',
      retirement: {
        type: '403(b)',
        provider: 'Fidelity',
        matchPercent: 0,
        matchDescription: 'No match during residency; match begins as attending',
      },
      lifeInsurance: '1x annual salary, employer-paid',
      disabilityInsurance: 'Group LTD at 60% of salary',
      vacation: '4 weeks PTO per year',
      meals: 'Meal stipend ($10/call night)',
      parking: 'Subsidized T-pass',
      educationStipend: 1200,
      otherPerks: [
        'Pre-tax transit benefits',
        'Malpractice coverage',
        'Wellness program',
      ],
    },
    rotationSites: [
      'Massachusetts General Hospital',
      "Brigham and Women's Hospital",
      'Newton-Wellesley Hospital',
    ],
  },

  // -------------------------------------------------------------------------
  // UCSF – Anesthesiology
  // -------------------------------------------------------------------------
  {
    id: 'ucsf-anesthesiology',
    name: 'UCSF Anesthesiology',
    institution: 'University of California, San Francisco',
    city: 'San Francisco',
    state: 'CA',
    specialty: 'anesthesiology',
    trainingYears: 4,
    pgySalaries: [73000, 76000, 79000, 82000],
    pslfEligible: true,
    taxStatus: '501(c)(3)',
    benefits: {
      healthInsurance: 'UC Health Net Blue & Gold or Kaiser',
      retirement: {
        type: '403(b)',
        provider: 'Fidelity',
        matchPercent: 0,
        matchDescription: 'UC Retirement Plan contributions begin after 1 year',
      },
      lifeInsurance: '1x annual salary',
      disabilityInsurance: 'Group LTD at 60% of salary',
      vacation: '4 weeks PTO per year',
      meals: 'Call-night meals provided',
      parking: 'Subsidized transit pass (Muni/BART)',
      educationStipend: 1800,
      otherPerks: [
        'UC tuition remission for courses',
        'Malpractice coverage',
        'Gym membership discount',
      ],
    },
    rotationSites: [
      'UCSF Moffitt-Long Hospital',
      'UCSF Mission Bay',
      'Zuckerberg San Francisco General',
      'VA Medical Center – San Francisco',
    ],
  },

  // -------------------------------------------------------------------------
  // Columbia – Anesthesiology
  // -------------------------------------------------------------------------
  {
    id: 'columbia-anesthesiology',
    name: 'Columbia Anesthesiology',
    institution: 'Columbia University Irving Medical Center',
    city: 'New York',
    state: 'NY',
    specialty: 'anesthesiology',
    trainingYears: 4,
    pgySalaries: [76000, 78000, 80000, 83000],
    pslfEligible: true,
    taxStatus: '501(c)(3)',
    benefits: {
      healthInsurance: 'Aetna EPO or PPO',
      retirement: {
        type: '403(b)',
        provider: 'TIAA',
        matchPercent: 0,
        matchDescription: 'No employer match during residency',
      },
      lifeInsurance: '1x annual salary',
      disabilityInsurance: 'Group LTD at 60% of salary',
      vacation: '4 weeks PTO per year',
      meals: 'Free meals on call',
      parking: 'Pre-tax transit benefit',
      educationStipend: 1200,
      otherPerks: [
        'Housing stipend for on-call rooms',
        'Malpractice coverage',
        'Wellness stipend',
      ],
    },
    rotationSites: [
      'NewYork-Presbyterian / Columbia',
      'NewYork-Presbyterian / Allen Hospital',
      "Morgan Stanley Children's Hospital",
    ],
  },

  // -------------------------------------------------------------------------
  // Johns Hopkins – Internal Medicine (different specialty example)
  // -------------------------------------------------------------------------
  {
    id: 'hopkins-internal-medicine',
    name: 'Johns Hopkins Internal Medicine',
    institution: 'Johns Hopkins Medicine',
    city: 'Baltimore',
    state: 'MD',
    specialty: 'internal_medicine',
    trainingYears: 3,
    pgySalaries: [62000, 64000, 67000],
    pslfEligible: true,
    taxStatus: '501(c)(3)',
    benefits: {
      healthInsurance: 'Johns Hopkins EHP or CareFirst BCBS',
      retirement: {
        type: '403(b)',
        provider: 'Fidelity',
        matchPercent: 0,
        matchDescription: 'No match during residency',
      },
      lifeInsurance: '1x annual salary',
      disabilityInsurance: 'Group LTD at 60% of salary',
      vacation: '3 weeks PTO per year',
      meals: 'Free meals on call',
      parking: 'Subsidized parking or transit pass',
      educationStipend: 1000,
      otherPerks: [
        'Malpractice coverage',
        'Wellness program',
      ],
    },
    rotationSites: [
      'Johns Hopkins Hospital',
      'Johns Hopkins Bayview Medical Center',
      'Howard County General Hospital',
    ],
  },
];

/**
 * Look up a program by its ID.
 */
export function getProgramById(id: string): ProgramData | undefined {
  return PROGRAMS.find((p) => p.id === id);
}

/**
 * Get all programs for a given specialty.
 */
export function getProgramsBySpecialty(specialty: string): ProgramData[] {
  return PROGRAMS.filter((p) => p.specialty === specialty);
}

/**
 * Get the salary for a specific PGY level at a program.
 * PGY level is 1-indexed; returns undefined for out-of-range.
 */
export function getSalaryForPGY(program: ProgramData, pgyLevel: number): number | undefined {
  return program.pgySalaries[pgyLevel - 1];
}
