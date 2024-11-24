import { NextApiRequest, NextApiResponse } from "next";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { services } from "../../../services";
import { STARRED_API_LIMIT } from "../../../constants";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<StarredApiGetAllJobsRo>
) {
    const session = await getServerSession(req, res, authOptions)

    const query = req.query as GetAllJobsQuery

    if (req.method === 'GET') {
        try {
            const search = query.search?.trim()
            const page = query.page ?? 0
            let jobs: StarredApiGetAllJobsRo;
            if (search?.length < 2) {
                jobs = await services.starredApi.getAll({
                    page,
                })
            } else {
                const searchedJobIds = await services.starredApi.getRecommendations({
                    search,
                })
                const searchedJobs = await Promise.all(searchedJobIds.jobIds.map(id => services.starredApi.getById({ id })))

                let searchedJobsForPage = searchedJobs.slice(page * STARRED_API_LIMIT, (page + 1) * STARRED_API_LIMIT)

                jobs = {
                    pagination: {
                        currentPage: page,
                        firstPage: 0,
                        lastPage: Math.floor((searchedJobs.length - 1) / STARRED_API_LIMIT)
                    },
                    data: searchedJobsForPage
                }
            }

            if (session) {
                const user = await services.users.getByEmail({ email: session.user.email })

                const favoriteJobs = await services.favoriteJobs.retrieve({
                    jobIds: jobs.data.map(job => job.id),
                    userId: user.id
                })

                jobs = {
                    ...jobs,
                    data: jobs.data.map(job => ({
                        ...job,
                        is_favorite: favoriteJobs.some(fav => fav.jobId === job.id)
                    }))
                }
            }

            res.status(200)
            res.json(jobs)
        } catch (error) {
            console.error("error", error)
            if (error instanceof AxiosError) {
                res.status(error.status)
            }
        }
    } else {
        res.status(404)
    }
    res.end()
}