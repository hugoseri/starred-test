import React from "react";
import { Separator } from "./ui/separator";
import { Building2 } from "lucide-react";
import { JobInteraction } from "./job-interaction";

export interface JobDetailsProps {
    job: StarredApiJob,
    refetchJobs: () => void
}

export const JobDetails: React.FC<JobDetailsProps> = ({
    job,
    refetchJobs,
}) => {
    if (!job) {
        return (
            <div className="flex flex-col gap-4 justify-items-center items-center">
                <span className="text-lg">    
                    Click on a job to see the details.
                </span>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-4">
                    <div className="font-bold text-2xl">{job.job_title}</div>
                    <div className="flex items-center gap-2">
                        <Building2 strokeWidth={1}/>
                        <div className="font-thin">{job.company}</div>
                    </div>
                </div>
                <JobInteraction
                    detailed
                    job={job}
                    refetchJobs={refetchJobs}
                />
            </div>
            <Separator/>
            <div>{job.description}</div>
        </div>
    )
}