

## Connect Workout AI Features to Lovable AI

Replace the mocked workout generation and adjustment with real AI-powered responses. No database is needed — this is a stateless AI call.

### Steps

1. **Create edge function `supabase/functions/generate-workout/index.ts`**
   - Accepts `{ type: "generate" | "adjust", time?, equipment?, constraints?, goals?, currentWorkout?, prompt? }`
   - Calls Lovable AI Gateway (`google/gemini-3-flash-preview`) using the pre-configured `LOVABLE_API_KEY`
   - Uses tool-calling (structured output) to return a workout matching the app's `Workout` interface
   - System prompt: expert fitness coach that creates safe, effective routines
   - Handles CORS, 429/402 errors
   - Deploy and verify

2. **Update `src/views/WorkoutsView.tsx` — Generate Custom AI Routine**
   - Replace `handleGenerate()` mock `setTimeout` with `supabase.functions.invoke('generate-workout', { body: { type: "generate", time, equipment, constraints, goals } })`
   - Display the returned exercises instead of hardcoded `generatedExercises`
   - Store the generated workout so "START WORKOUT" uses real AI exercises

3. **Update `src/views/WorkoutsView.tsx` — Adjust Today's Workout**
   - Replace `handleAdapt()` mock logic with `supabase.functions.invoke('generate-workout', { body: { type: "adjust", prompt, currentWorkout } })`
   - Set returned workout as new `currentWorkout`

### Technical Details

**Edge function tool-calling schema:**
```json
{
  "name": "generate_workout",
  "parameters": {
    "type": "object",
    "properties": {
      "title": { "type": "string" },
      "intensity": { "type": "string", "enum": ["Low", "Medium", "High", "Max"] },
      "equipment": { "type": "array", "items": { "type": "string" } },
      "exercises": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "sets": { "type": "string" },
            "reps": { "type": "string" }
          },
          "required": ["name", "sets", "reps"]
        }
      }
    },
    "required": ["title", "intensity", "equipment", "exercises"]
  }
}
```

- Uses `LOVABLE_API_KEY` (already configured) — no new secrets needed
- No database tables needed — workouts are generated on-the-fly
- No authentication changes needed

