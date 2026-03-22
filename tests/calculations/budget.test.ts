import { describe, it, expect } from 'vitest';
import { generateDefaultBudget, calculateBudgetHealth } from '@/lib/calculations/budget';

describe('Budget Calculator', () => {
  describe('generateDefaultBudget for Alif', () => {
    const budget = generateDefaultBudget({
      salary: 75000,
      state: 'NY',
      city: 'NYC',
      filingStatus: 'single',
      dependents: 0,
      rent: 1800,
      housingSituation: 'renting',
      hasCar: false,
      carPayment: 0,
      totalDebt: 315000,
      avgInterestRate: 0.075,
      familySize: 1,
      monthlyRetirementContribution: 0,
    });

    it('generates budget items', () => {
      expect(budget.items.length).toBeGreaterThan(10);
    });

    it('includes rent at $1,800', () => {
      const rentItem = budget.items.find(
        (i) => i.subcategory === 'Rent'
      );
      expect(rentItem).toBeDefined();
      expect(rentItem!.amount).toBe(1800);
    });

    it('includes MetroCard transit for NYC resident without car', () => {
      const transit = budget.items.find(
        (i) => i.subcategory.includes('MetroCard') || i.subcategory.includes('Transit')
      );
      expect(transit).toBeDefined();
      expect(transit!.amount).toBe(132);
    });

    it('includes student loan IDR payment', () => {
      const loan = budget.items.find(
        (i) => i.subcategory.includes('Student Loan')
      );
      expect(loan).toBeDefined();
      expect(loan!.amount).toBeGreaterThan(300);
      expect(loan!.amount).toBeLessThan(700);
    });

    it('includes disability insurance', () => {
      const disability = budget.items.find(
        (i) => i.subcategory.includes('Disability')
      );
      expect(disability).toBeDefined();
    });

    it('includes Roth IRA savings', () => {
      const roth = budget.items.find(
        (i) => i.subcategory.includes('Roth IRA')
      );
      expect(roth).toBeDefined();
      expect(roth!.amount).toBe(583); // $7,000 / 12
    });

    it('total income is monthly take-home', () => {
      expect(budget.totalIncome).toBeGreaterThan(4000);
      expect(budget.totalIncome).toBeLessThan(5000);
    });

    it('total expenses is sum of all items', () => {
      const sum = budget.items.reduce((s, i) => s + i.amount, 0);
      expect(budget.totalExpenses).toBe(sum);
    });

    it('surplus is income minus expenses', () => {
      expect(budget.surplus).toBe(budget.totalIncome - budget.totalExpenses);
    });

    it('generates recommendations', () => {
      expect(budget.recommendations.length).toBeGreaterThan(0);
    });

    it('recommends Roth IRA', () => {
      const rothRec = budget.recommendations.find(
        (r) => r.toLowerCase().includes('roth')
      );
      expect(rothRec).toBeDefined();
    });
  });

  describe('calculateBudgetHealth', () => {
    it('returns healthy for positive savings rate', () => {
      const health = calculateBudgetHealth(4500, 3500);
      expect(health.status).toBe('healthy');
      expect(health.surplus).toBe(1000);
    });

    it('returns tight for very low savings rate', () => {
      const health = calculateBudgetHealth(4500, 4400);
      expect(health.status).toBe('tight');
    });

    it('returns deficit when expenses exceed income', () => {
      const health = calculateBudgetHealth(4500, 5000);
      expect(health.status).toBe('deficit');
      expect(health.surplus).toBe(-500);
    });
  });
});
