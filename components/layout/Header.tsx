"use client";

import { headerLinks } from "@/lib/constant";
import { routing } from "@/i18n/routing";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";

const localePattern = new RegExp(`^/(${routing.locales.join("|")})(?=/|$)`);

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("navigation");
  const common = useTranslations("common");
  const normalizedPathname = pathname.replace(localePattern, "") || "/";

  return (
    <div className="padding-x py-2 sm:py-4 flex flex-row items-center justify-between border-b border-gray-500">
      <Image
        src="/icons/Logo.svg"
        alt={common("logoAlt")}
        width={80}
        height={40}
        className="w-20 h-10 sm:w-25 sm:h-12"
      />
      <div className="flex flex-row items-center gap-4 sm:gap-14">
        <button
          type="button"
          aria-label={isOpen ? common("closeMenu") : common("openMenu")}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className="block w-5 h-0.5 bg-gray-600 mb-1 transition-transform duration-300"></span>
            <span className="block w-5 h-0.5 bg-gray-600 mb-1 transition-transform duration-300"></span>
            <span className="block w-5 h-0.5 bg-gray-600 transition-transform duration-300"></span>
          </div>
        </button>

        <div className="hidden sm:flex flex-row items-center gap-10">
          {headerLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`flex items-center gap-1 text-sm sm:text-base font-medium text-gray-400 hover:text-primary ${normalizedPathname === link.href ? " text-primary" : ""} transition duration-150`}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        <div
          className={`sm:hidden fixed inset-0 z-50 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
          aria-hidden={!isOpen}
        >
          <button
            type="button"
            aria-label={common("closeMenu")}
            onClick={() => setIsOpen(false)}
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          />
          <div
            className={`absolute right-0 top-0 h-full w-[78%] max-w-xs bg-white shadow-xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            role="dialog"
            aria-modal="true"
          >
            <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
              <span className="text-sm font-semibold text-gray-900">
                {common("menu")}
              </span>
              <button
                type="button"
                aria-label={common("closeMenu")}
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-900 transition"
              >
                ×
              </button>
            </div>
            <div className="px-5 py-4 flex flex-col gap-3">
              {headerLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`text-base font-medium text-gray-700 hover:text-primary ${normalizedPathname === link.href ? " text-primary" : ""} transition duration-150`}
                  onClick={() => setIsOpen(false)}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/wishlist" aria-label={common("wishlist")} className=" transition duration-150">
            <IoIosHeartEmpty size={24} className="sm:w-8 sm:h-8" />
          </Link>
          <Link href="/cart" aria-label={common("cart")} className=" transition duration-150">
            <IoCartOutline size={24} className="sm:w-8 sm:h-8" />
          </Link>
          <Link href="/login" aria-label={common("login")} className=" transition duration-150">
            <GoPerson size={24} className="sm:w-8 sm:h-8" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
