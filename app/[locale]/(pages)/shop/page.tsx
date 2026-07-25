
import { ShopBreadcrumb } from "./components/ShopBreadCrumb";
import SidebarWrapper from "./components/SidebarWrapper";

const page =  () => {


  return (
    <section className="padding space-y-12">
      <ShopBreadcrumb/>
      <div>
      <SidebarWrapper/>
      </div>
    </section>
  );
};

export default page;
