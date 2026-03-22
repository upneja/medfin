// ---------------------------------------------------------------------------
// MedFin – Budget Calculator
// ---------------------------------------------------------------------------

import type { BudgetItem, BudgetSummary } from '../types';
import { calculateTaxes } from './taxes';
import { calculateIDRPayment } from './idr';

export interface BudgetInput {
  /** Annual gross salary */
  salary: number;
  /** Location for tax calculation */
  state: string;
  city: string;
  filingStatus: 'single' | 'married_jointly' | 'married_separately' | 'head_of_household';
  dependents: number;
  /** Monthly rent */
  rent: number;
  /** Housing situation */
  housingSituation: 'renting' | 'with_family' | 'owns' | 'looking';
  /** Has car */
  hasCar: boolean;
  carPayment: number;
  /** Loan details for IDR payment */
  totalDebt: number;
  avgInterestRate: number;
  familySize: number;
  /** Monthly pre-tax retirement contributions */
  monthlyRetirementContribution: number;
}

/**
 * Generate a default budget pre-filled with realistic estimates for a
 * medical resident in a given location.
 *
 * Uses the WCI (White Coat Investor) waterfall for surplus allocation:
 * 1. Employer match (if any)
 * 2. Pay off high-interest debt (>6%)
 * 3. Emergency fund (3 months)
 * 4. Roth IRA ($7,000/year = $583/mo)
 * 5. Additional retirement
 * 6. Extra debt payments or taxable investing
 *
 * @returns BudgetSummary with itemized expenses and recommendations
 */
export function generateDefaultBudget(input: BudgetInput): BudgetSummary {
  const {
    salary,
    state,
    city,
    filingStatus,
    dependents,
    rent,
    housingSituation,
    hasCar,
    carPayment,
    totalDebt,
    avgInterestRate,
    familySize,
    monthlyRetirementContribution,
  } = input;

  // Calculate take-home pay
  const taxes = calculateTaxes({
    grossIncome: salary,
    state,
    city,
    filingStatus,
    dependents,
    retirementContributions: monthlyRetirementContribution * 12,
  });

  const monthlyNet = taxes.monthlyTakeHome;

  // Calculate IDR payment
  const idrPayment = totalDebt > 0
    ? calculateIDRPayment(salary, familySize, 'PAYE', state)
    : 0;

  // Build expense items
  const items: BudgetItem[] = [];

  // --- Housing ---
  if (housingSituation === 'renting' || housingSituation === 'looking') {
    items.push({
      category: 'Housing',
      subcategory: 'Rent',
      amount: rent,
      frequency: 'monthly',
      isFixed: true,
      notes: '',
    });
    items.push({
      category: 'Housing',
      subcategory: 'Renters Insurance',
      amount: 15,
      frequency: 'monthly',
      isFixed: true,
      notes: 'Estimated; varies by coverage level',
    });
  }

  // Utilities (NYC apartments often include some; estimate remainder)
  items.push({
    category: 'Housing',
    subcategory: 'Utilities (Electric/Gas/Internet)',
    amount: city === 'NYC' ? 120 : 150,
    frequency: 'monthly',
    isFixed: true,
    notes: 'Internet ~$50, electric/gas ~$70-100',
  });

  items.push({
    category: 'Housing',
    subcategory: 'Cell Phone',
    amount: 50,
    frequency: 'monthly',
    isFixed: true,
    notes: '',
  });

  // --- Transportation ---
  if (hasCar) {
    if (carPayment > 0) {
      items.push({
        category: 'Transportation',
        subcategory: 'Car Payment',
        amount: carPayment,
        frequency: 'monthly',
        isFixed: true,
        notes: '',
      });
    }
    items.push({
      category: 'Transportation',
      subcategory: 'Car Insurance',
      amount: state === 'NY' ? 200 : 150,
      frequency: 'monthly',
      isFixed: true,
      notes: 'NYC insurance is significantly higher',
    });
    items.push({
      category: 'Transportation',
      subcategory: 'Gas & Parking',
      amount: city === 'NYC' ? 250 : 150,
      frequency: 'monthly',
      isFixed: false,
      notes: 'NYC parking alone can be $200+/mo',
    });
  } else {
    items.push({
      category: 'Transportation',
      subcategory: 'MetroCard / Transit',
      amount: city === 'NYC' || state === 'NY' ? 132 : 100,
      frequency: 'monthly',
      isFixed: true,
      notes: 'NYC unlimited MetroCard: $132/mo (pre-tax benefit may apply)',
    });
    items.push({
      category: 'Transportation',
      subcategory: 'Rideshare / Taxi',
      amount: 50,
      frequency: 'monthly',
      isFixed: false,
      notes: 'Late night rides home from call, occasional Uber',
    });
  }

  // --- Food ---
  items.push({
    category: 'Food',
    subcategory: 'Groceries',
    amount: city === 'NYC' ? 400 : 300,
    frequency: 'monthly',
    isFixed: false,
    notes: 'NYC grocery costs are ~30% above national average',
  });
  items.push({
    category: 'Food',
    subcategory: 'Dining Out / Coffee',
    amount: 200,
    frequency: 'monthly',
    isFixed: false,
    notes: 'Free meals on duty help reduce this',
  });

  // --- Debt ---
  if (idrPayment > 0) {
    items.push({
      category: 'Debt',
      subcategory: 'Student Loan (IDR Payment)',
      amount: Math.round(idrPayment),
      frequency: 'monthly',
      isFixed: true,
      notes: `PAYE plan based on $${salary.toLocaleString()} AGI, family size ${familySize}`,
    });
  }

  // --- Insurance ---
  items.push({
    category: 'Insurance',
    subcategory: 'Disability Insurance (Own-Occ)',
    amount: 120,
    frequency: 'monthly',
    isFixed: true,
    notes: 'Supplemental own-occupation policy; essential for physicians',
  });

  // Health insurance is usually pre-tax / employer-subsidized
  items.push({
    category: 'Insurance',
    subcategory: 'Health Insurance (Employee Share)',
    amount: 100,
    frequency: 'monthly',
    isFixed: true,
    notes: 'Pre-tax; most programs subsidize heavily',
  });

  // --- Personal ---
  items.push({
    category: 'Personal',
    subcategory: 'Clothing & Personal Care',
    amount: 50,
    frequency: 'monthly',
    isFixed: false,
    notes: 'Scrubs provided; minimal clothing needs',
  });
  items.push({
    category: 'Personal',
    subcategory: 'Entertainment & Subscriptions',
    amount: 75,
    frequency: 'monthly',
    isFixed: false,
    notes: 'Streaming, gym, hobbies',
  });
  items.push({
    category: 'Personal',
    subcategory: 'Miscellaneous',
    amount: 100,
    frequency: 'monthly',
    isFixed: false,
    notes: 'Gifts, unexpected expenses, household items',
  });

  // --- Savings ---
  items.push({
    category: 'Savings',
    subcategory: 'Emergency Fund',
    amount: 200,
    frequency: 'monthly',
    isFixed: false,
    notes: 'Target: 3 months expenses (~$12K-15K)',
  });
  items.push({
    category: 'Savings',
    subcategory: 'Roth IRA',
    amount: 583,
    frequency: 'monthly',
    isFixed: false,
    notes: 'Max $7,000/year while income is low',
  });

  // Calculate totals
  const totalExpenses = items.reduce((sum, item) => sum + item.amount, 0);
  const surplus = monthlyNet - totalExpenses;
  const savingsRate = monthlyNet > 0 ? (surplus + 200 + 583) / monthlyNet : 0; // include planned savings

  // Generate recommendations
  const recommendations = generateRecommendations(
    monthlyNet,
    totalExpenses,
    surplus,
    rent,
    idrPayment,
    totalDebt,
    avgInterestRate,
  );

  return {
    totalIncome: monthlyNet,
    totalExpenses,
    surplus,
    savingsRate: Math.round(savingsRate * 1000) / 1000,
    items,
    recommendations,
  };
}

/**
 * Analyze budget health given income and expense totals.
 */
export function calculateBudgetHealth(
  monthlyIncome: number,
  monthlyExpenses: number,
): {
  surplus: number;
  savingsRate: number;
  rentToIncomeRatio: number;
  status: 'healthy' | 'tight' | 'deficit';
  message: string;
} {
  const surplus = monthlyIncome - monthlyExpenses;
  const savingsRate = monthlyIncome > 0 ? surplus / monthlyIncome : 0;

  let status: 'healthy' | 'tight' | 'deficit';
  let message: string;

  if (surplus < 0) {
    status = 'deficit';
    message = `You are spending $${Math.abs(surplus).toLocaleString()} more than your take-home pay each month. Review discretionary spending and housing costs.`;
  } else if (savingsRate < 0.05) {
    status = 'tight';
    message = `Your budget is very tight with only ${(savingsRate * 100).toFixed(1)}% savings rate. Look for areas to cut or consider a roommate to reduce rent.`;
  } else {
    status = 'healthy';
    message = `You have a ${(savingsRate * 100).toFixed(1)}% savings rate. Allocate surplus using the WCI priority waterfall: emergency fund, Roth IRA, then extra debt payments.`;
  }

  return {
    surplus,
    savingsRate,
    rentToIncomeRatio: 0, // Caller should calculate with actual rent
    status,
    message,
  };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function generateRecommendations(
  monthlyNet: number,
  totalExpenses: number,
  surplus: number,
  rent: number,
  idrPayment: number,
  totalDebt: number,
  avgInterestRate: number,
): string[] {
  const recs: string[] = [];

  // Rent-to-income check
  const rentRatio = monthlyNet > 0 ? rent / monthlyNet : 0;
  if (rentRatio > 0.35) {
    recs.push(
      `Your rent is ${(rentRatio * 100).toFixed(0)}% of take-home pay, above the 30% guideline. Consider a roommate, a less expensive neighborhood, or a studio.`,
    );
  }

  // Surplus allocation (WCI waterfall)
  if (surplus > 0) {
    recs.push(
      'Surplus allocation priority (WCI waterfall): (1) Employer 403(b) match (none at NYU), (2) Emergency fund to 3 months, (3) Roth IRA ($7K/yr), (4) Extra toward high-interest debt or taxable investing.',
    );
  } else if (surplus < 0) {
    recs.push(
      'Your budget is in deficit. Consider: reducing dining out, finding a roommate, or looking at lower-rent neighborhoods like Bay Ridge or Sunset Park.',
    );
  }

  // PSLF reminder
  if (totalDebt > 100000 && idrPayment > 0) {
    recs.push(
      'With high federal loan debt, PSLF is likely your best strategy. Keep IDR payments low during training – every dollar saved now is a dollar forgiven later.',
    );
  }

  // Interest rate warning
  if (avgInterestRate > 0.07 && totalDebt > 0) {
    recs.push(
      `Your average interest rate (${(avgInterestRate * 100).toFixed(1)}%) means your loans are growing ~$${Math.round((totalDebt * avgInterestRate) / 12).toLocaleString()}/mo in interest during IDR. This is expected for PSLF strategy – the balance will be forgiven.`,
    );
  }

  // Roth IRA
  recs.push(
    'Residency is the best time to contribute to a Roth IRA – your tax rate is the lowest it will ever be. Even $200/mo grows tax-free for 30+ years.',
  );

  return recs;
}
