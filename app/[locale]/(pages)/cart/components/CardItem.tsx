import { CartItem } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";

const CardItem = ({ item }: { item: CartItem }) => {
  const { decreaseQuantity, increaseQuantity, removeFromCart } = useCartStore();

  return (
    <div className="flex w-full flex-col gap-4 border-b border-gray-300 pb-6 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={item.images[0].url}
          alt={item.name}
          width={100}
          height={100}
          className="h-20 w-20 rounded-[10px] object-cover"
        />
        <Link href={`/shop/${item.slug}`} className="flex min-w-0 flex-col gap-1">
          <h3 className="text-base font-medium">{item.name}</h3>
          <h3 className="text-sm font-medium">
            {Object.entries(item.selectedVariants)
              .map(([k, v]) => `${k}: ${v}`)
              .join(", ")}
          </h3>
          <p className="text-sm text-[#7E7E7E]">#{item.id}</p>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => decreaseQuantity(item.id, item.selectedVariants)}
            className="cursor-pointer"
          >
            <FaMinus />
          </button>
          <span className="rounded-[4px] border-[.5] border-[#D9D9D9] px-4 py-[8px] text-[14px]">
            {item.quantity}
          </span>
          <button
            onClick={() => increaseQuantity(item.id, item.selectedVariants)}
            className="cursor-pointer"
          >
            <FaPlus stroke=".5" />
          </button>
        </div>
        <p className="text-[20px] font-medium">
          {item.salePrice
            ? `$${Number(item.salePrice).toFixed(0)}`
            : `$${Number(item.price).toFixed(0)}`}
        </p>
        <button
          onClick={() => removeFromCart(item.id, item.selectedVariants)}
          className="cursor-pointer text-[14px]"
        >
          <GrClose size={24} />
        </button>
      </div>
    </div>
  );
};

export default CardItem;
