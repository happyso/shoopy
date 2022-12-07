import React from 'react'
import Navbar from './navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 600000,
            cacheTime: 900000,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
})

export default function Layout({ children }: { children: React.ReactElement }) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Navbar />
                <main>{children}</main>
            </QueryClientProvider>
        </>
    )
}
