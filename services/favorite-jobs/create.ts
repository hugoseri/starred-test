import { prisma } from "../../prisma"

export const create = async (params: {
    jobId: number
    userId: string
}): Promise<FavoriteJobRo> => {
    const { userId, jobId } = params

    const favoriteJob = await prisma.favoriteJob.create({
        data: {
            jobId,
            userId,
        }
    })

    return favoriteJob
} 