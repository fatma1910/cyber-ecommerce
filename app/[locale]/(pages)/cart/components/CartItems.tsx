import { CartItem } from "@/lib/types";
import CardItem from "./CardItem";
import { useTranslations } from "next-intl";

const CartItems = ({ cartItems }: { cartItems: CartItem[] }) => {
  const t = useTranslations("cart");

  return (
    <section className="flex-1">
      <h1 className="text-[24px] font-semibold">{t("title")}</h1>
      <div className="mt-10 flex flex-col gap-4">
        {cartItems.map((item: CartItem, key) => (
          <CardItem key={key} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CartItems;
