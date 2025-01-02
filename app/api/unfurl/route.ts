import { NextResponse } from 'next/server';
import { unfurl } from 'unfurl.js';
import { z } from 'zod';

const urlSchema = z.object({
  url: z.string().url(),
});

const CHROME_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlParam = searchParams.get('url');

  try {
    const { url } = urlSchema.parse({ url: urlParam });
    const result = await unfurl(url, {
      headers: { 'User-Agent': CHROME_UA }
    });
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors[0].message }, { status: 400 });
    }
    return Response.json({ error: 'Failed to fetch metadata' }, { status: 500 });
  }
}
