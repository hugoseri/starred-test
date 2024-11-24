import React, { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { axiosClientInstance } from "../../utils/axios"
import { useDebounce } from "../../hooks/debounce"
import { UserNav } from "@/components/user-nav"
import { JobsTable } from "@/components/jobs-table"
import { Separator } from "@/components/ui/separator"
import { JobDetails } from "@/components/job-details"
import { Input } from "@/components/ui/input"
import { Paginator } from "@/components/paginator"
import { ScrollArea } from "@/components/ui/scroll-area"

const Dashboard: React.FC = () => {
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

    const [selectedJob, setSelectedJob] = useState<StarredApiJob | undefined>()
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

          /**
           * If there are jobs and selected job is not among new results, select first job result
           */
          if (res.data.data.length > 0 && !res.data.data.some(job => job.id === selectedJob?.id)) {
            setSelectedJob(res.data.data[0])
          }
        }
      } catch (err) {
        console.log("An error occured", err.status)
      }

      setLoading(false)
    }, [selectedJob])

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
      <div className="flex bg-slate-50 h-screen flex-1  flex-col space-y-8 p-8 md:flex">
        <div className="flex h-[1vh] items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Starred.com</h2>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <div className="max-w-screen-lg rounded bg-white p-8 mx-auto h-[90%] overflow-y-hidden">
          <div className="flex flex-row gap-5 h-full wrap">
            <div className="basis-1/2 flex justify-between flex-col h-full gap-4">
              <Input
                className="basis-auto"
                placeholder="Search by job title"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <ScrollArea className="h-full">
                <JobsTable
                  jobs={data}
                  refetch={() => fetchJobs(query)}
                  onJobClick={(job) => setSelectedJob(job)}
                  selectedJobId={selectedJob?.id}
                  loading={isLoading}
                />
              </ScrollArea>
            <div className="basis-10">
              <Paginator
                pagination={pagination}
                onClickNext={() => {
                  setQuery(old => ({
                    ...old,
                    page: pagination.currentPage + 1
                  }))
                }}
                onClickPrevious={() => {
                  setQuery(old => ({
                    ...old,
                    page: pagination.currentPage - 1
                  }))
                }}
              />
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="basis-1/2">
            <ScrollArea className="h-full">
              <JobDetails 
                job={selectedJob}
                refetchJobs={() => fetchJobs(query)}
              />
            </ScrollArea>
          </div>
          </div>
        </div>
      </div>
    )
}

export default Dashboard