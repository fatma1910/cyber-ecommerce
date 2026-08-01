import {
  Headset,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function ContactQuickHelp() {
  const t = await getTranslations("contact.quickHelp");

  return (
    <section className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">{t("eyebrow")}</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-muted/70 p-4">
          <Users className="h-5 w-5 text-primary" aria-hidden="true" />
          <p className="mt-3 text-sm font-medium text-foreground">{t("items.sales.title")}</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{t("items.sales.description")}</p>
        </div>
        <div className="rounded-2xl bg-muted/70 p-4">
          <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
          <p className="mt-3 text-sm font-medium text-foreground">{t("items.account.title")}</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{t("items.account.description")}</p>
        </div>
        <div className="rounded-2xl bg-muted/70 p-4">
          <Truck className="h-5 w-5 text-primary" aria-hidden="true" />
          <p className="mt-3 text-sm font-medium text-foreground">{t("items.shipping.title")}</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{t("items.shipping.description")}</p>
        </div>
        <div className="rounded-2xl bg-muted/70 p-4">
          <Headset className="h-5 w-5 text-primary" aria-hidden="true" />
          <p className="mt-3 text-sm font-medium text-foreground">{t("items.support.title")}</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{t("items.support.description")}</p>
        </div>
      </div>
    </section>
  );
}
