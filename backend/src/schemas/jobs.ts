import { z } from "zod"

export const jobSchema = z.object({
  id: z.number(),
  url: z.string().url(),
  title: z.string(),
  company_name: z.string(),
  company_logo: z.string().url(),
  category: z.string(),
  tags: z.array(z.string()),
  job_type: z.string(),
  publication_date: z.string(),
  candidate_required_location: z.string(),
  salary: z.string(),
  description: z.string(),
})

export const jobsResponseSchema = z.object({
  "job-count": z.number(),
  "total-job-count": z.number().optional(),
  jobs: z.array(jobSchema),
})

export const favoriteJobParamsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
})

export const favoriteJobBodySchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  jobId: z.string().min(1, "Job ID is required"),
  jobData: jobSchema,
})
