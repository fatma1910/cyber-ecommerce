
import { getCategories } from "@/lib/data";
import { ShopBreadcrumb } from "./components/ShopBreadCrumb";
import Sidebar from "./components/Sidebar";
import { CategoryDetails } from "@/lib/types";
import ProductsSection from "./components/ProductsSection";

const page =  async() => {
   const categories:CategoryDetails[] = await getCategories({
      q: "",
      parentId: "",
    });

  return (
    <section className="padding space-y-12">
      <ShopBreadcrumb categories={categories}  />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
       <Sidebar categories={categories} maxPrice={10000} />
        
         
          <div>
            
            <ProductsSection />
          </div>
        </div>
    </section>
  );
}

export default page;
