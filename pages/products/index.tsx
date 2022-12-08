import React from 'react'
import { useProducts } from '../../hooks/useProducts'

export default function Index() {
    const {
        productsQuery: { isLoading, error, data: products },
    } = useProducts()
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>error</p>}
            <ul className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4">
                {products &&
                    products.map((product: any) => (
                        <div
                            key={product.id}
                            className="bg-gray-50 p-8 mx-2 rounded-2xl text-center text-lg md:text-xl"
                        >
                            <img src={product.image} alt={product.text} />
                            <p>{product.description}</p>
                            <p className="font-bold text-brand text-xl md:text-2xl">
                                ₩{product.price}
                            </p>
                        </div>
                    ))}
            </ul>
        </>
    )
}
