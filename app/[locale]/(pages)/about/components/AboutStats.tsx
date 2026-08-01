import SectionHeading from "./SectionHeading";
import { getTranslations } from "next-intl/server";

type Stat = {
  value: string;
  label: string;
  description: string;
};

function StatCard({ value, label, description }: Stat) {
  return (
    <article className="rounded-3xl border border-border bg-background p-6 shadow-sm">
      <p className="text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      <h3 className="mt-3 text-base font-semibold text-foreground">{label}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </article>
  );
}

export default async function AboutStats() {
  const t = await getTranslations("about.stats");

  const stats: Stat[] = [
    {
      value: t("items.customers.value"),
      label: t("items.customers.label"),
      description: t("items.customers.description"),
    },
    {
      value: t("items.products.value"),
      label: t("items.products.label"),
      description: t("items.products.description"),
    },
    {
      value: t("items.orders.value"),
      label: t("items.orders.label"),
      description: t("items.orders.description"),
    },
    {
      value: t("items.experience.value"),
      label: t("items.experience.label"),
      description: t("items.experience.description"),
    },
  ];

  return (
    <section>
      <div className="padding-x py-16 sm:py-20">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
