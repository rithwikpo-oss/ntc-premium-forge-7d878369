import { Award, Flame, Sun, Target, Trophy, Zap, ChevronRight } from "lucide-react";

const stats = [
  { label: "Workouts", value: "142" },
  { label: "Total Minutes", value: "4,520" },
  { label: "Streak", value: "12 Days" },
  { label: "Avg / Week", value: "4.2" },
];

const badges = [
  { icon: Flame, label: "3-Week Streak", unlocked: true },
  { icon: Sun, label: "Early Bird", unlocked: true },
  { icon: Trophy, label: "Century Club", unlocked: true },
  { icon: Target, label: "Goal Crusher", unlocked: true },
  { icon: Zap, label: "Speed Demon", unlocked: false },
  { icon: Award, label: "Iron Will", unlocked: false },
];

const settings = ["Account", "Notifications", "Health Data Permissions", "Subscription", "Help & Support"];

const ProfileView = () => (
  <div className="px-5 pt-14 pb-24 max-w-lg mx-auto">
    <h1 className="text-nike-header text-2xl mb-2">PROFILE</h1>
    <p className="text-muted-foreground text-sm mb-6">Rohan K. · Premium Member</p>

    {/* Stats */}
    <div className="grid grid-cols-2 gap-3 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="bg-secondary rounded-2xl p-4 text-center">
          <p className="font-black text-2xl">{s.value}</p>
          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1">{s.label}</p>
        </div>
      ))}
    </div>

    {/* Badges */}
    <h2 className="text-nike-header text-sm mb-4">BADGES</h2>
    <div className="grid grid-cols-3 gap-3 mb-8">
      {badges.map((b) => {
        const Icon = b.icon;
        return (
          <div
            key={b.label}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${
              b.unlocked ? "bg-secondary" : "bg-secondary/50 opacity-40"
            }`}
          >
            <div className={`rounded-full p-3 ${b.unlocked ? "bg-foreground" : "bg-muted-foreground/30"}`}>
              <Icon size={20} className={b.unlocked ? "text-nike-volt" : "text-muted-foreground"} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-center leading-tight">
              {b.label}
            </span>
          </div>
        );
      })}
    </div>

    {/* Settings */}
    <h2 className="text-nike-header text-sm mb-3">SETTINGS</h2>
    <div className="space-y-0">
      {settings.map((s) => (
        <button
          key={s}
          className="w-full flex items-center justify-between py-4 border-b border-border last:border-0 active:bg-secondary transition-colors"
        >
          <span className="text-sm font-semibold">{s}</span>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
      ))}
    </div>
  </div>
);

export default ProfileView;
