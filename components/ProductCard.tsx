import React from 'react'
import { useRouter } from 'next/router'
type IProduct = {
    id: string
    title: string
    price: string
    category: string
    image: string
    description: string
    options: string
}

interface TypeProduct {
    product: IProduct
}
export default function ProductCard({ product }: TypeProduct) {
    const { id, image, title, category, price } = product
    const router = useRouter()
    return (
        <li
            onClick={() => {
                router.push(
                    {
                        pathname: `/products/${id}`,
                        query: { id: id },
                    },
                    `/products/${id}`
                )
                // navigate(`/products/${id}`, { state: { product } });
            }}
            className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105"
        >
            <img className="w-full" src={image} alt={title} />
            <div className="mt-2 px-2 text-lg flex justify-between items-center">
                <h3 className="truncate">{title}</h3>
                <p>{`₩${price}`}</p>
            </div>
            <p className="mb-2 px-2 text-gray-600">{category}</p>
        </li>
    )
}
