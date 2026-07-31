"use client";

import { useState } from "react";
import { CategoryDetails } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { usePathname } from "@/i18n/navigation";
import { useRouter, useSearchParams } from "next/navigation";

type SidebarProps = {
  categories: CategoryDetails[];
  maxPrice?: number;
};

export default function Sidebar({
  categories,
  maxPrice = 1000,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const subcategoryId = searchParams.get("subcategoryId");

  const [openCategory, setOpenCategory] = useState<string[]>(() => {
    const selectedCategory = categories.find((category) => {
      if (category.id.toString() === categoryId) return true;

      return category.children?.some(
        (child) => child.id.toString() === subcategoryId
      );
    });

    return selectedCategory ? [selectedCategory.id.toString()] : [];
  });

  const [priceRange, setPriceRange] = useState<number[]>([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || maxPrice,
  ]);

  const updateURL = (params: URLSearchParams) => {
    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleCategoryChange = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedCategoryId = params.get("categoryId");
    const selectedSubcategoryId = params.get("subcategoryId");

    if (selectedCategoryId === id && selectedSubcategoryId) {
      params.delete("subcategoryId");
    } else if (selectedCategoryId === id) {
      params.delete("categoryId");
      params.delete("subcategoryId");
    } else {
      params.set("categoryId", id);
      params.delete("subcategoryId");
    }

    setOpenCategory([id]);
    updateURL(params);
  };

  const handleSubCategoryChange = (
    categoryId: string,
    subcategoryId: string
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedCategoryId = params.get("categoryId");
    const selectedSubcategoryId = params.get("subcategoryId");

    if (selectedCategoryId === categoryId && selectedSubcategoryId === subcategoryId) {
      params.delete("subcategoryId");
    } else {
      params.set("categoryId", categoryId);
      params.set("subcategoryId", subcategoryId);
    }

    setOpenCategory([categoryId]);
    updateURL(params);
  };

  const handleApplyPrice = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());

    updateURL(params);
  };

  const handleClearPrice = () => {
    setPriceRange([0, maxPrice]);

    const params = new URLSearchParams(searchParams.toString());

    params.delete("minPrice");
    params.delete("maxPrice");

    updateURL(params);
  };

  return (
    <aside className="w-64 space-y-8">
      <Accordion
        // type="single"
        value={openCategory}
        onValueChange={setOpenCategory}
        className="w-full"
      >
        {categories.map((category) => (
          <AccordionItem
            key={category.id}
            value={category.id.toString()}
            className="border-b border-gray-200"
          >
            <AccordionTrigger className="cursor-pointer text-lg font-medium hover:no-underline">
              {category.name}
            </AccordionTrigger>

            <AccordionContent className="space-y-3 pb-4">
              <div className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={
                    categoryId === category.id.toString() &&
                    !subcategoryId
                  }
                  onCheckedChange={() =>
                    handleCategoryChange(
                      category.id.toString()
                    )
                  }
                />

                <label
                  htmlFor={`category-${category.id}`}
                  className="cursor-pointer text-sm font-medium"
                >
                  All
                </label>
              </div>

              {category.children?.map((child) => (
                <div
                  key={child.id}
                  className="flex items-center gap-2 pl-5"
                >
                  <Checkbox
                    id={`subcategory-${child.id}`}
                    checked={
                      categoryId === category.id.toString() &&
                      subcategoryId === child.id.toString()
                    }
                    onCheckedChange={() =>
                      handleSubCategoryChange(
                        category.id.toString(),
                        child.id.toString()
                      )
                    }
                  />

                  <label
                    htmlFor={`subcategory-${child.id}`}
                    className="cursor-pointer text-sm"
                  >
                    {child.name}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Price Filter */}
      <div className="space-y-5 rounded-lg">
        <h3 className="text-lg font-semibold">
          Price
        </h3>

        <Slider
          min={0}
          max={maxPrice}
          step={10}
          value={priceRange}
          onValueChange={(value) =>
            setPriceRange(value as number[])
          }
        />

        <div className="flex justify-between text-sm font-medium">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>

        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={handleApplyPrice}
          >
            Apply
          </Button>

          <Button
            variant="outline"
            onClick={handleClearPrice}
          >
            Clear
          </Button>
        </div>
      </div>
    </aside>
  );
}
