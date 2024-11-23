import { axiosServerInstance } from "../../utils/axios"

export const getRecommendations = async (params: {
    search?: string
}): Promise<StarredApiGetRecommendationsRo> => {
    const { search = '' } = params

    const jobs = await axiosServerInstance.request<StarredApiGetRecommendationsRo>({
        method: 'POST',
        url: '/jobs/recommendations',
        data: {
            jobTitle: search,
        }
    })

    return jobs.data
} 