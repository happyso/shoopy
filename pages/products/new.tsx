import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../../hooks/useUser'

export default function New() {
    const router = useRouter()
    const { user } = useUser()

    useEffect(() => {
        if (!user) {
            router.push('/')
        }
    }, [router, user])
    return <div>New!!</div>
}
