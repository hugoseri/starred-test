import React, { useCallback, useState } from "react";
import { axiosClientInstance } from "../utils/axios";

export type JobInteractionProps = {
    job: StarredApiJob
    refetchJobs: () => void
}


export const JobInteraction: React.FC<JobInteractionProps> = ({
    job,
    refetchJobs
}) => {
    const [isLoading, setLoading] = useState(false)

    const toggleFavorite = useCallback(async () => {
        setLoading(true)
  
        try {
          const res = await axiosClientInstance.request<void>({
            method: 'PATCH',
            url: `/jobs/fav/${job.id}`,
          })
    
          if (res.status === 200) {
            refetchJobs()
          }
        } catch (err) {
          console.log("An error occured", err.status)
        }
  
        setLoading(false)
      }, [job, refetchJobs])

    return (
        <div>
            <button
                onClick={() => toggleFavorite()}
            >
                {
                    isLoading ? 
                    "Loading..."
                    :
                    job.is_favorite ?
                    "Remove from favorites"
                    :
                    "Add to favorites"
                }
            </button>
        </div>
    )
}