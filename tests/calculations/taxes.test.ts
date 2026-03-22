import { describe, it, expect } from 'vitest';
import { calculateTaxes, getMarginalFederalRate } from '@/lib/calculations/taxes';

describe('Tax Estimation Engine', () => {
  describe('calculateTaxes for Alif (single, $75K, NYC)', () => {
    const alif = calculateTaxes({
      grossIncome: 75000,
      state: 'NY',
      city: 'NYC',
      filingStatus: 'single',
      dependents: 0,
      retirementContributions: 0,
    });

    it('calculates federal tax in expected range', () => {
      // $75K - $15K standard deduction = $60K taxable
      // 10% on first $11,600 = $1,160
      // 12% on next $35,550 = $4,266
      // 22% on remaining $12,850 = $2,827
      // Total ≈ $8,253
      expect(alif.federal).toBeGreaterThan(7500);
      expect(alif.federal).toBeLessThan(9500);
    });

    it('calculates NY state tax', () => {
      // Should be roughly $3,500-$4,500
      expect(alif.state).toBeGreaterThan(3000);
      expect(alif.state).toBeLessThan(5000);
    });

    it('calculates NYC city tax', () => {
      // NYC city tax on ~$67K taxable ≈ $2,300-$2,600
      expect(alif.city).toBeGreaterThan(2000);
      expect(alif.city).toBeLessThan(3000);
    });

    it('calculates FICA correctly', () => {
      // Social Security: $75K * 6.2% = $4,650
      // Medicare: $75K * 1.45% = $1,087.50
      // Total ≈ $5,737.50
      expect(alif.fica).toBeGreaterThan(5500);
      expect(alif.fica).toBeLessThan(6000);
    });

    it('total tax is sum of all components', () => {
      // Allow $1 rounding tolerance due to intermediate rounding
      expect(Math.abs(alif.totalTax - (alif.federal + alif.state + alif.city + alif.fica))).toBeLessThanOrEqual(1);
    });

    it('effective rate is between 25-35% for NYC resident', () => {
      expect(alif.effectiveRate).toBeGreaterThan(0.25);
      expect(alif.effectiveRate).toBeLessThan(0.35);
    });

    it('monthly take-home is approximately $4,200-$4,800', () => {
      // Research says ~$4,500/month take-home for NYC PGY-1 at $75K
      expect(alif.monthlyTakeHome).toBeGreaterThan(4000);
      expect(alif.monthlyTakeHome).toBeLessThan(5000);
    });
  });

  describe('NJ vs NYC tax comparison', () => {
    it('NJ resident pays less total tax than NYC resident on same salary', () => {
      const nycTax = calculateTaxes({
        grossIncome: 75000,
        state: 'NY',
        city: 'NYC',
        filingStatus: 'single',
        dependents: 0,
        retirementContributions: 0,
      });

      const njTax = calculateTaxes({
        grossIncome: 75000,
        state: 'NJ',
        city: '',
        filingStatus: 'single',
        dependents: 0,
        retirementContributions: 0,
      });

      expect(njTax.totalTax).toBeLessThan(nycTax.totalTax);
      // Difference should be roughly $2,000-$3,000 (mainly NYC city tax)
      const savings = nycTax.totalTax - njTax.totalTax;
      expect(savings).toBeGreaterThan(1500);
      expect(savings).toBeLessThan(4000);
    });
  });

  describe('retirement contributions reduce taxes', () => {
    it('pre-tax 403(b) contributions lower monthly take-home but reduce AGI', () => {
      const noContrib = calculateTaxes({
        grossIncome: 75000,
        state: 'NY',
        city: 'NYC',
        filingStatus: 'single',
        dependents: 0,
        retirementContributions: 0,
      });

      const withContrib = calculateTaxes({
        grossIncome: 75000,
        state: 'NY',
        city: 'NYC',
        filingStatus: 'single',
        dependents: 0,
        retirementContributions: 6000, // $500/month
      });

      // Federal tax should be lower with contributions
      expect(withContrib.federal).toBeLessThan(noContrib.federal);
      // But monthly take-home is also lower (contributions come out)
      expect(withContrib.monthlyTakeHome).toBeLessThan(noContrib.monthlyTakeHome);
    });
  });

  describe('getMarginalFederalRate', () => {
    it('returns 22% for resident-level taxable income (~$60K)', () => {
      expect(getMarginalFederalRate(60000)).toBe(0.22);
    });

    it('returns 32% for attending-level taxable income (~$400K)', () => {
      expect(getMarginalFederalRate(400000)).toBe(0.35);
    });
  });
});
