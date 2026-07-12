import { Review } from '@/lib/types'
import { FaRegStar, FaStar } from 'react-icons/fa';

const ReviewCard = ({review}:{review:Review}) => {
  return (
    <div className='p-[24px] bg-[#FAFAFA] rounded-[10px]  flex gap-4 items-start'>
        <div className='h-[56px] w-[56px] rounded-full bg-gray-500'>
            <span className='text-white text-[24px] font-semibold flex items-center justify-center h-full w-full'>{review.name.charAt(0).toUpperCase()}</span>
        </div>
        <div className='w-full'>
            <div className='flex justify-between  items-center gap-2 mb-2'>
                <h3 className='text-[20px] font-semibold'>{review.name}</h3>
                <p className='text-[14px] text-[#b7b7b7]'> {new Date(review.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    })}
                </p>
            </div>
            <div className='flex items-center gap-1 mb-2'>
                {Array.from({ length: 5 }, (_, index) => {
                    if (index < review.rating) {
                   return <FaStar key={index} size={20} className="text-[#FFB547]" />;
                    }
                    return <FaRegStar key={index} size={20} className="text-[#FFB547]" />;
                })}
            </div>
            
            
            <p className='text-[15px] text-[#7E7E7E]'>{review.comment}</p>
        </div>
    </div>
  )
}

export default ReviewCard