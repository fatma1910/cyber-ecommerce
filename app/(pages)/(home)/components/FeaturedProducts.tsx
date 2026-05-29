'use client'
import  { useState } from 'react'
import GetProducts from './GetProducts';

const headerLinks = [
    { name: 'New Arrival', href: 'new-arrival' },
    { name: 'Bestseller', href: 'bestseller' },
    { name: 'Featured Products', href: 'featured' },

  ];


const FeaturedProducts = () => {
    const [cat, setCat] = useState('new-arrival')
  return (
    <section className='padding'>
        <div className='flex gap-8 mb-3'>
            {headerLinks.map((link) => {
                return (
                    <button key={link.name} onClick={() => setCat(link.href)} className={`text-sm sm:text-base  text-gray-400 font-medium duration-100 hover:text-primary cursor-pointer pb-1 ${cat === link.href ? " text-primary  underline" : ""} transition duration-150`}>
                        {link.name}
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