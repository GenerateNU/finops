import { Card } from "@/components/ui/card";
import { LoaderIcon } from "lucide-react";

export default function Loading() {
  return (
    <Card className="m-4">
      <div className="flex items-center justify-center p-12">
        <LoaderIcon className="block size-12 text-slate-400 animate-spin" />
      </div>
    </Card>
  );
}
