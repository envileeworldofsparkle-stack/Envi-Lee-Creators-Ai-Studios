// ============================================================
//  app/api/generate/listing/route.ts
//  POST /api/generate/listing
//
//  🔑 Add ANTHROPIC_API_KEY or OPENAI_API_KEY to .env.local
// ============================================================

import { NextRequest, NextResponse } from 'next/server'

const PROVIDER: 'anthropic' | 'openai' = 'anthropic'

async function generate(prompt: string): Promise<string> {
  if (PROVIDER === 'anthropic') {
    const key = process.env.ANTHROPIC_API_KEY
    if (!key) return PLACEHOLDER
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1024, messages: [{ role: 'user', content: prompt }] }),
    })
    if (!res.ok) throw new Error(`Anthropic error ${res.status}`)
    const d = await res.json()
    return d.content?.[0]?.text ?? ''
  }
  if (PROVIDER === 'openai') {
    const key = process.env.OPENAI_API_KEY
    if (!key) return PLACEHOLDER
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model: 'gpt-4o', max_tokens: 1024, messages: [{ role: 'user', content: prompt }] }),
    })
    if (!res.ok) throw new Error(`OpenAI error ${res.status}`)
    const d = await res.json()
    return d.choices?.[0]?.message?.content ?? ''
  }
  return PLACEHOLDER
}

const PLACEHOLDER = `TITLE:
Luxury Floral Crop Tee | Women's Premium POD Shirt | Elevated Streetwear

DESCRIPTION:
Elevate your wardrobe with this stunning luxury floral crop tee. Designed for the woman who moves through life with intention and style. Soft premium fabric, a flattering cropped silhouette, and a bold print that turns heads everywhere you go.

KEY FEATURES:
• Premium soft fabric — feels as good as it looks
• Flattering cropped cut — pairs with high-waist jeans, skirts, or sets
• Vibrant print that holds its color wash after wash
• True to size — check our size guide for best fit
• Ships in 3–5 business days via Printify

SEO TAGS:
luxury crop tee, Black-owned fashion, floral crop top, womens crop shirt, aesthetic tee, elevated streetwear, POD fashion, premium graphic tee, cute crop top, fashion gift for her

TIKTOK CAPTION:
This tee just changed my whole fit 🖤 Link in bio to shop ↗

[🔑 Add ANTHROPIC_API_KEY to .env.local to enable real AI generation]`

export async function POST(req: NextRequest) {
  try {
    const { productName, details, platform, targetAudience } = await req.json()
    if (!productName) return NextResponse.json({ error: 'productName is required' }, { status: 400 })

    const platformGuides: Record<string, string> = {
      Etsy: 'Title under 140 chars. 13 tags each under 20 chars. Warm, conversational tone.',
      Shopify: 'Conversion-focused. Longer description with lifestyle benefits. No hard limits.',
      'TikTok Shop': 'Short and punchy. Trend-aware. Emojis welcome. Lead with the hook.',
      Amazon: 'Keyword-dense title under 200 chars. 5 bullet points. Professional tone.',
    }

    const prompt = `You are a top-performing POD ecommerce copywriter.

Product: ${productName}
Details: ${details || 'a premium stylish fashion item'}
Platform: ${platform || 'Etsy'}
Audience: ${targetAudience || 'women aged 22–40 who love fashion and luxury aesthetics'}
Platform guidance: ${platformGuides[platform ?? 'Etsy'] ?? platformGuides.Etsy}

Write all of the following:

TITLE:
SEO-optimised product title for ${platform || 'Etsy'}.

DESCRIPTION:
Lifestyle-led product description. Sell the feeling, not just the item. Include quality, who it's for, and a soft CTA.

KEY FEATURES (5 bullet points):
Each under 15 words. Lead with the benefit.

SEO TAGS:
Comma separated, each under 20 characters. Mix broad and specific.

TIKTOK CAPTION:
Hook + product mention + CTA. Under 150 characters.`

    const result = await generate(prompt)
    return NextResponse.json({ result })
  } catch (err) {
    console.error('[/api/generate/listing]', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
