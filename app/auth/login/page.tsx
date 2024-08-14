import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session) return redirect("/");

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Log In</h1>
        <p className="text-balance text-slate-700 dark:text-slate-300">
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
    </>
  );
}
