"use client";

import { headerLinks } from "@/lib/constant";
import { routing } from "@/i18n/routing";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import {  useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { IoIosMenu } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const localePattern = new RegExp(`^/(${routing.locales.join("|")})(?=/|$)`);

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("navigation");
  const common = useTranslations("common");
  const normalizedPathname = pathname.replace(localePattern, "") || "/";
  const { cartItems } = useCartStore();
  const isRTL = locale === "ar";

  const drawerSideClass = isRTL ? "start-0" : "end-0";
  const drawerClosedClass = isRTL ? "-translate-x-full" : "translate-x-full";
  const badgeSideClass = isRTL
    ? "start-0 translate-x-1/2 -translate-y-1/2"
    : "end-0 translate-x-1/2 -translate-y-1/2";

  const handleLocaleChange = (nextLocale: string | null) => {
    if (!nextLocale) return;
    const search = window.location.search;
    const targetPath = normalizedPathname === "/" ? "/" : normalizedPathname;

    router.replace(`${targetPath}${search}`, {
      locale: nextLocale as "en" | "ar",
    });
    router.refresh();
  };



  return (
    <header className="border-b border-gray-500">
      <div className="padding-x flex items-center justify-between gap-3 py-2 sm:py-4">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-4">
          <Image
            src="/icons/Logo.svg"
            alt={common("logoAlt")}
            width={80}
            height={40}
            className="h-10 w-20 shrink-0 sm:h-12 sm:w-25"
          />
        </Link>

        <div className="flex items-center gap-3 sm:gap-4 lg:gap-14">
          

          <nav className="hidden items-center gap-10 lg:flex">
            {headerLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`flex items-center gap-1 text-sm font-medium text-gray-400 transition duration-150 hover:text-primary sm:text-base ${
                  normalizedPathname === link.href ? "text-primary" : ""
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div
            className={`fixed inset-0 z-50 transition lg:hidden ${
              isOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
            aria-hidden={!isOpen}
          >
            <button
              type="button"
              aria-label={common("closeMenu")}
              onClick={() => setIsOpen(false)}
              className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`absolute top-0 h-full w-[min(20rem,calc(100vw-1rem))] bg-white shadow-xl transition-transform duration-300 ease-out ${drawerSideClass} ${
                isOpen ? "translate-x-0" : drawerClosedClass
              }`}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <span className="text-sm font-semibold text-gray-900">{common("menu")}</span>
                <button
                  type="button"
                  aria-label={common("closeMenu")}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 transition hover:text-gray-900"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex flex-col gap-3 px-5 py-4">
                {headerLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={`text-start text-base font-medium text-gray-700 transition duration-150 hover:text-primary ${
                      normalizedPathname === link.href ? "text-primary" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <Select value={locale} onValueChange={handleLocaleChange}>
                <SelectTrigger
                  className="h-9 w-28 rounded-full border-gray-200 bg-white px-3 text-xs font-semibold text-gray-700 shadow-none"
                  aria-label={common("language")}
                >
                  <SelectValue placeholder={common("language")} />
                </SelectTrigger>
                <SelectContent className="w-28">
                  <SelectItem value="en">{common("english")}</SelectItem>
                  <SelectItem value="ar">{common("arabic")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Link
              href="/wishlist"
              aria-label={common("wishlist")}
              className="transition duration-150"
            >
              <IoIosHeartEmpty size={24} className="sm:h-8 sm:w-8" />
            </Link>
            <Link href="/cart" aria-label={common("cart")} className="relative transition duration-150">
              {cartItems.length > 0 && (
                <span
                  className={`absolute top-1.5 right-0.5  flex items-center justify-center rounded-full bg-red-600  w-4   text-[10px] font-bold  text-white ${badgeSideClass}`}
                >
                  {cartItems.length}
                </span>
              )}
              <IoCartOutline size={24} className="sm:h-8 sm:w-8" />
            </Link>
            
          </div>
          <button
            type="button"
            aria-label={isOpen ? common("closeMenu") : common("openMenu")}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden"
          >
            <IoIosMenu size={24} className="sm:h-8 sm:w-8" />

          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
