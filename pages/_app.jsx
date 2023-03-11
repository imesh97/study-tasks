import '../styles/globals.css'
import Layout from '../components/Layout'
import { AuthProvider, useAuth } from '../lib/auth'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  if (router.pathname.startsWith("/login")) return <AuthProvider ><Component {...pageProps} /></AuthProvider>

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}
