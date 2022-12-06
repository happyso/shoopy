import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { login, logout, onUserStateChange } from '../pages/api/firebase'
import { User } from '@firebase/auth'
import Userinfo from './Userinfo'

export default function Navbar() {
    const [user, setUser] = useState<User | null | void>()

    useEffect(() => {
        onUserStateChange(setUser)
    }, [])
    return (
        <header>
            <Link href="/">
                <h1 className="text-3xl font-bold underline">Logo</h1>
            </Link>
            <nav className="flex min-h-screen flex-col items-center justify-center py-2">
                <>
                    <Link href="/products">Products</Link>
                    <Link href="/carts">Carts</Link>
                    <Link href="/products/new">new</Link>
                    {user && <button onClick={logout}>Logout</button>}
                    {!user && <button onClick={login}>Login</button>}
                    {user && <Userinfo user={user} />}
                </>
            </nav>
        </header>
    )
}
