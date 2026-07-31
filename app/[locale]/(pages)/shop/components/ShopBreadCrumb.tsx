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
import { CategoryDetails } from "@/lib/types";


export function ShopBreadcrumb({ categories}: { categories?:CategoryDetails[] }) {
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("category");
  const category = categories?.find((cat) => cat.id.toString() === categoryId)?.name;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/">Home</Link>} />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
            <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/shop">Shop</Link>} />  
            </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{category || "All"}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
