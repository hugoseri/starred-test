"use client"
import { signIn } from "next-auth/react"
 
export function SignIn() {
    return signIn('email', {
        callbackUrl: '/jobs'
    })
  // return <button onClick={() => signIn('email', {})}>Sign In</button>
}