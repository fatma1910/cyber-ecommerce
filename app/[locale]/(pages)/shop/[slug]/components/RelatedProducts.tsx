import Card from "@/components/shared/Card"
import { getRelatedProducts } from "@/lib/data"
import { Product } from "@/lib/types"


const RelatedProducts = async({slug}:{slug:string}) => {
    const products = await getRelatedProducts(slug)
  return (
    <section className='padding flex flex-col gap-6 '>
        <h1 className='font-medium text-[24px]'>Related Products</h1>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4'>
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