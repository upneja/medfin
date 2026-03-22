// ---------------------------------------------------------------------------
// MedFin – Training & Financial Milestones
// ---------------------------------------------------------------------------

import type { TimelineMilestone } from '../types';

// ---------------------------------------------------------------------------
// Anesthesiology-specific milestones (NYU Langone Brooklyn context)
// ---------------------------------------------------------------------------

export const ANESTHESIOLOGY_MILESTONES: TimelineMilestone[] = [
  // ===== PGY-1 (CA-0 / Intern Year) =====
  {
    id: 'anes-pgy1-orientation',
    pgyYear: 1,
    month: 7,
    category: 'clinical',
    title: 'Residency Orientation & Onboarding',
    description: 'Complete NYU orientation, get hospital badges, set up EPIC access, meet co-residents.',
    deadline: true,
    actionItems: [
      'Complete all compliance modules',
      'Set up direct deposit and benefits enrollment',
      'Obtain NYU ID and parking/transit pass',
    ],
  },
  {
    id: 'anes-pgy1-benefits',
    pgyYear: 1,
    month: 7,
    category: 'financial',
    title: 'Enroll in Benefits & Set Up Financial Foundation',
    description: 'Elect health insurance (UHC), enroll in 403(b) via TIAA, set up bank accounts.',
    deadline: true,
    actionItems: [
      'Choose UnitedHealthcare plan (EPO vs Choice Plus)',
      'Open 403(b) account with TIAA (even if contributing minimally)',
      'Open high-yield savings account for emergency fund',
      'Set up direct deposit',
    ],
  },
  {
    id: 'anes-pgy1-idr-pslf',
    pgyYear: 1,
    month: 8,
    category: 'financial',
    title: 'Apply for IDR Plan & Submit PSLF Employment Certification',
    description: 'Enroll in PAYE or IBR, submit PSLF Employment Certification Form (ECF). Grace period ends ~6 months post-graduation.',
    deadline: true,
    actionItems: [
      'Log in to studentaid.gov and apply for IDR (PAYE recommended)',
      'Submit PSLF Employment Certification Form to MOHELA',
      'Verify NYU Langone qualifies as 501(c)(3) employer',
      'Set calendar reminder for annual ECF resubmission',
      'Consider consolidating Grad PLUS loans if not yet done (required for PSLF on some loan types)',
    ],
  },
  {
    id: 'anes-pgy1-disability',
    pgyYear: 1,
    month: 9,
    category: 'financial',
    title: 'Purchase Own-Occupation Disability Insurance',
    description: 'Group LTD from NYU covers 60% but is not own-occupation. Buy supplemental own-occ policy while young and healthy.',
    deadline: false,
    actionItems: [
      'Get quotes from Guardian, MassMutual, Principal',
      'Request "own-occupation" and "specialty-specific" riders',
      'Aim for $2,000-3,000/mo benefit to supplement group coverage',
      'Lock in rates while young – premium increases with age',
    ],
  },
  {
    id: 'anes-pgy1-step3',
    pgyYear: 1,
    month: 12,
    category: 'exam',
    title: 'Take USMLE Step 3',
    description: 'Two-day exam; most residents take during intern year before anesthesia rotations ramp up.',
    deadline: false,
    actionItems: [
      'Register through FSMB at least 2-3 months in advance',
      'Schedule around lighter rotation blocks',
      'Budget ~$900 for exam fee',
    ],
  },
  {
    id: 'anes-pgy1-emergency-fund',
    pgyYear: 1,
    month: 12,
    category: 'financial',
    title: 'Build 1-Month Emergency Fund',
    description: 'Target $4,000-5,000 in savings by end of intern year.',
    deadline: false,
    actionItems: [
      'Automate $200-400/month transfer to HYSA',
      'Ultimate goal: 3 months expenses by PGY-3',
    ],
  },
  {
    id: 'anes-pgy1-roth-ira',
    pgyYear: 1,
    month: 4,
    category: 'financial',
    title: 'Roth IRA Contribution Deadline (Tax Year)',
    description: 'Contribute to Roth IRA while income is low and tax bracket is favorable. 2026 limit: $7,000.',
    deadline: true,
    actionItems: [
      'Open Roth IRA (Vanguard, Fidelity, or Schwab)',
      'Target full $7,000 contribution if budget allows',
      'Invest in target-date fund or total market index fund',
      'Deadline: April 15 for prior tax year',
    ],
  },

  // ===== PGY-2 (CA-1) =====
  {
    id: 'anes-pgy2-sim-bootcamp',
    pgyYear: 2,
    month: 7,
    category: 'clinical',
    title: 'CA-1 Simulation Boot Camp',
    description: 'Intensive airway and anesthesia simulation training. First time managing anesthetics independently.',
    deadline: true,
    actionItems: [
      'Review airway algorithms before boot camp',
      'Practice IV access and arterial line placement',
      'Familiarize yourself with anesthesia machine checkout',
    ],
  },
  {
    id: 'anes-pgy2-basic-exam',
    pgyYear: 2,
    month: 6,
    category: 'exam',
    title: 'ABA BASIC Examination',
    description: 'First component of ABA board certification. Covers pharmacology, physiology, physics, anatomy, and clinical sciences.',
    deadline: true,
    actionItems: [
      'Start studying by January of CA-1 year',
      'Use TrueLearn / M5 / Anesthesiology Boards & Beyond',
      'Form study group with co-residents',
      'Exam fee covered by NYU education stipend',
    ],
  },
  {
    id: 'anes-pgy2-pslf-annual',
    pgyYear: 2,
    month: 10,
    category: 'financial',
    title: 'Annual PSLF Employment Certification',
    description: 'Resubmit PSLF ECF annually to keep qualifying payments tracked. Do not skip this.',
    deadline: true,
    actionItems: [
      'Download ECF from studentaid.gov',
      'Have NYU HR sign the employer section',
      'Submit to MOHELA',
      'Verify payment count on studentaid.gov',
    ],
  },
  {
    id: 'anes-pgy2-idr-recertify',
    pgyYear: 2,
    month: 11,
    category: 'financial',
    title: 'IDR Annual Recertification',
    description: 'Recertify income for IDR plan. Use prior-year tax return (lower intern salary keeps payments low).',
    deadline: true,
    actionItems: [
      'Submit IDR recertification on studentaid.gov',
      'Use most recent tax return (not current pay stubs)',
      'Verify payment amount after recertification',
    ],
  },

  // ===== PGY-3 (CA-2) =====
  {
    id: 'anes-pgy3-senior-call',
    pgyYear: 3,
    month: 7,
    category: 'clinical',
    title: 'Begin Senior Call / Independent OR Management',
    description: 'Take senior call responsibilities. Manage multiple ORs, supervise CA-1s, handle emergencies.',
    deadline: false,
    actionItems: [
      'Review emergency protocols and cognitive aids',
      'Practice crisis resource management',
    ],
  },
  {
    id: 'anes-pgy3-fellowship-explore',
    pgyYear: 3,
    month: 9,
    category: 'career',
    title: 'Fellowship Exploration',
    description: 'Explore fellowship options (cardiac, pain, critical care, regional, peds). Attend sub-specialty conferences.',
    deadline: false,
    actionItems: [
      'Shadow attendings in fellowships of interest',
      'Attend ASA and SCA/ASRA meetings if possible',
      'Discuss with program director and mentors',
      'Research fellowship program requirements and timelines',
    ],
  },
  {
    id: 'anes-pgy3-ite',
    pgyYear: 3,
    month: 2,
    category: 'exam',
    title: 'In-Training Exam (ITE)',
    description: 'ABA In-Training Examination – performance benchmark. Not pass/fail but used for self-assessment.',
    deadline: true,
    actionItems: [
      'Review weak areas from prior ITE',
      'Use as a gauge for ADVANCED exam preparation',
    ],
  },
  {
    id: 'anes-pgy3-pslf-annual',
    pgyYear: 3,
    month: 10,
    category: 'financial',
    title: 'Annual PSLF Employment Certification',
    description: 'Third annual ECF submission. You should have ~24-36 qualifying payments by now.',
    deadline: true,
    actionItems: [
      'Submit ECF',
      'Verify payment count (target: ~24-36 payments)',
      'Confirm no payments were missed or disqualified',
    ],
  },

  // ===== PGY-4 (CA-3) =====
  {
    id: 'anes-pgy4-team-captain',
    pgyYear: 4,
    month: 7,
    category: 'clinical',
    title: 'Team Captain / Senior Leadership Roles',
    description: 'Serve as team captain at Bellevue or Brooklyn. Lead the anesthesia team, coordinate coverage, teach juniors.',
    deadline: false,
    actionItems: [
      'Develop leadership and delegation skills',
      'Mentor CA-1 and CA-2 residents',
    ],
  },
  {
    id: 'anes-pgy4-advanced-exam',
    pgyYear: 4,
    month: 9,
    category: 'exam',
    title: 'ABA ADVANCED Examination',
    description: 'Second component of ABA boards. Clinical knowledge exam. Must pass for board certification.',
    deadline: true,
    actionItems: [
      'Dedicated study starting CA-2 year',
      'Use Hall textbook, TrueLearn ADVANCED Qbank',
      'Schedule around fellowship interview season',
    ],
  },
  {
    id: 'anes-pgy4-fellowship-apps',
    pgyYear: 4,
    month: 8,
    category: 'career',
    title: 'Fellowship Applications / Job Search',
    description: 'Apply to fellowships (if pursuing) or begin attending job search. Interview season runs Sept-Jan.',
    deadline: true,
    actionItems: [
      'Update CV and request letters of recommendation',
      'Research programs or job opportunities',
      'Prepare for interviews (clinical scenarios + contract negotiation)',
      'If job searching: contact locums agencies as backup',
    ],
  },
  {
    id: 'anes-pgy4-contract-review',
    pgyYear: 4,
    month: 1,
    category: 'financial',
    title: 'Review Attending Contract (if not pursuing fellowship)',
    description: 'Have employment contract reviewed by a physician contract attorney. Understand RVU targets, malpractice, non-compete clauses.',
    deadline: false,
    actionItems: [
      'Hire physician contract review attorney ($500-1,500)',
      'Understand compensation model (salary vs production vs hybrid)',
      'Evaluate benefits: malpractice (occurrence vs claims-made), retirement match, sign-on bonus, loan repayment',
      'Negotiate if possible – first contract sets your trajectory',
    ],
  },
  {
    id: 'anes-pgy4-pslf-annual',
    pgyYear: 4,
    month: 10,
    category: 'financial',
    title: 'Final Residency PSLF Certification',
    description: 'Submit final ECF for residency. If pursuing fellowship at PSLF-eligible employer, payments continue counting.',
    deadline: true,
    actionItems: [
      'Submit ECF',
      'Total qualifying payments should be ~48 at end of residency',
      'If going to PSLF-eligible fellowship: continue IDR',
      'If going to private practice: evaluate refinancing vs continuing IDR',
    ],
  },
  {
    id: 'anes-pgy4-transition-planning',
    pgyYear: 4,
    month: 3,
    category: 'financial',
    title: 'Financial Transition Planning',
    description: 'Prepare for the resident-to-attending transition. Salary will increase 4-5x; avoid lifestyle inflation trap.',
    deadline: false,
    actionItems: [
      'Create post-residency financial plan',
      'Increase disability insurance to match attending salary',
      'Plan for retirement account maximization (401k/403b + backdoor Roth)',
      'If PSLF: continue qualifying payments; if not: compare refinance offers',
      'Research attending-level financial advisors (fee-only)',
    ],
  },
];

// ---------------------------------------------------------------------------
// Generic milestones (applicable to most specialties)
// ---------------------------------------------------------------------------

export const GENERIC_MILESTONES: TimelineMilestone[] = [
  {
    id: 'generic-pgy1-orientation',
    pgyYear: 1,
    month: 7,
    category: 'clinical',
    title: 'Residency Orientation',
    description: 'Complete institutional orientation, compliance training, EMR training.',
    deadline: true,
    actionItems: ['Complete all onboarding requirements', 'Set up benefits enrollment'],
  },
  {
    id: 'generic-pgy1-idr-pslf',
    pgyYear: 1,
    month: 8,
    category: 'financial',
    title: 'Set Up IDR & PSLF',
    description: 'Enroll in income-driven repayment and submit PSLF Employment Certification Form.',
    deadline: true,
    actionItems: [
      'Apply for PAYE/IBR on studentaid.gov',
      'Submit PSLF ECF',
      'Set annual recertification reminders',
    ],
  },
  {
    id: 'generic-pgy1-disability',
    pgyYear: 1,
    month: 9,
    category: 'financial',
    title: 'Purchase Own-Occupation Disability Insurance',
    description: 'Buy supplemental own-occ DI policy while young and healthy.',
    deadline: false,
    actionItems: [
      'Get quotes from multiple carriers',
      'Ensure own-occupation definition',
      'Consider future increase option rider',
    ],
  },
  {
    id: 'generic-pgy1-step3',
    pgyYear: 1,
    month: 12,
    category: 'exam',
    title: 'USMLE Step 3',
    description: 'Complete Step 3 during intern year.',
    deadline: false,
    actionItems: ['Register through FSMB', 'Schedule during lighter rotation'],
  },
  {
    id: 'generic-annual-roth',
    pgyYear: 1,
    month: 4,
    category: 'financial',
    title: 'Roth IRA Contribution Deadline',
    description: 'Max out Roth IRA while in a low tax bracket. Limit: $7,000 (2026).',
    deadline: true,
    actionItems: ['Contribute up to $7,000', 'Invest in low-cost index fund'],
  },
  {
    id: 'generic-annual-pslf-cert',
    pgyYear: 2,
    month: 10,
    category: 'financial',
    title: 'Annual PSLF Employment Certification',
    description: 'Resubmit ECF annually. Repeat every October throughout training.',
    deadline: true,
    actionItems: ['Download and submit ECF', 'Verify payment count'],
  },
  {
    id: 'generic-annual-idr-recert',
    pgyYear: 2,
    month: 11,
    category: 'financial',
    title: 'Annual IDR Recertification',
    description: 'Recertify income annually to maintain IDR payment amount.',
    deadline: true,
    actionItems: ['Submit on studentaid.gov', 'Use prior-year tax return'],
  },
  {
    id: 'generic-final-year-job',
    pgyYear: -1, // -1 = final year of training (varies by specialty)
    category: 'career',
    month: 9,
    title: 'Begin Job Search / Fellowship Applications',
    description: 'Start applying in September-October of your final training year.',
    deadline: true,
    actionItems: [
      'Update CV',
      'Request recommendation letters',
      'Research opportunities',
      'Prepare for contract negotiation',
    ],
  },
];

/**
 * Get milestones for a given specialty. Falls back to generic if no
 * specialty-specific milestones exist.
 */
export function getMilestonesForSpecialty(specialtyId: string): TimelineMilestone[] {
  if (specialtyId === 'anesthesiology') return ANESTHESIOLOGY_MILESTONES;
  return GENERIC_MILESTONES;
}

/**
 * Get milestones for a specific PGY year.
 */
export function getMilestonesForPGY(milestones: TimelineMilestone[], pgyYear: number): TimelineMilestone[] {
  return milestones.filter((m) => m.pgyYear === pgyYear);
}

/**
 * Get only financial milestones.
 */
export function getFinancialMilestones(milestones: TimelineMilestone[]): TimelineMilestone[] {
  return milestones.filter((m) => m.category === 'financial');
}
