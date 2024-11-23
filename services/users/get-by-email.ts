import { prisma } from "../../prisma"

export const getByEmail = async <IncludeFavJobs extends boolean>(params: {
    email: string,
    includeFavoriteJobs?: IncludeFavJobs,
}): Promise<UserRo<IncludeFavJobs>> => {
    const { email, includeFavoriteJobs = false } = params

    const user = await prisma.user.findFirst({
        where: {
            email,
        },
        include: {
            favoriteJobs: includeFavoriteJobs as true,
        }
    })

    return user
} 