import { axiosServerInstance } from "../../utils/axios"

export const getAll = async (params: {
    page?: number
}): Promise<StarredApiGetAllJobsRo> => {
    const { page = 0 } = params

    const jobs = await axiosServerInstance.request<StarredApiGetAllJobsRo>({
        method: 'GET',
        url: '/jobs',
        params: {
            page,
        }
    })

    return jobs.data
} 