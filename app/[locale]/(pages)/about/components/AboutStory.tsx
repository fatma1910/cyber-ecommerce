import { getTranslations } from "next-intl/server";
import SectionHeading from "./SectionHeading";

export default async function AboutStory() {
  const t = await getTranslations("about.story");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section className="padding-x py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
