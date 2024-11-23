interface StarredApiPagination {
    currentPage: number;
    firstPage: number;
    lastPage: number;
}

interface StarredApiJob {
    job_title: string;
    description: string;
    company: string;
    id: number;
    is_favorite?: boolean;
}

interface StarredApiGetAllJobsRo {
    pagination: StarredApiPagination;
    data: StarredApiJob[];
}

interface StarredApiGetRecommendationsRo {
    jobIds: string[];
}

interface GetAllJobsQuery {
    page?: number;
    search?: string;
}
