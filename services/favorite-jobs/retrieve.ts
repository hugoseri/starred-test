import { prisma } from "../../prisma"

export const retrieve = async (params: {
    jobIds: number[]
    userId: string
}): Promise<FavoriteJobRo[]> => {
    const { userId, jobIds } = params

    const jobs = await prisma.favoriteJob.findMany({
        where: {
            jobId: {
                // TODO: apply migration to set jobId as int
                in: jobIds
            },
            userId,
        }
    })

    return jobs
} 