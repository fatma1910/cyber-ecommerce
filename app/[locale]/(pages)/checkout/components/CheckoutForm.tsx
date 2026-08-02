"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { Control } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/ui/field";

import AddressForm from "./AddressForm";
import PaymentMethods from "./PaymentMethods";
import { CheckoutFormValues, PaymentMethodValue } from "@/lib/hooks/checkout-schema";


type CheckoutFormProps = {
  formId: string;
  register: UseFormRegister<CheckoutFormValues>;
  control: Control<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
  selectedMethod: PaymentMethodValue;
  cityOptions: Array<{
    value: string;
    label: string;
  }>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function CheckoutForm({
  formId,
  register,
  control,
  errors,
  selectedMethod,
  cityOptions,
  onSubmit,
}: CheckoutFormProps) {
  const t = useTranslations("checkout");

  return (
    <form id={formId} onSubmit={onSubmit}>
      <div className="space-y-6">
        <section className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">{t("contact.title")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("contact.description")}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="checkout-fullName">
                {t("contact.fullName")}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="checkout-fullName"
                autoComplete="name"
                placeholder={t("contact.fullNamePlaceholder")}
                aria-invalid={!!errors.contact?.fullName}
                {...register("contact.fullName")}
              />
              <FieldError errors={[errors.contact?.fullName]} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="checkout-email">
                {t("contact.email")}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="checkout-email"
                type="email"
                autoComplete="email"
                placeholder={t("contact.emailPlaceholder")}
                aria-invalid={!!errors.contact?.email}
                {...register("contact.email")}
              />
              <FieldError errors={[errors.contact?.email]} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkout-phone">
                {t("contact.phone")}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="checkout-phone"
                type="tel"
                autoComplete="tel"
                placeholder={t("contact.phonePlaceholder")}
                aria-invalid={!!errors.contact?.phone}
                {...register("contact.phone")}
              />
              <FieldError errors={[errors.contact?.phone]} />
            </div>
          </div>
        </section>

        <AddressForm
          register={register}
          control={control}
          errors={errors}
          cityOptions={cityOptions}
        />

        <PaymentMethods
          register={register}
          selectedMethod={selectedMethod}
        />
      </div>
    </form>
  );
}
