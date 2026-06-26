export interface Image {
  id: string;
  productId: string;
  url: string;

}

export interface CategoryDetails {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  parentId: string | null;
}

export interface ProductCategory {
  productId: string;
  categoryId: string;
  category: CategoryDetails;
}

export interface VariantValue {
  id: string;
  variantId: string;
  value: string;
  sku: string | null;
  stock: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Variant {
  id: string;
  productId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  values: VariantValue[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  salePrice: string;
  baseStock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  images: Image[];
  categories: ProductCategory[];
  variants: Variant[];
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detailsHtml: any;
  isFeatured: boolean;
  bestSeller: boolean;
}


export interface Address {
  line1: string;
  phone: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderPayload {
  userId: string;
  items: OrderItem[];
  cityName: string;
  address: Address;
  paymentMethod: "CASH" | "CARD";
  discountCode: string;
  totalPrice: number;
}


export interface HomeCardProps {
  bg: string;
  img: string;
  title: string;
  desc: string;
  titleColor: string;
  butVariant: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive" | null | undefined;
}