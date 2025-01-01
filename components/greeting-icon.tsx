import dayjs from "@/lib/dayjs";
import { CloudSunIcon, MoonStarIcon, SunIcon } from "lucide-react";

export function GreetingIcon({ className }: { className?: string }) {
  const currentHour = dayjs().hour();

  if (currentHour < 12) {
    return <SunIcon className={className} />;
  } else if (currentHour < 18) {
    return <CloudSunIcon className={className} />;
  }
  return <MoonStarIcon className={className} />;
}
