import React from 'react'
import Navbar from './navbar'

export default function Layout({
    children,
}: {
    children: React.ReactElement[]
}) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    )
}
