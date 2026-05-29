import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"


const Devices = () => {
  return (
    <section className='flex overflow-hidden h-full justify-stretch '>
      <div className='flex-1 flex flex-col h-full  '>
        <div className=" pt-8 flex flex-1 items-center   ">
          <div className="flex-1 ">
            <Image src={'/home/playstation.png'} alt="playstation" width={360} height={343} className=""/>
          </div>
          
          <div className="flex flex-1 flex-col gap-1  pr-20 ">
            <h1 className="font-medium text-[49px] ">Playstation 5</h1>
            <p className="font-medium text-[#909090] text-sm">Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
          </div>
          
        </div>
        <div className="flex items-center h-full flex-1 justify-center   ">
          <div className="flex-1 flex items-center gap-4 pr-4 ">
            <div className="flex-1 ">
            <Image src={'/home/airpods.png'} alt="playstation" width={104} height={272} className="object-cover"/>
          </div>
          
          <div className="flex flex-1  flex-col gap-1  ">
            <h1 className="font-light text-[29px] ">Apple AirPods <span className="font-medium">Max</span> </h1>
            <p className="font-medium text-[#909090] text-sm">Computational audio. Listen, it&apos;s powerful</p>
          </div>
          
          </div>
          <div className="flex-1 flex items-center gap-4 bg-[#353535] h-[stretch] pr-[48px] ">
            <div className="flex-1 ">
            <Image src={'/home/apple.png'} alt="playstation" width={136} height={190} className=""/>
          </div>
          
          <div className="flex flex-1  flex-col gap-1  ">
            <h1 className="font-light text-[29px] text-white ">Apple Vision <span className="font-medium">Pro</span> </h1>
            <p className="font-medium text-[#909090] text-sm">An immersive way to experience entertainment</p>
          </div>
          
          </div>
        </div>
      </div>
      <div className='py-[44px] pl-[44px] bg-[#EDEDED] flex-1 flex items-center justify-between gap-4 '>
        <div className="flex flex-col gap-3 ">
          <h1 className='text-[64px] font-thin  '>Macbook <span className="font-medium">Air</span></h1>

          <p className="text-[#909090] text-sm font-semibold">The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
          <Link  href={'/shop'}>
          <Button variant={'outline'} size={'lg'} className="w-1/2">Shop Now</Button>
          </Link>
        </div>
        <div className=" ">

          <Image src={'/home/MacBook.png'} loading="eager" alt="macbook" width={500} height={500} className="object-cover"/>
        </div>
      </div>
    </section>
  )
}

export default Devices