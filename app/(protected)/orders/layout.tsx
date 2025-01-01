export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="grid w-full max-w-6xl gap-2 mx-auto">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          Orders
        </h1>
      </div>

      <div className="grid gap-6">{children}</div>
    </>
  );
}
