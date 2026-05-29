import Card from "@/components/shared/Card"
import { getProducts } from "@/lib/data"
import { Product } from "@/lib/types"

const GetProducts = async() => {
  const products = await getProducts({page:1, pageSize: 20, q:'', categoryId: ''})

  if (products === null) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white/80 p-8 text-center text-sm text-gray-500">
        We could not load products right now. Please try again in a moment.
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white/80 p-8 text-center text-sm text-gray-500">
        No products are available yet.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-8 ">
        {products.map((product:Product) => (
            <Card key={product.id} {...product}/>
        ))}
    </div>
  )
}

export default GetProducts
