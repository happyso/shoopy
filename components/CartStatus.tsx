import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getCart } from '../hooks/useCarts'
import { useUser } from '../hooks/useUser'

export default function CartStatus() {
    const { user } = useUser()
    const uid = user ? user.uid : undefined
    const { data: products } = useQuery(['carts', uid], () => getCart(uid))

    return <div>{products?.length}</div>
}
