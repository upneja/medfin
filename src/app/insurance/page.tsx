'use client';

import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  AlertTriangle,
  CheckCircle2,
  Info,
  ExternalLink,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useUserProfile } from '@/hooks/useUserProfile';
import { formatCurrency, cn } from '@/lib/utils';

interface InsuranceNeed {
  type: string;
  category: 'disability' | 'life' | 'umbrella' | 'renters';
  severity: 'critical' | 'important' | 'nice-to-have';
  hasIt: boolean;
  currentCoverage: string;
  recommendedCoverage: string;
  estimatedMonthlyCost: number;
  reasoning: string;
}

function getInsuranceNeeds(profile: { hasDisability: string; hasLife: string; dependents: number; maritalStatus: string }): InsuranceNeed[] {
  const needs: InsuranceNeed[] = [
    {
      type: 'Own-Occupation Disability Insurance',
      category: 'disability',
      severity: 'critical',
      hasIt: profile.hasDisability === 'yes',
      currentCoverage: profile.hasDisability === 'yes' ? 'Has policy' : profile.hasDisability === 'unsure' ? 'Uncertain' : 'None',
      recommendedCoverage: '$5,000/month benefit, own-occupation, specialty-specific',
      estimatedMonthlyCost: 150,
      reasoning: 'As a physician, your ability to earn is your most valuable asset. 25% of physicians will experience a disability during their career. Own-occupation coverage protects your specialty-specific income.',
    },
    {
      type: 'Term Life Insurance',
      category: 'life',
      severity: profile.dependents > 0 || profile.maritalStatus === 'married' ? 'critical' : 'important',
      hasIt: profile.hasLife === 'yes',
      currentCoverage: profile.hasLife === 'yes' ? 'Has policy' : 'None',
      recommendedCoverage: '$1M, 20-30 year level term',
      estimatedMonthlyCost: 35,
      reasoning: profile.dependents > 0
        ? 'With dependents, life insurance is essential to protect your family from your student loan debt and loss of future income.'
        : 'Even without dependents, locking in a policy while young and healthy gets you the lowest premiums. Your future family will thank you.',
    },
    {
      type: 'Renters Insurance',
      category: 'renters',
      severity: 'important',
      hasIt: false,
      currentCoverage: 'Likely none',
      recommendedCoverage: '$30,000 personal property, $100,000 liability',
      estimatedMonthlyCost: 15,
      reasoning: 'Protects your belongings and provides liability coverage. Very inexpensive and often required by landlords in NYC.',
    },
    {
      type: 'Umbrella Insurance',
      category: 'umbrella',
      severity: 'nice-to-have',
      hasIt: false,
      currentCoverage: 'None',
      recommendedCoverage: '$1M umbrella policy (more important as attending)',
      estimatedMonthlyCost: 20,
      reasoning: 'Provides extra liability protection beyond your other policies. More important once you have attending-level assets, but affordable to start now.',
    },
  ];

  return needs;
}

const SEVERITY_CONFIG = {
  critical: { label: 'Critical', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: ShieldX },
  important: { label: 'Important', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: ShieldAlert },
  'nice-to-have': { label: 'Nice to Have', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: Info },
};

const CARRIERS = [
  { name: 'Guardian', specialty: 'Disability', note: 'Top pick for own-occ policies. Strong resident discounts.' },
  { name: 'MassMutual', specialty: 'Disability', note: 'Excellent own-occupation definition. Competitive rates.' },
  { name: 'Principal', specialty: 'Disability', note: 'Good rider options. Strong in anesthesiology.' },
  { name: 'Haven Life', specialty: 'Life', note: 'Affordable online term life. Quick application process.' },
  { name: 'Ladder', specialty: 'Life', note: 'Flexible term life. Easy to adjust coverage.' },
  { name: 'Lemonade', specialty: 'Renters', note: 'Fast, affordable renters insurance. Great app.' },
];

export default function InsurancePage() {
  const { profile } = useUserProfile();
  const needs = getInsuranceNeeds(profile);
  const gaps = needs.filter(n => !n.hasIt);
  const totalMonthlyCost = gaps.reduce((sum, n) => sum + n.estimatedMonthlyCost, 0);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Insurance Advisor</h1>
        <p className="text-slate-500 mt-1">
          Protect your most valuable asset — your future earning potential.
        </p>
      </div>

      {/* Gap summary */}
      {gaps.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {gaps.length} insurance gap{gaps.length > 1 ? 's' : ''} identified
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Estimated cost to fill all gaps: {formatCurrency(totalMonthlyCost)}/month ({formatCurrency(totalMonthlyCost * 12)}/year)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* What You Have vs What You Need */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-8 shadow-sm">
        <div className="grid grid-cols-12 gap-0 bg-slate-50 border-b border-slate-200 px-5 py-3">
          <div className="col-span-3 text-xs font-semibold text-slate-500 uppercase">Type</div>
          <div className="col-span-2 text-xs font-semibold text-slate-500 uppercase">Priority</div>
          <div className="col-span-3 text-xs font-semibold text-slate-500 uppercase">You Have</div>
          <div className="col-span-3 text-xs font-semibold text-slate-500 uppercase">You Need</div>
          <div className="col-span-1 text-xs font-semibold text-slate-500 uppercase text-right">Cost</div>
        </div>
        {needs.map((n, i) => {
          const sev = SEVERITY_CONFIG[n.severity];
          return (
            <div key={i} className={cn('grid grid-cols-12 gap-0 px-5 py-4 items-center', i < needs.length - 1 && 'border-b border-slate-200')}>
              <div className="col-span-3 text-sm font-medium text-slate-900">{n.type}</div>
              <div className="col-span-2">
                <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', sev.bg, sev.color)}>
                  {sev.label}
                </span>
              </div>
              <div className="col-span-3">
                <div className="flex items-center gap-1.5">
                  {n.hasIt ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <ShieldX className="w-4 h-4 text-red-600 flex-shrink-0" />
                  )}
                  <span className="text-sm text-slate-500">{n.currentCoverage}</span>
                </div>
              </div>
              <div className="col-span-3 text-sm text-slate-900">{n.recommendedCoverage}</div>
              <div className="col-span-1 text-sm font-mono text-right">
                {n.hasIt ? (
                  <span className="text-emerald-600">--</span>
                ) : (
                  <span>{formatCurrency(n.estimatedMonthlyCost)}/mo</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Gap analysis details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {needs.map((n, i) => {
          const sev = SEVERITY_CONFIG[n.severity];
          const SevIcon = sev.icon;
          return (
            <div key={i} className={cn('bg-white border rounded-2xl p-5 shadow-sm', n.hasIt ? 'border-slate-200' : sev.border)}>
              <div className="flex items-start gap-3 mb-3">
                <SevIcon className={cn('w-5 h-5 flex-shrink-0', n.hasIt ? 'text-emerald-600' : sev.color)} />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{n.type}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {n.hasIt ? 'You have this covered' : `${sev.label} — ${formatCurrency(n.estimatedMonthlyCost)}/month`}
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">{n.reasoning}</p>
            </div>
          );
        })}
      </div>

      {/* Why This Matters */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-3">Why This Matters for Anesthesiologists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="text-3xl font-bold text-emerald-400">25%</p>
            <p className="text-sm text-white/70 mt-1">of physicians will experience a disability before retirement</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-emerald-400">$8M+</p>
            <p className="text-sm text-white/70 mt-1">lifetime earning potential at risk without disability coverage</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-emerald-400">40%</p>
            <p className="text-sm text-white/70 mt-1">cheaper premiums when purchased during residency vs. attending</p>
          </div>
        </div>
      </div>

      {/* Recommended Carriers */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Recommended Carriers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARRIERS.map(c => (
            <div key={c.name} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-slate-900">{c.name}</h3>
                <span className="text-xs bg-slate-50 text-slate-500 px-2 py-0.5 rounded">{c.specialty}</span>
              </div>
              <p className="text-xs text-slate-500">{c.note}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-4">
          These are informational recommendations, not endorsements. Always compare quotes and read policy details carefully.
        </p>
      </div>
    </DashboardLayout>
  );
}
