import { getEnv } from "@/lib/utils";
import { BookTextIcon, FrownIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  content: {
    title: string;
    explanation: string;
    addAction: {
      title: string;
      url: string;
    };
  };
};

export const EmptyTable = ({ content }: Props) => {
  return (
    <div className="flex items-center flex-1 p-8 border border-dashed rounded-lg shadow-sm border-slate-200 dark:border-slate-800">
      <div className="flex flex-col gap-1">
        <div className="mb-2 bg-slate-200 p-2 rounded-md w-max">
          <FrownIcon className="size-6" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight">{content.title}</h3>
        <p className="text-slate-500 dark:text-slate-400">
          {content.explanation}
        </p>

        <div className="flex flex-row gap-2">
          <Button className="mt-6 w-max" before={<PlusCircleIcon />} asChild>
            <Link href={content.addAction.url}>{content.addAction.title}</Link>
          </Button>
          <Button
            variant="ghost"
            className="mt-6 w-max"
            before={<BookTextIcon />}
            asChild
          >
            <a
              href={getEnv("NEXT_PUBLIC_WIKI_PROCUREMENT_URL")}
              target="_blank"
            >
              View Wiki
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
