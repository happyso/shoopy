import { useRouter } from 'next/router'
import React from 'react'
import Button from '../../components/Button'
import { useProducts } from '../../hooks/useProducts'
type IProduct = {
    title: string
    price: string
    category: string
    image: string
    description: string
    options: string
}

interface TypeProduct {
    isLoading: any
    error: any
    data: any
}
export default function Detail() {
    const router = useRouter()
    const { id } = router.query
    const { productQuery } = useProducts(id as string)

    const { isLoading, error, data: product }: TypeProduct = productQuery

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>error</p>}
            {product && (
                <section className="flex flex-col md:flex-row p-4">
                    <img
                        className="w-full px-4 basis-7/12"
                        src={product.image}
                        alt={product.title}
                    />
                    <div className="w-full basis-5/12 flex flex-col p-4">
                        <h2 className="text-3xl font-bold py-2">
                            {product.title}
                        </h2>
                        <p className="text-2xl font-bold py-2  border-b border-gray-400">
                            ₩{product.price}
                        </p>
                        <p className="py-4 text-lg">{product.description}</p>
                        <div className="flex items-center">
                            <label
                                className="text-brand font-bold"
                                htmlFor="select"
                            >
                                옵션:
                            </label>
                        </div>

                        <Button text="장바구니에 추가" />
                    </div>
                </section>
            )}
        </>
    )
}
