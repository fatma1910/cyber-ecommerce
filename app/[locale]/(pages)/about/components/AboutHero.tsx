import { getTranslations } from "next-intl/server";
import {
  Clock3,
  PackageCheck,
  Sparkles,
  Users,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

export default async function AboutHero() {
  const t = await getTranslations("about.hero");

  return (
    <section className="border-b border-border/70 bg-gradient-to-b from-muted/50 to-background">
      <div className="padding-x py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            level={1}
          />

          <div className="rounded-[2rem] border border-border bg-card p-5 shadow-sm sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-muted/70 p-5">
                <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
                <p className="mt-4 text-sm font-medium text-foreground">{t("cards.curated.title")}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("cards.curated.description")}</p>
              </div>
              <div className="rounded-2xl bg-muted/70 p-5">
                <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                <p className="mt-4 text-sm font-medium text-foreground">{t("cards.customers.title")}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("cards.customers.description")}</p>
              </div>
              <div className="rounded-2xl bg-muted/70 p-5">
                <PackageCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                <p className="mt-4 text-sm font-medium text-foreground">{t("cards.fulfillment.title")}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("cards.fulfillment.description")}</p>
              </div>
              <div className="rounded-2xl bg-muted/70 p-5">
                <Clock3 className="h-5 w-5 text-primary" aria-hidden="true" />
                <p className="mt-4 text-sm font-medium text-foreground">{t("cards.improving.title")}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("cards.improving.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
