import { CreateOrderPayload } from "./types";

const BASE_URL = `${(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '')}/api`;

export async function getProducts({ page = 1, pageSize = 20,q = '',categoryId = '', }: {page:number , pageSize:number , q:string,  categoryId: string }) {
    try {
        const res = await fetch(
            `${BASE_URL}/products?page=${page}&pageSize=${pageSize}&q=${q}&categoryId=${categoryId}`,
           { 
            next: { revalidate: 60 } 
           }
        );

        if (!res.ok) throw new Error('Failed to fetch products')
        const data = await res.json();

        return data.items;
    } catch (error) {
        console.error('Failed to load products', error);
        return null;
    }
}



export async function getProductDetails(id: string) {
    try {
        const res = await fetch(`${BASE_URL}/products/${id}`, {
            next: { revalidate: 60 }
        });

        if (!res.ok) throw new Error('Failed to fetch product details');
        const data = await res.json();

        return data.item;
    } catch (error) {
        console.error('Failed to load product details', error);
        return null;
    }
}


export async function getBundles({ page = 1, pageSize = 20,q = '' }: {page:number , pageSize:number , q:string}) {
    try {
        const res = await fetch(`${BASE_URL}/bundles?page=${page}&pageSize=${pageSize}&q=${q}`, {
            next: { revalidate: 60 }
        });

        if (!res.ok) throw new Error('Failed to fetch bundles');
        const data = await res.json();

        return data.items;
    } catch (error) {
        console.error('Failed to load bundles', error);
        return [];
    }
}

export async function getBundleDetails(id: string) {
    try {
        const res = await fetch(`${BASE_URL}/bundles/${id}`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) throw new Error('Failed to fetch bundles details');
        const data = await res.json();

        return data.item;
    } catch (error) {
        console.error('Failed to load bundle details', error);
        return null;
    }
}


export async function getCategories({q , parentId}: {q:string, parentId: string}) {
    try {
        const res = await fetch(`${BASE_URL}/categories?q=${q}&parentId=${parentId}`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        return data.items;
    } catch (error) {
        console.error('Failed to load categories', error);
        return null;
    }
}


export async function getOffers () {
    try {
        const res = await fetch(`${BASE_URL}/offers?page=1&pageSize=20&type=`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) throw new Error('Failed to fetch offers');
        const data = await res.json();
        return data.items;
    } catch (error) {
        console.error('Failed to load offers', error);
        return [];
    }
}


export async function getShippingDetails() {
    try {
        const res = await fetch(`${BASE_URL}/shipping`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) throw new Error('Failed to fetch shipping details');
        const data = await res.json();
        return data.items;
    } catch (error) {
        console.error('Failed to load shipping details', error);
        return [];
    }
}




export async function createOrder (OrderData: CreateOrderPayload) {
    try {
        const res = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(OrderData)
        });
          if (!res.ok) {
        throw new Error('Failed to create order')
      }

      return res.json();
    } catch (error) {
        console.error('Failed to create order', error);
        throw error;
    }
}
