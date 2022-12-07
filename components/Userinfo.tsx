import React from 'react'
import { UserInfo } from 'firebase/auth'

export default function Userinfo({ user }: { user: UserInfo }) {
    return (
        <div className="flex items-center shrink-0">
            <img
                className="w-10 h-10 rounded-full mr-2"
                src={user.photoURL}
                alt={user.displayName}
            />
            <span className="hidden md:block">{user.displayName}</span>
        </div>
    )
}
