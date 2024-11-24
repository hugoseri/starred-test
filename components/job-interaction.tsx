import React, { useCallback, useState } from "react";
import { axiosClientInstance } from "../utils/axios";
import { LoaderCircle, Star } from "lucide-react";
import { Button } from "./ui/button";

export type JobInteractionProps = {
    job: StarredApiJob
    refetchJobs: () => void
    detailed?: boolean
}


export const JobInteraction: React.FC<JobInteractionProps> = ({
    job,
    refetchJobs,
    detailed = false,
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

    if (detailed) {
      return (
        <div>
        {
          isLoading ? 
          <LoaderCircle 
            size={16}
            className="animate-spin"
          />
          :
          <Button
            variant="secondary"
            className="flex items-center" 
            onClick={() => toggleFavorite()}
          >
            <Star/>
            {
              job.is_favorite ? "Remove from favorites" : "Add to favorites"
            }
          </Button>
        }
      </div>
      )
    }

    return (
      <div>
        {
          isLoading ? 
          <LoaderCircle 
            size={16}
            className="animate-spin"
          />
          :
          <Star
            size={16}
            className="cursor-pointer"
            onClick={() => toggleFavorite()}
            fill={job.is_favorite ? "black" : "transparent"}
          />
        }
      </div>
    )
}