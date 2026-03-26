import { Activity, Sparkles } from "lucide-react";
import WorkoutCard from "@/components/WorkoutCard";
import challengeImg from "@/assets/workout-challenge.jpg";
import yogaImg from "@/assets/workout-yoga.jpg";
import coreImg from "@/assets/workout-core.jpg";
import cardioImg from "@/assets/workout-cardio.jpg";
import mobilityImg from "@/assets/workout-mobility.jpg";

const HomeView = () => {
  const recommendedWorkouts = [
    { image: yogaImg, title: "Yoga for Runners", subtitle: "20 min · Flexibility" },
    { image: coreImg, title: "Quick Core", subtitle: "10 min · Abs" },
    { image: cardioImg, title: "HIIT Cardio", subtitle: "15 min · Endurance" },
    { image: mobilityImg, title: "Recovery Flow", subtitle: "15 min · Mobility" },
  ];

  return (
    <div className="px-5 pt-14 pb-24 max-w-lg mx-auto">
      {/* Header */}
      <h1 className="text-nike-header text-2xl mb-6">GOOD MORNING, ROHAN</h1>

      {/* Current Program */}
      <div className="relative rounded-2xl overflow-hidden mb-5">
        <img src={challengeImg} alt="Ignite 14-Day Challenge" className="w-full aspect-[16/9] object-cover" width={800} height={512} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-primary-foreground/60 text-xs font-semibold uppercase tracking-widest mb-1">
            Current Program
          </p>
          <h2 className="text-primary-foreground font-black text-lg uppercase tracking-tight leading-tight">
            Ignite 14-Day Challenge: Day 3
          </h2>
          <button className="btn-volt mt-3 text-xs">Resume</button>
        </div>
      </div>

      {/* AI Readiness Card */}
      <div className="card-premium mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Activity size={18} className="text-nike-volt" />
          <span className="text-xs font-bold uppercase tracking-wider text-primary-foreground/60">
            Apple Health Sync Active
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-primary-foreground/50 text-[10px] uppercase tracking-wider font-semibold">Sleep</p>
            <p className="text-primary-foreground font-black text-lg">4h 20m</p>
            <span className="text-xs text-destructive font-semibold">Poor</span>
          </div>
          <div>
            <p className="text-primary-foreground/50 text-[10px] uppercase tracking-wider font-semibold">HRV</p>
            <p className="text-primary-foreground font-black text-lg">Low</p>
          </div>
        </div>
        <div className="border border-dashed border-primary-foreground/20 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <Sparkles size={16} className="text-nike-volt mt-0.5 flex-shrink-0" />
            <p className="text-primary-foreground/80 text-xs leading-relaxed">
              <span className="font-bold text-primary-foreground">AI Insight:</span> Your readiness is low today. We've automatically swapped your 45-min Heavy Squat session for a 15-min Recovery Mobility flow.
            </p>
          </div>
        </div>
      </div>

      {/* For You */}
      <h2 className="text-nike-header text-base mb-4">FOR YOU</h2>
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide">
        {recommendedWorkouts.map((w) => (
          <WorkoutCard key={w.title} image={w.image} title={w.title} subtitle={w.subtitle} />
        ))}
      </div>
    </div>
  );
};

export default HomeView;
