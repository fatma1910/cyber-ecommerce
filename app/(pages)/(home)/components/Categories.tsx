import GetCategories from "./GetCategories"


const Categories = () => {
  return (
    <section className="padding bg-[#FAFAFA]">
        <div className="mb-8">
        <h4 className="font-medium text-2xl">Browse By Category</h4>
        </div>
        <div>
            <GetCategories/>
        </div>
    </section>
  )
}

export default Categories