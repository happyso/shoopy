import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import PrivateRoute from '../components/PrivateRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient({})
export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <PrivateRoute>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </PrivateRoute>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
