import {
  Award,
  Headset,
  ShieldCheck,
  Truck,
} from "lucide-react";
import type { ComponentType } from "react";
import { getTranslations } from "next-intl/server";
import SectionHeading from "./SectionHeading";

type Feature = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

function FeatureCard({ title, description, icon: Icon }: Feature) {
  return (
    <article className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-primary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </article>
  );
}

export default async function AboutBenefits() {
  const t = await getTranslations("about.benefits");

  const features: Feature[] = [
    {
      title: t("items.quality.title"),
      description: t("items.quality.description"),
      icon: Award,
    },
    {
      title: t("items.shipping.title"),
      description: t("items.shipping.description"),
      icon: Truck,
    },
    {
      title: t("items.payments.title"),
      description: t("items.payments.description"),
      icon: ShieldCheck,
    },
    {
      title: t("items.support.title"),
      description: t("items.support.description"),
      icon: Headset,
    },
  ];

  return (
    <section className="bg-muted/30">
      <div className="padding-x py-16 sm:py-20">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
