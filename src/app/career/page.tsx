'use client';

import { useState } from 'react';
import { TrendingUp, GraduationCap, DollarSign, Calculator } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useUserProfile } from '@/hooks/useUserProfile';
import { formatCurrency, cn } from '@/lib/utils';

const SALARY_DATA = [
  { setting: 'Academic', low: 300000, median: 370000, high: 450000 },
  { setting: 'Hospital Employed', low: 350000, median: 420000, high: 500000 },
  { setting: 'Private Practice', low: 380000, median: 460000, high: 600000 },
];

const FELLOWSHIP_DATA = [
  { name: 'Critical Care', years: 1, salaryImpact: 15, medianSalary: 430000, description: 'ICU medicine. High demand, significant salary bump.' },
  { name: 'Pain Medicine', years: 1, salaryImpact: 20, medianSalary: 480000, description: 'Interventional and non-interventional pain management.' },
  { name: 'Cardiac Anesthesia', years: 1, salaryImpact: 12, medianSalary: 440000, description: 'Cardiac surgery and procedural anesthesia.' },
  { name: 'Regional Anesthesia', years: 1, salaryImpact: 8, medianSalary: 400000, description: 'Nerve blocks and regional techniques.' },
  { name: 'Pediatric Anesthesia', years: 1, salaryImpact: 5, medianSalary: 380000, description: 'Subspecialty with lifestyle benefits.' },
];

function buildNetWorthProjection(totalDebt: number, scenario: string) {
  const data = [];
  const baseSalary = 75000;
  const attendingSalaries: Record<string, number> = {
    academic: 370000,
    private: 460000,
    frugal: 460000,
  };
  const attendingSalary = attendingSalaries[scenario] || 370000;

  for (let year = 0; year <= 30; year++) {
    const isResident = year < 4;
    const salary = isResident ? baseSalary : attendingSalary;
    const spending = scenario === 'frugal' && !isResident ? 75000 : (isResident ? salary * 0.9 : salary * 0.6);
    const annualSavings = salary - spending - (isResident ? 0 : salary * 0.3); // rough taxes
    const loanPayoff = isResident ? 0 : (year < 14 ? totalDebt / 10 : 0);
    const loanBalance = Math.max(0, totalDebt - (isResident ? 0 : (year - 3) * totalDebt / 10));
    const retirementGrowth = 0.07;

    let netWorth = -totalDebt;
    // Simple accumulation model
    if (isResident) {
      netWorth = -totalDebt + (year * 3000); // small savings
    } else {
      const attendingYears = year - 4;
      const annualInvest = scenario === 'frugal' ? (attendingSalary - 75000 - attendingSalary * 0.3) : (attendingSalary * 0.2);
      let accumulated = 0;
      for (let y = 0; y < attendingYears; y++) {
        accumulated = (accumulated + annualInvest) * (1 + retirementGrowth);
      }
      const remainingLoan = Math.max(0, totalDebt - attendingYears * (totalDebt / 10));
      netWorth = accumulated - remainingLoan;
    }

    data.push({
      year,
      label: year < 4 ? `PGY-${year + 1}` : `Year ${year - 3}`,
      netWorth: Math.round(netWorth),
    });
  }
  return data;
}

export default function CareerPage() {
  const { profile } = useUserProfile();
  const [projectionView, setProjectionView] = useState<'10' | '20' | '30'>('20');

  const academicProjection = buildNetWorthProjection(profile.totalDebt, 'academic');
  const privateProjection = buildNetWorthProjection(profile.totalDebt, 'private');
  const frugalProjection = buildNetWorthProjection(profile.totalDebt, 'frugal');

  const yearLimit = Number(projectionView) + 4; // +4 for residency years
  const combinedData = academicProjection.slice(0, yearLimit + 1).map((d, i) => ({
    ...d,
    academic: d.netWorth,
    private: privateProjection[i]?.netWorth || 0,
    frugal: frugalProjection[i]?.netWorth || 0,
  }));

  // "Live like a resident" calculation
  const attendingSalary = 460000;
  const taxRate = 0.35;
  const afterTax = attendingSalary * (1 - taxRate);
  const livingCost = 75000;
  const annualSurplus = afterTax - livingCost;
  const yearsToPayoff = Math.ceil(profile.totalDebt / annualSurplus);

  const salaryChartData = SALARY_DATA.map(s => ({
    name: s.setting,
    low: s.low,
    range: s.high - s.low,
    median: s.median,
  }));

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Career Projections</h1>
        <p className="text-slate-500 mt-1">
          Salary ranges, fellowship ROI, and long-term net worth forecasts.
        </p>
      </div>

      {/* Salary Range Chart */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-1">
          Anesthesiology Salary by Practice Setting
        </h2>
        <p className="text-sm text-slate-500 mb-4">Range from 25th to 75th percentile. Marker shows median.</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salaryChartData} layout="vertical">
              <XAxis
                type="number"
                tick={{ fontSize: 11 }}
                stroke="#94a3b8"
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
              />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" width={130} />
              <Tooltip
                formatter={(val, name) => {
                  const v = Number(val);
                  if (name === 'low') return [formatCurrency(v), '25th percentile'];
                  return [formatCurrency(v), 'Range'];
                }}
              />
              <Bar dataKey="low" stackId="a" fill="transparent" />
              <Bar dataKey="range" stackId="a" fill="#2563eb" radius={[0, 4, 4, 0]} opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-6 mt-2 justify-center">
          {SALARY_DATA.map(s => (
            <div key={s.setting} className="text-center">
              <p className="text-xs text-slate-500">{s.setting} median</p>
              <p className="text-sm font-semibold font-mono">{formatCurrency(s.median)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fellowship ROI */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-slate-900">Fellowship ROI Comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 text-xs font-semibold text-slate-500 uppercase">Fellowship</th>
                <th className="text-left py-2 pr-4 text-xs font-semibold text-slate-500 uppercase">Add&apos;l Years</th>
                <th className="text-left py-2 pr-4 text-xs font-semibold text-slate-500 uppercase">Salary Impact</th>
                <th className="text-left py-2 pr-4 text-xs font-semibold text-slate-500 uppercase">Median Salary</th>
                <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody>
              {FELLOWSHIP_DATA.map(f => (
                <tr key={f.name} className="border-b border-slate-200 last:border-0">
                  <td className="py-3 pr-4 font-medium text-slate-900">{f.name}</td>
                  <td className="py-3 pr-4 text-slate-500">+{f.years} year{f.years > 1 ? 's' : ''}</td>
                  <td className="py-3 pr-4">
                    <span className="text-emerald-600 font-semibold">+{f.salaryImpact}%</span>
                  </td>
                  <td className="py-3 pr-4 font-mono">{formatCurrency(f.medianSalary)}</td>
                  <td className="py-3 text-slate-500">{f.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Net Worth Projection */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900">Net Worth Projection</h2>
          </div>
          <div className="flex gap-1">
            {(['10', '20', '30'] as const).map(v => (
              <button
                key={v}
                onClick={() => setProjectionView(v)}
                className={cn(
                  'px-3 py-1 text-xs font-medium rounded-lg border transition-colors',
                  projectionView === v
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300'
                )}
              >
                {v} Years
              </button>
            ))}
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedData}>
              <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke="#94a3b8" interval="preserveStartEnd" />
              <YAxis
                tick={{ fontSize: 11 }}
                stroke="#94a3b8"
                tickFormatter={(v: number) => {
                  if (Math.abs(v) >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
                  return `$${(v / 1000).toFixed(0)}k`;
                }}
              />
              <Tooltip formatter={(val) => formatCurrency(Number(val))} />
              <Legend />
              <Line type="monotone" dataKey="academic" name="Academic" stroke="#2563eb" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="private" name="Private Practice" stroke="#059669" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="frugal" name="Live Like Resident" stroke="#d97706" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live Like a Resident Calculator */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-slate-900">&ldquo;Live Like a Resident&rdquo; Calculator</h2>
        </div>
        <p className="text-sm text-slate-500 mb-6">
          What if you kept your resident lifestyle on an attending salary?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-xs text-slate-500 mb-1">Attending Salary</p>
            <p className="text-xl font-bold font-mono text-slate-900">{formatCurrency(attendingSalary)}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-xs text-slate-500 mb-1">Living on</p>
            <p className="text-xl font-bold font-mono text-slate-900">{formatCurrency(livingCost)}/yr</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-xs text-slate-500 mb-1">Annual Surplus</p>
            <p className="text-xl font-bold font-mono text-emerald-600">{formatCurrency(annualSurplus)}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-xs text-slate-500 mb-1">Loans Paid Off In</p>
            <p className="text-xl font-bold font-mono text-blue-600">{yearsToPayoff} year{yearsToPayoff !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-4">
          By maintaining a {formatCurrency(livingCost)} lifestyle on a {formatCurrency(attendingSalary)} salary (after {Math.round(taxRate * 100)}% taxes),
          you could pay off {formatCurrency(profile.totalDebt)} in student loans in approximately {yearsToPayoff} year{yearsToPayoff !== 1 ? 's' : ''} and
          then rapidly build wealth.
        </p>
      </div>
    </DashboardLayout>
  );
}
