import { ProductReviews } from "@/lib/types"
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useTranslations } from "next-intl";



const ReviewsRating = ({rate}:{rate:ProductReviews}) => {
    const avgRating = rate.avgRating;
    const ratingCounts = [...rate.ratingCounts].reverse();
    const t = useTranslations("products.detail");
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
        <div  className="space-y-4 rounded-[25px] bg-[#FAFAFA] p-6 sm:p-8">
            <h3 className="text-5xl font-medium sm:text-[56px]">{rate.avgRating.toFixed(1)}</h3>
            <p className="text-sm font-medium text-gray-400 sm:text-[15px]">{t("reviewSummary", { count: rate.totalReviews })}</p>

                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, index) => {
                        if (index < Math.floor(avgRating)) {
                        return <FaStar key={index} size={24} className="text-[#FFB547]" />;
                        }

                        if (index < avgRating) {
                        return <FaStarHalfAlt key={index} size={24} className="text-[#FFB547]" />;
                        }

                        return <FaRegStar key={index} size={24} className="text-gray-300" />;
                    })}
                </div>
        </div>
        <div className="w-full flex-1">
            {ratingCounts.map((ratingCount) => {
                const width = rate.totalReviews
                    ? (ratingCount.count / rate.totalReviews) * 100
                    : 0;

                return (
                <div key={ratingCount.rating} className="mb-1 flex w-full items-center gap-3 sm:gap-4">
                            <p className="w-24 shrink-0 text-sm font-medium sm:w-1/6 sm:text-[18px]">{t(`ratingLabels.${["poor", "belowAverage", "average", "good", "excellent"][ratingCount.rating - 1]}`)}</p>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#D9D9D9]">
                        <div
                            className="h-full bg-[#FFB547]"
                            style={{ width: `${width}%` }}
                        ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-400 sm:text-[16px]">{ratingCount.count}</span>
                </div>
                )
            })}
        </div>
    </div>

  )
}

export default ReviewsRating
