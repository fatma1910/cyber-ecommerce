
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + '/api' || 'http://localhost:3000/api';

export async function getProducts({ page = 1, pageSize = 20,q = '',categoryId = '', }: {page:number , pageSize:number , q:string,  categoryId: string }) {
    const res = await fetch(
        `${BASE_URL}/products?page=${page}&pageSize=${pageSize}&q=${q}&categoryId=${categoryId}`,
       { 
        next: { revalidate: 60 } 
       }
    );

    if (!res.ok) throw new Error('Failed to fetch products')
    const data = await res.json();

    return data.items;
}



export async function getProductDetails(id: string) {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        next: { revalidate: 60 }
    });

    if (!res.ok) throw new Error('Failed to fetch product details');
    const data = await res.json();

    return data.item;
}


export async function getBundles({ page = 1, pageSize = 20,q = '' }: {page:number , pageSize:number , q:string}) {
    const res = await fetch(`${BASE_URL}/bundles?page=${page}&pageSize=${pageSize}&q=${q}`, {
        next: { revalidate: 60 }
    });

    if (!res.ok) throw new Error('Failed to fetch bundles');
    const data = await res.json();

    return data.items;
}

export async function getBundleDetails(id: string) {
    const res = await fetch(`${BASE_URL}/bundles/${id}`, {
        next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error('Failed to fetch bundles details');
    const data = await res.json();

    return data.item;
}


export async function getCategories({q , parentId}: {q:string, parentId: string}) {
    const res = await fetch(`${BASE_URL}/categories?q=${q}&parentId=${parentId}`, {
        next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    return data.items;
}


export async function getOffers () {
    const res = await fetch(`${BASE_URL}/offers?page=1&pageSize=20&type=`, {
        next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error('Failed to fetch offers');
    const data = await res.json();
    return data.items;
}


export async function getShippingDetails() {
    const res = await fetch(`${BASE_URL}/shipping`, {
        next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error('Failed to fetch shipping details');
    const data = await res.json();
    return data.items;
}