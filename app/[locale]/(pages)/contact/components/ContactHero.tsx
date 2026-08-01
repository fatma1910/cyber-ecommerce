import { getTranslations } from "next-intl/server";

export default async function ContactHero() {
  const t = await getTranslations("contact.hero");

  return (
    <section className="border-b border-border/70 bg-gradient-to-b from-muted/50 to-background">
      <div className="padding-x py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}
