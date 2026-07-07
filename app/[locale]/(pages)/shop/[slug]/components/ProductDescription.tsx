"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import styles from "./ProductDescription.module.css";

function extractTitleAndBody(detailsHtml: string) {
  const titleMatch = detailsHtml.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const title = titleMatch?.[1]?.trim() || "Details";
  const bodyHtml = detailsHtml.replace(/<h2[^>]*>[\s\S]*?<\/h2>\s*/i, "");

  return { title, bodyHtml };
}

const ProductDescription = ({ product }: { product: Product }) => {
  const [expanded, setExpanded] = useState(false);

  const detailsHtml = product.detailsHtml ?? "";

  const { title, bodyHtml } = useMemo(
    () => extractTitleAndBody(detailsHtml),
    [detailsHtml]
  );

  const canCollapse = detailsHtml.length > 700;

  if (!detailsHtml) {
    return null;
  }

  return (
    <section className={` bg-[#FAFAFA] padding`}>
      <div className={styles.card}>
        <h2 className={styles.title}>{title}</h2>

        <div
          className={`${styles.body} ${
            !expanded && canCollapse ? styles.collapsed : ""
          }`}
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        {canCollapse && (
          <div
            className={`${styles.fade} ${
              expanded ? styles.fadeHidden : ""
            }`}
          />
        )}

        {canCollapse && (
          <div className={styles.actions}>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="gap-2 px-8 py-3 z-20 "
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "View Less" : "View More"}
              <ChevronDown
                className={`${styles.toggleIcon} ${
                  expanded ? styles.toggleIconExpanded : ""
                }`}
              />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDescription;
