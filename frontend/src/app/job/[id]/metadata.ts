import { generateMetadata as generatePageMetadata } from "@/components/Metadata"
import { api } from "@/lib/api"
import { Metadata } from "next"

interface PageProps {
  params: {
    id: string
  }
}

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
      title: "Vaga não encontrada",
      description: "A vaga que você está procurando não foi encontrada.",
    })
  }
}
