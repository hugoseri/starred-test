import { NextApiRequest, NextApiResponse } from "next";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { services } from "../../../../services";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<StarredApiGetAllJobsRo>
) {
    const session = await getServerSession(req, res, authOptions)

    const { jobId: rawJobId } = req.query
    const jobId = Number(rawJobId)

    if (req.method === 'PATCH') {
        if (session) {
            try {
                const user = await services.users.getByEmail({
                    email: session.user.email,
                    includeFavoriteJobs: true,
                })

                if (user.favoriteJobs.some(job => job.jobId === jobId)) {
                    await services.favoriteJobs.remove({
                        jobId,
                        userId: user.id
                    })
                } else {
                    await services.favoriteJobs.create({
                        jobId,
                        userId: user.id
                    })
                }

                res.status(200)
            } catch (error) {
                console.error("error", error)
                if (error instanceof AxiosError) {
                    res.status(error.status)
                }
            }
        } else {
            res.status(401)
        }
    } else {
        res.status(404)
    }
    res.end()
}