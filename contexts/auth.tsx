import React from 'react';
import { Session } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';
import { createContext } from 'react';
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

/**
 * Provider to protect private routes
 */
export const AuthProvider = ({children}) => {
    const { data: session, status } = useSession()
 
    /**
     * Redirect to Next sign in page if user is not connected
     */
    if (status === 'unauthenticated') {
        signIn()
    }

    /**
     * Display loader
     */
    if (status === 'loading') {
        return (
            <div className='bg-slate-50 flex w-screen h-screen justify-center items-center'>
                <Spinner/>
            </div>
        )
    }

    /**
     * Display app content when user is connected
     */
    return (
        <AuthContext.Provider value={{ session, status }}>
            {children}
        </AuthContext.Provider>
    )
} 

export default AuthProvider