import { getCategories } from "@/lib/data";
import Sidebar from "./Sidebar";

export default async function SidebarWrapper() {
  const categories = await getCategories({
    q: "",
    parentId: "",
  });

  return <Sidebar categories={categories} />;
}