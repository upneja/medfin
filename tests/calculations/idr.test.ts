import { describe, it, expect } from 'vitest';
import {
  calculateIDRPayment,
  calculateStandardPayment,
  getPovertyGuideline,
} from '@/lib/calculations/idr';

describe('IDR Payment Calculator', () => {
  describe('getPovertyGuideline', () => {
    it('returns correct base poverty guideline for single person', () => {
      const guideline = getPovertyGuideline(1);
      expect(guideline).toBe(15650);
    });

    it('adds $5,580 per additional family member', () => {
      const guideline = getPovertyGuideline(2);
      expect(guideline).toBe(15650 + 5580);
    });

    it('handles family of 4', () => {
      const guideline = getPovertyGuideline(4);
      expect(guideline).toBe(15650 + 5580 * 3);
    });

    it('applies Alaska multiplier', () => {
      const guideline = getPovertyGuideline(1, 'AK');
      expect(guideline).toBe(Math.round(15650 * 1.25));
    });
  });

  describe('calculateIDRPayment', () => {
    it('calculates correct PAYE payment for Alif (single, $75K, no dependents)', () => {
      // AGI = $75,000
      // 150% FPL for 1 person = 1.5 * $15,650 = $23,475
      // Discretionary = $75,000 - $23,475 = $51,525
      // Monthly = $51,525 * 10% / 12 = $429.38
      const payment = calculateIDRPayment(75000, 1, 'PAYE');
      expect(payment).toBeCloseTo(429.38, 0);
      expect(payment).toBeGreaterThan(400);
      expect(payment).toBeLessThan(500);
    });

    it('reduces payment with larger family size', () => {
      const singlePayment = calculateIDRPayment(75000, 1, 'PAYE');
      const familyPayment = calculateIDRPayment(75000, 3, 'PAYE');
      expect(familyPayment).toBeLessThan(singlePayment);
    });

    it('ICR uses 20% rate and 100% FPL', () => {
      // AGI = $75,000
      // 100% FPL for 1 person = $15,650
      // Discretionary = $75,000 - $15,650 = $59,350
      // Monthly = $59,350 * 20% / 12 = $989.17
      const payment = calculateIDRPayment(75000, 1, 'ICR');
      expect(payment).toBeCloseTo(989.17, 0);
    });

    it('returns $0 for income below 150% FPL', () => {
      const payment = calculateIDRPayment(20000, 1, 'PAYE');
      expect(payment).toBe(0);
    });

    it('never returns negative', () => {
      const payment = calculateIDRPayment(0, 1, 'PAYE');
      expect(payment).toBe(0);
    });
  });

  describe('calculateStandardPayment', () => {
    it('calculates correct 10-year standard payment for $315K at 7.5%', () => {
      const payment = calculateStandardPayment(315000, 0.075, 10);
      // Should be approximately $3,740/month
      expect(payment).toBeGreaterThan(3500);
      expect(payment).toBeLessThan(4000);
    });

    it('returns 0 for zero principal', () => {
      expect(calculateStandardPayment(0, 0.075)).toBe(0);
    });

    it('handles zero interest rate', () => {
      const payment = calculateStandardPayment(120000, 0, 10);
      expect(payment).toBe(1000); // $120K / 120 months
    });
  });
});
