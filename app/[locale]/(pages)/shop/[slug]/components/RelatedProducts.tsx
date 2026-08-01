import Card from "@/components/shared/Card"
import { getRelatedProducts } from "@/lib/data"
import { Product } from "@/lib/types"
import { getTranslations } from "next-intl/server"


const RelatedProducts = async({slug}:{slug:string}) => {
    const products = await getRelatedProducts(slug)
    const t = await getTranslations("products.detail")
  return (
    <section className='padding flex flex-col gap-6 '>
        <h1 className='font-medium text-[24px]'>{t("relatedTitle")}</h1>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
            {products.map((product:Product) => (
                <div key={product.id} className='w-full'>
                    <Card {...product} />
                </div>
            ))}
        </div>
        
    </section>
  )
}

export default RelatedProducts
