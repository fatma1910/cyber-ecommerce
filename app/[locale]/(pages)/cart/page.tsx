'use client'

import { useCartStore } from "@/store/cartStore";
import CartItems from "./components/CartItems"
import OrderSummary from "./components/OrderSummary"


const Page = () => {
    const { cartItems } = useCartStore();
  return (
    <div className="padding flex flex-col gap-10 lg:flex-row lg:items-start ">
        <CartItems cartItems={cartItems}   />
        <OrderSummary />
    </div>
  )
}

export default Page
