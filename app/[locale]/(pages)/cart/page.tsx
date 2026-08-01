import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CartClient from "./CartClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.cart");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Page() {
  return <CartClient />;
}
