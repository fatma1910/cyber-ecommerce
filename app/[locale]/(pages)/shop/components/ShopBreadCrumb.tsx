'use client'

import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { useSearchParams } from "next/navigation";


export function ShopBreadcrumb() {
  const searchParams = useSearchParams();

  // const search = searchParams.get("search");
  const category = searchParams.get("category");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/">Home</Link>} />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
            <BreadcrumbItem>
          <BreadcrumbLink render={<a href="#">Shop</a>} />  
            </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{category || "All"}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
