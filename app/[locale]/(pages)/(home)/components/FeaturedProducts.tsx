'use client'
import  { useState } from 'react'
import GetProducts from './GetProducts';
import { useTranslations } from 'next-intl';

const headerLinks = [
    { key: 'newArrival', href: 'new-arrival' },
    { key: 'bestseller', href: 'bestseller' },
    { key: 'featuredProducts', href: 'featured' },
  ];

const FeaturedProducts = () => {
    const [cat, setCat] = useState('new-arrival')
    const t = useTranslations('home.featuredTabs')

  return (
    <section className='padding'>
        <div className='mb-4 flex flex-wrap gap-x-6 gap-y-2 sm:gap-8'>
            {headerLinks.map((link) => {
                return (
                    <button key={link.key} onClick={() => setCat(link.href)} className={`pb-1 text-sm font-medium text-gray-400 transition duration-150 hover:text-primary sm:text-base whitespace-nowrap cursor-pointer ${cat === link.href ? " text-primary  underline" : ""}`}>
                        {t(link.key)}
                    </button>
                )
            }
            )}
        </div>
        <div >
            <GetProducts/>
        </div>
    </section>
  )
}

export default FeaturedProducts
