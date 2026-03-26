import { useState, useEffect } from "react";
import { Camera, Sparkles, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const cuisines = ["South Indian Lunch", "Mediterranean Bowl", "Japanese Bento", "Protein Smoothie"];

const CircularProgress = ({
  label,
  current,
  target,
  colorClass,
}: {
  label: string;
  current: number;
  target: number;
  colorClass: string;
}) => {
  const pct = Math.min((current / target) * 100, 100);
  const r = 38;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center">
      <svg width="90" height="90" className="-rotate-90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
        <circle
          cx="45"
          cy="45"
          r={r}
          fill="none"
          className={colorClass}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
      </svg>
      <span className="font-black text-lg -mt-14">{current}g</span>
      <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-8">
        {label}
      </span>
      <span className="text-[10px] text-muted-foreground">/ {target}g</span>
    </div>
  );
};

const NutritionView = () => {
  const { toast } = useToast();
  const [showCamera, setShowCamera] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(false);

  // Animated macro values
  const [protein, setProtein] = useState(60);
  const [carbs, setCarbs] = useState(95);
  const [fats, setFats] = useState(28);

  const macros = [
    { label: "Protein", current: protein, target: 150, color: "stroke-nike-volt" },
    { label: "Carbs", current: carbs, target: 250, color: "stroke-foreground" },
    { label: "Fats", current: fats, target: 65, color: "stroke-muted-foreground" },
  ];

  const handleSnap = () => {
    setScanning(true);
    setScanResult(false);
    setTimeout(() => {
      setScanning(false);
      setScanResult(true);
    }, 2000);
  };

  const handleLogMeal = () => {
    setShowCamera(false);
    // Animate macro rings forward
    setProtein((p) => p + 40);
    setCarbs((c) => c + 50);
    setFats((f) => f + 15);
    toast({ title: "Meal Logged ✓", description: "Macros updated from AI scan." });
  };

  return (
    <div className="px-5 pt-14 pb-24 max-w-lg mx-auto">
      <h1 className="text-nike-header text-2xl mb-6">NUTRITION</h1>

      {/* Macro circles */}
      <div className="flex justify-around mb-8">
        {macros.map((m) => (
          <CircularProgress key={m.label} label={m.label} current={m.current} target={m.target} colorClass={m.color} />
        ))}
      </div>

      {/* Cuisine Templates */}
      <h2 className="text-nike-header text-sm mb-3">CUISINE TEMPLATES</h2>
      <div className="flex gap-2 flex-wrap mb-6">
        {cuisines.map((c) => (
          <button
            key={c}
            onClick={() => toast({ title: "Macros Logged!", description: `${c} added to your daily tracker.` })}
            className="chip-filter active:scale-95 transition-transform"
          >
            {c}
          </button>
        ))}
      </div>

      {/* AI Meal Scanner */}
      <button
        onClick={() => {
          setShowCamera(true);
          setScanResult(false);
          setScanning(false);
        }}
        className="card-premium w-full flex items-center gap-3 active:scale-[0.98] transition-transform"
      >
        <Camera size={24} className="text-nike-volt" />
        <div className="text-left">
          <h3 className="font-black text-sm uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} className="text-nike-volt" />
            AI Meal Scanner
          </h3>
          <p className="text-primary-foreground/50 text-xs mt-0.5">Point your camera at any meal</p>
        </div>
      </button>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-background w-full max-w-lg rounded-t-3xl p-6 pb-8 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-nike-header text-lg">SCAN MEAL</h2>
              <button onClick={() => setShowCamera(false)} className="p-1">
                <X size={24} />
              </button>
            </div>

            {!scanResult ? (
              <>
                <div className="relative bg-nike-charcoal rounded-2xl aspect-[4/3] mb-5 flex items-center justify-center overflow-hidden">
                  {scanning ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 size={32} className="text-nike-volt animate-spin" />
                      <p className="text-primary-foreground/70 text-sm font-semibold">Analyzing macros...</p>
                    </div>
                  ) : (
                    <>
                      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary-foreground/50 rounded-tl-lg" />
                      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary-foreground/50 rounded-tr-lg" />
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary-foreground/50 rounded-bl-lg" />
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary-foreground/50 rounded-br-lg" />
                      <p className="text-primary-foreground/40 text-xs font-semibold uppercase tracking-widest">
                        Point at meal
                      </p>
                    </>
                  )}
                </div>
                {!scanning && (
                  <button onClick={handleSnap} className="btn-volt w-full text-center py-4">
                    SNAP PHOTO
                  </button>
                )}
              </>
            ) : (
              <div className="bg-secondary rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} className="text-nike-volt" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    AI Detection
                  </span>
                </div>
                <h3 className="font-black text-lg">Chicken Tikka Masala & 1 Cup Rice</h3>
                <div className="grid grid-cols-3 gap-3 mt-3 mb-4">
                  <div className="bg-background rounded-xl p-3 text-center">
                    <p className="font-black text-lg">650</p>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase">kcal</p>
                  </div>
                  <div className="bg-background rounded-xl p-3 text-center">
                    <p className="font-black text-lg">40g</p>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase">Protein</p>
                  </div>
                  <div className="bg-background rounded-xl p-3 text-center">
                    <p className="font-black text-lg">50g</p>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase">Carbs</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-medium mb-4">✓ Targets will be updated</p>
                <button onClick={handleLogMeal} className="btn-volt w-full text-center py-3">
                  LOG MEAL
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionView;
