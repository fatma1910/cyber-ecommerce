import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const Hero = async () => {
  const t = await getTranslations("home.hero");
  const common = await getTranslations("common");

  return (
    <section className="relative isolate overflow-hidden bg-[#211C24] padding-x py-12 sm:py-16 xl:flex xl:min-h-screen xl:flex-row xl:items-center xl:gap-11 xl:py-0">
      <div className="relative z-10 mx-auto flex  flex-col gap-6 text-center xl:mx-0 xl:text-start">
        <p className="text-2xl font-semibold text-[#ffffff89]">{t("eyebrow")}</p>
        <h1 className="text-4xl font-thin tracking-tight text-white sm:text-6xl lg:text-[96px]">
          {t("titlePrefix")} <span className="font-semibold">{t("titleEmphasis")}</span>
        </h1>
        <p className="mb-2 text-base font-medium text-[#909090] sm:text-lg">{t("description")}</p>
        <Link href="/shop" className="inline-flex justify-center xl:justify-start">
          <Button variant={"secondary"} size={"lg"}>
            {common("shopNow")}
          </Button>
        </Link>
      </div>
      <div className="relative mt-4 flex justify-center xl:mt-0 xl:absolute  xl:justify-end xl:right-0   xl:translate-y-1/2 xl:w-[406px] xl:h-[600px] ">
        <Image
          loading="eager"
          src="/home/hero.png"
          alt={t("imageAlt")}
          width={406}
          height={600}
          className="h-[270px] sm:h-[450px]  xl:h-auto w-[min(100%,140px)] sm:w-[min(100%,250px)] xl:absolute xl:end-28 xl:top-1/2 xl:w-[406px] xl:-translate-y-1/2"
        />
      </div>
    </section>
  );
};

export default Hero;
