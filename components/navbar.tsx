import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import Userinfo from './Userinfo'
import { useUser } from '../hooks/useUser'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
    const { user } = useUser()

    const { login, logout } = useAuth()

    return (
        <header className="flex justify-between border-b border-gray-300 p-2">
            <Link href="/" className="flex items-center text-4xl text-brand">
                <h1>Logo</h1>
            </Link>
            <nav className="flex items-center gap-4 font-semibold">
                <>
                    <Link href="/products">Products</Link>
                    <Link href="/carts">Carts</Link>
                    {user && user.isAdmin && (
                        <Link href="/products/new" className="text-2xl">
                            New
                        </Link>
                    )}
                    {user && <button onClick={logout}>Logout</button>}
                    {!user && <button onClick={login}>Login</button>}
                    {user && <Userinfo user={user} />}
                </>
            </nav>
        </header>
    )
}
