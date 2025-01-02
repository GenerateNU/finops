import { NextResponse } from 'next/server';
import { unfurl } from 'unfurl.js';
import { z } from 'zod';

const urlSchema = z.object({
  url: z.string().url(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlParam = searchParams.get('url');

  try {
    const { url } = urlSchema.parse({ url: urlParam });
    const result = await unfurl(url);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid URL parameter' }, { status: 400 });
    }
    console.error('Error unfurling URL:', error);
    return NextResponse.json({ error: 'Failed to unfurl URL' }, { status: 500 });
  }
}
