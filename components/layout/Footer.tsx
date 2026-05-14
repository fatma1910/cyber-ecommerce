import { footerLinks, headerLinks } from "@/lib/constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="bg-primary text-white padding flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
        <div className="flex flex-col gap-4 max-w-sm text-center lg:text-left">
          <Image
            src="/icons/LogoWhite.svg"
            alt="Logo"
            width={80}
            height={40}
            className="w-20 h-10 sm:w-25 sm:h-12 mx-auto lg:mx-0"
          />
          <p className="text-sm font-medium">
            We are a residential interior design firm located in Portland. Our
            boutique-studio offers more than
          </p>
        </div>
        <div className="text-center lg:text-left">
          <h3 className="text-lg font-medium mb-2">Links</h3>
          <div>
            {headerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-[#CFCFCF] hover:text-white transition duration-150 block mb-2"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center lg:text-left">
          <h3 className="text-lg font-medium mb-2">FAQs</h3>
          <div>
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-[#CFCFCF] hover:text-white transition duration-150 block mb-2"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t py-2 sm:py-4 flex items-center justify-center w-full bg-primary text-[#CFCFCF] text-sm sm:text-base">
        © 2026 Cyber. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
