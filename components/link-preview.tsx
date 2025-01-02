"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, isValidUrl } from "@/lib/utils";
import { UrlUnfurl } from "@/types";
import { ImageOffIcon, SparklesIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { Metadata } from "unfurl.js/dist/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface LinkPreviewProps {
  url: string;
  setUnfurl: (data: UrlUnfurl) => void;
  className?: string;
}

export function LinkPreview({ url, setUnfurl, className }: LinkPreviewProps) {
  const [data, setData] = useState<UrlUnfurl | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url || !isValidUrl(url)) return;

    const fetchUnfurledData = async () => {
      setError(null);

      try {
        setLoading(true);
        const response = await fetch(
          `/api/unfurl?url=${encodeURIComponent(url)}`
        );
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch unfurled data");
        }

        const unfurledData = result as Metadata;
        const unfurledDataObj = {
          hostname: new URL(url).hostname.replace("www.", "") ?? "",
          title: unfurledData.open_graph?.title ?? unfurledData.title,
          author:
            unfurledData.twitter_card?.site ??
            unfurledData.open_graph?.site_name ??
            unfurledData.author,
          description:
            unfurledData.open_graph?.description ?? unfurledData.description,
          favicon: unfurledData.favicon,
          imageUrl:
            unfurledData.open_graph?.images?.[0]?.url ??
            unfurledData.twitter_card?.images?.[0]?.url,
        };
        setData(unfurledDataObj);
        setUnfurl(unfurledDataObj);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error fetching link preview"
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUnfurledData();
  }, [url]);

  if (!url || !isValidUrl(url)) return null;

  if (loading) {
    return (
      <Card className={cn("w-full bg-transparent", className)}>
        <CardContent className="p-4 flex items-center space-x-4">
          <Skeleton className="h-20 w-20 flex-shrink-0 rounded-md" />
          <div className="flex-grow">
            <div className="flex items-center mb-2 gap-2">
              <Skeleton className="h-4 w-4 flex-shrink-0 rounded-md" />
              <Skeleton className="h-4 w-[100px] rounded-md" />
            </div>
            <Skeleton className="h-4 w-3/4 mb-2 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn("w-full bg-transparent", className)}>
        <CardContent className="px-4 py-3 text-red-500 text-sm">
          {error ?? "Unable to generate link preview"}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "w-0 min-w-full max-w-xs bg-transparent overflow-hidden shadow-none rounded-md",
        className
      )}
    >
      <CardHeader className="bg-generate-green text-white py-1.5 px-4">
        <h3 className="flex flex-row gap-2 items-center font-mono uppercase">
          <SparklesIcon className="size-4" />
          Link Preview
        </h3>
        <p className="text-sm">
          We pre-filled some fields for you from this product link.{" "}
          <strong>Please verify the fields below and correct errors.</strong>
        </p>
      </CardHeader>
      <CardContent className="p-4 flex items-start space-x-4">
        {data?.imageUrl && (
          <Avatar className="w-20 h-20 rounded-md flex-shrink-0">
            <AvatarImage
              src={data.imageUrl}
              alt="Product image"
              className="w-20 h-20 object-cover rounded-md"
            ></AvatarImage>
            <AvatarFallback className="rounded-md">
              <ImageOffIcon />
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex-grow min-w-0">
          <div className="flex items-center mb-1 gap-2">
            {data?.favicon ? (
              <Avatar className="w-4 h-4">
                <AvatarImage
                  src={data.favicon}
                  alt="Favicon"
                  className="w-4 h-4"
                ></AvatarImage>
                <AvatarFallback className="text-xs">?</AvatarFallback>
              </Avatar>
            ) : null}
            <span className="text-xs text-slate-600 truncate">
              {data?.siteName ?? new URL(url).host.replace("www.", "")}
            </span>
          </div>
          {data?.title ? (
            <h3 className="text-sm font-semibold mb-1 truncate">
              {data.title}
            </h3>
          ) : null}
          {data?.description ? (
            <p className="text-xs text-slate-600 line-clamp-2">
              {data.description}
            </p>
          ) : null}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-500 hover:underline mt-1 block truncate"
          >
            {url}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
