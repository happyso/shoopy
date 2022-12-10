import { v4 as uuid } from 'uuid'
import { ref, set, get } from 'firebase/database'
import { database } from '../pages/api/firebase'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
type IProduct = {
    id: string
    title: string
    price: string
    category: string
    description: string
    options: string
}

export async function addNewProduct(product: IProduct, image: string) {
    const id = uuid()
    return set(ref(database, `products/${id}`), {
        ...product,
        id,
        price: parseInt(product.price),
        image,
        options: product.options.split(','),
    })
}

export async function getProducts() {
    return get(ref(database, 'products')).then((snapshot) => {
        if (snapshot.exists()) {
            return Object.values(snapshot.val())
        }
        return []
    })
}

export async function getProduct(id: string) {
    return get(ref(database, 'products/' + id)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val()
        }
        return {}
    })
}

export function useProducts(id?: string) {
    const queryClient = useQueryClient()

    const productsQuery = useQuery(['products'], getProducts, {
        staleTime: 1000 * 60,
    })

    const productQuery = useQuery(
        ['products', id],
        () => getProduct(id as string),
        {
            staleTime: 1000 * 60,
        }
    )

    const addProduct = useMutation(
        ({ product, url }: { product: IProduct; url: string }) =>
            addNewProduct(product, url),
        {
            onSuccess: () => queryClient.invalidateQueries(['products']),
        }
    )
    return { productsQuery, addProduct, productQuery }
}
