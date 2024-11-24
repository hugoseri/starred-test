import React, { useCallback, useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { axiosClientInstance } from "../../utils/axios"
import { useDebounce } from "../../hooks/debounce"
import { JobInteraction } from "../../components/JobInteraction"

const Dashboard: React.FC = () => {
    const { data: session } = useSession()

    const [pagination, setPagination] = useState<StarredApiPagination>({
      currentPage: 0,
      firstPage: 0,
      lastPage: 0,
    })
    const [search, setSearch] = useState('')
    const debounchedSearch = useDebounce(search, 500)

    const [data, setData] = useState<StarredApiJob[]>([])
    const [isLoading, setLoading] = useState(false)
   
    const fetchJobs = useCallback(async (search: string, page: number) => {
      setLoading(true)

      try {
        const res = await axiosClientInstance.request<StarredApiGetAllJobsRo>({
          url: '/jobs',
          params: {
            search,
            page,
          }
        })
  
        if (res.status === 200) {
          setData(res.data.data)
          setPagination(res.data.pagination)
        }
      } catch (err) {
        console.log("An error occured", err.status)
      }

      setLoading(false)
    }, [])

    useEffect(() => {
      if (!isLoading) {
        fetchJobs(debounchedSearch, pagination.currentPage)
      }
    }, [debounchedSearch, pagination.currentPage])

    return (
      <div>
        <p>Signed in as {session?.user?.email}</p>
        <button
          onClick={() => signOut()}
        >
          Disconnect
        </button>
        <div>
          <input 
            placeholder="Search by job title"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {
            isLoading ?
            <span>Data loading...</span>
            :
            data.map(job => (
              <div>
                <h3>
                  {job.job_title}
                  <JobInteraction 
                    job={job}
                    refetchJobs={() => {
                      fetchJobs(search, pagination.currentPage)
                    }}
                  />                  
                </h3>
                <h5>
                  {job.company}
                </h5>
                <p>{job.description}</p>
              </div>
            ))
          }
          <div>
            {pagination.currentPage > pagination.firstPage && (
              <button
                onClick={() => {
                  setPagination(old => ({
                    ...old,
                    currentPage: old.currentPage - 1
                  }))
                }}
              >
                Previous page
              </button>
            )}
            Page {pagination.currentPage + 1}
            {pagination.currentPage < pagination.lastPage && (
              <button
                onClick={() => {
                  setPagination(old => ({
                    ...old,
                    currentPage: old.currentPage + 1
                  }))
                }}
              >
                Next page
              </button>
            )}
          </div>
        </div>
      </div>
    )
}

export default Dashboard