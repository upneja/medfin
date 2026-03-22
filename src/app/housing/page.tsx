'use client';

import { Home, MapPin, Clock, DollarSign, CheckCircle2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useUserProfile } from '@/hooks/useUserProfile';
import { formatCurrency, cn } from '@/lib/utils';

interface Neighborhood {
  id: string;
  name: string;
  borough: string;
  medianRent: number;
  transitBrooklyn: number;
  transitManhattan: number;
  highlights: string[];
  recommended: boolean;
}

const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: 'sunset-park',
    name: 'Sunset Park',
    borough: 'Brooklyn',
    medianRent: 1650,
    transitBrooklyn: 15,
    transitManhattan: 40,
    highlights: ['Affordable rents', 'Great food scene', 'Close to Methodist campus', 'D/N/R trains'],
    recommended: true,
  },
  {
    id: 'bay-ridge',
    name: 'Bay Ridge',
    borough: 'Brooklyn',
    medianRent: 1550,
    transitBrooklyn: 25,
    transitManhattan: 55,
    highlights: ['Quieter neighborhood', 'Waterfront access', 'Family-friendly', 'R train'],
    recommended: false,
  },
  {
    id: 'kips-bay',
    name: 'Kips Bay',
    borough: 'Manhattan',
    medianRent: 2800,
    transitBrooklyn: 35,
    transitManhattan: 10,
    highlights: ['Close to Manhattan hospitals', 'NYU area', 'Lots of dining', '6 train'],
    recommended: false,
  },
  {
    id: 'east-village',
    name: 'East Village',
    borough: 'Manhattan',
    medianRent: 3100,
    transitBrooklyn: 40,
    transitManhattan: 15,
    highlights: ['Vibrant nightlife', 'Walkable', 'Cultural hub', 'L/F/M trains'],
    recommended: false,
  },
  {
    id: 'park-slope',
    name: 'Park Slope',
    borough: 'Brooklyn',
    medianRent: 2400,
    transitBrooklyn: 12,
    transitManhattan: 30,
    highlights: ['Beautiful brownstones', 'Prospect Park', 'Great restaurants', 'F/G/R trains'],
    recommended: false,
  },
];

function getRentToIncomeRatio(rent: number, salary: number = 75000): number {
  return rent / (salary / 12);
}

function getRatioColor(ratio: number): string {
  if (ratio <= 0.25) return 'text-accent-emerald';
  if (ratio <= 0.30) return 'text-accent-amber';
  return 'text-accent-red';
}

function getRatioLabel(ratio: number): string {
  if (ratio <= 0.25) return 'Affordable';
  if (ratio <= 0.30) return 'Stretching';
  return 'Too expensive';
}

export default function HousingPage() {
  const { profile } = useUserProfile();
  const salary = 75000;
  const recommended = NEIGHBORHOODS.find(n => n.recommended)!;
  const kipsBay = NEIGHBORHOODS.find(n => n.id === 'kips-bay')!;
  const annualSavings = (kipsBay.medianRent - recommended.medianRent) * 12;

  const chartData = NEIGHBORHOODS.map(n => ({
    name: n.name,
    cost: n.medianRent * 12,
    recommended: n.recommended,
  }));

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">Housing Comparison</h1>
        <p className="text-muted mt-1">
          Find the right neighborhood for your budget and commute.
        </p>
      </div>

      {/* Savings callout */}
      <div className="bg-accent-emerald/5 border border-accent-emerald/20 rounded-xl p-5 mb-8 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-accent-emerald flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-accent-emerald">
            Living in {recommended.name} saves you {formatCurrency(annualSavings)}/year vs Kips Bay
          </p>
          <p className="text-xs text-muted mt-1">
            Plus a shorter commute to your primary training site at Brooklyn Methodist.
          </p>
        </div>
      </div>

      {/* Neighborhood Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {NEIGHBORHOODS.map(n => {
          const ratio = getRentToIncomeRatio(n.medianRent, salary);
          const ratioColor = getRatioColor(ratio);
          const ratioLabel = getRatioLabel(ratio);
          const ratioPercent = Math.min(ratio * 100, 100);

          return (
            <div
              key={n.id}
              className={cn(
                'bg-white border rounded-xl p-5 relative',
                n.recommended ? 'border-accent-emerald border-2' : 'border-card-border'
              )}
            >
              {n.recommended && (
                <div className="absolute -top-3 left-4 bg-accent-emerald text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Recommended
                </div>
              )}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-primary">{n.name}</h3>
                  <p className="text-xs text-muted">{n.borough}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold font-mono text-primary">{formatCurrency(n.medianRent)}</p>
                  <p className="text-xs text-muted">median 1BR</p>
                </div>
              </div>

              {/* Transit times */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-3.5 h-3.5 text-muted-light" />
                  <span className="text-muted">Brooklyn campus</span>
                  <span className="ml-auto font-medium">{n.transitBrooklyn} min</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-3.5 h-3.5 text-muted-light" />
                  <span className="text-muted">Manhattan campus</span>
                  <span className="ml-auto font-medium">{n.transitManhattan} min</span>
                </div>
              </div>

              {/* Rent to income gauge */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted">Rent-to-Income</span>
                  <span className={cn('text-xs font-semibold', ratioColor)}>
                    {Math.round(ratio * 100)}% — {ratioLabel}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all',
                      ratio <= 0.25 ? 'bg-accent-emerald' : ratio <= 0.30 ? 'bg-accent-amber' : 'bg-accent-red'
                    )}
                    style={{ width: `${ratioPercent}%` }}
                  />
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-1.5">
                {n.highlights.map(h => (
                  <span key={h} className="text-xs bg-card text-muted px-2 py-0.5 rounded">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Annual cost chart */}
      <div className="bg-white border border-card-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Annual Rent Comparison</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <XAxis
                type="number"
                tick={{ fontSize: 11 }}
                stroke="#94a3b8"
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
              />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" width={100} />
              <Tooltip formatter={(val) => formatCurrency(Number(val))} />
              <Bar dataKey="cost" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.recommended ? '#059669' : '#2563eb'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
