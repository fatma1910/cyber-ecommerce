import { getProductReviews } from '@/lib/data'
import ReviewsRating from './ReviewsRating'


const ProductReviews = async({ productSlug }: { productSlug: string }) => {
    const reviews =  await getProductReviews(productSlug)
     
  return (
    <section className='padding'>
        <h1>Reviews</h1>
        <ReviewsRating rate={reviews} />
        
    </section>
  )
}

export default ProductReviews