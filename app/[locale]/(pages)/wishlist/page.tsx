'use client'

import Card from "@/components/shared/Card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useWishlistStore } from "@/store/wishlistStore";
import { TbHeartBrokenFilled } from "react-icons/tb";



const Page = () => {
        const { wishlist } = useWishlistStore();
        console.log(wishlist)
    
  return (
    <div className="padding flex flex-col gap-6 ">
        <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-medium sm:text-[42px] lg:text-[49px]">Wishlist</h1>
            <p className="text-gray-500 text-sm">{wishlist.length} {wishlist.length === 1 ? "item" : "items"}</p>
        </div>
        <div className="">
            {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 mt-6 sm:mt-20">
                    <TbHeartBrokenFilled size={80} className="text-red-600/50" />
                    <p className="text-lg text-gray-500">Your wishlist is empty.</p>
                    <Link href="/shop"> 
                    <Button variant="default" size={"lg"} className="mt-1 sm:mt-4 w-[150px] cursor-pointer">
                        Start Shopping
                    </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
                    {wishlist.map((item) => (
                        <Card key={item.id} {...item} />
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default Page