import { VENDORS } from '@/lib/globals';
import { UrlUnfurl } from '@/types';
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

    let userAgent = undefined;
    const fullUrl = new URL(url);
    const dk = VENDORS.find(v => v.name === "DigiKey Electronics");

    if (fullUrl.hostname && dk) {
      try {
        const vendorHostname = new URL(dk.url).hostname?.replace("www.", "");
        if (fullUrl.hostname.replace("www.", "") === vendorHostname) {
          userAgent = CHROME_UA;
        }
      } catch {
        console.log("dk url invalid");
      }
    }

    const result = await unfurl(url, userAgent ? {
      headers: { 'User-Agent': userAgent }
    } : {});

    const metadata: UrlUnfurl = {
      hostname: new URL(url).hostname.replace("www.", "") ?? "",
      title: (result.open_graph?.title ?? result.title) === "McMaster-Carr"
        ? undefined
        : cleanTitle(
          result.open_graph?.title ?? result.title,
          new URL(url).hostname
        ),
      siteName: (result.open_graph?.title ?? result.title) === "McMaster-Carr" ? "McMaster-Carr" :
        result.twitter_card?.site ??
        result.open_graph?.site_name ??
        result.author,
      description: (result.open_graph?.title ?? result.title) === "McMaster-Carr"
        ? undefined
        : result.open_graph?.description ?? result.description,
      favicon: result.favicon,
      imageUrl: (result.open_graph?.title ?? result.title) === "McMaster-Carr" ? undefined :
        result.open_graph?.images?.[0]?.url ??
        result.twitter_card?.images?.[0]?.url,
    };

    return NextResponse.json(metadata);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
  }
}

function cleanTitle(title: string | undefined, hostname: string): string | undefined {
  if (!title) return undefined;

  // Remove hostname from title
  const cleanHostname = hostname.replace("www.", "");
  const hostnameParts = cleanHostname.split(".");
  const domain = hostnameParts[0];

  // Create regex patterns for common separators
  const separatorPattern = /\s*[-|:]\s*$/;

  // Remove vendor names and domain name with separators from the end
  let cleanedTitle = title;
  VENDORS.forEach(vendor => {
    const vendorPattern = new RegExp(`\\s*[-|:]\\s*${vendor.name}$`, 'i');
    cleanedTitle = cleanedTitle.replace(vendorPattern, '');
  });

  // Remove domain name with separators from the end
  const domainPattern = new RegExp(`\\s*[-|:]\\s*${domain}$`, 'i');
  cleanedTitle = cleanedTitle.replace(domainPattern, '');

  // Remove any remaining trailing separator
  cleanedTitle = cleanedTitle.replace(separatorPattern, '');

  return cleanedTitle.trim();
}

