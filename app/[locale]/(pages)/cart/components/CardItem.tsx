import { CartItem } from "@/lib/types"
import { useCartStore } from "@/store/cartStore"
import Image from "next/image";
import Link from "next/link";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";




const CardItem = ({item}:{item:CartItem}) => {
    const {decreaseQuantity ,increaseQuantity ,removeFromCart } = useCartStore();
  return (
    <div className="flex flex-1 items-center gap-2 last:border-0 border-b border-gray-300 pb-6 justify-between w-full ">
        <div className="flex items-center gap-4">
            <Image src={item.images[0].url} alt={item.name} width={100} height={100} className="rounded-[10px] object-cover" />
            <Link href={'/shop/'+item.slug} className="flex flex-col gap-1">
                <h3 className="text-[16px] font-medium">{item.name}</h3>  
                <h3 className="text-[14px] font-medium">{Object.entries(item.selectedVariants).map(([k,v]) => `${k}: ${v}`).join(', ')}</h3>
                <p className="text-[14px] text-[#7E7E7E]">#{item.id}</p>

                
            </Link>

        </div>
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
                <button onClick={() => decreaseQuantity(item.id , item.selectedVariants)} className="cursor-pointer"> <FaMinus /></button>
                <span className="text-[14px] border-[.5] border-[#D9D9D9] py-[8px] px-4 rounded-[4px]">{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id , item.selectedVariants)} className="cursor-pointer"> 
                    <FaPlus stroke=".5" />
                </button>
            </div>
            <p className="text-[20px] font-medium">{item.salePrice ? `$${Number(item.salePrice).toFixed(0)}` : `$${Number(item.price).toFixed(0)}`} </p>

                <button onClick={() => removeFromCart(item.id , item.selectedVariants)} className="text-[14px] cursor-pointer"><GrClose size={24}/></button>
            </div>

    </div>
  )
}

export default CardItem