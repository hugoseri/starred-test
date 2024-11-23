import { axiosServerInstance } from "../../utils/axios"

export const getById = async (params: {
    id: string
}): Promise<StarredApiJob> => {
    const { id } = params

    const jobs = await axiosServerInstance.request<StarredApiJob>({
        method: 'GET',
        url: `/jobs/${id}`,
    })

    return jobs.data
} 