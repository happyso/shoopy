import React from 'react'
import { addOrUpdateCart, removeFromCart } from '../hooks/useCarts'

export default function CartItem({
    product,
    product: { id, image, title, option, quantity, price },
    uid,
}) {
    const handleMinus = () => {
        if (quantity < 2) return
        addOrUpdateCart(uid, { ...product, quantity: quantity - 1 })
    }
    const handlePlus = () =>
        addOrUpdateCart(uid, { ...product, quantity: quantity + 1 })

    const handleDelete = () => removeFromCart(uid, id)
    return (
        <li className="flex justify-between my-2 items-center">
            <img className="w-24 md:w-48 rounded-lg" src={image} alt={title} />
            <div className="flex-1 flex justify-between ml-4">
                <div className="basis-3/5">
                    <p className="text-lg">{title}</p>
                    <p className="text-xl font-bold text-brand">{option}</p>
                    <p>₩{price}</p>
                </div>
                <div className="text-2xl flex items-center">
                    <p onClick={handleMinus}>minus</p>
                    <p onClick={handlePlus}>plus</p>
                    <p onClick={handleDelete}>Delete</p>

                    <span>{quantity}</span>
                </div>
            </div>
        </li>
    )
}
