'use client'
import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: process.env.NODE_ENV === 'production'
    }
  }
})

export default function App({ Component, pageProps }: any) {
  const Layout = Component.layout || (({ children }: { children: any }) => <>{children}</>)

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}
