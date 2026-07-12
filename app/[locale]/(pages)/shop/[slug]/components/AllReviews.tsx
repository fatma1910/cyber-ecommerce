"use client";

import { Button } from "@/components/ui/button";
import { ProductReviews, Review } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import ReviewCard from "./ReviewCard";

const REVIEWS_STEP = 3;

const AllReviews = ({ reviews }: { reviews: ProductReviews }) => {
  const [visibleCount, setVisibleCount] = useState(REVIEWS_STEP);
  const [rowHeights, setRowHeights] = useState<number[]>([]);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const totalReviews = reviews.reviews.length;
  const hasReviews = totalReviews > 0;
  const expanded = hasReviews && visibleCount >= totalReviews;

  useLayoutEffect(() => {
    setRowHeights(
      reviews.reviews.map((_, index) => rowRefs.current[index]?.scrollHeight ?? 0)
    );
  }, [reviews.reviews, visibleCount]);

  if (!hasReviews) {
    return (
      <div className="rounded-[10px] border border-dashed border-gray-200 bg-[#FAFAFA] px-6 py-10 text-center text-sm text-gray-500">
        No reviews have been posted yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {reviews.reviews.map((review: Review, index) => {
        const isVisible = index < visibleCount;

        return (
          <div
            key={review.id}
            ref={(node) => {
              rowRefs.current[index] = node;
            }}
            className="overflow-hidden transition-all duration-300 ease-in-out"
            data-visible={isVisible}
            style={{
              height: isVisible
                ? rowHeights[index] != null
                  ? `${rowHeights[index]}px`
                  : "auto"
                : 0,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(-8px)",
              pointerEvents: isVisible ? "auto" : "none",
            }}
            aria-hidden={!isVisible}
          >
            <ReviewCard review={review} />
          </div>
        );
      })}

      {totalReviews > REVIEWS_STEP && (
        <div className="pt-2 flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="gap-2 px-8 py-3 z-20"
            onClick={() => {
              if (expanded) {
                setVisibleCount(REVIEWS_STEP);
                return;
              }

              setVisibleCount((prev) =>
                Math.min(prev + REVIEWS_STEP, totalReviews)
              );
            }}
          >
            {expanded ? "View Less" : "View More"}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllReviews;
