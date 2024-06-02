import { redirect } from "next/navigation";

export default async function Home() {
  return redirect("/reimbursements/new");

  // const session = await auth();
  // if (!session) return redirect("/auth/login");
  //
  // return (
  //   <>
  //     <div className="p-4 mx-auto w-screen-md bg-slate-100">
  //       <pre className="text-xs break-all whitespace-pre-wrap">
  //         {JSON.stringify(session, null, 2)}
  //       </pre>
  //     </div>

  //     <div className="mt-12">
  //       {/* <FormPoc /> */}
  //       {/* <RowPoc /> */}
  //       {/* <VoucherPoc /> */}
  //     </div>
  //   </>
  // );
}
