import React from "react"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table"
import { JobInteraction } from "./job-interaction"
import { Skeleton } from "./ui/skeleton"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"

export interface JobsTableProps {
    jobs: StarredApiJob[],
    refetch: () => void,
    onJobClick: (job: StarredApiJob) => void,
    selectedJobId?: number,
    loading: boolean,
}

export const JobsTable: React.FC<JobsTableProps> = ({
    jobs,
    refetch,
    onJobClick,
    selectedJobId,
    loading,
}) => {

    if (loading) {
        return (
            <div className="flex flex-col gap-1">
                {
                    Array.from(Array(10)).map(idx => (
                        <>
                            <Skeleton className="w-full h-16"/>
                        </>
                    ))
                }
            </div>
        )
    }
    
    return (
        <Table>
            <ScrollArea>
        <TableBody>
          {jobs.map((job) => (
            <TableRow 
                key={job.id}
                onClick={() => onJobClick(job)}
                className={job.id === selectedJobId && "bg-muted/50"}
            >
                <TableCell className="text-right">
                    <JobInteraction
                        job={job}
                        refetchJobs={refetch}
                    />
                </TableCell>
                <TableCell className="flex flex-col gap-2 w-full">
                    <div className="font-bold text-base">{job.job_title}</div>
                    <div className="font-light text-sm">{job.company}</div>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </ScrollArea>
      </Table>
    )
}