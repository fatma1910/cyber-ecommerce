import { Button } from "@/components/ui/button";
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
  return (
    <div
      className={`flex flex-col justify-between gap-6 p-8 `}
      style={{ backgroundColor: bg }}
    >
      <Image
        src={img}
        alt={title}
        width={360}
        height={360}
        className="h-full w-full"
      />
      <div className="flex flex-col  gap-2">
        <h1
          className={`font-light text-[29px] `}
          style={{ color: titleColor }}
        >
          {title}
        </h1>
        <p className="font-medium text-[#909090] text-sm">{desc}</p>
      </div>
      <Button variant={butVariant} size={"lg"} className="">
        Shop Now
      </Button>
    </div>
  );
};

export default HomeCard;
