import { ProductReviews } from "@/lib/types"
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";



const rateLabels = ['Poor','Below Average','Average','Good','Excellent',]


const ReviewsRating = ({rate}:{rate:ProductReviews}) => {
    const avgRating = rate.avgRating;
    const ratingCounts = [...rate.ratingCounts].reverse();
  return (
    <div className="flex items-center gap-15">
        <div  className="p-8 bg-[#FAFAFA] rounded-[25px] space-y-0-4">
            <h3 className="text-[56px] font-medium ">{rate.avgRating.toFixed(1)}</h3>
            <p className="text-[15px] font-medium text-gray-400">of {rate.totalReviews} reviews</p>

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
                <div key={ratingCount.rating} className="flex w-full items-center gap-4 mb-1">
                            <p className="w-1/6 text-[18px] font-medium ">{rateLabels[ratingCount.rating - 1]}</p>
                    <div className="w-5/6 h-1.25 bg-[#D9D9D9] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#FFB547]"
                            style={{ width: `${width}%` }}
                        ></div>
                    </div>
                    <span className="text-[16px] text-gray-400 font-medium">{ratingCount.count}</span>
                </div>
                )
            })}
        </div>
    </div>

  )
}

export default ReviewsRating
