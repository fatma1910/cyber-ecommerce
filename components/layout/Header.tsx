"use client";

import { headerLinks } from "@/lib/constant";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);


  return (
    <div className="padding-x py-2 sm:py-4 flex flex-row items-center justify-between">
      <Image
        src="/icons/Logo.svg"
        alt="Logo"
        width={80}
        height={40}
        className="w-20 h-10 sm:w-25 sm:h-12"
      />
      <div className="flex flex-row items-center gap-4 sm:gap-14">
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
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

        {/* Desktop nav */}
        <div className="hidden sm:flex flex-row items-center gap-10">
          {headerLinks.map((link) => {
            
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-1 text-sm sm:text-base font-medium text-gray-400 hover:text-primary ${pathname === link.href ? " text-primary" : ""} transition duration-150`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile slide-in menu */}
        <div
          className={`sm:hidden fixed inset-0 z-50 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
          aria-hidden={!isOpen}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          />
          <div
            className={`absolute right-0 top-0 h-full w-[78%] max-w-xs bg-white shadow-xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            role="dialog"
            aria-modal="true"
          >
            <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
              <span className="text-sm font-semibold text-gray-900">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-900 transition"
              >
                ✕
              </button>
            </div>
            <div className="px-5 py-4 flex flex-col gap-3">
              {headerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-medium text-gray-700 hover:text-primary ${pathname === link.href ? " text-primary" : ""} transition duration-150`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/wishlist" className=" transition duration-150">
            <IoIosHeartEmpty size={24} className="sm:w-8 sm:h-8" />
          </Link>
          <Link href="/cart" className=" transition duration-150">
            <IoCartOutline size={24} className="sm:w-8 sm:h-8" />
          </Link>
          <Link href="/login" className=" transition duration-150">
            <GoPerson size={24} className="sm:w-8 sm:h-8" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
