import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./[locale]/globals.css";
import { getLocale } from "next-intl/server";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cyber",
  description: "Cyber e-commerce storefront",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html suppressHydrationWarning lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
