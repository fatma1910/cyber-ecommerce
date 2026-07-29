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

  const categoryParam = searchParams.get("category");
  const subcategoryParam = searchParams.get("subcategory");

  // Open category from URL
  const initialOpenCategory = categories.find((category) => {
    return (
      category.name === categoryParam ||
      category.children?.some(
        (child) => child.name === subcategoryParam
      )
    );
  });

  const [openCategory, setOpenCategory] = useState<string | undefined>(
    initialOpenCategory?.id.toString()
  );

  // Price state
  const [priceRange, setPriceRange] = useState<number[]>([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || maxPrice,
  ]);


  const updateURL = (params: URLSearchParams) => {
    const query = params.toString();

    router.push(
      query ? `${pathname}?${query}` : pathname
    );
  };


  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get("category") === category) {
      params.delete("category");
      params.delete("subcategory");
    } else {
      params.set("category", category);
      params.delete("subcategory");
    }

    updateURL(params);
  };


  const handleSubCategoryChange = (
    parentCategory: string,
    subcategory: string
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    // keep parent category
    params.set("category", parentCategory);

    if (params.get("subcategory") === subcategory) {
      params.delete("subcategory");
    } else {
      params.set("subcategory", subcategory);
    }

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

      {/* Categories */}
      <Accordion
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

            <AccordionTrigger
              className="text-lg font-medium hover:no-underline"
            >
              {category.name}
            </AccordionTrigger>


            <AccordionContent className="space-y-3 pb-4">

              {/* Parent Category */}
              <div className="flex items-center gap-2">

                <Checkbox
                  id={`category-${category.id}`}
                  checked={
                    categoryParam === category.name
                  }
                  onCheckedChange={() =>
                    handleCategoryChange(category.name)
                  }
                />

                <label
                  htmlFor={`category-${category.id}`}
                  className="cursor-pointer text-sm font-medium"
                >
                  All
                </label>

              </div>



              {/* Sub Categories */}
              {category.children?.map((child) => (

                <div
                  key={child.id}
                  className="flex items-center gap-2 pl-5"
                >

                  <Checkbox
                    id={`subcategory-${child.id}`}
                    checked={
                      subcategoryParam === child.name
                    }
                    onCheckedChange={() =>
                      handleSubCategoryChange(
                        category.name,
                        child.name
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
      <div className="space-y-5 rounded-lg ">

        <h3 className="text-lg font-semibold">
          Price
        </h3>


        <Slider
          min={0}
          max={maxPrice}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
        />


        <div className="flex justify-between text-sm font-medium">
          <span>
            ${priceRange[0]}
          </span>

          <span>
            ${priceRange[1]}
          </span>
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