import { useQuery, useQueryClient } from '@tanstack/react-query'
import { User, onAuthStateChanged } from 'firebase/auth'
import { adminUser, auth } from '../pages/api/firebase'

export const queryKeys = {
    user: 'user',
}

interface UseUser {
    user: IUser | null | undefined
    updateUser: (user: User) => void
    clearUser: () => void
}

interface IUser extends User {
    isAdmin?: boolean
}

async function getUser(): Promise<IUser | null> {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
            const updatedUser = user ? await adminUser(user) : null
            resolve(updatedUser)
        })
    })
}

export function useUser(): UseUser {
    const queryClient = useQueryClient()

    const { data: user } = useQuery([queryKeys.user], getUser)

    function updateUser(newUser: User): void {
        queryClient.setQueryData([queryKeys.user], newUser)
    }

    function clearUser() {
        queryClient.setQueryData([queryKeys.user], null)
    }

    return { user, updateUser, clearUser }
}
