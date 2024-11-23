import React from "react"
import { useRouter } from "next/router"

const Home: React.FC = () => {
  const router = useRouter()

  /**
   * Always redirect to dashboard
   */
  router.push('/dashboard')

  return null
}

export default Home
