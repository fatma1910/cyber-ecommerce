import Card from "@/components/shared/Card";
import { getProducts } from "@/lib/data";
import { Product } from "@/lib/types";


export default async function Home() {
  const products = await getProducts({ page: 1, pageSize: 20, q: '', categoryId: '' });
  console.log(products);
  return (
    <div className="grid grid-cols-4 gap-6  items-center   font-sans dark:bg-black padding">
      {products.map((product:Product) => (
        // <div key={product.id} className="p-4 bg-white rounded shadow mb-4 w-full max-w-md">
        //   <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        //   <p className="text-gray-700 mb-2">{product.description}</p>
        //   <p className="text-gray-900 font-semibold">${product.price}</p>
        // </div>

        <Card key={product.id}  {...product} />
      ))}
    </div>
  );
}
