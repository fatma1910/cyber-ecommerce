import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import CheckoutClient from "./components/CheckoutClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.checkout");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Page() {
  return <CheckoutClient />;
}
