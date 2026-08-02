"use client";

import { useTranslations } from "next-intl";
import type { UseFormRegister } from "react-hook-form";

import { cn } from "@/lib/utils";

import { CheckoutFormValues, PaymentMethodValue } from "@/lib/hooks/checkout-schema";
import { paymentMethods } from "@/lib/constant";


type PaymentMethodsProps = {
  register: UseFormRegister<CheckoutFormValues>;
  selectedMethod: PaymentMethodValue;
};

export default function PaymentMethods({
  register,
  selectedMethod,
}: PaymentMethodsProps) {
  const t = useTranslations("checkout");

  return (
    <section className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">{t("payment.title")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("payment.description")}
        </p>
      </div>

      <div className="grid gap-3">
        {paymentMethods.map((method) => {
          const checked = selectedMethod === method.value;
          const disabled = method.disabled;

          return (
            <label
              key={method.value}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition",
                checked
                  ? "border-foreground/70 bg-muted/50 shadow-sm"
                  : "border-border bg-white hover:border-foreground/40",
                disabled && "cursor-not-allowed opacity-60 hover:border-border"
              )}
            >
              <span className="mt-0.5 flex size-5 items-center justify-center">
                <input
                  type="radio"
                  value={method.value}
                  disabled={disabled}
                  className="sr-only"
                  {...register("paymentMethod")}
                />
                <span
                  className={cn(
                    "flex size-4 items-center justify-center rounded-full border",
                    checked
                      ? "border-foreground bg-foreground"
                      : "border-border bg-background"
                  )}
                >
                  <span
                    className={cn(
                      "size-2 rounded-full bg-background transition",
                      checked ? "scale-100" : "scale-0"
                    )}
                  />
                </span>
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{t(method.titleKey)}</span>
                  {(() => {
                    const badge = "badgeKey" in method ? method.badgeKey : method.badge;
                    return badge ? (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {t(badge)}
                      </span>
                    ) : null;
                  })()}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {t(method.descriptionKey)}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}
