import { useState } from "react";

const workoutPlan = {
  schedule: [
    { day: "Monday", type: "upper", label: "Upper Body" },
    { day: "Tuesday", type: "cardio", label: "Cardio / Endurance" },
    { day: "Wednesday", type: "lower", label: "Lower Body" },
    { day: "Thursday", type: "rest", label: "Rest / Walk" },
    { day: "Friday", type: "upper", label: "Upper Body" },
    { day: "Saturday", type: "cardio", label: "HIIT + Functional" },
    { day: "Sunday", type: "rest", label: "Rest" },
  ],
  upper: {
    warmup: [
      { name: "Arm Circles", sets: "2 × 15 each direction", note: "Loosen shoulder joints" },
      { name: "Chest Opener Stretch", sets: "2 × 30 sec", note: "Clasp hands behind back, open chest" },
      { name: "Band Pull-Aparts", sets: "2 × 15", note: "Or towel substitute — activates rear delts" },
      { name: "Wrist Rotations", sets: "2 × 10 each", note: "Prep for pressing movements" },
      { name: "Cat-Cow", sets: "2 × 10 reps", note: "Spine mobility" },
    ],
    superset_a: {
      label: "Superset A — Chest + Back (alternate, 60 sec rest after both)",
      exercises: [
        { name: "Push-Ups / Bench Press", sets: "3 × 10–12", muscle: "Chest", note: "Keep elbows 45° from body" },
        { name: "Dumbbell Rows", sets: "3 × 10–12 each", muscle: "Back", note: "Pull elbow back, not out" },
      ],
    },
    superset_b: {
      label: "Superset B — Shoulders + Biceps",
      exercises: [
        { name: "Overhead Press (DB)", sets: "3 × 10", muscle: "Shoulders", note: "Don't arch lower back" },
        { name: "Bicep Curls", sets: "3 × 12", muscle: "Biceps", note: "Full range of motion" },
      ],
    },
    superset_c: {
      label: "Superset C — Lateral Raise + Triceps",
      exercises: [
        { name: "Lateral Raises", sets: "3 × 12", muscle: "Shoulders", note: "Slight bend in elbow, lead with elbow" },
        { name: "Tricep Dips / Overhead Extension", sets: "3 × 12", muscle: "Triceps", note: "Keep elbows close" },
      ],
    },
    functional: [
      { name: "Bear Crawl", sets: "3 × 20 ft forward + back", note: "Shoulders, core stability, coordination" },
      { name: "Plank to Downward Dog", sets: "3 × 10 reps", note: "Core + shoulder mobility" },
      { name: "Farmers Carry", sets: "3 × 30 sec", note: "Grip + posture + core" },
    ],
    cooldown: [
      { name: "Cross-Body Shoulder Stretch", sets: "2 × 30 sec each", note: "Hold gently, don't force" },
      { name: "Doorway Chest Stretch", sets: "2 × 30 sec", note: "Open chest and front delts" },
      { name: "Lat Stretch (hanging or overhead)", sets: "2 × 30 sec each side", note: "Reach and lean" },
      { name: "Child's Pose", sets: "1 × 60 sec", note: "Full back decompression" },
      { name: "Neck Rolls", sets: "2 × 10 slow", note: "Release upper trap tension" },
    ],
  },
  lower: {
    warmup: [
      { name: "Hip Circles", sets: "2 × 10 each direction", note: "Loosen hip socket" },
      { name: "Leg Swings (forward/back)", sets: "2 × 12 each leg", note: "Dynamic hamstring + hip flexor" },
      { name: "Leg Swings (side to side)", sets: "2 × 12 each leg", note: "Adductor + abductor activation" },
      { name: "Bodyweight Squat", sets: "2 × 10 slow", note: "Check depth and knee tracking" },
      { name: "Glute Bridge Hold", sets: "2 × 20 sec", note: "Activate glutes before loading" },
    ],
    superset_a: {
      label: "Superset A — Quads + Hamstrings",
      exercises: [
        { name: "Goblet Squat", sets: "3 × 10–12", muscle: "Quads", note: "Heels down, chest up, deep as possible" },
        { name: "Romanian Deadlift (RDL)", sets: "3 × 10", muscle: "Hamstrings", note: "Hinge at hips, soft knee, feel the stretch" },
      ],
    },
    superset_b: {
      label: "Superset B — Glutes + Calves",
      exercises: [
        { name: "Hip Thrusts / Glute Bridges", sets: "3 × 12", muscle: "Glutes", note: "Squeeze at top for 1 sec" },
        { name: "Calf Raises (single leg)", sets: "3 × 15 each", muscle: "Calves", note: "Full range, slow down" },
      ],
    },
    superset_c: {
      label: "Superset C — Stability + Core",
      exercises: [
        { name: "Reverse Lunges", sets: "3 × 10 each leg", muscle: "Quads / Glutes", note: "Keep front knee over ankle" },
        { name: "Dead Bug", sets: "3 × 10 each side", muscle: "Core", note: "Lower back pressed to floor the entire time" },
      ],
    },
    functional: [
      { name: "Lateral Band Walks", sets: "3 × 15 each direction", note: "Hip abductor stability, knee health" },
      { name: "Box Step-Ups", sets: "3 × 10 each leg", note: "Balance + single-leg strength" },
      { name: "Suitcase Carry (single arm)", sets: "3 × 30 sec each", note: "Anti-lateral-flexion core, gait stability" },
    ],
    cooldown: [
      { name: "Pigeon Pose", sets: "2 × 45 sec each side", note: "Deep hip flexor + glute stretch — essential" },
      { name: "Standing Quad Stretch", sets: "2 × 30 sec each", note: "Hold ankle, stand tall" },
      { name: "Seated Hamstring Stretch", sets: "2 × 30 sec each", note: "Hinge forward from hips, not back" },
      { name: "Figure-4 Stretch", sets: "2 × 30 sec each", note: "Lying on back, great for glutes" },
      { name: "Butterfly Stretch", sets: "1 × 60 sec", note: "Inner groin + hip mobility" },
    ],
  },
  cardio: [
    {
      day: "Tuesday — Zone 2 Endurance",
      items: [
        { name: "Warm-up Walk", duration: "5 min", note: "Easy pace" },
        { name: "Brisk Walk or Light Jog", duration: "30–40 min", note: "Conversational pace — you can talk but not sing" },
        { name: "Cool-down Walk", duration: "5 min", note: "Drop heart rate gradually" },
        { name: "Hip Flexor Stretch", duration: "2 × 30 sec each", note: "Counter prolonged hip flexion from running" },
        { name: "Calf Stretch", duration: "2 × 30 sec each", note: "Against wall" },
      ],
    },
    {
      day: "Saturday — HIIT + Functional Circuit",
      items: [
        { name: "Warm-up Jog / Jump Rope", duration: "5 min", note: "Get heart rate up slowly" },
        { name: "HIIT Block: 8 rounds", duration: "30 sec on / 90 sec off", note: "Alternate: Burpees → Squat Jumps → Mountain Climbers → Sprint" },
        { name: "Functional Circuit (2 rounds)", duration: "No rest between", note: "Bear crawl → Farmer carry → Box jumps → Battle ropes / Jump rope" },
        { name: "Cool-down Walk", duration: "5 min", note: "" },
        { name: "Full Body Stretch", duration: "10 min", note: "Hips, chest, hamstrings, shoulders" },
      ],
    },
  ],
};

const typeColors = {
  upper: { bg: "bg-blue-950", accent: "bg-blue-500", text: "text-blue-300", border: "border-blue-700" },
  lower: { bg: "bg-emerald-950", accent: "bg-emerald-500", text: "text-emerald-300", border: "border-emerald-700" },
  cardio: { bg: "bg-orange-950", accent: "bg-orange-500", text: "text-orange-300", border: "border-orange-700" },
  rest: { bg: "bg-zinc-900", accent: "bg-zinc-600", text: "text-zinc-400", border: "border-zinc-700" },
};

const Section = ({ title, icon, items, color, isSuperset }) => (
  <div className={`rounded-xl border ${color.border} bg-black bg-opacity-30 p-4 mb-4`}>
    <div className={`text-xs font-bold uppercase tracking-widest ${color.text} mb-3 flex items-center gap-2`}>
      <span>{icon}</span> {title}
    </div>
    {isSuperset ? (
      <div className="flex flex-col gap-3">
        {items.map((ex, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`w-6 h-6 rounded-full ${color.accent} flex items-center justify-center text-black text-xs font-bold shrink-0 mt-0.5`}>
              {String.fromCharCode(65 + i)}
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{ex.name}</div>
              <div className={`text-xs ${color.text}`}>{ex.sets} · {ex.muscle}</div>
              <div className="text-zinc-500 text-xs mt-0.5">{ex.note}</div>
            </div>
          </div>
        ))}
        <div className={`text-xs ${color.text} italic mt-1`}>↕ Alternate A→B, rest 60 sec after both</div>
      </div>
    ) : (
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`w-1.5 h-1.5 rounded-full ${color.accent} mt-2 shrink-0`} />
            <div>
              <div className="text-white font-semibold text-sm">{item.name}</div>
              <div className={`text-xs ${color.text}`}>{item.sets || item.duration}</div>
              {item.note && <div className="text-zinc-500 text-xs">{item.note}</div>}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default function WorkoutApp() {
  const [activeDay, setActiveDay] = useState("Monday");

  const selected = workoutPlan.schedule.find((d) => d.day === activeDay);
  const color = typeColors[selected.type];

  const renderDay = () => {
    if (selected.type === "rest") {
      return (
        <div className="text-center py-16 text-zinc-500">
          <div className="text-5xl mb-4">🌙</div>
          <div className="text-xl font-semibold text-zinc-400">Rest Day</div>
          <div className="text-sm mt-2">Light 20–30 min walk is fine. Let your muscles recover.</div>
        </div>
      );
    }
    if (selected.type === "cardio") {
      const dayData = workoutPlan.cardio.find((c) =>
        c.day.toLowerCase().startsWith(selected.day.toLowerCase())
      );
      return (
        <div>
          <div className={`text-lg font-bold text-white mb-4`}>{dayData.day}</div>
          <Section title="Workout" icon="🏃" items={dayData.items} color={color} />
        </div>
      );
    }
    const plan = workoutPlan[selected.type];
    return (
      <div>
        <Section title="Pre-Workout Warmup" icon="🔥" items={plan.warmup} color={color} />
        <Section title={plan.superset_a.label} icon="💪" items={plan.superset_a.exercises} color={color} isSuperset />
        <Section title={plan.superset_b.label} icon="💪" items={plan.superset_b.exercises} color={color} isSuperset />
        <Section title={plan.superset_c.label} icon="💪" items={plan.superset_c.exercises} color={color} isSuperset />
        <Section title="Functional Training" icon="⚡" items={plan.functional} color={color} />
        <Section title="Post-Workout Cooldown & Stretching" icon="🧘" items={plan.cooldown} color={color} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white" style={{ fontFamily: "'Georgia', serif" }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-xs tracking-widest text-zinc-500 uppercase mb-1">Weekly Program</div>
          <h1 className="text-3xl font-bold text-white">Your Fitness Plan</h1>
          <p className="text-zinc-400 text-sm mt-1">Muscle · Fat Loss · Endurance · Mobility</p>
        </div>

        {/* Day Selector */}
        <div className="grid grid-cols-7 gap-1 mb-8">
          {workoutPlan.schedule.map(({ day, type, label }) => {
            const c = typeColors[type];
            const isActive = activeDay === day;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`rounded-lg p-2 text-center transition-all cursor-pointer border ${
                  isActive ? `${c.bg} ${c.border} ${c.text}` : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600"
                }`}
              >
                <div className="text-xs font-bold">{day.slice(0, 3)}</div>
                {isActive && (
                  <div className={`w-1.5 h-1.5 rounded-full ${c.accent} mx-auto mt-1`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Day Badge */}
        <div className={`flex items-center gap-3 mb-6 px-4 py-3 rounded-xl ${color.bg} border ${color.border}`}>
          <div className={`w-2 h-2 rounded-full ${color.accent}`} />
          <div>
            <div className="text-white font-bold">{selected.day}</div>
            <div className={`text-xs ${color.text}`}>{selected.label}</div>
          </div>
        </div>

        {/* Day Content */}
        {renderDay()}

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-zinc-800 grid grid-cols-3 gap-3 text-center">
          {[
            { type: "upper", label: "Upper Body" },
            { type: "lower", label: "Lower Body" },
            { type: "cardio", label: "Cardio" },
          ].map(({ type, label }) => (
            <div key={type} className="text-xs">
              <div className={`w-2 h-2 rounded-full ${typeColors[type].accent} mx-auto mb-1`} />
              <span className={typeColors[type].text}>{label}</span>
            </div>
          ))}
        </div>

        <div className="text-center text-zinc-600 text-xs mt-6">
          Progressive overload — add reps or weight every 1–2 weeks
        </div>
      </div>
    </div>
  );
}