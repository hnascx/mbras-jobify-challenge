import { generateMetadata as generatePageMetadata } from "@/components/Metadata"
import { api } from "@/lib/api"
import { Metadata } from "next"
import { JobDetails } from "./JobDetails"

interface PageProps {
  params: {
    id: string
  }
}

// Remove generateStaticParams since we want this to be dynamic anyway
// and it's causing issues with the spread operator

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const response = await api.get(`/job/${params.id}`)
    const job = response.data

    return generatePageMetadata({
      title: job.title,
      description: `${job.title} at ${job.company_name} - ${job.candidate_required_location} - ${job.job_type}`,
      image: job.company_logo || undefined,
      type: "article",
    })
  } catch (error) {
    return generatePageMetadata({
      title: "Job Not Found",
      description: "The job you're looking for could not be found.",
    })
  }
}

export default function Page({ params }: PageProps) {
  return <JobDetails id={params.id} />
}
