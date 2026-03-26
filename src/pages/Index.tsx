import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import HomeView from "@/views/HomeView";
import WorkoutsView from "@/views/WorkoutsView";
import NutritionView from "@/views/NutritionView";
import PremiumAIView from "@/views/PremiumAIView";
import ProfileView from "@/views/ProfileView";

type Tab = "home" | "workouts" | "nutrition" | "premium" | "profile";

const views: Record<Tab, React.FC> = {
  home: HomeView,
  workouts: WorkoutsView,
  nutrition: NutritionView,
  premium: PremiumAIView,
  profile: ProfileView,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const ActiveView = views[activeTab];

  return (
    <div className="min-h-screen bg-background">
      <ActiveView />
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
};

export default Index;
