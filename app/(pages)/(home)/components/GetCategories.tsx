import { getCategories } from '@/lib/data'
import { CategoryDetails } from '@/lib/types'
import Image from 'next/image'

const GetCategories = async () => {
    const categories = await getCategories({q:'', parentId: ''})

    if (categories === null) {
      return (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white/80 p-8 text-center text-sm text-gray-500">
          Categories are unavailable right now.
        </div>
      )
    }

    if (!categories.length) {
      return (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white/80 p-8 text-center text-sm text-gray-500">
          No categories are available yet.
        </div>
      )
    }

  return (
    <div className='grid grid-cols-6 gap-8'>
        {categories.map((category: CategoryDetails) => (
            <div key={category.id} className='w-full '>
                <div className='p-6 rounded-xl bg-[#EDEDED] flex flex-col items-center gap-2 justify-center'>
                    {category.imageUrl ? <Image loading='eager' src={category.imageUrl} width={48} height={48} alt={category.name} className='w-8 h-8 object-contain'/>
                        : <div className='w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center'>
                            <span className='text-sm text-gray-600'>{category.name.charAt(0).toUpperCase()}</span>
                        </div>    
                }
                    <p className='text-sm font-medium'>{category.name}</p>
                </div>
               
            </div>
        ))}
    </div>
  )
}

export default GetCategories
