'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { UserProfile } from '@/lib/types';

// Empty default profile — users fill in via onboarding
const DEFAULT_PROFILE: UserProfile = {
  name: '',
  birthYear: 1998,
  maritalStatus: 'single',
  dependents: 0,
  medicalSchool: '',
  program: '',
  specialty: 'Anesthesiology',
  pgyLevel: 1,
  categorical: true,
  fellowshipInterest: '',
  totalDebt: 200000,
  federalDirect: 120000,
  gradPlus: 80000,
  privateLoan: 0,
  avgInterestRate: 0.075,
  loanServicer: 'MOHELA',
  loanStatus: 'In Grace Period',
  consolidated: false,
  filingStatus: 'single',
  spouseIncome: 0,
  savings: 0,
  creditScore: '690-719',
  retirementBalance: 0,
  otherDebts: 0,
  housingSituation: 'looking',
  rentBudget: 1500,
  hasCar: false,
  carPayment: 0,
  multiSite: false,
  hasDisability: 'no',
  hasLife: 'no',
  healthPlan: '',
  careerVision: 'undecided',
  geoPreference: 'flexible',
  topConcerns: [],
  financialStyle: 'balanced',
  riskTolerance: 'moderate',
  onboardingStep: 0,
};

interface UserProfileContextType {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetProfile: () => void;
  isLoaded: boolean;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

const STORAGE_KEY = 'medfin-user-profile';

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfileState({ ...DEFAULT_PROFILE, ...parsed });
      }
    } catch {
      // Ignore parse errors
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      } catch {
        // Ignore storage errors
      }
    }
  }, [profile, isLoaded]);

  const setProfile = useCallback((p: UserProfile) => {
    setProfileState(p);
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfileState(prev => ({ ...prev, ...updates }));
  }, []);

  const resetProfile = useCallback(() => {
    setProfileState(DEFAULT_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <UserProfileContext.Provider value={{ profile, setProfile, updateProfile, resetProfile, isLoaded }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile(): UserProfileContextType {
  const ctx = useContext(UserProfileContext);
  if (!ctx) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return ctx;
}

export { DEFAULT_PROFILE };
