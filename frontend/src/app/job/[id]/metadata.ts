import { api } from "@/lib/api"
import { Metadata } from "next"

interface Job {
  id: number
  title: string
  company_name: string
  company_logo: string | null
  category: string
  candidate_required_location: string
  job_type: string
  description: string
  salary: string | null
  publication_date: string
  url: string
}

// Assim como no metadata.ts do favorited-jobs, parte do conteúdo presente aqui é meramente ilustrativo, apenas para exemplificar as características de aplicação de uma estratégia básica de SEO
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  try {
    const response = await api.get<Job>(`/job/${params.id}`)
    const job = response.data

    const cleanDescription = job.description
      .replace(/<[^>]+>/g, "")
      .slice(0, 200)
      .trim()
      .concat("...")

    const title = `${job.title} - ${job.company_name} | Jobify`
    const description = `${cleanDescription} Localização: ${
      job.candidate_required_location
    }. Tipo: ${job.job_type}. ${job.salary ? `Salário: ${job.salary}.` : ""}`

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        url: `https://jobify.vercel.app/job/${job.id}`,
        siteName: "Jobify",
        publishedTime: job.publication_date,
        modifiedTime: job.publication_date,
        images: [
          {
            url: job.company_logo || "https://jobify.vercel.app/og-image.png",
            width: 1200,
            height: 630,
            alt: `${job.company_name} logo`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [job.company_logo || "https://jobify.vercel.app/og-image.png"],
      },
      alternates: {
        canonical: `https://jobify.vercel.app/job/${job.id}`,
      },
      authors: [{ name: job.company_name }],
      keywords: [
        job.category,
        job.job_type,
        "vaga remota",
        "emprego remoto",
        job.company_name,
        "tecnologia",
        job.candidate_required_location,
      ],
      robots: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    }
  } catch (error) {
    return {
      title: "Vaga não encontrada | Jobify",
      description:
        "A vaga que você está procurando não existe ou foi removida.",
    }
  }
}
