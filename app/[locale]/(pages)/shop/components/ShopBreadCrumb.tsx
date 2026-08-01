'use client'

import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { useSearchParams } from "next/navigation";
import { CategoryDetails } from "@/lib/types";
import { useTranslations } from "next-intl";


export function ShopBreadcrumb({ categories}: { categories?:CategoryDetails[] }) {
  const searchParams = useSearchParams();
  const t = useTranslations("shop.breadcrumb");

  const categoryId = searchParams.get("category");
  const category = categories?.find((cat) => cat.id.toString() === categoryId)?.name;

  return (
    <Breadcrumb>
      <BreadcrumbList className="overflow-x-auto pb-1">
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/">{t("home")}</Link>} />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
            <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/shop">{t("shop")}</Link>} />  
            </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{category || t("all")}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
