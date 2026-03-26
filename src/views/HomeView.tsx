import { useState } from "react";
import { Activity, Sparkles, Loader2, Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WorkoutCard from "@/components/WorkoutCard";
import { defaultWorkout, modifications, promptToModKey, type Workout } from "@/data/workoutData";
import challengeImg from "@/assets/workout-challenge.jpg";
import yogaImg from "@/assets/workout-yoga.jpg";
import coreImg from "@/assets/workout-core.jpg";
import cardioImg from "@/assets/workout-cardio.jpg";
import mobilityImg from "@/assets/workout-mobility.jpg";
import legsImg from "@/assets/workout-legs.jpg";
import metconImg from "@/assets/workout-dumbbell-metcon.jpg";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const today = 2;

const quickPrompts = [
  "I slept poorly",
  "Only have 20 mins",
  "Hotel gym (Dumbbells only)",
];

const HomeView = () => {
  const { toast } = useToast();
  const [adapted, setAdapted] = useState(false);
  const [showModify, setShowModify] = useState(false);
  const [adapting, setAdapting] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const recommendedWorkouts = [
    { image: yogaImg, title: "Yoga for Runners", subtitle: "20 min · Flexibility" },
    { image: coreImg, title: "Quick Core", subtitle: "10 min · Abs" },
    { image: cardioImg, title: "HIIT Cardio", subtitle: "15 min · Endurance" },
    { image: mobilityImg, title: "Recovery Flow", subtitle: "15 min · Mobility" },
  ];

  const handleAdapt = (prompt: string) => {
    setAdapting(true);
    setTimeout(() => {
      setAdapting(false);
      setShowModify(false);
      setAdapted(true);
      toast({
        title: "Workout Adapted ✓",
        description: `Workout adapted for Dumbbells. Progress saved.`,
      });
    }, 2000);
  };

  const workoutTitle = adapted ? "30-Min Dumbbell Metcon" : "45-Min Heavy Lower Body";
  const workoutImg = adapted ? metconImg : legsImg;
  const workoutIntensity = adapted ? "Medium" : "High";
  const workoutEquipment = adapted ? "Dumbbells" : "Barbell & Plates";

  return (
    <div className="px-5 pt-14 pb-24 max-w-lg mx-auto">
      {/* Header */}
      <h1 className="text-nike-header text-2xl mb-5">GOOD MORNING, ROHAN</h1>

      {/* Calendar Strip */}
      <div className="flex justify-between mb-3">
        {days.map((d, i) => (
          <div key={d} className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{d}</span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                i === today
                  ? "bg-foreground text-background"
                  : i < today
                  ? "bg-nike-volt/20 text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {17 + i}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Hypertrophy Block
          </span>
          <span className="text-[10px] font-bold text-muted-foreground">Week 4 of 12</span>
        </div>
        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-nike-volt rounded-full transition-all duration-500"
            style={{ width: "35%" }}
          />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1 font-semibold">35% Complete</p>
      </div>

      {/* Today's Scheduled Workout Card */}
      <div className="relative rounded-2xl overflow-hidden mb-2">
        <img
          src={workoutImg}
          alt={workoutTitle}
          className="w-full aspect-[16/9] object-cover transition-all duration-500"
          width={800}
          height={512}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-primary-foreground/60 text-xs font-semibold uppercase tracking-widest mb-1">
            Today's Workout
          </p>
          <h2 className="text-primary-foreground font-black text-lg uppercase tracking-tight leading-tight">
            {workoutTitle}
          </h2>
          <div className="flex gap-4 mt-2 mb-3">
            <span className="text-primary-foreground/70 text-xs font-semibold">
              Intensity: {workoutIntensity}
            </span>
            <span className="text-primary-foreground/70 text-xs font-semibold">
              Equipment: {workoutEquipment}
            </span>
          </div>
          <button
            className="btn-volt text-xs"
            onClick={() => toast({ title: "WORKOUT STARTED", description: "Let's crush it! 💪" })}
          >
            Start Workout
          </button>
        </div>
      </div>

      {/* Modify Plan Button */}
      <button
        onClick={() => { setShowModify(true); setAdapting(false); }}
        className="w-full flex items-center justify-center gap-2 border border-border rounded-2xl py-3 mb-6 active:scale-[0.98] transition-transform"
      >
        <Sparkles size={16} className="text-nike-volt" />
        <span className="text-xs font-black uppercase tracking-wider">Modify Today's Plan</span>
      </button>

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

      {/* Modify Plan Bottom Sheet */}
      {showModify && (
        <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-background w-full max-w-lg rounded-t-3xl p-6 pb-8 animate-in slide-in-from-bottom duration-300">
            {adapting ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="bg-primary rounded-full p-6">
                  <Loader2 size={32} className="text-nike-volt animate-spin" />
                </div>
                <p className="text-sm font-bold text-center">Scanning alternative exercises...</p>
                <p className="text-xs text-muted-foreground text-center">Rebuilding circuit for hotel equipment...</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-nike-header text-lg">MODIFY PLAN</h2>
                  <button onClick={() => setShowModify(false)} className="p-1">
                    <X size={24} />
                  </button>
                </div>

                <p className="text-sm text-muted-foreground mb-5">
                  Life happens. How should we adjust today's session?
                </p>

                {/* Quick Prompts */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {quickPrompts.map((p) => (
                    <button
                      key={p}
                      onClick={() => handleAdapt(p)}
                      className="chip-filter active:scale-95 transition-transform"
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {/* Custom Input */}
                <div className="flex gap-2">
                  <input
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Or type your constraint..."
                    className="flex-1 border border-border rounded-full px-4 py-3 text-sm bg-secondary focus:outline-none focus:ring-2 focus:ring-foreground"
                    onKeyDown={(e) => e.key === "Enter" && customInput && handleAdapt(customInput)}
                  />
                  <button
                    onClick={() => customInput && handleAdapt(customInput)}
                    className="bg-foreground text-background rounded-full p-3"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;
