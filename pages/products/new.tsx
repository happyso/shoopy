import React, { ChangeEvent, FormEvent, useState } from 'react'
import Button from '../../components/Button'
import { useProducts } from '../../hooks/useProducts'
import { uploadImage } from '../api/uploader'
import Image from 'next/image'

type IProduct = {
    id: string
    title: string
    price: string
    category: string
    description: string
    options: string
}

export default function New() {
    const [product, setProduct] = useState<IProduct>({
        id: '',
        title: '',
        price: '',
        category: '',
        description: '',
        options: '',
    })

    const { addProduct } = useProducts()
    const [file, setFile] = useState<File | null>()
    const [isUploading, setIsUploading] = useState(false)
    const [success, setSuccess] = useState<string | null>('')
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsUploading(true)
        uploadImage(file)
            .then((url) => {
                addProduct.mutate(
                    { product, url },
                    {
                        onSuccess: () => {
                            setSuccess('성공적으로 제품이 추가되었습니다.')
                            setTimeout(() => {
                                setSuccess(null)
                            }, 4000)
                        },
                    }
                )
            })
            .finally(() => setIsUploading(false))
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target

        if (name === 'file') {
            setFile(files && files[0])
            return
        }
        setProduct((product) => ({ ...product, [name]: value }))
    }
    return (
        <section className="w-full text-center">
            <h2>새로운 상품 등록</h2>
            {success && <p className="my-2">✅ {success}</p>}
            {file && (
                <Image
                    src={URL.createObjectURL(file)}
                    width={300}
                    height={300}
                    alt="local file"
                />
            )}
            <form className="flex flex-col px-12" onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept="image/*"
                    name="file"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="title"
                    value={product?.title ?? ''}
                    placeholder="제품명"
                    required
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="price"
                    value={product?.price ?? ''}
                    placeholder="가격"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="category"
                    value={product?.category ?? ''}
                    placeholder="카테고리"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    value={product?.description ?? ''}
                    placeholder="제품 설명"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="options"
                    value={product?.options ?? ''}
                    placeholder="옵션들(콤마(,)로 구분)"
                    required
                    onChange={handleChange}
                />
                <Button
                    text={isUploading ? '업로드중...' : '제품 등록하기'}
                    disabled={isUploading}
                />
            </form>
        </section>
    )
}
