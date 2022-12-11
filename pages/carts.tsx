import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Button from '../components/Button'
import CartItem from '../components/CartItem'
import PriceCard from '../components/PriceCard'
import { getCart, useCart } from '../hooks/useCarts'
import { useUser } from '../hooks/useUser'
const SHIPPING = 3000
export default function CartStatus() {
    const { user } = useUser()
    const uid = user ? user.uid : undefined

    const {
        cartQuery: { isLoading, data: products },
    } = useCart(uid)

    if (isLoading) return <p>Loading...</p>
    const hasProducts = products && products.length > 0
    const totalPrice: any =
        products &&
        products.reduce(
            (prev: any, current: any) =>
                prev + parseInt(current.price) * current.quantity,
            0
        )
    return (
        <section className="p-8 flex flex-col">
            <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">
                내 장바구니
            </p>
            {!hasProducts && (
                <p>장바구니에 상품이 없습니다. 열심히 쇼핑해 주세요!</p>
            )}
            {hasProducts && (
                <>
                    <ul className="border-b border-gray-300 mb-8 p-4 px-8">
                        {products &&
                            products.map((product: any) => (
                                <CartItem
                                    key={product.id}
                                    product={product}
                                    uid={uid}
                                />
                            ))}
                    </ul>
                    <div className="flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16">
                        <PriceCard text="상품 총액" price={totalPrice} />

                        <PriceCard text="배송액" price={SHIPPING} />

                        <PriceCard
                            text="총가격"
                            price={totalPrice + SHIPPING}
                        />
                    </div>
                    <Button text="주문하기" />
                </>
            )}
        </section>
    )
}
