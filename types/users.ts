type UserRo<IncludeFavJobs extends boolean> = {
    id: string
    name: string | null
    email: string
} & (IncludeFavJobs extends true ? 
{
    favoriteJobs: FavoriteJobRo[]
} 
: {})
