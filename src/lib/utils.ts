// ---------------------------------------------------------------------------
// MedFin – Utility Functions
// ---------------------------------------------------------------------------

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with intelligent conflict resolution.
 * Combines clsx (conditional classes) with tailwind-merge (dedup).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as US currency.
 * @example formatCurrency(75000) => "$75,000"
 * @example formatCurrency(1234.56) => "$1,235"
 */
export function formatCurrency(n: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

/**
 * Format a decimal as a percentage string.
 * @example formatPercent(0.075) => "7.5%"
 * @example formatPercent(0.325, 1) => "32.5%"
 */
export function formatPercent(n: number, decimals = 1): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Round to the nearest cent (or specified decimals).
 */
export function roundTo(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
