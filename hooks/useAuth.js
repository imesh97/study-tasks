import { useEffect, useState } from 'react'
import { auth } from '../lib/firebase'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export default function useAuth() {
    const [user, setUser] = useState()
    const [loggedIn, setLoggedIn] = useState(false)
    
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user)
            setLoggedIn(user && user.uid ? true : false)
        })
    }, [])

    return { user, loggedIn, auth }
}

export async function handleAuth({ auth }) {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then((result) => {
        const credentials = GoogleAuthProvider.credentialFromResult(result)
        const token = credentials?.accessToken
        const userResult = result.user
    }).catch((err) => {
        const credentials = GoogleAuthProvider.credentialFromError(err)
    })
}