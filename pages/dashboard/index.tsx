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
    const [query, setQuery] = useState<GetAllJobsQuery>({
      page: 0,
      search: ''
    })

    /**
     * Reset current page each time search changes
     */
    useEffect(() => {
      setQuery({
        page: 0,
        search: debounchedSearch,
      })
    }, [debounchedSearch])

    const [data, setData] = useState<StarredApiJob[]>([])
    const [isLoading, setLoading] = useState(false)
   
    const fetchJobs = useCallback(async (query: GetAllJobsQuery) => {
      setLoading(true)

      try {
        const res = await axiosClientInstance.request<StarredApiGetAllJobsRo>({
          url: '/jobs',
          params: query,
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

    /**
     * Fetch jobs each time pagination or search changes
    */
   useEffect(() => {
      /**
      * Avoid fetching jobs if it's already loading
      */
      if (!isLoading) {
        fetchJobs(query)
      }
    }, [JSON.stringify(query)])

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
                    refetchJobs={() => fetchJobs(query)}
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
                  setQuery(old => ({
                    ...old,
                    page: pagination.currentPage - 1
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
                  setQuery(old => ({
                    ...old,
                    page: pagination.currentPage + 1
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