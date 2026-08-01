"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

type ContactField = "name" | "email" | "subject" | "message";

type ContactFormState = Record<ContactField, string>;
type ContactFormErrors = Partial<Record<ContactField, string>>;

function validateContactForm(values: ContactFormState, messages: {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  subjectRequired: string;
  messageRequired: string;
  messageDetail: string;
}) {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) errors.name = messages.nameRequired;
  if (!values.email.trim()) {
    errors.email = messages.emailRequired;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = messages.emailInvalid;
  }
  if (!values.subject.trim()) errors.subject = messages.subjectRequired;
  if (!values.message.trim()) errors.message = messages.messageRequired;
  else if (values.message.trim().length < 20) {
    errors.message = messages.messageDetail;
  }

  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-1 text-sm text-destructive">
      {message}
    </p>
  );
}

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const validationMessages = {
    nameRequired: t("validation.nameRequired"),
    emailRequired: t("validation.emailRequired"),
    emailInvalid: t("validation.emailInvalid"),
    subjectRequired: t("validation.subjectRequired"),
    messageRequired: t("validation.messageRequired"),
    messageDetail: t("validation.messageDetail"),
  };

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    const field = name as ContactField;

    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateContactForm(form, validationMessages);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsSubmitted(false);
      return;
    }

    setIsSubmitted(true);
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <section className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">{t("labels.name")}</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("placeholders.name")}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            <FieldError id="name-error" message={errors.name} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("labels.email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("placeholders.email")}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            <FieldError id="email-error" message={errors.email} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">{t("labels.subject")}</Label>
          <Input
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder={t("placeholders.subject")}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          />
          <FieldError id="subject-error" message={errors.subject} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">{t("labels.message")}</Label>
          <Textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={t("placeholders.message")}
            className="min-h-40"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          <FieldError id="message-error" message={errors.message} />
        </div>

        {isSubmitted ? (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {t("success")}
          </p>
        ) : null}

        <Button type="submit" size="lg" className="gap-2 px-4 cursor-pointer">
          <Send className="h-4 w-4" aria-hidden="true" />
          {t("submit")}
        </Button>
      </form>
    </section>
  );
}
