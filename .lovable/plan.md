

## Problem

The USDA FoodData Central API search is failing because the `DEMO_KEY` API key is heavily rate-limited and frequently blocked for client-side (browser) requests due to CORS restrictions. The session replay shows repeated "Search failed" toast notifications when searching for "rice".

## Solution

Proxy the USDA API call through a backend function to avoid CORS issues and protect the API key. This also allows upgrading to a real API key later without client-side changes.

### Steps

1. **Create a backend function `usda-search`** that:
   - Accepts a `query` string in the request body
   - Calls `POST https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY` server-side with `dataType: ["Foundation", "SR Legacy"]` and `pageSize: 5`
   - Returns the parsed food results (fdcId, description, and nutrient values for IDs 1008, 1003, 1005, 1004, 1079)
   - Handles errors gracefully

2. **Update `NutritionView.tsx`** to:
   - Replace the direct USDA API fetch with a call to the backend function via `supabase.functions.invoke('usda-search', { body: { query } })`
   - Keep the same debounce logic and result mapping
   - Improve error handling to show more specific failure messages

### Technical Details

- The edge function runs server-side, bypassing CORS restrictions entirely
- The `DEMO_KEY` works reliably server-side; can be swapped for a registered key later
- No database changes needed
- No authentication changes needed

