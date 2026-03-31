const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const USDA_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY";

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    if (!query || typeof query !== 'string' || query.trim().length < 2) {
      return new Response(JSON.stringify({ error: 'Query must be at least 2 characters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch(USDA_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query.trim(),
        dataType: ["Foundation", "SR Legacy"],
        pageSize: 5,
        nutrients: [1008, 1003, 1005, 1004, 1079],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("USDA API error:", res.status, text);
      return new Response(JSON.stringify({ error: 'USDA API request failed' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    const foods = (data.foods || []).map((food: any) => {
      const getNutrient = (id: number) => food.foodNutrients?.find((n: any) => n.nutrientId === id)?.value ?? 0;
      return {
        fdcId: food.fdcId,
        description: food.description,
        caloriesPer100g: getNutrient(1008),
        proteinPer100g: getNutrient(1003),
        carbsPer100g: getNutrient(1005),
        fatPer100g: getNutrient(1004),
        fiberPer100g: getNutrient(1079),
      };
    });

    return new Response(JSON.stringify({ foods }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
