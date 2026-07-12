import { getProductReviews } from '@/lib/data'
import ReviewsRating from './ReviewsRating'
import AllReviews from './AllReviews'


const ProductReviews = async({ productSlug }: { productSlug: string }) => {
    const reviews =  await getProductReviews(productSlug)
     
  return (
    <section className='padding flex flex-col gap-6 '>
        <h1 className='font-medium text-[24px]'>Reviews</h1>
        <ReviewsRating rate={reviews} />
        <AllReviews reviews={reviews} />
        
    </section>
  )
}

export default ProductReviews