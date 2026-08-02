"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/store/cartStore";
import CartItems from "./components/CartItems";
import OrderSummary from "./components/OrderSummary";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";

const CartClient = () => {
  const { cartItems } = useCartStore();
  const t = useTranslations("cart");
  const common = useTranslations("common");

  if (cartItems.length === 0) {
    return (
      <section className="padding">
        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-[24px] border border-dashed border-border bg-white px-6 py-16 text-center shadow-sm">
          <div className="flex size-16 items-center justify-center rounded-full bg-[#F6F6F6]">
            <ShoppingBag className="size-8 text-muted-foreground" />
          </div>

          <h1 className="mt-6 text-3xl font-semibold">{t("empty")}</h1>

          <p className="mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
            {common("tryChangingFilters")}
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
    <div className="padding flex flex-col gap-10 lg:flex-row lg:items-start">
      <CartItems cartItems={cartItems} />
      <OrderSummary />
    </div>
  );
};

export default CartClient;
