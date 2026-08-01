"use client";

import { Review } from "@/lib/types"
import { FaRegStar, FaStar } from "react-icons/fa";
import { useLocale } from "next-intl";

const ReviewCard = ({review}:{review:Review}) => {
  const locale = useLocale()
  return (
    <div className="flex items-start gap-4 rounded-[10px] bg-[#FAFAFA] p-4 sm:p-6">
        <div className="h-[56px] w-[56px] rounded-full bg-gray-500">
            <span className="flex h-full w-full items-center justify-center text-[24px] font-semibold text-white">{review.name.charAt(0).toUpperCase()}</span>
        </div>
        <div className="w-full">
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold sm:text-[20px]">{review.name}</h3>
                <p className="text-sm text-[#b7b7b7] sm:text-[14px]"> {new Date(review.createdAt).toLocaleDateString(locale, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    })}
                </p>
            </div>
            <div className="mb-2 flex items-center gap-1">
                {Array.from({ length: 5 }, (_, index) => {
                    if (index < review.rating) {
                   return <FaStar key={index} size={20} className="text-[#FFB547]" />;
                    }
                    return <FaRegStar key={index} size={20} className="text-[#FFB547]" />;
                })}
            </div>
            
            
            <p className="text-[15px] text-[#7E7E7E]">{review.comment}</p>
        </div>
    </div>
  )
}

export default ReviewCard
