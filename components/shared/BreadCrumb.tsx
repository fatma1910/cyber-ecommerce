import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const BreadCrumb = ({category, productName}:{category:string,productName:string}) => {
  return (
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbLink href={`/shop/${category}`}>{category}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbPage>{productName}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumb