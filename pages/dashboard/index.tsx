import React, { useCallback, useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import axios from "axios"
import { axiosClientInstance } from "../../utils/axios"

const Dashboard: React.FC = () => {
    const { data: session,  } = useSession()

    const [data, setData] = useState<StarredApiJob[]>([])
    const [isLoading, setLoading] = useState(false)
   
    const fetchJobs = useCallback(async () => {
      setLoading(true)

      try {
        const res = await axiosClientInstance.request<StarredApiGetAllJobsRo>({
          url: '/jobs',
        })
  
        if (res.status === 200) {
          console.log("data", res.data.data)
          setData(res.data.data)
        }
      } catch (err) {
        console.log("An error occured", err.status)
      }

      setLoading(false)
    }, [])

    useEffect(() => {
      if (!isLoading) {
        fetchJobs()
      }
    }, [])

    return (
      <div>
        <p>Signed in as {session?.user?.email}</p>
        <button
          onClick={() => signOut()}
        >
          Disconnect
        </button>
        <div>
          {
            data.map(job => (
              <div>
                <h3>
                  {job.job_title}
                </h3>
                <h5>
                  {job.company}
                </h5>
                <p>{job.description}</p>
              </div>
            ))
          }
        </div>
      </div>
    )
}

export default Dashboard