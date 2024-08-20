import * as React from "react";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { StarsIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed read-only:cursor-not-allowed disabled:opacity-50 read-only:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const AutoFilledInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <>
        <Input {...props} />
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute inset-y-0 flex items-center justify-center end-0 aspect-square shrink-0 rounded-l-md text-slate-400 dark:text-slate-600">
              <StarsIcon className="size-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Auto-filled</p>
          </TooltipContent>
        </Tooltip>
      </>
    );
  },
);

export { Input, AutoFilledInput };
