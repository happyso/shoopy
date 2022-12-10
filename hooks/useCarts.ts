import { ref, set, get, remove } from 'firebase/database'
import { database } from '../pages/api/firebase'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
type IProduct = {
    id: string | undefined
    image: string | undefined
    title: string | undefined
    price: string | undefined
    option: string | string[] | undefined
    quantity: number
}

interface TypeProduct {
    userId: string
    product: IProduct | undefined
}

export async function getCart(userId: string) {
    return get(ref(database, `carts/${userId}`)) //
        .then((snapshot) => {
            const items = snapshot.val() || {}
            return Object.values(items)
        })
}

export async function addOrUpdateCart(
    userId: string,
    product: IProduct | undefined
) {
    return set(ref(database, `carts/${userId}/${product?.id}`), product)
}

export async function removeFromCart(userId: string, productId: string) {
    return remove(ref(database, `carts/${userId}/${productId}`))
}

// export function useCart() {
//     const queryClient = useQueryClient()

//     const productsQuery = useQuery(['products'], getCart, {
//         staleTime: 1000 * 60,
//     })

//     const addProduct = useMutation(
//         ({ product, url }: { product: IProduct; url: string }) =>
//             addCart(product, url),
//         {
//             onSuccess: () => queryClient.invalidateQueries(['products']),
//         }
//     )
//     return { productsQuery, addProduct, productQuery }
// }
