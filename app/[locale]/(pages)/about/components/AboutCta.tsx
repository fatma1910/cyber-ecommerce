import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default async function AboutCta() {
  const t = await getTranslations("about.cta");

  return (
    <section className="border-t border-border bg-primary">
      <div className="padding-x py-14 sm:py-16">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/75 sm:text-base">
              {t("description")}
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-white bg-transparent px-14 py-4 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            {t("button")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
