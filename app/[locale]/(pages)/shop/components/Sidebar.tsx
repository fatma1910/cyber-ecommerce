"use client";

import { CategoryDetails } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "@/i18n/navigation";
import { useRouter, useSearchParams } from "next/navigation";

type SidebarProps = {
  categories: CategoryDetails[];
};

export default function Sidebar({ categories }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());


    if (params.get("category") === category) {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <aside className="w-64">
      <Accordion  className="w-full">
        {categories.map((category) => (
          <AccordionItem
            key={category.id}
            value={category.id.toString()}
            className="border-b border-gray-200 last:border-b-0"
          >
            <AccordionTrigger className="cursor-pointer py-3 text-[18px] font-medium hover:no-underline">
              {category.name}
            </AccordionTrigger>

            <AccordionContent className="space-y-2 pb-4">
              {/* Parent Category */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={searchParams.get("category") === category.name}
                  onCheckedChange={() =>
                    handleCategoryChange(category.name)
                  }
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="cursor-pointer text-[15px] font-medium"
                >
                  All
                </label>
              </div>

              {/* Children */}
              {category.children?.map((child) => (
                <div key={child.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`child-${child.id}`}
                    checked={searchParams.get("category") === child.name}
                    onCheckedChange={() =>
                      handleCategoryChange(child.name)
                    }
                  />
                  <label
                    htmlFor={`child-${child.id}`}
                    className="cursor-pointer text-[15px] font-medium"
                  >
                    {child.name}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
}