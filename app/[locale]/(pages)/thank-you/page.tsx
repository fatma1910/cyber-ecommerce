import type { Metadata } from "next";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.thankYou");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Page() {
  const t = await getTranslations("thankYou");
  const common = await getTranslations("common");

  return (
    <section className="padding">
      <div className="mx-auto flex max-w-2xl flex-col items-center rounded-[28px] border border-border bg-white px-6 py-16 text-center shadow-sm sm:px-10">
        <div className="flex size-18 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="size-10" />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          {t("eyebrow")}
        </p>

        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
          {t("title")}
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            nativeButton={false}
            render={<Link href="/shop" />}
            className="px-6 py-3"
          >
            {common("startShopping")}
          </Button>

          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href="/" />}
            className="px-6 py-3"
          >
            {t("home")}
          </Button>
        </div>

        <div className="mt-10 flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 text-sm text-muted-foreground">
          <ShoppingBag className="size-4" />
          <span>{t("note")}</span>
        </div>
      </div>
    </section>
  );
}
