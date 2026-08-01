import { getTranslations } from "next-intl/server";
import { MapPin } from "lucide-react";

export default async function ContactMapPlaceholder() {
  const t = await getTranslations("contact.map");

  return (
    <section className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">{t("eyebrow")}</p>
      <div className="mt-4 flex min-h-72 items-center justify-center rounded-3xl border border-dashed border-border bg-gradient-to-br from-muted/70 to-background p-8 text-center">
        <div className="max-w-sm">
          <MapPin className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">{t("title")}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("description")}</p>
        </div>
      </div>
    </section>
  );
}
