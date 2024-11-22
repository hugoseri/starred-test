import React from "react"
import { useSession } from "next-auth/react"

const Jobs: React.FC = () => {
    const { data: session, status } = useSession()

    if (status === "authenticated" && session) {
      return <p>Signed in as {session.user?.email}</p>
    }
  
    return <a href="/api/auth/signin">Forbidden content</a>
}

export default Jobs