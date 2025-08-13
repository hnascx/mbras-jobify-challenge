import { z } from "zod"

export const jobSchema = z.object({
  id: z.union([z.number(), z.string()]).transform((val) => Number(val)),
  url: z.string().optional(),
  title: z.string().optional(),
  company_name: z.string().optional(),
  company_logo: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  job_type: z.string().optional(),
  publication_date: z.string().optional(),
  candidate_required_location: z.string().optional(),
  salary: z.string().optional(),
  description: z.string().optional(),
})

export const jobsResponseSchema = z
  .object({
    job_count: z.number(),
    jobs: z.array(jobSchema),
  })
  .or(
    z
      .object({
        jobs: z.array(jobSchema),
      })
      .transform((data) => ({
        job_count: data.jobs.length,
        jobs: data.jobs,
      }))
  )

export const favoriteJobParamsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
})

export const favoriteJobBodySchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  jobId: z.string().min(1, "Job ID is required"),
  jobData: jobSchema,
})
