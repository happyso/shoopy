import React from 'react'
import Navbar from './navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient({})

export default function Layout({ children }: { children: React.ReactElement }) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Navbar />
                <main>{children}</main>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    )
}
