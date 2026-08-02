'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Link } from '@/i18n/navigation'
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { toast } from "sonner"
import { useWishlistStore } from '@/store/wishlistStore'
import { useTranslations } from 'next-intl'


const Card = ( product:Product ) => {
    const { wishlist, toggleWishlist } = useWishlistStore();
    const t = useTranslations('products.card');

    const isWishlisted = wishlist.some(
        (item) => item.id === product.id
    );

   const handleWishlistToggle = () => {
  toggleWishlist(product);

  if (isWishlisted) {
    toast.error(t("removedFromWishlist"));
  } else {
    toast.success(t("addedToWishlist"));
  }
};

  return (
    <div className='relative flex h-full flex-col items-center justify-between gap-2 rounded-[8px] bg-[#F6F6F6] px-4 py-6'>
        {product.salePrice &&

            <p className='absolute start-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-sm text-white'>{t("sale")}</p>
        }
        <button onClick={handleWishlistToggle} className='absolute end-5 top-5'>
            {isWishlisted ? <IoHeartSharp size={32} className=' text-red-500 text-xl cursor-pointer' /> : <IoHeartOutline size={32} className=' text-gray-400 text-xl cursor-pointer' />}
        </button>
        <div className='flex flex-col items-center justify-between gap-4 pt-6'>
          <Link href={`/shop/${product.slug}`} className='w-full'> <Image loading="eager" src={product.images[0].url} alt={product.name} width={160} height={160} className='h-40 w-40 object-contain' /> </Link>
            
            <h2 className='text-base font-medium'>{product.name}</h2>
            <div className='flex flex-wrap items-center justify-center gap-2'>
            <p className='text-2xl font-semibold'>${product.price}</p>
            {product.salePrice && <p className='text-sm line-through text-gray-500'>${product.salePrice}</p>}
            </div>
            
        </div>
        <Link href={`/shop/${product.slug}`} className='w-full'>
            <Button variant='default' size={'lg'} className={'w-full py-3 cursor-pointer'}>{t("buyNow")}</Button>
        </Link>
    </div>
  )
}

export default Card
