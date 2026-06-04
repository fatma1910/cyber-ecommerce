import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

type ButtonVariant =
  | "link"
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "destructive"
  | null
  | undefined;

const HomeCard = ({
  bg,
  img,
  title,
  desc,
  titleColor,
  butVariant,
}: {
  bg: string;
  img: string;
  title: string;
  desc: string;
  titleColor: string;
  butVariant: ButtonVariant;
}) => {
  const t = useTranslations("common");

  return (
    <div
      className="flex h-full flex-col justify-between gap-4 p-5 sm:gap-6 sm:p-6 lg:p-8"
      style={{ backgroundColor: bg }}
    >
      <Image
        src={img}
        alt={title}
        width={360}
        height={360}
        className="w-full object-contain"
      />
      <div className="flex flex-col gap-2">
        <h1
          className="text-2xl font-light sm:text-[29px]"
          style={{ color: titleColor }}
        >
          {title}
        </h1>
        <p className="font-medium text-[#909090] text-sm">{desc}</p>
      </div>
      <Link href="/shop" className="w-full sm:w-1/2">
        <Button variant={butVariant} size={"lg"} className="w-full sm:w-1/2">
          {t("shopNow")}
        </Button>
      </Link>
    </div>
  );
};

export default HomeCard;
