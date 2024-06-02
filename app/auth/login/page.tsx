import { auth, signIn } from "@/auth";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session) return redirect("/");

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Click below to log into Generate FinOps using your Northeastern
              credentials.
            </p>
          </div>

          <div className="mx-auto">
            <form
              action={async () => {
                "use server";
                await signIn("microsoft-entra-id");
              }}
            >
              <Button type="submit">Log In with Microsoft Entra ID</Button>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
