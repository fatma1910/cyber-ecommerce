'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Link } from '@/i18n/navigation'
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { toast } from "sonner"
import { useState } from 'react'
import { useWishlistStore } from '@/store/wishlistStore'
import { useTranslations } from 'next-intl'


const Card = ( product:Product ) => {
    const [wishlisted, setWishlist] = useState(false);
    const { wishlist, toggleWishlist } = useWishlistStore();
    const t = useTranslations('products.card');

    const isWishlisted = wishlist.some(
        (item) => item.id === product.id
    );

    const handleWishlistToggle = () => {
        setWishlist((prev) => !prev);
        if (!wishlisted) {
        toggleWishlist(product)
          toast.success(t("addedToWishlist"));
        } else {
            toast.error(t("removedFromWishlist"));
        }
    }

  return (
    <div className='bg-[#F6F6F6] py-6 px-4 rounded-[8px] h-full justify-between flex flex-col items-center gap-2 relative'>
        {product.salePrice &&

            <p className='text-sm  absolute left-2 bg-red-500 text-white py-0.5 px-2 rounded-full top-2'>{t("sale")}</p>
        }
        <button onClick={handleWishlistToggle} className='absolute top-5 right-5'>
            {isWishlisted ? <IoHeartSharp size={32} className=' text-red-500 text-xl cursor-pointer' /> : <IoHeartOutline size={32} className=' text-gray-400 text-xl cursor-pointer' />}
        </button>
        <div className='flex flex-col items-center justify-between  gap-4 pt-6 '>
            <Image loading="eager" src={product.images[0].url} alt={product.name} width={160} height={160} className='object-cover h-40 w-40' />
            <h2 className='text-base font-medium'>{product.name}</h2>
            <div className='flex items-center gap-2'>
            <p className='text-2xl font-semibold'>${product.price}</p>
            {product.salePrice && <p className='text-sm line-through text-gray-500'>${product.salePrice}</p>}
            </div>
            
        </div>
        <Link href={`/product/${product.id}`} className='w-full'>
            <Button variant='default' size={'lg'} className={'w-full py-3 cursor-pointer'}>{t("buyNow")}</Button>
        </Link>
    </div>
  )
}

export default Card
