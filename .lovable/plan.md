

## Add Real USDA API Key

The edge function `supabase/functions/usda-search/index.ts` currently hardcodes `DEMO_KEY` in the URL. We need to:

### Steps

1. **Add the USDA API key as a secret** using the `add_secret` tool, prompting the user to paste their key. They can get a free key from https://fdc.nal.usda.gov/api-key-signup

2. **Update the edge function** to read the key from `Deno.env.get('USDA_API_KEY')` instead of hardcoding `DEMO_KEY`, with a fallback to `DEMO_KEY` if not set

3. **Redeploy** the edge function and verify it works

### Technical Detail

In `supabase/functions/usda-search/index.ts`, change:
```typescript
const USDA_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY";
```
to:
```typescript
const apiKey = Deno.env.get('USDA_API_KEY') || 'DEMO_KEY';
const USDA_API_URL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}`;
```

