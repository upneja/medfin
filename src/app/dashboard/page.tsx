'use client';

import Link from 'next/link';
import {
  DollarSign,
  Landmark,
  PieChart,
  ListChecks,
  TrendingUp,
  CalendarClock,
  Wallet,
  Home,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RPieChart,
  Pie,
  Cell,
} from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useUserProfile } from '@/hooks/useUserProfile';
import { formatCurrency, formatPercent } from '@/lib/utils';

// Inline fallbacks for calculations that may not be ready yet
function fallbackTaxes(salary: number) {
  const federal = salary * 0.12;
  const state = salary * 0.065;
  const city = salary * 0.035;
  const fica = salary * 0.0765;
  const totalTax = federal + state + city + fica;
  return {
    federal,
    state,
    city,
    fica,
    totalTax,
    effectiveRate: totalTax / salary,
    monthlyTakeHome: (salary - totalTax) / 12,
  };
}

function fallbackNetWorth(totalDebt: number, salary: number) {
  const years = [];
  for (let i = 0; i <= 10; i++) {
    const isResident = i < 4;
    const income = isResident ? salary : salary * 5;
    const savings = isResident ? income * 0.05 : income * 0.2;
    const loanBalance = Math.max(0, totalDebt - i * 20000);
    years.push({
      year: i,
      label: i < 4 ? `PGY-${i + 1}` : `Year ${i - 3}`,
      netWorth: (i * savings) - loanBalance,
    });
  }
  return years;
}

const QUICK_LINKS = [
  { href: '/loans', label: 'Loans', icon: Landmark },
  { href: '/budget', label: 'Budget', icon: Wallet },
  { href: '/housing', label: 'Housing', icon: Home },
  { href: '/timeline', label: 'Timeline', icon: CalendarClock },
  { href: '/insurance', label: 'Insurance', icon: ShieldCheck },
  { href: '/career', label: 'Career', icon: TrendingUp },
];

export default function DashboardPage() {
  const { profile } = useUserProfile();
  const salary = 75000; // PGY-1 default
  const taxes = fallbackTaxes(salary);
  const netWorthData = fallbackNetWorth(profile.totalDebt, salary);

  const monthlyIncome = taxes.monthlyTakeHome;
  const loanPayment = Math.round((profile.totalDebt * 0.10) / 12); // ~10% of AGI / 12 for IDR estimate
  const estimatedRent = profile.rentBudget || 1800;
  const otherExpenses = 1200;
  const totalExpenses = loanPayment + estimatedRent + otherExpenses;
  const surplus = monthlyIncome - totalExpenses;

  const budgetData = [
    { name: 'Rent', value: estimatedRent, color: '#2563eb' },
    { name: 'Loan Payment', value: loanPayment, color: '#059669' },
    { name: 'Other', value: otherExpenses, color: '#d97706' },
    { name: 'Surplus', value: Math.max(0, surplus), color: '#e2e8f0' },
  ];

  const actionItems = [
    { text: 'Submit PSLF Employment Certification Form', done: false },
    { text: 'Get own-occupation disability insurance quotes', done: false },
    { text: 'Set up IDR plan with MOHELA', done: false },
  ];

  const milestones = [
    { title: 'Submit PSLF ECF', timeframe: 'July 2026', category: 'financial' as const },
    { title: 'Complete ITE Exam', timeframe: 'February 2027', category: 'exam' as const },
    { title: 'Open Roth IRA', timeframe: 'Before Tax Day 2027', category: 'financial' as const },
  ];

  const categoryColors = { financial: 'text-emerald-600', exam: 'text-amber-600', clinical: 'text-blue-600', career: 'text-blue-600', administrative: 'text-slate-500' };

  return (
    <DashboardLayout>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Welcome, {profile.name}!
        </h1>
        <p className="text-slate-500 mt-1">
          Here&apos;s your financial snapshot. {profile.specialty} residency at {profile.program}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Income Card */}
        <Card title="Monthly Income" icon={DollarSign}>
          <div className="space-y-3">
            <Row label="Gross Salary" value={formatCurrency(salary / 12)} />
            <Row label="Federal Tax" value={`-${formatCurrency(taxes.federal / 12)}`} muted />
            <Row label="State + City" value={`-${formatCurrency((taxes.state + taxes.city) / 12)}`} muted />
            <Row label="FICA" value={`-${formatCurrency(taxes.fica / 12)}`} muted />
            <div className="border-t border-slate-200 pt-3">
              <Row label="Take-Home Pay" value={formatCurrency(taxes.monthlyTakeHome)} bold />
            </div>
            <p className="text-xs text-slate-500">
              Effective tax rate: {formatPercent(taxes.effectiveRate)}
            </p>
          </div>
        </Card>

        {/* Loan Strategy Card */}
        <Card title="Loan Strategy" icon={Landmark} href="/loans">
          <div className="space-y-3">
            <Row label="Total Debt" value={formatCurrency(profile.totalDebt)} />
            <Row label="Est. IDR Payment" value={`${formatCurrency(loanPayment)}/mo`} />
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-sm font-medium text-emerald-600">PSLF Recommended</p>
              <p className="text-xs text-slate-500 mt-1">
                Your employer qualifies. Estimated forgiveness: {formatCurrency(profile.totalDebt * 0.6)} after 10 years.
              </p>
            </div>
          </div>
        </Card>

        {/* Budget Overview Card */}
        <Card title="Budget Overview" icon={PieChart} href="/budget">
          <div className="h-40 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <RPieChart>
                <Pie
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  dataKey="value"
                  stroke="none"
                >
                  {budgetData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => formatCurrency(Number(val))} />
              </RPieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {budgetData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}
              </div>
            ))}
          </div>
        </Card>

        {/* Next Actions */}
        <Card title="Next Actions" icon={ListChecks}>
          <div className="space-y-3">
            {actionItems.map((item, i) => (
              <label key={i} className="flex items-start gap-3 cursor-pointer group">
                {item.done ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-200 group-hover:text-blue-600 flex-shrink-0 mt-0.5 transition-colors" />
                )}
                <span className="text-sm text-slate-900">{item.text}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Net Worth Projection */}
        <Card title="Net Worth Projection" icon={TrendingUp} href="/career" className="lg:col-span-2">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={netWorthData}>
                <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="#94a3b8"
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip formatter={(val) => formatCurrency(Number(val))} />
                <Line
                  type="monotone"
                  dataKey="netWorth"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Timeline Preview */}
        <Card title="Upcoming Milestones" icon={CalendarClock} href="/timeline">
          <div className="space-y-4">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  m.category === 'financial' ? 'bg-emerald-600' : 'bg-amber-600'
                }`} />
                <div>
                  <p className="text-sm font-medium text-slate-900">{m.title}</p>
                  <p className="text-xs text-slate-500">{m.timeframe}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md hover:border-blue-300 transition-all text-center"
            >
              <link.icon className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-slate-900">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

// ---------------------------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------------------------

function Card({
  title,
  icon: Icon,
  href,
  children,
  className,
}: {
  title: string;
  icon: React.ElementType;
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const inner = (
    <div className={`bg-white border border-slate-200 rounded-2xl p-6 h-full shadow-sm ${className || ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        </div>
        {href && <ArrowRight className="w-4 h-4 text-slate-400" />}
      </div>
      {children}
    </div>
  );

  if (href) {
    return <Link href={href} className="block hover:shadow-md transition-shadow rounded-2xl">{inner}</Link>;
  }
  return inner;
}

function Row({ label, value, muted, bold }: { label: string; value: string; muted?: boolean; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${muted ? 'text-slate-500' : 'text-slate-900'} ${bold ? 'font-semibold' : ''}`}>{label}</span>
      <span className={`text-sm font-mono ${muted ? 'text-slate-500' : 'text-slate-900'} ${bold ? 'font-semibold' : ''}`}>{value}</span>
    </div>
  );
}
