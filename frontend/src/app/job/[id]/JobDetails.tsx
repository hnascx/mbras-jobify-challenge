"use client"

import { CompanyInfo } from "@/components/job-details/CompanyInfo"
import { JobActions } from "@/components/job-details/JobActions"
import { JobDescription } from "@/components/job-details/JobDescription"
import { JobInfo } from "@/components/job-details/JobInfo"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface JobDetailsProps {
  id: number
  title: string
  companyName: string
  companyLogo?: string
  category: string
  location: string
  type: string
  description: string
  salary?: string
  publicationDate: string
  url: string
  isFavorited: boolean
  onFavoriteClick: () => Promise<void>
}

export function JobDetails({
  title,
  companyName,
  companyLogo,
  location,
  type,
  description,
  publicationDate,
  url,
  isFavorited,
  onFavoriteClick,
}: JobDetailsProps) {
  const router = useRouter()

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-16 relative min-h-[calc(100vh-6rem)]">
      {/* Primeira parte - Informações principais (Fixa) */}
      <div className="md:w-[400px] flex-shrink-0">
        <div className="md:fixed md:w-[400px]">
          {/* Botão Voltar */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="bg-green-400 hover:bg-green-500 transition-colors duration-200 cursor-pointer"
            aria-label="Voltar para vagas"
          >
            <ArrowLeft className="h-4 w-4 text-black" />
          </Button>

          <div className="mt-20 mb-6 md:mb-0 md:mt-24">
            <JobActions
              title={title}
              isFavorited={isFavorited}
              onFavoriteClick={onFavoriteClick}
            />

            <CompanyInfo companyName={companyName} companyLogo={companyLogo} />

            <JobInfo
              title={title}
              location={location}
              type={type}
              publicationDate={publicationDate}
            />

            {/* Botão de ação */}
            <div className="flex items-center pt-6">
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border-green-400 hover:border-green-500 text-green-400 hover:text-green-500 font-semibold transition-colors duration-200 cursor-pointer"
                onClick={() =>
                  window.open(url, "_blank", "noopener,noreferrer")
                }
              >
                Candidatar-se
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Segunda parte - Descrição (Scrollável) */}
      <JobDescription description={description} />
    </div>
  )
}
