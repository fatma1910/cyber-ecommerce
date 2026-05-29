import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className='min-h-screen padding-x bg-[#211C24] flex items-center relative overflow-hidden'>
        <div className='  bg-[#211C24]  '>
            <p className='font-semibold text-2xl text-[#ffffff89] '>Pro.Beyond</p>
            <h1 className='text-[96px] text-white font-thin tracking-tight'>IPhone 14 <span className='font-semibold'>Pro</span> </h1>
            <p className='text-[#909090] font-medium text-lg mb-6'>Created to change everything for the better. For everyone</p>
            <Link href="/shop" className=''>
              <Button variant={'secondary'} size={'lg'}>Shop Now</Button>
            </Link>
        </div>
        <div>
          <Image src="/home/hero.png" alt="Hero Image" width={406} height={600} className='absolute right-28 top-1/6 ' />
        </div>
    </section>
  )
}

export default Hero