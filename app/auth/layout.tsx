import groupPhoto from "@/images/group-photo.jpg";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-full max-w-sm gap-6">{children}</div>
      </div>

      <div className="hidden bg-[#187dff] lg:block">
        <Image
          src={groupPhoto}
          alt="Group photo"
          placeholder="blur"
          className="h-full w-full object-cover grayscale opacity-70 dark:opacity-100"
        />
      </div>
    </div>
  );
}
