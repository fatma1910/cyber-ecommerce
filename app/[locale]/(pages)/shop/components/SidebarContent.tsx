import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { SidebarContentProps } from "@/lib/types";
import { useTranslations } from "next-intl";



export default function SidebarContent({
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
          dir="ltr"
        />

        <div className="flex justify-between text-sm font-medium" dir="ltr">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 cursor-pointer" onClick={onApplyPrice}>
            {common("apply")}
          </Button>

          <Button variant="outline" className={'cursor-pointer'} onClick={onClearPrice}>
            {common("clear")}
          </Button>
        </div>
      </div>
    </div>
  );
}