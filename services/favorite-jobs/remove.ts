import { prisma } from "../../prisma"

export const remove = async (params: {
    jobId: number
    userId: string
}): Promise<FavoriteJobRo> => {
    const { userId, jobId } = params

    const favoriteJob = await prisma.favoriteJob.delete({
        where: {
            userId_jobId: {
                jobId,
                userId,
            }
        }
    })

    return favoriteJob
} 