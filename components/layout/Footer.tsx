import { footerLinks, headerLinks } from "@/lib/constant";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");
  const nav = useTranslations("navigation");

  return (
    <footer>
      <div className="bg-primary text-white padding flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
        <div className="flex max-w-sm flex-col gap-4 text-start">
          <Image
            src="/icons/LogoWhite.svg"
            alt={nav("logoAlt")}
            width={80}
            height={40}
            className="h-10 w-20 shrink-0 sm:h-12 sm:w-25"
          />
          <p className="text-sm font-medium">{t("description")}</p>
        </div>
        <div className="text-start">
          <h3 className="mb-2 text-lg font-medium">{t("links")}</h3>
          <div className="flex flex-col gap-2">
            {headerLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm text-[#CFCFCF] transition duration-150 hover:text-white"
              >
                {nav(link.key)}
              </Link>
            ))}
          </div>
        </div>
        <div className="text-start">
          <h3 className="mb-2 text-lg font-medium">{t("faqs")}</h3>
          <div className="flex flex-col gap-2">
            {footerLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm text-[#CFCFCF] transition duration-150 hover:text-white"
              >
                {nav(link.key)}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t bg-primary py-2 text-center text-sm text-[#CFCFCF] sm:py-4 sm:text-base">
        {t("copyright")}
      </p>
    </footer>
  );
};

export default Footer;
