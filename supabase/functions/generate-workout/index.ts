const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface GenerateWorkoutRequest {
  type: "generate" | "adjust";
  time?: string;
  equipment?: string;
  constraints?: string;
  goals?: string;
  currentWorkout?: {
    title: string;
    intensity: string;
    equipment: string[];
    exercises: Array<{ name: string; sets: string; reps: string }>;
  };
  prompt?: string;
}

interface WorkoutResponse {
  title: string;
  intensity: "Low" | "Medium" | "High" | "Max";
  equipment: string[];
  exercises: Array<{
    name: string;
    sets: string;
    reps: string;
  }>;
}

const GEMINI_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const payload: GenerateWorkoutRequest = await req.json();

    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let systemPrompt = "You are an elite Nike Master Trainer. Create safe, effective routines. Always return valid JSON matching the provided schema. If a user mentions joint pain, remove high-impact movements.";
    let userPrompt = "";

    if (payload.type === "generate") {
      userPrompt = `Generate a custom workout routine with the following specifications:
- Time available: ${payload.time || "30"} minutes
- Equipment: ${payload.equipment || "None"}
- Constraints: ${payload.constraints || "None"}
- Goals: ${payload.goals || "General fitness"}

Create an effective workout that fits these parameters. Include 3-5 exercises with appropriate sets and reps.`;
    } else if (payload.type === "adjust") {
      const currentTitle = payload.currentWorkout?.title || "Current workout";
      const currentExercises = payload.currentWorkout?.exercises?.map(e => `${e.name} (${e.sets} × ${e.reps})`).join(", ") || "No exercises";

      userPrompt = `Adjust the following workout based on this constraint: "${payload.prompt || "modify as needed"}"

Current workout: ${currentTitle}
Exercises: ${currentExercises}

Create an adapted version that addresses the constraint while maintaining workout effectiveness.`;
    }

    const toolDeclaration = {
      function_declarations: [
        {
          name: "generate_workout",
          description: "Generate a structured workout routine",
          parameters: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "The title of the workout routine"
              },
              intensity: {
                type: "string",
                enum: ["Low", "Medium", "High", "Max"],
                description: "The intensity level of the workout"
              },
              equipment: {
                type: "array",
                items: { type: "string" },
                description: "List of equipment needed"
              },
              exercises: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string", description: "Exercise name" },
                    sets: { type: "string", description: "Number of sets (can be AMRAP or a number)" },
                    reps: { type: "string", description: "Number of reps or duration" }
                  },
                  required: ["name", "sets", "reps"]
                }
              }
            },
            required: ["title", "intensity", "equipment", "exercises"]
          }
        }
      ]
    };

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemPrompt}\n\n${userPrompt}`
            }
          ]
        }
      ],
      tools: [toolDeclaration],
      tool_config: {
        function_calling_config: {
          mode: "ANY"
        }
      }
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit reached. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "API quota exceeded. Please check your billing." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to generate workout" }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();

    const functionCall = data.candidates?.[0]?.content?.parts?.[0]?.functionCall;

    if (!functionCall || functionCall.name !== "generate_workout") {
      console.error("No valid function call in response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Invalid response from AI" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const workout: WorkoutResponse = functionCall.args;

    return new Response(JSON.stringify({ workout }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
