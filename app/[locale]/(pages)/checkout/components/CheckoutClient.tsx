"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/navigation";
import { useCartStore } from "@/store/cartStore";

import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";

import { checkoutCities, getShippingFeeByCity } from "@/lib/constant";
import {
  buildCheckoutSchema,
  CheckoutFormValues,
} from "@/lib/hooks/checkout-schema";

const FORM_ID = "checkout-form";

export default function CheckoutClient() {
  const t = useTranslations("checkout");
  const common = useTranslations("common");
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cartItems);
  const subtotal = useCartStore((state) => state.subtotal());
  const tax = useCartStore((state) => state.tax());
  const clearCart = useCartStore((state) => state.clearCart);
  const isCartEmpty = cartItems.length === 0;

  const cityOptions = useMemo(
    () =>
      checkoutCities.map((city) => ({
        value: city,
        label: t(`cities.${city}`),
      })),
    [t],
  );

  const schema = useMemo(
    () =>
      buildCheckoutSchema([...checkoutCities], {
        fullNameRequired: t("validation.fullNameRequired"),
        emailRequired: t("validation.emailRequired"),
        emailInvalid: t("validation.emailInvalid"),
        phoneRequired: t("validation.phoneRequired"),
        cityRequired: t("validation.cityRequired"),
        cityInvalid: t("validation.cityInvalid"),
        streetAddressRequired: t("validation.streetAddressRequired"),
        buildingNumberRequired: t("validation.buildingNumberRequired"),
      }),
    [t],
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      contact: {
        fullName: "",
        email: "",
        phone: "",
      },
      shipping: {
        country: t("countries.egypt"),
        city: "",
        streetAddress: "",
        buildingNumber: "",
        floor: "",
        apartment: "",
        postalCode: "",
        additionalNotes: "",
      },
      paymentMethod: "cash",
    },
    mode: "onSubmit",
  }) as ReturnType<typeof useForm<CheckoutFormValues>>;

  const paymentMethod = useWatch({
    control: form.control,
    name: "paymentMethod",
  });
  const selectedCity = useWatch({
    control: form.control,
    name: "shipping.city",
  });

  const shippingFee = getShippingFeeByCity(selectedCity);
  const discount = 0;
  const total = subtotal + shippingFee + tax - discount;

  const onSubmit = async (values: CheckoutFormValues) => {
    if (isCartEmpty) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 900));

    console.info("Checkout payload", values);
    clearCart();
    router.replace("/thank-you");
  };

  const submitHandler = form.handleSubmit(onSubmit);

  if (isCartEmpty) {
    return (
      <section className="padding">
        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl border border-dashed border-border bg-white px-6 py-16 text-center shadow-sm">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="size-8 text-muted-foreground" />
          </div>

          <h1 className="mt-6 text-3xl font-semibold">{t("empty.title")}</h1>

          <p className="mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
            {t("empty.description")}
          </p>

          <Button
            nativeButton={false}
            render={<Link href="/shop" />}
            className="mt-8 px-6 py-3"
          >
            {common("startShopping")}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="padding space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold sm:text-4xl">{t("title")}</h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          {t("description")}
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
        <CheckoutForm
          formId={FORM_ID}
          register={form.register}
          control={form.control}
          errors={form.formState.errors}
          selectedMethod={paymentMethod}
          cityOptions={cityOptions}
          onSubmit={submitHandler}
        />

        <OrderSummary
          cartItems={cartItems}
          subtotal={subtotal}
          shipping={shippingFee}
          tax={tax}
          discount={discount}
          total={total}
          formId={FORM_ID}
        />
      </div>
    </section>
  );
}
