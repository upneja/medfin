// ---------------------------------------------------------------------------
// MedFin – NYC Neighborhood / Housing Data
// ---------------------------------------------------------------------------

import type { NeighborhoodData } from '../types';

/**
 * NYC neighborhoods relevant to NYU Langone Brooklyn and Manhattan campuses.
 * Rent estimates reflect early-2026 market conditions for standard apartments
 * (not luxury, not subsidized).
 */
export const NYC_NEIGHBORHOODS: NeighborhoodData[] = [
  // -------------------------------------------------------------------------
  // Brooklyn neighborhoods (near NYU Langone Brooklyn in Sunset Park)
  // -------------------------------------------------------------------------
  {
    id: 'sunset-park',
    name: 'Sunset Park',
    borough: 'Brooklyn',
    medianStudioRent: 1800,
    median1BRRent: 2200,
    transitTimes: [
      { destination: 'NYU Langone Brooklyn', minutes: 10, transitType: 'Walk / D/N/R', notes: 'Many residents walk; the hospital is in Sunset Park.' },
      { destination: 'Tisch/Kimmel (Manhattan)', minutes: 45, transitType: 'D/N/R to 34th St', notes: 'Express trains available from 36th St station.' },
      { destination: 'Bellevue (Manhattan)', minutes: 50, transitType: 'D/N/R + transfer', notes: 'Transfer at 34th St-Herald Sq to 6 train.' },
      { destination: 'VA Manhattan', minutes: 55, transitType: 'D/N/R + walk', notes: 'Walk from 23rd St station.' },
    ],
    walkabilityScore: 88,
    bikeabilityScore: 72,
    groceryAccess: 'Multiple options: Industry City food hall, Asian supermarkets on 8th Ave, Key Food, Trade Fair',
    safetyNotes: 'Generally safe; well-lit main avenues. Quieter residential blocks south of 50th St.',
    highlights: [
      'Most affordable option near the hospital',
      'Diverse food scene along 5th and 8th Aves',
      'Sunset Park itself has great Manhattan skyline views',
      'Growing arts/food scene at Industry City',
    ],
  },

  {
    id: 'bay-ridge',
    name: 'Bay Ridge',
    borough: 'Brooklyn',
    medianStudioRent: 1650,
    median1BRRent: 2000,
    transitTimes: [
      { destination: 'NYU Langone Brooklyn', minutes: 20, transitType: 'R train', notes: 'R train northbound from 86th St to 36th St.' },
      { destination: 'Tisch/Kimmel (Manhattan)', minutes: 60, transitType: 'R train', notes: 'Long ride but single seat; express bus X27/X37 is faster in AM.' },
      { destination: 'Bellevue (Manhattan)', minutes: 65, transitType: 'R + transfer', notes: 'R to N/Q at Atlantic, or express bus.' },
      { destination: 'VA Manhattan', minutes: 65, transitType: 'R + walk', notes: 'Similar to Bellevue route.' },
    ],
    walkabilityScore: 84,
    bikeabilityScore: 60,
    groceryAccess: 'Multiple supermarkets along 3rd and 5th Aves; Century 21, Aldi, Food Bazaar',
    safetyNotes: 'Very safe, family-oriented neighborhood. One of the lowest crime rates in Brooklyn.',
    highlights: [
      'Lowest rents on this list',
      'Quiet, residential feel with waterfront promenade',
      'Great Middle Eastern and Italian dining along 3rd Ave',
      'Longer commute to Manhattan campuses',
    ],
  },

  {
    id: 'park-slope',
    name: 'Park Slope',
    borough: 'Brooklyn',
    medianStudioRent: 2400,
    median1BRRent: 3000,
    transitTimes: [
      { destination: 'NYU Langone Brooklyn', minutes: 20, transitType: 'D/N/R from Atlantic-Barclays or 4th Ave', notes: 'Quick ride southbound on D/N/R.' },
      { destination: 'Tisch/Kimmel (Manhattan)', minutes: 30, transitType: 'D/N/R express', notes: 'Express to 34th St is fast.' },
      { destination: 'Bellevue (Manhattan)', minutes: 35, transitType: 'D/N/R + 6 train', notes: 'Transfer at 34th St.' },
      { destination: 'VA Manhattan', minutes: 35, transitType: 'F/G to 23rd St', notes: 'F train direct from 4th Ave-9th St.' },
    ],
    walkabilityScore: 95,
    bikeabilityScore: 82,
    groceryAccess: 'Whole Foods, Key Food, Park Slope Food Coop (membership), Trader Joe\'s nearby on Atlantic',
    safetyNotes: 'Very safe, affluent neighborhood. Well-lit streets, strong community presence.',
    highlights: [
      'Premium neighborhood with excellent walkability',
      'Prospect Park access for running and recreation',
      'Strong restaurant and bar scene on 5th and 7th Aves',
      'Higher rent but central to both campuses',
    ],
  },

  // -------------------------------------------------------------------------
  // Manhattan neighborhoods (near Tisch/Kimmel, Bellevue, VA)
  // -------------------------------------------------------------------------
  {
    id: 'kips-bay',
    name: 'Kips Bay',
    borough: 'Manhattan',
    medianStudioRent: 2600,
    median1BRRent: 3300,
    transitTimes: [
      { destination: 'NYU Langone Brooklyn', minutes: 45, transitType: '6 + N/R from 28th St', notes: 'Transfer to Brooklyn-bound N/R at 34th St.' },
      { destination: 'Tisch/Kimmel (Manhattan)', minutes: 10, transitType: 'Walk / 6 train', notes: 'Tisch Hospital is on 34th St and 1st Ave – walkable.' },
      { destination: 'Bellevue (Manhattan)', minutes: 5, transitType: 'Walk', notes: 'Bellevue is on 27th St and 1st Ave – very close.' },
      { destination: 'VA Manhattan', minutes: 10, transitType: 'Walk', notes: 'VA is on 23rd St – easy walk down 1st Ave.' },
    ],
    walkabilityScore: 94,
    bikeabilityScore: 78,
    groceryAccess: 'Trader Joe\'s on 32nd St, multiple delis, Fairway, Key Food',
    safetyNotes: 'Safe area near NYU medical campus. Well-patrolled, lots of foot traffic.',
    highlights: [
      'Walking distance to 3 of 4 rotation sites',
      'NYU medical campus neighborhood',
      'Higher rent but saves on commute time and transit costs',
      'Good restaurant options on 2nd and 3rd Aves',
    ],
  },

  {
    id: 'east-village',
    name: 'East Village',
    borough: 'Manhattan',
    medianStudioRent: 2500,
    median1BRRent: 3200,
    transitTimes: [
      { destination: 'NYU Langone Brooklyn', minutes: 40, transitType: 'L to Union Sq + N/R', notes: 'N/R southbound from Union Sq to 36th St Brooklyn.' },
      { destination: 'Tisch/Kimmel (Manhattan)', minutes: 15, transitType: '6 train or bike', notes: '6 train from Astor Place to 33rd St, or 15-min bike ride.' },
      { destination: 'Bellevue (Manhattan)', minutes: 10, transitType: 'Walk / Citi Bike', notes: 'Bellevue is a short walk east on 26th St.' },
      { destination: 'VA Manhattan', minutes: 10, transitType: 'Walk', notes: '23rd St and 1st Ave – walkable from most of EV.' },
    ],
    walkabilityScore: 97,
    bikeabilityScore: 85,
    groceryAccess: 'Trader Joe\'s on 14th St, Whole Foods Union Sq, multiple bodegas, Essex Market nearby',
    safetyNotes: 'Generally safe. Tompkins Square Park area can be livelier at night. Alphabet City improving.',
    highlights: [
      'Vibrant nightlife and dining (best food scene in NYC)',
      'Close to Manhattan rotation sites',
      'Great biking infrastructure along 1st/2nd Ave protected lanes',
      'Young professional/student demographic',
    ],
  },

  // -------------------------------------------------------------------------
  // NJ option for comparison
  // -------------------------------------------------------------------------
  {
    id: 'jersey-city-heights',
    name: 'Jersey City Heights',
    borough: 'NJ (Hudson County)',
    medianStudioRent: 1700,
    median1BRRent: 2100,
    transitTimes: [
      { destination: 'NYU Langone Brooklyn', minutes: 70, transitType: 'Bus/Light Rail + PATH + subway', notes: 'Not practical for daily Brooklyn commute.' },
      { destination: 'Tisch/Kimmel (Manhattan)', minutes: 45, transitType: 'Light Rail to Hoboken + PATH to 33rd St', notes: 'PATH runs 24/7; 33rd St station is near Tisch.' },
      { destination: 'Bellevue (Manhattan)', minutes: 50, transitType: 'PATH + walk/bus', notes: 'PATH to 23rd St station, then walk east.' },
      { destination: 'VA Manhattan', minutes: 45, transitType: 'PATH to 23rd St', notes: 'PATH direct to 23rd St.' },
    ],
    walkabilityScore: 72,
    bikeabilityScore: 55,
    groceryAccess: 'ShopRite, Aldi, various bodegas; less walkable than NYC neighborhoods',
    safetyNotes: 'Varies by block. Central Ave corridor is busy and well-lit. Residential streets are quiet.',
    highlights: [
      'NJ income tax is lower than NYC income tax',
      'Lower rent than Manhattan',
      'No NYC city tax (saves ~3.5% of income)',
      'Longer commute, especially to Brooklyn campus',
      'Need to factor in PATH fare ($2.75) vs MetroCard',
    ],
  },
];

/**
 * Look up a neighborhood by ID.
 */
export function getNeighborhoodById(id: string): NeighborhoodData | undefined {
  return NYC_NEIGHBORHOODS.find((n) => n.id === id);
}

/**
 * Get all neighborhoods in a given borough.
 */
export function getNeighborhoodsByBorough(borough: string): NeighborhoodData[] {
  return NYC_NEIGHBORHOODS.filter((n) => n.borough === borough);
}
