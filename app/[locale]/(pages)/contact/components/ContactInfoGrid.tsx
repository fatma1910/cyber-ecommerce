import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import type { ComponentType } from "react";
import { getTranslations } from "next-intl/server";

type ContactInfo = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

function ContactCard({ title, description, icon: Icon }: ContactInfo) {
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

export default async function ContactInfoGrid() {
  const t = await getTranslations("contact.info");

  const contactInfo: ContactInfo[] = [
    {
      title: t("addressTitle"),
      description: t("addressDescription"),
      icon: MapPin,
    },
    {
      title: t("phoneTitle"),
      description: t("phoneDescription"),
      icon: Phone,
    },
    {
      title: t("emailTitle"),
      description: t("emailDescription"),
      icon: Mail,
    },
    {
      title: t("hoursTitle"),
      description: t("hoursDescription"),
      icon: Clock3,
    },
  ];

  return (
    <section className="padding-x py-16 sm:py-20">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {contactInfo.map((item) => (
          <ContactCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
