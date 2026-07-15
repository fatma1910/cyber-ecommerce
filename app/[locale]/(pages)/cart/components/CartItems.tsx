import { CartItem } from "@/lib/types"
import CardItem from "./CardItem"


const CartItems = ({cartItems}: {cartItems:CartItem[]}) => {
  return (
    <section className="flex-1" >
        <h1 className="text-[24px] font-semibold ">Shopping Cart</h1>
        <div className="flex flex-col gap-4 space-y-[40px] mt-10 ">
            {cartItems.map((item:CartItem , key) => (
               <CardItem key={key} item={item} />
            ))}
        </div>
    </section>
  )
}

export default CartItems