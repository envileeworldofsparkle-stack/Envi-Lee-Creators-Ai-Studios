# Envi Lee POD Pro Studio™ — Next.js App

Full POD mockup generation suite with AI backend API routes.

## Project structure

```
pod-nextjs/
├── app/
│   ├── layout.tsx              ← Root layout + Google fonts
│   ├── page.tsx                ← Home page → renders PODStudio
│   ├── globals.css             ← All design tokens (matches original HTML)
│   └── api/generate/
│       ├── mockup/route.ts     ← POST /api/generate/mockup
│       ├── listing/route.ts    ← POST /api/generate/listing
│       ├── description/route.ts← POST /api/generate/description
│       └── image-prompt/route.ts← POST /api/generate/image-prompt
├── components/
│   └── PODStudio.tsx           ← Full UI component (all 4 tools)
├── lib/
│   └── ai.ts                   ← AI config — ADD YOUR KEY HERE
├── .env.local.example          ← Copy this → .env.local → add key
└── package.json
```

## 1. Local development

```bash
# Install dependencies
npm install

# Copy the env template and add your API key
cp .env.local.example .env.local
# Open .env.local and replace sk-ant-YOUR-KEY-HERE with your real key

# Run the dev server
npm run dev
# → Opens at http://localhost:3000
```

## 2. Get your API key

**Anthropic (Claude) — recommended:**
1. Go to https://console.anthropic.com
2. Click API Keys → Create Key
3. Name it "POD Studio"
4. Copy the key (starts with `sk-ant-...`)
5. Paste into `.env.local` as `ANTHROPIC_API_KEY=sk-ant-...`

**OpenAI (GPT-4o):**
1. Go to https://platform.openai.com → API Keys
2. Copy key (starts with `sk-proj-...`)
3. Add to `.env.local` as `OPENAI_API_KEY=sk-proj-...`
4. Then open `lib/ai.ts` and uncomment Option A, comment Option B

## 3. Deploy to Vercel

```bash
# Option A: Vercel CLI (fastest)
npm install -g vercel
vercel          # follow the prompts — deploys in ~60 seconds

# Option B: Vercel dashboard
# 1. Push this folder to a GitHub repo
# 2. Go to vercel.com → New Project → Import from GitHub
# 3. Vercel auto-detects Next.js — click Deploy
```

**Add your API key to Vercel (required for production):**
1. Go to vercel.com → Your Project → Settings → Environment Variables
2. Add: `ANTHROPIC_API_KEY` = `sk-ant-your-real-key`
3. Click Save → Redeploy

## 4. API routes reference

All routes accept `POST` with JSON body and return `{ result: string }`.

### POST /api/generate/mockup
```json
{ "product": "T-Shirt", "design": "...", "setting": "...", "style": "..." }
```
Returns: mockup prompt + video prompt + style notes

### POST /api/generate/listing
```json
{ "productName": "...", "details": "...", "platform": "Etsy", "targetAudience": "..." }
```
Returns: title + description + bullets + tags + TikTok caption

### POST /api/generate/description
```json
{ "product": "...", "niche": "...", "tone": "...", "audience": "..." }
```
Returns: short + medium + long descriptions + tagline

### POST /api/generate/image-prompt
```json
{ "subject": "...", "style": "...", "mood": "...", "platform": "midjourney", "extras": "..." }
```
Returns: main prompt + negative prompt + 2 variations + tips

## 5. Extending to other apps

To add AI backends for CineFlow, AI Studios, or Brand Deals:

1. Add new routes under `app/api/generate/[tool-name]/route.ts`
2. Use the same `generate()` helper from `lib/ai.ts`
3. Create a new component in `components/` for the UI
4. Add a new page under `app/cineflow/page.tsx` etc.

The `generate()` function in `lib/ai.ts` is the single connection point —
swap the AI provider once there and every route switches automatically.
