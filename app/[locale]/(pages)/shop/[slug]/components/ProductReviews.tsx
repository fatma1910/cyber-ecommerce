import { getProductReviews } from '@/lib/data'
import ProductReviewsClient from './ProductReviewsClient'
import { getTranslations } from 'next-intl/server'


const ProductReviews = async({ productSlug }: { productSlug: string }) => {
    const reviews =  await getProductReviews(productSlug)
    const t = await getTranslations("products.detail")
     
  return (
    <section className='padding flex flex-col gap-6 '>
        <h1 className='font-medium text-[24px]'>{t("reviewsTitle")}</h1>
        <ProductReviewsClient initialReviews={reviews} productSlug={productSlug} />
        
    </section>
  )
}

export default ProductReviews
