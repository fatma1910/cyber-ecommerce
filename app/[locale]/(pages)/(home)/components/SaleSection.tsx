import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const SaleSection = async () => {
  const t = await getTranslations("home.sale");
  const common = await getTranslations("common");

  return (
    <section className="flex items-center justify-center bg-[url(/home/saleBg.png)] bg-cover bg-center px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-20 xl:px-40">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-thin tracking-tight text-white sm:text-6xl lg:text-[72px]">
          {t("titlePrefix")} <span className="font-normal">{t("titleEmphasis")}</span>
        </h2>
        <p className="mt-3 text-sm text-[#787878] sm:text-base">{t("description")}</p>
        <Link href="/shop" className="inline-flex">
          <Button variant={"secondary"} size={"lg"} className="mt-6 w-full sm:w-auto">
            {common("shopNow")}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default SaleSection;
