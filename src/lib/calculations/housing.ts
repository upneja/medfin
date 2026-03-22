// ---------------------------------------------------------------------------
// MedFin – Housing Affordability Calculator
// ---------------------------------------------------------------------------

import type { NeighborhoodData, HousingAnalysis } from '../types';
import { calculateTaxes } from './taxes';

/**
 * Analyze housing affordability across multiple neighborhoods.
 *
 * Calculates:
 * - Rent-to-income ratio (using take-home pay)
 * - Total annual housing cost (rent + utilities)
 * - Total annual transport cost (transit pass or car costs)
 * - Combined annual cost for comparison
 * - Affordability flag (rent < 30% of take-home)
 *
 * @param neighborhoods Array of neighborhoods to analyze
 * @param annualSalary Gross annual salary
 * @param hasCar Whether the resident has a car
 * @param apartmentType 'studio' | '1br' – determines which rent to use
 * @returns Array of HousingAnalysis objects, sorted by total annual cost
 */
export function analyzeHousing(
  neighborhoods: NeighborhoodData[],
  annualSalary: number,
  hasCar: boolean,
  apartmentType: 'studio' | '1br' = '1br',
): HousingAnalysis[] {
  const analyses: HousingAnalysis[] = [];

  for (const hood of neighborhoods) {
    const isNJ = hood.borough.includes('NJ');
    const state = isNJ ? 'NJ' : 'NY';
    const city = isNJ ? '' : 'NYC';

    // Calculate take-home for this location
    const taxes = calculateTaxes({
      grossIncome: annualSalary,
      state,
      city,
      filingStatus: 'single',
      dependents: 0,
      retirementContributions: 0,
    });

    const monthlyTakeHome = taxes.monthlyTakeHome;
    const monthlyRent = apartmentType === 'studio' ? hood.medianStudioRent : hood.median1BRRent;
    const rentToIncome = monthlyTakeHome > 0 ? monthlyRent / monthlyTakeHome : 1;

    // Annual housing costs
    const annualRent = monthlyRent * 12;
    const annualUtilities = isNJ ? 1800 : 1440; // NJ utilities tend higher
    const annualRentersInsurance = 180;
    const annualHousingCost = annualRent + annualUtilities + annualRentersInsurance;

    // Annual transport costs
    let annualTransportCost: number;
    if (hasCar) {
      const insurance = isNJ ? 1800 : 2400; // NYC car insurance is very high
      const gas = isNJ ? 1800 : 2000;
      const parking = city === 'NYC' ? 3000 : isNJ ? 600 : 1200;
      const maintenance = 1000;
      annualTransportCost = insurance + gas + parking + maintenance;
    } else {
      if (city === 'NYC') {
        // Unlimited MetroCard + occasional rideshare
        annualTransportCost = 132 * 12 + 600; // $1,584 MetroCard + $600 Uber
      } else if (isNJ) {
        // PATH + NJ Transit + rideshare
        annualTransportCost = 2.75 * 2 * 250 + 800; // ~$2,175
      } else {
        annualTransportCost = 1500;
      }
    }

    const totalAnnualCost = annualHousingCost + annualTransportCost;
    const affordable = rentToIncome <= 0.30;

    // Generate notes
    const notes: string[] = [];

    if (rentToIncome > 0.40) {
      notes.push('Rent exceeds 40% of take-home pay. This is financially stressful – strongly consider a roommate or cheaper area.');
    } else if (rentToIncome > 0.30) {
      notes.push('Rent is above the 30% guideline. Manageable but leaves less room for savings and loan payments.');
    } else {
      notes.push('Rent is within the 30% affordability guideline.');
    }

    if (isNJ) {
      // Calculate tax savings from living in NJ vs NYC
      const nycTaxes = calculateTaxes({
        grossIncome: annualSalary,
        state: 'NY',
        city: 'NYC',
        filingStatus: 'single',
        dependents: 0,
        retirementContributions: 0,
      });

      const taxSavings = nycTaxes.totalTax - taxes.totalTax;
      if (taxSavings > 0) {
        notes.push(`Living in NJ saves ~$${Math.round(taxSavings).toLocaleString()}/year in taxes vs NYC (no city income tax).`);
      }
    }

    // Transit time notes
    const primarySite = hood.transitTimes.find(
      (t) => t.destination.includes('Brooklyn') || t.destination.includes('primary'),
    );
    if (primarySite && primarySite.minutes > 45) {
      notes.push(`Commute to primary site (${primarySite.destination}) is ${primarySite.minutes} min – consider proximity to your most frequent rotation.`);
    }

    analyses.push({
      neighborhoodId: hood.id,
      neighborhoodName: hood.name,
      monthlyRent,
      rentToIncomeRatio: Math.round(rentToIncome * 1000) / 1000,
      annualHousingCost,
      annualTransportCost,
      totalAnnualCost,
      affordable,
      notes,
    });
  }

  // Sort by total annual cost (ascending)
  return analyses.sort((a, b) => a.totalAnnualCost - b.totalAnnualCost);
}

/**
 * Compare NYC vs NJ living from a tax perspective.
 *
 * @returns Object with annual tax difference and monthly take-home difference
 */
export function compareNYCvsNJ(
  annualSalary: number,
  filingStatus: 'single' | 'married_jointly' | 'married_separately' | 'head_of_household' = 'single',
): {
  nycTotalTax: number;
  njTotalTax: number;
  annualTaxSavings: number;
  monthlyTakeHomeDifference: number;
  notes: string[];
} {
  const nycTaxes = calculateTaxes({
    grossIncome: annualSalary,
    state: 'NY',
    city: 'NYC',
    filingStatus,
    dependents: 0,
    retirementContributions: 0,
  });

  const njTaxes = calculateTaxes({
    grossIncome: annualSalary,
    state: 'NJ',
    city: '',
    filingStatus,
    dependents: 0,
    retirementContributions: 0,
  });

  const annualSavings = nycTaxes.totalTax - njTaxes.totalTax;
  const monthlyDiff = njTaxes.monthlyTakeHome - nycTaxes.monthlyTakeHome;

  const notes: string[] = [];

  if (annualSavings > 0) {
    notes.push(`Living in NJ saves $${annualSavings.toLocaleString()}/year in total taxes.`);
    notes.push(`That is $${monthlyDiff.toLocaleString()} more per month in take-home pay.`);
    notes.push('However, factor in longer commute time, PATH/NJ Transit costs, and NJ property tax if buying.');
  } else {
    notes.push('At this income level, NJ does not provide significant tax savings over NYC.');
  }

  // NYC city tax is the main driver
  notes.push(`NYC city income tax alone: ~$${nycTaxes.city.toLocaleString()}/year.`);

  return {
    nycTotalTax: nycTaxes.totalTax,
    njTotalTax: njTaxes.totalTax,
    annualTaxSavings: annualSavings,
    monthlyTakeHomeDifference: monthlyDiff,
    notes,
  };
}

/**
 * Calculate the maximum affordable rent based on salary and the 30% rule.
 *
 * @param annualSalary Gross annual salary
 * @param state State for tax calculation
 * @param city City for tax calculation
 * @param targetRatio Target rent-to-income ratio (default 0.30)
 * @returns Maximum monthly rent
 */
export function getMaxAffordableRent(
  annualSalary: number,
  state = 'NY',
  city = 'NYC',
  targetRatio = 0.30,
): number {
  const taxes = calculateTaxes({
    grossIncome: annualSalary,
    state,
    city,
    filingStatus: 'single',
    dependents: 0,
    retirementContributions: 0,
  });

  return Math.round(taxes.monthlyTakeHome * targetRatio);
}
