import { describe, it, expect } from 'vitest';
import { calculateLoanScenarios, estimateTaxBomb } from '@/lib/calculations/pslf';

describe('PSLF Scenario Engine', () => {
  // Alif's scenario: $315K debt, 7.5% rate, 4 years training, anesthesiology
  const alifInput = {
    totalDebt: 315000,
    interestRate: 0.075,
    trainingYears: 4,
    fellowshipYears: 0,
    postTrainingCareer: 'academic' as const,
    attendingSalary: 525000,
    residentSalary: 75000,
    familySize: 1,
    plan: 'PAYE' as const,
    postTrainingPSLFEligible: true,
  };

  describe('calculateLoanScenarios returns 3 scenarios', () => {
    const scenarios = calculateLoanScenarios(alifInput);

    it('returns exactly 3 scenarios', () => {
      expect(scenarios).toHaveLength(3);
    });

    it('first scenario is PSLF', () => {
      expect(scenarios[0].name).toBe('PSLF Pursuit');
    });

    it('second scenario is Aggressive Refinance', () => {
      expect(scenarios[1].name).toBe('Aggressive Refinance');
    });

    it('third scenario is Standard IDR', () => {
      expect(scenarios[2].name).toContain('Standard IDR');
    });
  });

  describe('PSLF Scenario for Alif', () => {
    const scenarios = calculateLoanScenarios(alifInput);
    const pslf = scenarios[0];

    it('PSLF total paid is less than aggressive refinance total paid', () => {
      const aggressive = scenarios[1];
      // PSLF should save money for someone with $315K debt at a nonprofit
      expect(pslf.totalPaid).toBeLessThan(aggressive.totalPaid);
    });

    it('PSLF has significant forgiveness amount', () => {
      // With $315K at 7.5%, balance grows during training
      // After 10 years of IDR, substantial balance should remain to be forgiven
      expect(pslf.amountForgiven).toBeGreaterThan(0);
    });

    it('PSLF completes in 10 years', () => {
      expect(pslf.yearsToComplete).toBe(10);
    });

    it('PSLF has monthly payments array', () => {
      expect(pslf.monthlyPayments.length).toBe(120); // 10 years * 12 months
    });
  });

  describe('Aggressive Refinance Scenario', () => {
    const scenarios = calculateLoanScenarios(alifInput);
    const aggressive = scenarios[1];

    it('completes in training years + 5', () => {
      expect(aggressive.yearsToComplete).toBe(4 + 5); // 4 years training + 5 years payoff
    });

    it('has no forgiveness', () => {
      expect(aggressive.amountForgiven).toBe(0);
    });

    it('total paid includes interest accrued during training', () => {
      // Must pay more than original debt due to interest
      expect(aggressive.totalPaid).toBeGreaterThan(315000);
    });
  });

  describe('Standard IDR Scenario', () => {
    const scenarios = calculateLoanScenarios(alifInput);
    const standardIDR = scenarios[2];

    it('completes in 20 years for PAYE', () => {
      expect(standardIDR.yearsToComplete).toBe(20);
    });
  });

  describe('Fellowship impact', () => {
    it('adding fellowship year changes PSLF math', () => {
      const noFellowship = calculateLoanScenarios(alifInput);
      const withFellowship = calculateLoanScenarios({
        ...alifInput,
        fellowshipYears: 1,
      });

      // More training years = more low-IDR payments during training = more forgiven
      expect(withFellowship[0].amountForgiven).toBeGreaterThanOrEqual(
        noFellowship[0].amountForgiven
      );
    });
  });

  describe('estimateTaxBomb', () => {
    it('calculates tax on forgiven IDR amount at 35% rate', () => {
      const taxBomb = estimateTaxBomb(200000, 0.35);
      expect(taxBomb).toBe(70000);
    });
  });
});
