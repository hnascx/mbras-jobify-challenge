import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface JobDetailsProps {
  id: number
  title: string
  titlePreview: string
  companyName: string
  descriptionPreview: string
  translatedCategory: string
  categoryColors: {
    text: string
    border: string
    bg: string
  }
}

export function JobDetails({
  id,
  title,
  titlePreview,
  companyName,
  descriptionPreview,
  translatedCategory,
  categoryColors,
}: JobDetailsProps) {
  return (
    <div className="space-y-3">
      <Link
        href={`/job/${id}`}
        id={`job-title-${id}`}
        className="inline-block max-w-full"
        title={title}
        aria-label={`Ver detalhes da vaga ${title} na empresa ${companyName}`}
      >
        <span className="text-lg font-semibold truncate hover:text-gray-300 transition-colors duration-200 block">
          {titlePreview}
        </span>
      </Link>

      <Link
        href={`/job/${id}`}
        className="inline-block"
        aria-label={`Ler mais sobre a vaga ${title}`}
      >
        <p className="text-sm text-muted-foreground line-clamp-3 hover:text-gray-300 transition-colors duration-200">
          {descriptionPreview}
        </p>
      </Link>

      <div
        className="flex flex-wrap gap-2"
        role="list"
        aria-label="Detalhes da vaga"
      >
        <Badge
          variant="outline"
          role="listitem"
          aria-label={`Categoria: ${translatedCategory}`}
          className={`${categoryColors.text} ${categoryColors.border} ${categoryColors.bg}`}
        >
          {translatedCategory}
        </Badge>
      </div>
    </div>
  )
}
