'use client';

import { useState } from 'react';
import {
  Landmark,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Clock,
  Gift,
  AlertTriangle,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useUserProfile } from '@/hooks/useUserProfile';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

function buildScenarios(totalDebt: number, rate: number, fellowship: boolean, career: string) {
  const trainingYears = fellowship ? 7 : 4;
  const residencySalary = 75000;
  const agiForIDR = residencySalary;
  const povertyLine = 15060;
  const idrPayment = Math.max(0, Math.round(((agiForIDR - (povertyLine * 1.5)) * 0.10) / 12));

  // PSLF
  const pslfMonths = 120;
  const pslfTotalPaid = idrPayment * pslfMonths;
  const pslfForgiven = Math.max(0, totalDebt * (1 + rate) ** (10) - pslfTotalPaid);
  const pslfYears = 10;

  // Aggressive
  const attendingSalary = career === 'academic' ? 350000 : 450000;
  const aggressiveMonthly = Math.round(attendingSalary * 0.25 / 12);
  let aggressiveBalance = totalDebt;
  let aggressiveMonths = 0;
  let aggressiveTotalPaid = 0;
  // During residency, pay IDR
  for (let m = 0; m < trainingYears * 12; m++) {
    aggressiveBalance = aggressiveBalance * (1 + rate / 12) - idrPayment;
    aggressiveTotalPaid += idrPayment;
    aggressiveMonths++;
  }
  // After residency, aggressive payoff
  while (aggressiveBalance > 0 && aggressiveMonths < 360) {
    const payment = Math.min(aggressiveMonthly, aggressiveBalance * (1 + rate / 12));
    aggressiveBalance = aggressiveBalance * (1 + rate / 12) - payment;
    aggressiveTotalPaid += payment;
    aggressiveMonths++;
  }

  // Standard 10-year
  const standardMonthly = Math.round((totalDebt * (rate / 12)) / (1 - Math.pow(1 + rate / 12, -120)));
  const standardTotalPaid = standardMonthly * 120;

  return [
    {
      name: 'PSLF',
      description: 'Public Service Loan Forgiveness — 10 years of qualifying payments at a non-profit employer.',
      monthlyPayment: idrPayment,
      totalPaid: pslfTotalPaid,
      amountForgiven: pslfForgiven,
      yearsToComplete: pslfYears,
      recommended: true,
    },
    {
      name: 'Aggressive Payoff',
      description: 'Pay minimum during residency, then throw 25% of attending salary at loans.',
      monthlyPayment: aggressiveMonthly,
      totalPaid: Math.round(aggressiveTotalPaid),
      amountForgiven: 0,
      yearsToComplete: Math.round(aggressiveMonths / 12),
      recommended: false,
    },
    {
      name: 'Standard Repayment',
      description: '10-year fixed repayment plan. Higher monthly payments, no forgiveness.',
      monthlyPayment: standardMonthly,
      totalPaid: standardTotalPaid,
      amountForgiven: 0,
      yearsToComplete: 10,
      recommended: false,
    },
  ];
}

export default function LoansPage() {
  const { profile } = useUserProfile();
  const [fellowship, setFellowship] = useState(!!profile.fellowshipInterest && profile.fellowshipInterest !== 'None');
  const [career, setCareer] = useState(profile.careerVision || 'academic');

  const scenarios = buildScenarios(
    profile.totalDebt,
    profile.avgInterestRate,
    fellowship,
    career
  );

  const actionItems = [
    'Consolidate federal loans into a Direct Consolidation Loan (if not already done)',
    'Enroll in SAVE (or PAYE) income-driven repayment plan',
    'Submit PSLF Employment Certification Form to MOHELA',
    'Set up auto-pay for 0.25% interest rate reduction',
    'Mark calendar to re-certify income annually',
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">Loan Strategy</h1>
        <p className="text-muted mt-1">
          Compare repayment paths for your {formatCurrency(profile.totalDebt)} in student loans.
        </p>
      </div>

      {/* Scenario Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {scenarios.map(s => (
          <div
            key={s.name}
            className={cn(
              'bg-white border rounded-xl p-6 relative',
              s.recommended ? 'border-accent-emerald border-2 shadow-md' : 'border-card-border'
            )}
          >
            {s.recommended && (
              <div className="absolute -top-3 left-4 bg-accent-emerald text-white text-xs font-semibold px-3 py-1 rounded-full">
                Recommended
              </div>
            )}
            <h3 className="text-lg font-semibold text-primary mb-1">{s.name}</h3>
            <p className="text-sm text-muted mb-5">{s.description}</p>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-accent-blue flex-shrink-0" />
                <span className="text-sm text-muted">Monthly Payment</span>
                <span className="ml-auto text-sm font-semibold font-mono">{formatCurrency(s.monthlyPayment)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-accent-blue flex-shrink-0" />
                <span className="text-sm text-muted">Total Paid</span>
                <span className="ml-auto text-sm font-semibold font-mono">{formatCurrency(s.totalPaid)}</span>
              </div>
              {s.amountForgiven > 0 && (
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-accent-emerald flex-shrink-0" />
                  <span className="text-sm text-muted">Amount Forgiven</span>
                  <span className="ml-auto text-sm font-semibold font-mono text-accent-emerald">
                    {formatCurrency(s.amountForgiven)}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent-blue flex-shrink-0" />
                <span className="text-sm text-muted">Years to Complete</span>
                <span className="ml-auto text-sm font-semibold font-mono">{s.yearsToComplete}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive toggles */}
      <div className="bg-white border border-card-border rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-primary mb-4">Adjust Your Assumptions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Fellowship Plans</label>
            <div className="flex gap-2">
              <button
                onClick={() => setFellowship(false)}
                className={cn(
                  'flex-1 py-2 px-4 rounded-lg text-sm font-medium border transition-colors',
                  !fellowship
                    ? 'bg-accent-blue text-white border-accent-blue'
                    : 'bg-white text-foreground border-card-border hover:border-accent-blue/30'
                )}
              >
                No Fellowship
              </button>
              <button
                onClick={() => setFellowship(true)}
                className={cn(
                  'flex-1 py-2 px-4 rounded-lg text-sm font-medium border transition-colors',
                  fellowship
                    ? 'bg-accent-blue text-white border-accent-blue'
                    : 'bg-white text-foreground border-card-border hover:border-accent-blue/30'
                )}
              >
                Fellowship
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Career Path</label>
            <div className="flex gap-2">
              <button
                onClick={() => setCareer('academic')}
                className={cn(
                  'flex-1 py-2 px-4 rounded-lg text-sm font-medium border transition-colors',
                  career === 'academic'
                    ? 'bg-accent-blue text-white border-accent-blue'
                    : 'bg-white text-foreground border-card-border hover:border-accent-blue/30'
                )}
              >
                Academic
              </button>
              <button
                onClick={() => setCareer('private_practice')}
                className={cn(
                  'flex-1 py-2 px-4 rounded-lg text-sm font-medium border transition-colors',
                  career === 'private_practice'
                    ? 'bg-accent-blue text-white border-accent-blue'
                    : 'bg-white text-foreground border-card-border hover:border-accent-blue/30'
                )}
              >
                Private Practice
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white border border-card-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Action Items</h2>
        <div className="space-y-3">
          {actionItems.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-accent-blue">{i + 1}</span>
              </div>
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
