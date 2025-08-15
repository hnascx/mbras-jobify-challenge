"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getCategoryColor, translateCategory } from "@/lib/utils"
import { Building2, Heart, Loader2, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
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

const stripHtml = (html: string) => {
  if (!html) return ""

  // Primeiro tenta usar o DOM para limpar o HTML
  try {
    const doc = new DOMParser().parseFromString(html, "text/html")
    const text = doc.body.textContent || doc.body.innerText || ""

    // Limpa o texto resultante
    return cleanText(text)
  } catch {
    // Se falhar, usa regex como fallback
    return cleanText(html)
  }
}

// Função auxiliar para limpar o texto
const cleanText = (text: string) => {
  return text
    .replace(/<[^>]+>/g, "") // Remove tags HTML
    .replace(/&[^;]+;/g, "") // Remove entidades HTML
    .replace(/\b[hb][0-9]?\b/g, "") // Remove h1, h2, b soltos
    .replace(/style="[^"]*"/g, "") // Remove atributos style
    .replace(/[<>]/g, "") // Remove < e > remanescentes
    .replace(/\/+/g, " ") // Substitui múltiplas barras por espaço
    .replace(/Position:+/g, "") // Remove "Position:"
    .replace(/Description:+/g, "") // Remove "Description:"
    .replace(/Job\s+Description:+/g, "") // Remove "Job Description:"
    .replace(/\s*:\s*/g, ": ") // Normaliza espaços ao redor de dois pontos
    .replace(/\s*\|\s*/g, " | ") // Normaliza espaços ao redor de pipes
    .replace(/\s+/g, " ") // Normaliza múltiplos espaços
    .replace(/^[^a-zA-Z0-9]+/, "") // Remove caracteres especiais no início
    .replace(/[^a-zA-Z0-9\s:,.|()-]+/g, "") // Remove caracteres especiais exceto alguns permitidos
    .trim()
}

const truncateAtWord = (text: string, limit: number) => {
  if (!text) return ""

  // Remove espaços em branco no início e fim
  let cleanText = text.trim()
  if (cleanText.length <= limit) return cleanText

  let truncated = cleanText.slice(0, limit)

  // Se o último caractere for um espaço ou caractere especial,
  // retrocede até encontrar uma palavra
  const specialChars = /[\s,.!?;:]/
  while (
    truncated.length > 0 &&
    specialChars.test(truncated[truncated.length - 1])
  ) {
    truncated = truncated.slice(0, -1)
  }

  // Se ainda houver texto após remover os caracteres especiais
  if (truncated.length > 0) {
    // Encontra a última palavra completa
    const lastSpace = truncated.lastIndexOf(" ")

    // Se encontrou um espaço e não está muito longe do limite
    if (lastSpace > limit - 30) {
      truncated = truncated.slice(0, lastSpace)
    }
  }

  return `${truncated}...`
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
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false)
  const router = useRouter()

  const cleanDescription = description ? stripHtml(description) : ""
  const descriptionPreview = truncateAtWord(cleanDescription, 120)
  const titlePreview = truncateAtWord(stripHtml(title), 50)
  const locationPreview = truncateAtWord(stripHtml(location), 30)
  const translatedCategory = translateCategory(category)
  const categoryColors = getCategoryColor(category)

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      setIsLoadingFavorite(true)
      await onFavoriteClick()
    } finally {
      setIsLoadingFavorite(false)
    }
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Se o clique foi no botão de favorito, não navegue
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
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Link
              href={`/job/${id}`}
              className="block"
              aria-label={`View ${stripHtml(companyName)} logo`}
            >
              <div className="relative w-12 h-12 shrink-0 bg-muted rounded-lg overflow-hidden">
                {companyLogo ? (
                  <Image
                    src={companyLogo}
                    alt={`${companyName} logo`}
                    fill
                    className="object-contain bg-white px-1 select-none"
                    draggable="false"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-lg font-medium">
                    <Building2 className="w-12 h-12 p-3 border-1 rounded-lg" />
                  </div>
                )}
              </div>
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                href={`/job/${id}`}
                className="inline-block max-w-[85%]"
                aria-label={`View details for ${stripHtml(
                  title
                )} at ${stripHtml(companyName)}`}
              >
                <span className="font-medium truncate hover:text-gray-300 transition-colors duration-200 block">
                  {stripHtml(companyName)}
                </span>
              </Link>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 shrink-0" />
                <Link
                  href={`/job/${id}`}
                  className="inline-block"
                  aria-label={`View details for ${stripHtml(title)} location`}
                >
                  <span
                    className="truncate hover:text-gray-300 transition-colors duration-200"
                    title={location}
                  >
                    {locationPreview}
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <Button
            variant={isFavorited ? "default" : "outline"}
            size="icon"
            onClick={handleFavoriteClick}
            className="shrink-0 ml-2 cursor-pointer"
            disabled={isLoadingFavorite}
            aria-label={
              isFavorited
                ? `Remove ${stripHtml(title)} from favorites`
                : `Add ${stripHtml(title)} to favorites`
            }
            aria-pressed={isFavorited}
          >
            {isLoadingFavorite ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Heart
                className={`h-4 w-4 ${
                  isFavorited ? "fill-current text-red-500" : ""
                }`}
                aria-hidden="true"
              />
            )}
          </Button>
        </div>

        {/* Job Title and Details */}
        <div className="space-y-3">
          <Link
            href={`/job/${id}`}
            id={`job-title-${id}`}
            className="inline-block max-w-full"
            title={title}
            aria-label={`View details for ${stripHtml(title)} at ${stripHtml(
              companyName
            )}`}
          >
            <span className="text-lg font-semibold truncate hover:text-gray-300 transition-colors duration-200 block">
              {titlePreview}
            </span>
          </Link>

          <Link
            href={`/job/${id}`}
            className="inline-block"
            aria-label={`Read more about ${stripHtml(title)}`}
          >
            <p className="text-sm text-muted-foreground line-clamp-3 hover:text-gray-300 transition-colors duration-200">
              {descriptionPreview}
            </p>
          </Link>

          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Job details"
          >
            <Badge
              variant="outline"
              role="listitem"
              aria-label={`Category: ${translatedCategory}`}
              className={`${categoryColors.text} ${categoryColors.border} ${categoryColors.bg}`}
            >
              {translatedCategory}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  )
}
