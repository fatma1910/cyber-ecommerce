import Card from "@/components/shared/Card";
import { getProducts } from "@/lib/data"
import { Product } from "@/lib/types";


const DiscountSection = async() => {
    const data = await getProducts({
        page: 1,
        pageSize: 4,
        q: '',
        categoryId: '',
    });

    const discountedProducts = data.filter((product:Product) => product.salePrice && product.salePrice < product.price);
    
  return (
    <section className="padding">
        <h4 className="font-medium text-2xl mb-7">Discounts up to -50%</h4>
        <div className="grid grid-cols-4 gap-6">
            {discountedProducts.map((product:Product) => (
                <Card key={product.id} {...product}/>
            ))}
        </div>
    </section>
  )
}

export default DiscountSection