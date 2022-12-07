import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    User,
} from 'firebase/auth'
import { getDatabase, ref, child, get } from 'firebase/database'
import { useUser } from '../../hooks/useUser'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_DATABASE_URL,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const database = getDatabase(app)

auth.languageCode = 'ko'
const provider = new GoogleAuthProvider()

export function login() {
    //const { updateUser } = useUser()

    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user
            //updateUser(user)
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode)
            console.log(errorMessage)
        })
}

export function logout() {
    signOut(auth)
        .then(() => {
            //clearUser()
        })
        .catch((error) => {
            console.log(error.message)
        })
}

export async function onUserStateChange(callback: (arg: User | null) => void) {
    return onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await adminUser(user) : null
        callback(updatedUser)
    })
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
