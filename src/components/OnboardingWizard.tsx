import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { Slider } from "@/components/ui/slider";

const goals = ["Weight Loss", "Hypertrophy", "Longevity"];
const genders = ["Male", "Female", "Other"];
const cuisines = ["South Indian", "Mediterranean", "Vegan", "Standard Western", "Japanese", "Keto"];

const OnboardingWizard = () => {
  const { setProfile } = useUser();
  const [step, setStep] = useState(1);

  // Step 1
  const [age, setAge] = useState("28");
  const [weight, setWeight] = useState("78");
  const [height, setHeight] = useState("175");
  const [gender, setGender] = useState("Male");

  // Step 2
  const [goal, setGoal] = useState("Hypertrophy");
  const [dailyTime, setDailyTime] = useState(45);

  // Step 3
  const [cuisine, setCuisine] = useState("Standard Western");

  const next = () => {
    if (step < 4) {
      setStep(step + 1);
      if (step === 3) {
        // Start processing, then finish after 3s
        setTimeout(() => {
          setProfile({
            age,
            weight,
            height,
            gender,
            goal,
            dailyTime,
            cuisine,
            onboarded: true,
            currentWeek: 1,
            totalWeeks: 12,
          });
        }, 3000);
      }
    }
  };

  const canProceed =
    (step === 1 && age && weight && height && gender) ||
    (step === 2 && goal) ||
    (step === 3 && cuisine);

  const inputClass =
    "w-full border border-border rounded-xl px-4 py-3 text-sm font-semibold bg-secondary focus:outline-none focus:ring-2 focus:ring-foreground";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress */}
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Step {step} of 4
          </span>
          <Sparkles size={14} className="text-nike-volt" />
        </div>
        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-nike-volt rounded-full transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
        {step < 4 && (
          <h1 className="text-nike-header text-xl mt-6">CALIBRATING YOUR AI ENGINE</h1>
        )}
      </div>

      <div className="flex-1 px-5 pb-24">
        {/* Step 1: Biometrics */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <p className="text-sm text-muted-foreground mb-4">Tell us about yourself</p>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Age</label>
              <input value={age} onChange={(e) => setAge(e.target.value)} className={inputClass} placeholder="28" type="number" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Weight (kg)</label>
              <input value={weight} onChange={(e) => setWeight(e.target.value)} className={inputClass} placeholder="78" type="number" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Height (cm)</label>
              <input value={height} onChange={(e) => setHeight(e.target.value)} className={inputClass} placeholder="175" type="number" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Gender</label>
              <div className="flex gap-2">
                {genders.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`chip-filter flex-1 text-center ${gender === g ? "chip-filter-active" : ""}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Goals & Time */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <p className="text-sm text-muted-foreground mb-2">What's your primary goal?</p>
            <div className="space-y-3">
              {goals.map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`w-full text-left rounded-2xl p-5 border-2 transition-all ${
                    goal === g
                      ? "border-foreground bg-primary text-primary-foreground"
                      : "border-border bg-secondary"
                  }`}
                >
                  <span className="font-black text-sm uppercase tracking-wider">{g}</span>
                </button>
              ))}
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                Daily Time Available: {dailyTime}m
              </label>
              <Slider
                value={[dailyTime]}
                onValueChange={([v]) => setDailyTime(v)}
                min={15}
                max={90}
                step={5}
                className="py-2"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-semibold mt-1">
                <span>15m</span>
                <span>90m</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Cuisine */}
        {step === 3 && (
          <div className="animate-in fade-in duration-300">
            <p className="text-sm text-muted-foreground mb-5">Choose your dietary preference</p>
            <div className="flex flex-wrap gap-2">
              {cuisines.map((c) => (
                <button
                  key={c}
                  onClick={() => setCuisine(c)}
                  className={`chip-filter ${cuisine === c ? "chip-filter-active" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Processing */}
        {step === 4 && (
          <div className="flex flex-col items-center justify-center py-24 gap-5 animate-in fade-in duration-300">
            <div className="bg-primary rounded-full p-8">
              <Loader2 size={40} className="text-nike-volt animate-spin" />
            </div>
            <p className="text-nike-header text-base text-center">Synthesizing your biometrics...</p>
            <p className="text-sm text-muted-foreground text-center">
              Generating your 12-week macrocycle...
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      {step < 4 && (
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-background border-t border-border">
          <button
            onClick={next}
            disabled={!canProceed}
            className="btn-volt w-full text-center py-4 disabled:opacity-40"
          >
            {step === 3 ? "GENERATE MY PLAN" : "CONTINUE"}
          </button>
        </div>
      )}
    </div>
  );
};

export default OnboardingWizard;
