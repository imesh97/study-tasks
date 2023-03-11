import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { getIdToken } from "firebase/auth";
import Router, { useRouter } from "next/router";

const authContext = createContext()

export const AuthProvider = ({ children }) => {
    return <authContext.Provider value={ useProvideAuth() }>{ children }</authContext.Provider>
}

export const useAuth = () => useContext(authContext)

function useProvideAuth() {
    const [user, setUser] = useState(false)
    const [loading, setLoading] = useState(true)

    const handleUser = async (rawUser) => {
        if (rawUser) {
            const u = await formatUser(rawUser)
            setUser(u)
            setLoading(false)
            return u
        }
        setLoading(false)
        setUser(false)
        Router.push("/login")
        return false
    }

    const signInWithGoogle = () => {
        setLoading(true)
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider).then((res) => {
            Router.push("/")
            handleUser(res.user)
        })
    }

    const signOut = () => auth.signOut().then(() => handleUser(false))

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(handleUser)
        return () => unsub()
    }, [])

    return { user, loading, signInWithGoogle, signOut }
}

async function formatUser(user) {
    const token = await getIdToken(user)
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        token
    }
}