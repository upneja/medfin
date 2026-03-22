import { describe, it, expect } from 'vitest';
import { compareNYCvsNJ, getMaxAffordableRent } from '@/lib/calculations/housing';

describe('Housing Calculator', () => {
  describe('compareNYCvsNJ for Alif ($75K)', () => {
    const comparison = compareNYCvsNJ(75000);

    it('NJ total tax is less than NYC total tax', () => {
      expect(comparison.njTotalTax).toBeLessThan(comparison.nycTotalTax);
    });

    it('annual tax savings is approximately $2,000-$3,000', () => {
      expect(comparison.annualTaxSavings).toBeGreaterThan(1500);
      expect(comparison.annualTaxSavings).toBeLessThan(4000);
    });

    it('monthly take-home difference is positive (NJ > NYC)', () => {
      expect(comparison.monthlyTakeHomeDifference).toBeGreaterThan(0);
    });

    it('generates informative notes', () => {
      expect(comparison.notes.length).toBeGreaterThan(0);
      const cityTaxNote = comparison.notes.find(n => n.includes('city income tax'));
      expect(cityTaxNote).toBeDefined();
    });
  });

  describe('getMaxAffordableRent', () => {
    it('returns ~30% of take-home for NYC resident at $75K', () => {
      const maxRent = getMaxAffordableRent(75000, 'NY', 'NYC');
      // Take-home ~$4,400, 30% = ~$1,320
      expect(maxRent).toBeGreaterThan(1100);
      expect(maxRent).toBeLessThan(1600);
    });

    it('NJ max rent is slightly higher than NYC (lower taxes)', () => {
      const nycMax = getMaxAffordableRent(75000, 'NY', 'NYC');
      const njMax = getMaxAffordableRent(75000, 'NJ', '');
      expect(njMax).toBeGreaterThan(nycMax);
    });
  });
});
