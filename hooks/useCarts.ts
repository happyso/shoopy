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

export async function getCart(userId: string | undefined) {
    return get(ref(database, `carts/${userId}`)) //
        .then((snapshot) => {
            const items = snapshot.val() || {}
            return Object.values(items)
        })
}

export async function addOrUpdateCart(userId: string, product: any) {
    return set(ref(database, `carts/${userId}/${product.id}`), product)
}

export async function removeFromCart(userId: string, productId: string) {
    return remove(ref(database, `carts/${userId}/${productId}`))
}

export function useCart(userId: any) {
    const queryClient = useQueryClient()

    const cartQuery = useQuery(['carts', userId || ''], () => getCart(userId), {
        enabled: !!userId, //userId가 있을때만 useQuery가 동작하게끔
        staleTime: 1000 * 60,
    })

    const addOrUpdateItem = useMutation(
        (product) => addOrUpdateCart(userId, product),
        {
            onSuccess: () => queryClient.invalidateQueries(['carts', userId]),
        }
    )

    const removeItem = useMutation((id: string) => removeFromCart(userId, id), {
        onSuccess: () => queryClient.invalidateQueries(['carts', userId]),
    })
    return { cartQuery, addOrUpdateItem, removeItem }
}
