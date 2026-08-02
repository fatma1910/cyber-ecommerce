import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found | Cyber",
  description: "The page you requested could not be found.",
};

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white px-6 py-12 text-center shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you requested does not exist.
        </p>

        <Button
          nativeButton={false}
          render={<Link href="/" />}
          className="mt-8 px-6 py-3"
        >
          Return to home
        </Button>
      </div>
    </section>
  );
}
