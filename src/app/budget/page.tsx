'use client';

import { useState } from 'react';
import { Wallet, AlertTriangle, CheckCircle2, ArrowDown } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useUserProfile } from '@/hooks/useUserProfile';
import { formatCurrency, formatPercent, cn } from '@/lib/utils';

interface BudgetCategory {
  name: string;
  amount: number;
  min: number;
  max: number;
  step: number;
  isFixed: boolean;
}

const DEFAULT_CATEGORIES: BudgetCategory[] = [
  { name: 'Rent', amount: 1800, min: 800, max: 3500, step: 50, isFixed: true },
  { name: 'Utilities', amount: 120, min: 50, max: 300, step: 10, isFixed: true },
  { name: 'Groceries', amount: 400, min: 150, max: 800, step: 25, isFixed: false },
  { name: 'Transportation', amount: 127, min: 0, max: 500, step: 10, isFixed: true },
  { name: 'Phone', amount: 50, min: 20, max: 120, step: 5, isFixed: true },
  { name: 'Student Loan', amount: 0, min: 0, max: 2000, step: 25, isFixed: true },
  { name: 'Insurance', amount: 150, min: 0, max: 500, step: 10, isFixed: true },
  { name: 'Entertainment', amount: 150, min: 0, max: 500, step: 25, isFixed: false },
  { name: 'Miscellaneous', amount: 200, min: 50, max: 600, step: 25, isFixed: false },
];

function getBudgetHealth(savingsRate: number): { label: string; color: string; bg: string } {
  if (savingsRate >= 0.15) return { label: 'Excellent', color: 'text-accent-emerald', bg: 'bg-accent-emerald/10' };
  if (savingsRate >= 0.05) return { label: 'Good', color: 'text-accent-blue', bg: 'bg-accent-blue/10' };
  if (savingsRate >= 0) return { label: 'Tight', color: 'text-accent-amber', bg: 'bg-accent-amber/10' };
  return { label: 'Over Budget', color: 'text-accent-red', bg: 'bg-red-50' };
}

export default function BudgetPage() {
  const { profile } = useUserProfile();
  const salary = 75000;
  const totalTax = salary * 0.30;
  const monthlyTakeHome = Math.round((salary - totalTax) / 12);

  const initialCategories = DEFAULT_CATEGORIES.map(c => {
    if (c.name === 'Rent') return { ...c, amount: profile.rentBudget || 1800 };
    return { ...c };
  });

  const [categories, setCategories] = useState(initialCategories);

  const updateCategory = (index: number, amount: number) => {
    setCategories(prev => prev.map((c, i) => i === index ? { ...c, amount } : c));
  };

  const totalExpenses = categories.reduce((sum, c) => sum + c.amount, 0);
  const remaining = monthlyTakeHome - totalExpenses;
  const savingsRate = remaining / monthlyTakeHome;
  const health = getBudgetHealth(savingsRate);

  const waterfall = [
    { label: 'Emergency fund (3-6 months)', amount: remaining > 0 ? Math.min(remaining, 500) : 0 },
    { label: '403(b) match (if available)', amount: remaining > 500 ? Math.min(remaining - 500, 200) : 0 },
    { label: 'Roth IRA contribution', amount: remaining > 700 ? Math.min(remaining - 700, 500) : 0 },
    { label: 'Extra loan payments / savings', amount: remaining > 1200 ? remaining - 1200 : 0 },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">Budget Builder</h1>
        <p className="text-muted mt-1">
          Build a realistic monthly budget on your resident salary.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main budget area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Income section */}
          <div className="bg-white border border-card-border rounded-xl p-6">
            <h2 className="text-sm font-semibold text-primary mb-4">Monthly Income</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted">Gross Salary</p>
                <p className="text-lg font-semibold font-mono">{formatCurrency(salary / 12)}</p>
              </div>
              <div>
                <p className="text-xs text-muted">Take-Home (after tax)</p>
                <p className="text-lg font-semibold font-mono text-accent-emerald">{formatCurrency(monthlyTakeHome)}</p>
              </div>
            </div>
          </div>

          {/* Expense categories */}
          <div className="bg-white border border-card-border rounded-xl p-6">
            <h2 className="text-sm font-semibold text-primary mb-4">Monthly Expenses</h2>
            <div className="space-y-5">
              {categories.map((cat, i) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-foreground">{cat.name}</label>
                    <span className="text-sm font-mono font-semibold">{formatCurrency(cat.amount)}</span>
                  </div>
                  <input
                    type="range"
                    min={cat.min}
                    max={cat.max}
                    step={cat.step}
                    value={cat.amount}
                    onChange={e => updateCategory(i, Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-light mt-0.5">
                    <span>{formatCurrency(cat.min)}</span>
                    <span>{formatCurrency(cat.max)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar summary */}
        <div className="space-y-6">
          {/* Summary card */}
          <div className="bg-white border border-card-border rounded-xl p-6 sticky top-20">
            <h2 className="text-sm font-semibold text-primary mb-4">Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Take-Home Pay</span>
                <span className="font-mono font-semibold">{formatCurrency(monthlyTakeHome)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Total Expenses</span>
                <span className="font-mono font-semibold">-{formatCurrency(totalExpenses)}</span>
              </div>
              <div className="border-t border-card-border pt-3">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-foreground">Remaining</span>
                  <span className={cn('font-mono font-bold', remaining >= 0 ? 'text-accent-emerald' : 'text-accent-red')}>
                    {formatCurrency(remaining)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Savings Rate</span>
                <span className="font-mono">{formatPercent(Math.max(0, savingsRate))}</span>
              </div>
            </div>

            {/* Health indicator */}
            <div className={cn('mt-4 p-3 rounded-lg flex items-center gap-2', health.bg)}>
              {savingsRate >= 0.05 ? (
                <CheckCircle2 className={cn('w-4 h-4', health.color)} />
              ) : (
                <AlertTriangle className={cn('w-4 h-4', health.color)} />
              )}
              <span className={cn('text-sm font-medium', health.color)}>{health.label}</span>
            </div>
          </div>

          {/* Surplus recommendation */}
          {remaining > 0 && (
            <div className="bg-white border border-card-border rounded-xl p-6">
              <h2 className="text-sm font-semibold text-primary mb-3">
                What to do with your {formatCurrency(remaining)} surplus
              </h2>
              <p className="text-xs text-muted mb-4">WCI Financial Waterfall</p>
              <div className="space-y-3">
                {waterfall.map((w, i) => (
                  <div key={i}>
                    <div className="flex items-start gap-2">
                      <ArrowDown className="w-3.5 h-3.5 text-accent-blue flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-foreground">{w.label}</span>
                          <span className="text-xs font-mono font-semibold">{formatCurrency(w.amount)}</span>
                        </div>
                      </div>
                    </div>
                    {i < waterfall.length - 1 && <div className="ml-1.5 w-px h-2 bg-card-border" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
