// app/api/generate/listing/route.ts
// POST /api/generate/listing
// Body: { productName, details, platform, targetAudience }
// Returns: { result: string }

import { NextRequest, NextResponse } from 'next/server'
import { generate } from '@/lib/ai'

export async function POST(req: NextRequest) {
  try {
    const { productName, details, platform, targetAudience } = await req.json()

    if (!productName) {
      return NextResponse.json({ error: 'productName is required' }, { status: 400 })
    }

    const platformGuide: Record<string, string> = {
      Etsy: 'Optimise for Etsy SEO. Title under 140 chars. 13 tags, each under 20 chars. Conversational, warm tone.',
      Shopify: 'Optimise for conversion. Longer description with benefits. Brand voice. No character limits.',
      'TikTok Shop': 'Short and punchy. Trend-aware language. Use emojis. Lead with the hook.',
      Amazon: 'Keyword-dense title under 200 chars. 5 bullet points. Professional tone.',
    }

    const guide = platformGuide[platform ?? 'Etsy'] ?? platformGuide.Etsy

    const prompt = `You are a top-performing POD (print-on-demand) Etsy and ecommerce copywriter.

Write a complete product listing for the following:

Product name: ${productName}
Product details: ${details || 'a premium, stylish fashion item'}
Platform: ${platform || 'Etsy'}
Target audience: ${targetAudience || 'women aged 22–40 who love fashion and luxury aesthetics'}

Platform guidance: ${guide}

Write all of these:

TITLE:
An SEO-optimised, compelling product title.

DESCRIPTION:
A full product description that sells the lifestyle, not just the item. Include: main benefit, material/quality, who it is for, and a soft call to action.

KEY FEATURES (5 bullet points):
Each under 15 words. Lead with the benefit.

SEO TAGS (13 tags):
Comma separated. Each under 20 characters. Mix of specific and broad.

TIKTOK CAPTION:
A short, punchy TikTok caption to promote this product. Include a hook, the product, and a CTA. Under 150 characters.`

    const result = await generate(prompt)
    return NextResponse.json({ result })
  } catch (err) {
    console.error('[/api/generate/listing]', err)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
