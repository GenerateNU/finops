import { auth } from "@/auth";
import { getMember } from "@/lib/drive/sheets";

import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return redirect("/auth/login");
  }

  const member = await getMember(session.user.email).catch(() =>
    redirect("/auth/error?error=AccessDenied")
  );

  return (
    <>
      <div className="grid w-full max-w-5xl gap-2">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          Debug
        </h1>
      </div>

      <div className="mt-2 grid w-full max-w-5xl gap-2">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          User Session
        </h2>

        <div className="p-4 mx-auto w-full bg-slate-100 rounded-md">
          <pre className="text-xs break-all whitespace-pre-wrap">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>

      <div className="mt-4 grid w-full max-w-5xl gap-2">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Member Profile
        </h2>

        <div className="p-4 mx-auto w-full bg-slate-100">
          <pre className="text-xs break-all whitespace-pre-wrap">
            {JSON.stringify(member, null, 2)}
          </pre>
        </div>
      </div>
    </>
  );
}
