"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface LinkPreviewProps {
  url: string;
}

interface UnfurledData {
  title?: string;
  description?: string;
  favicon?: string;
  author?: string;
  twitter_card?: {
    site: string;
  };
  open_graph?: {
    description?: string;
    images?: { url: string }[];
    site_name?: string;
    title?: string;
  };
}

const isValidUrl = (text: string) => {
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
};

export function LinkPreview({ url }: LinkPreviewProps) {
  const [data, setData] = useState<UnfurledData | null>(null);
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
        setData(result);
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
      <Card className="w-full max-w-md">
        <CardContent className="p-4 flex items-center space-x-4">
          <Skeleton className="h-16 w-16 flex-shrink-0" />
          <div className="flex-grow">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-4">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const siteName =
    data?.twitter_card?.site ?? data?.open_graph?.site_name ?? data?.author;
  const imageUrl = data?.open_graph?.images?.[0]?.url;

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-4 flex items-start space-x-4">
        {imageUrl && (
          <div className="flex-shrink-0">
            <img
              src={imageUrl}
              alt={data?.title || "Link preview"}
              className="w-20 h-20 object-cover rounded"
            />
          </div>
        )}
        <div className="flex-grow min-w-0">
          <div className="flex items-center mb-1">
            {data?.favicon ? (
              <Avatar className="w-4 h-4 mr-2">
                <AvatarImage
                  src={data.favicon}
                  alt="Favicon"
                  className="w-4 h-4"
                ></AvatarImage>
                <AvatarFallback className="text-xs">?</AvatarFallback>
              </Avatar>
            ) : null}
            <span className="text-xs text-gray-500">
              {siteName ?? new URL(url).host.replace("www.", "")}
            </span>
          </div>
          <h3 className="text-sm font-semibold mb-1 truncate">
            {data?.open_graph?.title ?? data?.title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2">
            {data?.open_graph?.description ?? data?.description}
          </p>
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
