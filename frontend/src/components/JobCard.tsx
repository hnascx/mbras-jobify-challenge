"use client"

import { CompanySection } from "@/components/job-card/CompanySection"
import { FavoriteButton } from "@/components/job-card/FavoriteButton"
import { JobDetails as JobDetailsSection } from "@/components/job-card/JobDetails"
import { stripHtml, truncateAtWord } from "@/components/job-card/utils"
import { Card } from "@/components/ui/card"
import { getCategoryColor, translateCategory } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface JobCardProps {
  id: number
  title: string
  companyName: string
  companyLogo?: string
  category: string
  location: string
  description?: string
  isFavorited: boolean
  onFavoriteClick: () => Promise<void>
}

export function JobCard({
  id,
  title,
  companyName,
  companyLogo,
  category,
  location,
  description = "",
  isFavorited,
  onFavoriteClick,
}: JobCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const cleanDescription = description ? stripHtml(description) : ""
  const descriptionPreview = truncateAtWord(cleanDescription, 120)
  const titlePreview = truncateAtWord(stripHtml(title), 50)
  const locationPreview = truncateAtWord(stripHtml(location), 30)
  const translatedCategory = translateCategory(category)
  const categoryColors = getCategoryColor(category)

  const handleFavoriteClick = async () => {
    try {
      setIsLoading(true)
      await onFavoriteClick()
    } finally {
      setIsLoading(false)
    }
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    router.prefetch(`/job/${id}`)
  }

  return (
    <Card
      className="p-6 flex flex-col h-full hover:shadow-lg transition-shadow select-none"
      role="article"
      aria-labelledby={`job-title-${id}`}
      onClick={handleCardClick}
    >
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <CompanySection
            id={id}
            companyName={stripHtml(companyName)}
            companyLogo={companyLogo}
            location={stripHtml(location)}
            locationPreview={locationPreview}
          />
          <FavoriteButton
            title={stripHtml(title)}
            isFavorited={isFavorited}
            isLoading={isLoading}
            onClick={handleFavoriteClick}
          />
        </div>

        <JobDetailsSection
          id={id}
          title={stripHtml(title)}
          titlePreview={titlePreview}
          companyName={stripHtml(companyName)}
          descriptionPreview={descriptionPreview}
          translatedCategory={translatedCategory}
          categoryColors={categoryColors}
        />
      </div>
    </Card>
  )
}
