import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../hooks/useUser'

export default function PrivateRoute({ children }: { children: ReactElement }) {
    const router = useRouter()
    const { user } = useUser()

    const adminRoutes = ['/products/new']
    const userRoutes = ['/carts']

    const pathIsAdminProtected = adminRoutes.indexOf(router.pathname) !== -1
    const pathIsUserProtected = userRoutes.indexOf(router.pathname) !== -1

    useEffect(() => {
        if (!user && pathIsUserProtected) {
            // Redirect route, you can point this to /login
            router.push('/')
        }
        if (!user?.isAdmin && pathIsAdminProtected) {
            // Redirect route, you can point this to /login
            router.push('/')
        }
    }, [user, router, pathIsUserProtected, pathIsAdminProtected])

    return children
}
