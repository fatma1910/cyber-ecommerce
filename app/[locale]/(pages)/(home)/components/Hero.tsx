import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const Hero = async () => {
  const t = await getTranslations("home.hero");
  const common = await getTranslations("common");

  return (
    <section className="min-h-screen padding-x bg-[#211C24] flex flex-col gap-11 xl:flex-row items-center relative overflow-hidden">
      <div className="  bg-[#211C24] mt-10 sm:mt-16 lg:mt-20 xl:mt-0 flex flex-col gap-6 max-w-lg text-center xl:text-left">
        <p className="font-semibold text-2xl text-[#ffffff89] ">{t("eyebrow")}</p>
        <h1 className="text-6xl sm:text-[96px] text-white font-thin tracking-tight">
          {t("titlePrefix")} <span className="font-semibold">{t("titleEmphasis")}</span>
        </h1>
        <p className="text-[#909090] font-medium text-lg mb-6">{t("description")}</p>
        <Link href="/shop" className="">
          <Button variant={"secondary"} size={"lg"}>
            {common("shopNow")}
          </Button>
        </Link>
      </div>
      <div>
        <Image
          loading="eager"
          src="/home/hero.png"
          alt={t("imageAlt")}
          width={406}
          height={600}
          className="absolute -translate-x-1/2 xl:right-28 xl:top-1/6 "
        />
      </div>
    </section>
  );
};

export default Hero;
