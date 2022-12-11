import { useRouter } from 'next/router'
import React, { useState, ChangeEvent, MouseEvent } from 'react'
import Button from '../../components/Button'
import { addOrUpdateCart, useCart } from '../../hooks/useCarts'
import { addNewProduct, useProducts } from '../../hooks/useProducts'
import { useUser } from '../../hooks/useUser'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
type IProduct = {
    id: string
    title: string
    price: string
    category: string
    image: string
    description: string
    options: { [key: number]: string | string[] }
}

type ICart = {
    id: string
    title: string
    price: string
    category: string
    image: string
    description: string
    option: string
    quantity: number
}
interface TypeProduct {
    isLoading: boolean
    isError: boolean
    data: IProduct | undefined
}
export default function Detail() {
    const { user } = useUser()
    const router = useRouter()
    const { id } = router.query
    const { productQuery } = useProducts(id as string)
    const { isLoading, isError, data: product }: TypeProduct = productQuery
    const { addOrUpdateItem } = useCart(user?.uid)
    const [success, setSuccess] = useState<string | null>('')
    const [selected, setSelected] = useState(
        product?.options && Object.values(product.options)[0]
    )
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) =>
        setSelected(e.target.value)

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const result = {
            id: product?.id,
            image: product?.image,
            title: product?.title,
            price: product?.price,
            option: selected,
            quantity: 1,
        }

        if (user && user.uid) {
            const uid = user.uid
            addOrUpdateItem.mutate(
                { userId: uid, product },
                {
                    onSuccess: () => {
                        setSuccess('카트에 추가됨.')
                        setTimeout(() => {
                            setSuccess(null)
                        }, 4000)
                    },
                }
            )
        }
    }
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {isError && <p>error</p>}
            {product && (
                <section className="flex flex-col md:flex-row p-4">
                    {success && <p className="my-2">✅ {success}</p>}
                    <p>{product.category}</p>
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
                            <select
                                id="select"
                                className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
                                onChange={handleSelect}
                                value={selected}
                            >
                                {product.options &&
                                    Object.values(product.options).map(
                                        (option, index) => (
                                            <option key={index}>
                                                {option}
                                            </option>
                                        )
                                    )}
                            </select>
                        </div>

                        <Button text="장바구니에 추가" onClick={handleClick} />
                    </div>
                </section>
            )}
        </>
    )
}
