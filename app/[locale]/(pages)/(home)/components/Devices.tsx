import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const Devices = async () => {
  const t = await getTranslations("home.devices");
  const common = await getTranslations("common");

  return (
    <section className="grid overflow-hidden lg:grid-cols-2">
      <div className="grid">
        <div className="flex flex-col items-center gap-6 bg-[#F5F5F5] px-6 py-8 text-center sm:flex-row sm:text-start lg:px-0 lg:pe-8">
          <div className="flex flex-1 justify-center">
            <Image
              src={"/home/playstation.png"}
              alt={t("playstation.alt")}
              width={360}
              height={343}
              className="h-auto w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[360px]"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <h1 className="text-3xl font-medium sm:text-[42px] lg:text-[49px]">
              {t("playstation.title")}
            </h1>
            <p className="text-sm font-medium text-[#909090]">
              {t("playstation.description")}
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex items-center bg-[#F5F5F5] py-8 pe-6">
            <div className="flex flex-1">
              <Image
                src={"/home/airpods.png"}
                alt={t("airpods.alt")}
                width={104}
                height={272}
                className="h-auto w-[84px] object-cover sm:w-[104px]"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <h1 className="text-2xl font-light sm:text-[29px]">
                {t("airpods.titlePrefix")} <span className="font-medium">{t("airpods.titleEmphasis")}</span>
              </h1>
              <p className="text-sm font-medium text-[#909090]">
                {t("airpods.description")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#353535] py-8 pe-6">
            <div className="flex flex-1">
              <Image
                src={"/home/apple.png"}
                alt={t("vision.alt")}
                width={136}
                height={190}
                className="h-auto w-[100px] sm:w-[136px]"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <h1 className="text-2xl font-light text-white sm:text-[29px]">
                {t("vision.titlePrefix")} <span className="font-medium">{t("vision.titleEmphasis")}</span>
              </h1>
              <p className="text-sm font-medium text-[#909090]">
                {t("vision.description")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse items-center justify-between gap-8 bg-[#EDEDED] px-6 py-8 text-center sm:px-8 lg:flex-row lg:items-center lg:px-0 lg:ps-10 lg:py-12 lg:text-start">
        <div className="flex max-w-md flex-col gap-3">
          <h1 className="text-4xl font-thin sm:text-5xl lg:text-[64px]">
            {t("macbook.titlePrefix")} <span className="font-medium">{t("macbook.titleEmphasis")}</span>
          </h1>

          <p className="text-sm font-semibold text-[#909090]">
            {t("macbook.description")}
          </p>
          <Link href={"/shop"} className="inline-flex justify-center lg:justify-start">
            <Button variant={"outline"} size={"lg"} className="w-full lg:w-1/2">
              {common("shopNow")}
            </Button>
          </Link>
        </div>

        <div className="flex">
          <Image
            src={"/home/MacBook.png"}
            loading="eager"
            alt={t("macbook.alt")}
            width={500}
            height={500}
            className="hidden h-auto w-full object-cover sm:max-w-[420px] lg:flex lg:max-w-[500px]"
          />
          <Image
            src={"/home/featured4.png"}
            loading="eager"
            alt={t("macbook.alt")}
            width={500}
            height={500}
            className="h-[200px] w-full max-w-[330px] object-cover lg:hidden"
          />
        </div>
      </div>
    </section>
  );
};

export default Devices;
