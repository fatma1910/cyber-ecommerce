"use client";

import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Controller } from "react-hook-form";

import type { CheckoutFormValues } from "../validation/checkout-schema";

type AddressFormProps = {
  register: UseFormRegister<CheckoutFormValues>;
  control: Control<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
  cityOptions: Array<{
    value: string;
    label: string;
  }>;
};

export default function AddressForm({
  register,
  control,
  errors,
  cityOptions,
}: AddressFormProps) {
  const t = useTranslations("checkout");

  return (
    <section className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">{t("shipping.title")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("shipping.description")}
        </p>
      </div>

      <input type="hidden" {...register("shipping.country")} />

      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="checkout-country">{t("shipping.country")}</Label>
            <Input
              id="checkout-country"
              readOnly
              value={t("countries.egypt")}
              className="bg-muted/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkout-city">
              {t("shipping.city")}
              <span className="text-destructive">*</span>
            </Label>
            <Controller
              control={control}
              name="shipping.city"
              render={({ field }) => (
                <Select
                  value={field.value}
                  // @ts-expect-error Base UI select typing is narrower than the RHF handler here.
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="checkout-city"
                    className="h-11 w-full"
                  >
                    <SelectValue placeholder={t("shipping.cityPlaceholder")} />
                  </SelectTrigger>

                  <SelectContent
                    side="bottom"
                    align="start"
                    className="h-72 max-h-72"
                  >
                    {cityOptions.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <p className="text-xs text-muted-foreground">
              {t("shipping.cityHelp")}
            </p>
            <FieldError errors={[errors.shipping?.city]} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="checkout-street">
              {t("shipping.streetAddress")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="checkout-street"
              autoComplete="street-address"
              placeholder={t("shipping.streetAddressPlaceholder")}
              aria-invalid={!!errors.shipping?.streetAddress}
              {...register("shipping.streetAddress")}
            />
            <FieldError errors={[errors.shipping?.streetAddress]} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkout-building">
              {t("shipping.buildingNumber")}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="checkout-building"
              inputMode="numeric"
              placeholder={t("shipping.buildingNumberPlaceholder")}
              aria-invalid={!!errors.shipping?.buildingNumber}
              {...register("shipping.buildingNumber")}
            />
            <FieldError errors={[errors.shipping?.buildingNumber]} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="checkout-floor">{t("shipping.floor")}</Label>
            <Input
              id="checkout-floor"
              inputMode="numeric"
              placeholder={t("shipping.floorPlaceholder")}
              {...register("shipping.floor")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkout-apartment">
              {t("shipping.apartment")}
            </Label>
            <Input
              id="checkout-apartment"
              inputMode="text"
              placeholder={t("shipping.apartmentPlaceholder")}
              {...register("shipping.apartment")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkout-postal">{t("shipping.postalCode")}</Label>
            <Input
              id="checkout-postal"
              inputMode="numeric"
              placeholder={t("shipping.postalCodePlaceholder")}
              {...register("shipping.postalCode")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="checkout-notes">{t("shipping.additionalNotes")}</Label>
          <Textarea
            id="checkout-notes"
            rows={4}
            placeholder={t("shipping.additionalNotesPlaceholder")}
            className="resize-y"
            {...register("shipping.additionalNotes")}
          />
        </div>
      </div>
    </section>
  );
}
