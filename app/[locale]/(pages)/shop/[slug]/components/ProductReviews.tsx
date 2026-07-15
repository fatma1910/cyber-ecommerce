import { getProductReviews } from '@/lib/data'
import ProductReviewsClient from './ProductReviewsClient'


const ProductReviews = async({ productSlug }: { productSlug: string }) => {
    const reviews =  await getProductReviews(productSlug)
     
  return (
    <section className='padding flex flex-col gap-6 '>
        <h1 className='font-medium text-[24px]'>Reviews</h1>
        <ProductReviewsClient initialReviews={reviews} productSlug={productSlug} />
        
    </section>
  )
}

export default ProductReviews
