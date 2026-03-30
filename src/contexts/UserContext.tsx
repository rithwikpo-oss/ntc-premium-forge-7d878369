import { createContext, useContext, useState, type ReactNode } from "react";

export interface UserProfile {
  age: string;
  weight: string;
  height: string;
  gender: string;
  goal: string;
  dailyTime: number;
  cuisine: string;
  onboarded: boolean;
  currentWeek: number;
  totalWeeks: number;
}

const defaultProfile: UserProfile = {
  age: "",
  weight: "",
  height: "",
  gender: "",
  goal: "Hypertrophy",
  dailyTime: 45,
  cuisine: "Standard",
  onboarded: false,
  currentWeek: 4,
  totalWeeks: 12,
};

interface UserContextValue {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  resetProgram: (updates: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be inside UserProvider");
  return ctx;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const resetProgram = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates, currentWeek: 1 }));
  };

  return (
    <UserContext.Provider value={{ profile, setProfile, resetProgram }}>
      {children}
    </UserContext.Provider>
  );
};
