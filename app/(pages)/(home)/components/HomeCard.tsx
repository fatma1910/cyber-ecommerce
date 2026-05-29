import { Button } from '@/components/ui/button'
import Image from 'next/image'


const HomeCard = ({bg , img , title , desc , titleColor}:{bg:string , img:string , title:string , desc:string , titleColor:string}) => {
  return (
    <div className={`flex items-center gap-6 p-6 rounded-xl ${bg} `}>
        <Image src={img} alt={title} width={100} height={100} className='object-cover'/>
        <div className='flex flex-col gap-2'>
            <h1 className={`font-light text-[29px] ${titleColor}`}>{title}</h1>
            <p className='font-medium text-[#909090] text-sm'>{desc}</p>
        </div>
        <Button variant={'outline'} size={'lg'} className='ml-auto'>Shop Now</Button>
    </div>
  )
}

export default HomeCard