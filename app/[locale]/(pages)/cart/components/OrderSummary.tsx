"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/store/cartStore"

const formatMoney = (value: number) => `$${value.toFixed(0)}`

const OrderSummary = () => {
  const subtotal = useCartStore((state) => state.subtotal())
  const tax = useCartStore((state) => state.tax())
  const total = useCartStore((state) => state.total())

  return (
    <aside className="w-full flex-1 rounded-[12px] border border-[#E5E5E5] bg-white px-5 py-6   md:px-8 md:py-10">
      <h2 className="text-[20px] font-semibold text-[#111111]">
        Order Summary
      </h2>

      <div className="mt-8 space-y-7">
        <div className="space-y-2">
          <p className="text-[13px] font-medium text-[#666666]">
            Discount code / Promo code
          </p>
          <Input
            placeholder="Code"
            className=" rounded-[6px] border-[#D9D9D9] bg-white p-[16px] text-[13px] text-[#111111] placeholder:text-[#A3A3A3]"
          />
        </div>

        <div className="space-y-2">
          <p className="text-[13px] font-medium text-[#666666]">
            Your bonus card number
          </p>
          <div className="flex items-center gap-3 rounded-[6px] border border-[#D9D9D9] bg-white p-2.5">
            <Input
              placeholder="Enter Card Number"
              className="h-[34px] flex-1 border-0 bg-transparent px-1 text-[13px] shadow-none placeholder:text-[#A3A3A3] focus-visible:ring-0"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-[32px] rounded-[6px] border border-[#111111] px-5 text-[13px] font-medium text-[#111111] hover:bg-[#111111] hover:text-white"
            >
              Apply
            </Button>
          </div>
        </div>

        <div className="space-y-4 pt-2 text-[14px]">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#666666]">Subtotal</span>
            <span className="font-semibold text-[#111111]">
              {formatMoney(subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#666666]">Estimated Tax</span>
            <span className="font-semibold text-[#111111]">
              {formatMoney(tax)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#666666]">Estimated shipping &amp; Handling</span>
            <span className="font-semibold text-[#111111]">
              {formatMoney(29)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 pt-1">
            <span className="font-semibold text-[#111111]">Total</span>
            <span className="font-semibold text-[#111111]">
              {formatMoney(total + 29)}
            </span>
          </div>
        </div>

        <Button
          type="button"
          className="mt-4 h-[40px] w-full rounded-[6px] bg-black text-[14px] font-medium text-white hover:bg-black/90"
        >
          Checkout
        </Button>
      </div>
    </aside>
  )
}

export default OrderSummary
