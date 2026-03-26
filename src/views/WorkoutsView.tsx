import { useState } from "react";
import { Sparkles, X, Clock, Dumbbell, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WorkoutCard from "@/components/WorkoutCard";
import heroImg from "@/assets/workout-hero.jpg";
import yogaImg from "@/assets/workout-yoga.jpg";
import coreImg from "@/assets/workout-core.jpg";
import upperImg from "@/assets/workout-upper.jpg";
import cardioImg from "@/assets/workout-cardio.jpg";
import legsImg from "@/assets/workout-legs.jpg";
import mobilityImg from "@/assets/workout-mobility.jpg";

const filters = ["Muscle Group", "Workout Type", "Equipment", "Trainer Led"];

const workouts = [
  { image: upperImg, title: "Upper Body Strength", subtitle: "30 min · High", time: "30 min", intensity: "High", exercises: ["Pushups", "Dumbbell Rows", "Shoulder Press", "Bicep Curls", "Tricep Dips"] },
  { image: coreImg, title: "Core Crusher", subtitle: "20 min · Medium", time: "20 min", intensity: "Medium", exercises: ["Plank", "Bicycle Crunches", "Leg Raises", "Russian Twists"] },
  { image: legsImg, title: "Leg Day Power", subtitle: "35 min · High", time: "35 min", intensity: "High", exercises: ["Squats", "Lunges", "Deadlifts", "Calf Raises", "Wall Sit"] },
  { image: cardioImg, title: "HIIT Cardio Blast", subtitle: "15 min · Very High", time: "15 min", intensity: "Very High", exercises: ["Burpees", "Mountain Climbers", "Jump Squats", "High Knees"] },
  { image: yogaImg, title: "Yoga Flow", subtitle: "25 min · Low", time: "25 min", intensity: "Low", exercises: ["Sun Salutation", "Warrior II", "Triangle Pose", "Pigeon Pose"] },
  { image: mobilityImg, title: "Recovery Mobility", subtitle: "15 min · Low", time: "15 min", intensity: "Low", exercises: ["Hip Circles", "Cat-Cow", "Thread the Needle", "Figure Four Stretch"] },
];

const generatedExercises = [
  { name: "Modified Goblet Squat", reps: "12 reps × 3 sets", note: "Knee-friendly depth" },
  { name: "Dumbbell Floor Press", reps: "10 reps × 3 sets", note: "No bench needed" },
  { name: "Single-Leg RDL", reps: "8 each × 3 sets", note: "Light weight, slow tempo" },
];

const WorkoutsView = () => {
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [genLoading, setGenLoading] = useState(false);
  const [genResult, setGenResult] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<typeof workouts[0] | null>(null);
  const [genTime, setGenTime] = useState("20");
  const [genEquip, setGenEquip] = useState("5kg Dumbbells");
  const [genConstraint, setGenConstraint] = useState("Bad right knee");

  const handleGenerate = () => {
    setGenLoading(true);
    setGenResult(false);
    setTimeout(() => {
      setGenLoading(false);
      setGenResult(true);
    }, 2000);
  };

  const handleStartWorkout = () => {
    toast({ title: "WORKOUT STARTED", description: "Let's crush it! 💪" });
  };

  if (selectedWorkout) {
    return (
      <div className="pb-24 max-w-lg mx-auto">
        {/* Hero */}
        <div className="relative">
          <img src={heroImg} alt={selectedWorkout.title} className="w-full aspect-[16/10] object-cover" width={800} height={512} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button
            onClick={() => setSelectedWorkout(null)}
            className="absolute top-12 left-4 bg-background/20 backdrop-blur-sm rounded-full p-2"
          >
            <X size={20} className="text-primary-foreground" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h1 className="text-primary-foreground font-black text-2xl uppercase tracking-tight">
              {selectedWorkout.title}
            </h1>
          </div>
        </div>

        {/* Stats */}
        <div className="px-5 pt-5">
          <div className="flex gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-muted-foreground" />
              <span className="text-sm font-bold">{selectedWorkout.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Dumbbell size={16} className="text-muted-foreground" />
              <span className="text-sm font-bold">Intensity: {selectedWorkout.intensity}</span>
            </div>
          </div>

          {/* Exercises */}
          <h3 className="text-nike-header text-sm mb-3">EXERCISES</h3>
          <div className="space-y-3 mb-8">
            {selectedWorkout.exercises.map((ex, i) => (
              <div key={ex} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                <span className="text-xs font-black text-muted-foreground w-6">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-semibold text-sm">{ex}</span>
              </div>
            ))}
          </div>

          <button onClick={handleStartWorkout} className="btn-volt w-full text-center text-sm py-4">
            START WORKOUT
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-14 pb-24 max-w-lg mx-auto">
      <h1 className="text-nike-header text-2xl mb-5">WORKOUTS</h1>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(activeFilter === f ? null : f)}
            className={`chip-filter ${activeFilter === f ? "chip-filter-active" : ""}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* AI Generator Button */}
      <button
        onClick={() => { setShowGenerator(true); setGenResult(false); setGenLoading(false); }}
        className="w-full card-premium flex items-center justify-center gap-2 mb-6 active:scale-[0.98] transition-transform"
      >
        <Sparkles size={18} className="text-nike-volt" />
        <span className="font-black text-sm uppercase tracking-wider">Generate Custom AI Routine</span>
      </button>

      {/* Workout Grid */}
      <div className="grid grid-cols-2 gap-3">
        {workouts.map((w) => (
          <WorkoutCard
            key={w.title}
            image={w.image}
            title={w.title}
            subtitle={w.subtitle}
            onClick={() => setSelectedWorkout(w)}
          />
        ))}
      </div>

      {/* AI Generator Modal */}
      {showGenerator && (
        <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-background w-full max-w-lg rounded-t-3xl p-6 pb-8 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-nike-header text-lg">TELL US WHAT YOU HAVE</h2>
              <button onClick={() => setShowGenerator(false)} className="p-1">
                <X size={24} />
              </button>
            </div>

            {!genResult ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Time Available</label>
                  <input
                    value={genTime}
                    onChange={(e) => setGenTime(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm font-semibold bg-secondary focus:outline-none focus:ring-2 focus:ring-foreground"
                    placeholder="e.g., 20 mins"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Equipment</label>
                  <input
                    value={genEquip}
                    onChange={(e) => setGenEquip(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm font-semibold bg-secondary focus:outline-none focus:ring-2 focus:ring-foreground"
                    placeholder="e.g., 5kg Dumbbells"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Constraints</label>
                  <input
                    value={genConstraint}
                    onChange={(e) => setGenConstraint(e.target.value)}
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm font-semibold bg-secondary focus:outline-none focus:ring-2 focus:ring-foreground"
                    placeholder="e.g., Bad right knee"
                  />
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={genLoading}
                  className="btn-volt w-full text-center flex items-center justify-center gap-2 py-4"
                >
                  {genLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-nike-volt" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Custom {genTime} Routine
                  </span>
                </div>
                {generatedExercises.map((ex, i) => (
                  <div key={ex.name} className="bg-secondary rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-black text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                        <h4 className="font-bold text-sm mt-0.5">{ex.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{ex.reps}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-background rounded-full px-2 py-1">
                        <AlertCircle size={12} className="text-nike-volt" />
                        <span className="text-[10px] font-semibold">{ex.note}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => { handleStartWorkout(); setShowGenerator(false); }} className="btn-volt w-full text-center py-4">
                  START WORKOUT
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutsView;
