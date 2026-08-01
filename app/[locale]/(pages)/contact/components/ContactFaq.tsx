import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getTranslations } from "next-intl/server";

type FaqItem = {
  value: string;
  question: string;
  answer: string;
};

export default async function ContactFaq() {
  const t = await getTranslations("contact.faq");

  const faqs: FaqItem[] = [
    {
      value: "shipping",
      question: t("items.shipping.question"),
      answer: t("items.shipping.answer"),
    },
    {
      value: "returns",
      question: t("items.returns.question"),
      answer: t("items.returns.answer"),
    },
    {
      value: "payment",
      question: t("items.payment.question"),
      answer: t("items.payment.answer"),
    },
    {
      value: "support",
      question: t("items.support.question"),
      answer: t("items.support.answer"),
    },
    {
      value: "order",
      question: t("items.order.question"),
      answer: t("items.order.answer"),
    },
  ];

  return (
    <section className="padding-x py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">{t("eyebrow")}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <div className="rounded-[2rem] border border-border bg-card p-4 shadow-sm sm:p-6">
          <Accordion defaultValue={["shipping"]} className="gap-0">
            {faqs.map((item) => (
              <AccordionItem key={item.value} value={item.value} className="border-border px-2">
                <AccordionTrigger className="py-4 text-start text-base font-medium text-foreground no-underline hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
