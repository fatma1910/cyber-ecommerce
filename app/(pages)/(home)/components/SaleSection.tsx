import { Button } from "@/components/ui/button"
import Link from "next/link"

const SaleSection = () => {
  return (
    <section className="padding bg-[url(/home/saleBg.png)] bg-cover bg-center flex items-center justify-center text-center">
        <div>
            <h2 className="text-4xl sm:text-[72px] font-thin text-white tracking-tight ">Big Summer <span className="font-normal">Sale</span></h2>
            <p className="text-[#787878] text-[16px]">Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
            <Link href="/shop">
                <Button variant={'secondary'} size={'lg'} className="mt-6">Shop Now</Button>
            </Link>
        </div>
    </section>
  )
}

export default SaleSection