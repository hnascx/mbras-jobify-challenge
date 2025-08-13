export interface Job {
  id: number
  url?: string
  title?: string
  company_name?: string
  company_logo?: string
  category?: string
  tags?: string[]
  job_type?: string
  publication_date?: string
  candidate_required_location?: string
  salary?: string
  description?: string
}

export interface JobsResponse {
  job_count: number
  jobs: Job[]
}

export interface FavoriteJobData {
  userId: string
  jobId: string
  jobData: Job
}
