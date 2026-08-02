"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/lib/types";

type OrderSummaryProps = {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  formId: string;
};

function formatMoney(value: number) {
  return `$${value.toFixed(0)}`;
}

function getVariantValue(
  item: CartItem,
  pattern: RegExp,
  fallbackIndex: number
) {
  const entries = Object.entries(item.selectedVariants);
  const match = entries.find(([key]) => pattern.test(key));

  return match?.[1] ?? entries[fallbackIndex]?.[1] ?? null;
}

export default function OrderSummary({
  cartItems,
  subtotal,
  shipping,
  tax,
  discount,
  total,
  formId,
}: OrderSummaryProps) {
  const t = useTranslations("checkout");

  return (
    <aside className="w-full rounded-2xl border border-border bg-white p-5 shadow-sm lg:sticky lg:top-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">{t("summary.title")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("summary.description")}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {cartItems.map((item) => {
          const unitPrice = Number(item.salePrice || item.price);
          const color = getVariantValue(item, /color|colour/i, 0);
          const size = getVariantValue(item, /size/i, 1);

          return (
            <article
              key={`${item.id}-${JSON.stringify(item.selectedVariants)}`}
              className="flex gap-4 rounded-2xl border border-border p-4"
            >
              <Link href={`/shop/${item.slug}`} className="shrink-0">
                <Image
                  src={item.images[0].url}
                  alt={item.name}
                  width={88}
                  height={88}
                  className="size-20 rounded-xl object-contain"
                />
              </Link>

              <div className="min-w-0 flex-1 space-y-2">
                <div className="space-y-1">
                  <Link href={`/shop/${item.slug}`}>
                    <h3 className="line-clamp-2 text-sm font-semibold">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>
                      {t("summary.selectedColor")}: {color ?? t("summary.notSelected")}
                    </span>
                    <span>
                      {t("summary.selectedSize")}: {size ?? t("summary.notSelected")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">
                    {t("summary.quantity")}: {item.quantity}
                  </span>
                  <span className="font-semibold">
                    {formatMoney(unitPrice * item.quantity)}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 space-y-3 border-t border-border pt-5">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-muted-foreground">{t("summary.subtotal")}</span>
          <span className="font-medium">{formatMoney(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-muted-foreground">{t("summary.shipping")}</span>
          <span className="font-medium">{formatMoney(shipping)}</span>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-muted-foreground">{t("summary.tax")}</span>
          <span className="font-medium">{formatMoney(tax)}</span>
        </div>

        {discount > 0 ? (
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">{t("summary.discount")}</span>
            <span className="font-medium text-emerald-600">
              -{formatMoney(discount)}
            </span>
          </div>
        ) : null}

        <div className={cn("flex items-center justify-between gap-4 border-t border-border pt-3")}>
          <span className="text-base font-semibold">{t("summary.total")}</span>
          <span className="text-base font-semibold">{formatMoney(total)}</span>
        </div>
      </div>

      <Button
        type="submit"
        form={formId}
        className="mt-6 w-full py-3 cursor-pointer"
      >
        {t("summary.placeOrder")}
      </Button>
    </aside>
  );
}
