import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, database, provider } from '../pages/api/firebase'
import { ref, get } from 'firebase/database'
import { useUser } from './useUser'

export function useAuth() {
    const { clearUser, updateUser } = useUser()
    async function login() {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user
                updateUser(user)
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode)
                console.log(errorMessage)
            })
    }

    async function logout() {
        signOut(auth)
            .then(() => {
                clearUser()
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
    return {
        login,
        logout,
    }
}
export async function adminUser(user: any) {
    return get(ref(database, `admins`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const admins = snapshot.val()
                const isAdmin = admins.includes(user.uid)
                return { ...user, isAdmin }
            } else {
                return user
            }
        })
        .catch((error) => {
            console.error(error)
        })
}
