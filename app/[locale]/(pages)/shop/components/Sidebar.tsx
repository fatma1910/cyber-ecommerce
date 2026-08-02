"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { SlidersHorizontal } from "lucide-react";

import { CategoryDetails } from "@/lib/types";
import { usePathname } from "@/i18n/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type SidebarProps = {
  categories: CategoryDetails[];
  maxPrice?: number;
};

type SidebarContentProps = {
  categories: CategoryDetails[];
  categoryId: string | null;
  subcategoryId: string | null;
  openCategory: string[];
  setOpenCategory: (value: string[]) => void;
  maxPrice: number;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  onCategoryChange: (id: string) => void;
  onSubCategoryChange: (categoryId: string, subcategoryId: string) => void;
  onApplyPrice: () => void;
  onClearPrice: () => void;
};

function SidebarContent({
  categories,
  categoryId,
  subcategoryId,
  openCategory,
  setOpenCategory,
  maxPrice,
  priceRange,
  setPriceRange,
  onCategoryChange,
  onSubCategoryChange,
  onApplyPrice,
  onClearPrice,
}: SidebarContentProps) {
  const t = useTranslations("shop.sidebar");
  const common = useTranslations("common");

  return (
    <div className="space-y-8">
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
            <AccordionTrigger className="cursor-pointer text-start text-lg font-medium hover:no-underline">
              {category.name}
            </AccordionTrigger>

            <AccordionContent className="space-y-3 pb-4">
              <div className="flex cursor-pointer items-center gap-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={
                    categoryId === category.id.toString() && !subcategoryId
                  }
                  onCheckedChange={() =>
                    onCategoryChange(category.id.toString())
                  }
                />

                <label
                  htmlFor={`category-${category.id}`}
                  className="cursor-pointer text-sm font-medium"
                >
                  {common("all")}
                </label>
              </div>

              {category.children?.map((child) => (
                <div key={child.id} className="flex items-center gap-2 ps-5">
                  <Checkbox
                    id={`subcategory-${child.id}`}
                    checked={
                      categoryId === category.id.toString() &&
                      subcategoryId === child.id.toString()
                    }
                    onCheckedChange={() =>
                      onSubCategoryChange(
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

      <div className="space-y-5 rounded-lg">
        <h3 className="text-lg font-semibold">{t("price")}</h3>

        <Slider
          min={0}
          max={maxPrice}
          step={10}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as number[])}
        />

        <div className="flex justify-between text-sm font-medium">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" onClick={onApplyPrice}>
            {common("apply")}
          </Button>

          <Button variant="outline" onClick={onClearPrice}>
            {common("clear")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ categories, maxPrice = 10000 }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("shop.sidebar");
  const common = useTranslations("common");

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const updateURL = (params: URLSearchParams) => {
    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
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
    closeMobileMenu();
  };

  const handleSubCategoryChange = (categoryId: string, subcategoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedCategoryId = params.get("categoryId");
    const selectedSubcategoryId = params.get("subcategoryId");

    if (
      selectedCategoryId === categoryId &&
      selectedSubcategoryId === subcategoryId
    ) {
      params.delete("subcategoryId");
    } else {
      params.set("categoryId", categoryId);
      params.set("subcategoryId", subcategoryId);
    }

    setOpenCategory([categoryId]);
    updateURL(params);
    closeMobileMenu();
  };

  const handleApplyPrice = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());

    updateURL(params);
    closeMobileMenu();
  };

  const handleClearPrice = () => {
    setPriceRange([0, maxPrice]);

    const params = new URLSearchParams(searchParams.toString());

    params.delete("minPrice");
    params.delete("maxPrice");

    updateURL(params);
    closeMobileMenu();
  };

  return (
    <>
      <div className="lg:hidden">
        <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <DialogTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                className="mb-4 w-full justify-between gap-2 px-4 py-3"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="size-4" />
                  {t("title")}
                </span>
              </Button>
            }
          />

          <DialogContent className="start-0 top-auto bottom-0 w-full max-w-none -translate-x-0 translate-y-0 rounded-t-3xl rounded-b-none border-b-0 p-0 shadow-[0_-20px_50px_rgba(0,0,0,0.18)]">
            <div className="max-h-[85vh] space-y-6 overflow-y-auto p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
              <DialogHeader className="gap-2">
                <DialogTitle>{t("title")}</DialogTitle>
                <DialogDescription>{t("description")}</DialogDescription>
              </DialogHeader>

              <SidebarContent
                categories={categories}
                categoryId={categoryId}
                subcategoryId={subcategoryId}
                openCategory={openCategory}
                setOpenCategory={setOpenCategory}
                maxPrice={maxPrice}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                onCategoryChange={handleCategoryChange}
                onSubCategoryChange={handleSubCategoryChange}
                onApplyPrice={handleApplyPrice}
                onClearPrice={handleClearPrice}
              />

              <DialogClose variant="outline" size="default" className="w-full">
                {common("cancel")}
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <aside className="hidden w-full max-w-full space-y-8 lg:block lg:w-64">
        <SidebarContent
          categories={categories}
          categoryId={categoryId}
          subcategoryId={subcategoryId}
          openCategory={openCategory}
          setOpenCategory={setOpenCategory}
          maxPrice={maxPrice}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          onCategoryChange={handleCategoryChange}
          onSubCategoryChange={handleSubCategoryChange}
          onApplyPrice={handleApplyPrice}
          onClearPrice={handleClearPrice}
        />
      </aside>
    </>
  );
}
