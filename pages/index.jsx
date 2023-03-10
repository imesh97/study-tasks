import Head from 'next/head'
import Login from '../components/Login'
import { useAuth } from '../lib/auth'

export default function Home() {
  const auth = useAuth()

  return (
    <>
      <Head>
        <title>Home - Study Tasks</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        auth.user && (
        <>
            <div className="min-h-full">
            
              <div className="flex flex-col items-center justify-center text-center px-6 py-8 mx-auto lg:py-0 min-h-full">
                  <h1 className="mb-4 text-4xl font-extrabold leading-none text-nord6 md:text-5xl lg:text-6xl">Welcome to Study Tasks!</h1>
                  <p className="mb-6 text-lg font-normal text-gray-400 lg:text-2xl">Use the menu to manage your tasks...</p>
              </div>

            </div>
        </>
        )
      }
    </>
  )
}
