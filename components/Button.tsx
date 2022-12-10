import React, { MouseEvent } from 'react'

export default function Button({
    text,
    disabled,
    onClick,
}: {
    text: string
    disabled?: boolean
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}) {
    return (
        <button
            className="bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110"
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    )
}
