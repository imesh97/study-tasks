import Head from 'next/head'
import Login from '../../components/Login'
import { useAuth } from '../../lib/auth'

export default function Home() {
    const { signInWithGoogle } = useAuth()

    return (
    <>
        <Head>
        <title>Home - Study Tasks</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <Login handler={signInWithGoogle}/>
    </>
    )
}