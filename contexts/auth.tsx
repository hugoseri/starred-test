import React from 'react';
import { Session } from 'next-auth';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { createContext } from 'react';
import { useRouter } from "next/router"
import { Spinner } from '@/components/ui/spinner';

export type AuthContextType = {
    session: Session | null,
    status: "authenticated" | "loading" | "unauthenticated"
}

const initialAuth: AuthContextType = {
    session: null,
    status: "unauthenticated"
} 

const AuthContext = createContext<AuthContextType>(initialAuth);

export const AuthProvider = ({children}) => {
    const { data: session, status } = useSession()
 
    if (status === 'unauthenticated') {
        signIn()
    }

    if (status === 'loading') {
        return (
            <div className='bg-slate-50 flex w-screen h-screen justify-center items-center'>
                <Spinner/>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ session, status }}>
            {children}
        </AuthContext.Provider>
    )
} 

export default AuthProvider