import { Sparkles, Brain, Camera, Dumbbell, TrendingUp, Zap } from "lucide-react";

const features = [
  { icon: Brain, title: "AI READINESS SCORE", desc: "Auto-syncs health data to adapt your daily workout intensity." },
  { icon: Dumbbell, title: "CUSTOM ROUTINE GENERATOR", desc: "Tell us your time, gear, and constraints. AI builds your workout." },
  { icon: Camera, title: "AI MEAL SCANNER", desc: "Snap a photo of any meal. Instant macro breakdown logged." },
  { icon: TrendingUp, title: "PROGRESS PREDICTION", desc: "AI projects your gains based on consistency and effort." },
  { icon: Zap, title: "RECOVERY OPTIMIZER", desc: "Smart rest day scheduling based on your HRV and sleep." },
];

const PremiumAIView = () => (
  <div className="px-5 pt-14 pb-24 max-w-lg mx-auto">
    <div className="flex items-center gap-2 mb-2">
      <Sparkles size={20} className="text-nike-volt" />
      <h1 className="text-nike-header text-2xl">PREMIUM AI</h1>
    </div>
    <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
      Your training, supercharged with artificial intelligence. Every feature below learns and adapts to you.
    </p>

    <div className="space-y-4">
      {features.map((f) => {
        const Icon = f.icon;
        return (
          <div key={f.title} className="card-premium">
            <div className="flex items-start gap-3">
              <div className="bg-primary-foreground/10 rounded-xl p-2.5 flex-shrink-0">
                <Icon size={20} className="text-nike-volt" />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-wider mb-1">{f.title}</h3>
                <p className="text-primary-foreground/60 text-xs leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    <div className="mt-8 bg-secondary rounded-2xl p-5 text-center">
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-2">
        Already Included In Your Plan
      </p>
      <p className="font-black text-lg">PREMIUM AI · ACTIVE</p>
    </div>
  </div>
);

export default PremiumAIView;
