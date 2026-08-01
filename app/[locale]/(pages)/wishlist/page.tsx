import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import WishlistClient from "./WishlistClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.wishlist");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Page() {
  return <WishlistClient />;
}
