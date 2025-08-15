export interface FavoriteJob {
  jobId: string
  jobData: {
    id: number
    title: string
    company_name: string
    company_logo: string | null
    category: string
    candidate_required_location: string
    description: string
  }
}
