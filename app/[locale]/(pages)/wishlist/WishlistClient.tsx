"use client";

import Card from "@/components/shared/Card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useWishlistStore } from "@/store/wishlistStore";
import { TbHeartBrokenFilled } from "react-icons/tb";
import { useTranslations } from "next-intl";

const WishlistClient = () => {
  const { wishlist } = useWishlistStore();
  const t = useTranslations("wishlist");

  return (
    <div className="padding flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-medium sm:text-[42px] lg:text-[49px]">
          {t("title")}
        </h1>
        <p className="text-sm text-gray-500">
          {wishlist.length} {wishlist.length === 1 ? t("item") : t("items")}
        </p>
      </div>

      <div>
        {wishlist.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:mt-20">
            <TbHeartBrokenFilled size={80} className="text-red-600/50" />
            <p className="text-lg text-gray-500">{t("empty")}</p>
            <Link href="/shop">
              <Button
                variant="default"
                size={"lg"}
                className="mt-1 w-[150px] cursor-pointer sm:mt-4"
              >
                {t("startShopping")}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
            {wishlist.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistClient;
