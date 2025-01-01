"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

type Props = {};

function capitalizeLink(link: string) {
  return link[0].toUpperCase() + link.slice(1, link.length);
}

export const Breadcrumbs = ({}: Props) => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.slice(0, paths.length - 1).map((path, i) => (
          <>
            <BreadcrumbItem key={`${path}-${i}`} className="hidden md:block">
              <BreadcrumbLink asChild>
                <Link href={`/${path}`}>{capitalizeLink(path)}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>
            {capitalizeLink(paths[paths.length - 1])}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
