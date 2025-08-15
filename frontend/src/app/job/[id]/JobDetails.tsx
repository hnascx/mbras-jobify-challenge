"use client"

import { ShareButton } from "@/components/ShareButton"
import { Button } from "@/components/ui/button"
import { translateJobType } from "@/lib/utils"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  ArrowLeft,
  Building2,
  Calendar,
  Heart,
  MapPin,
  Timer,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useMemo } from "react"

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
  isFavorited: boolean
  onFavoriteClick: () => void
}

export function JobDetails({
  id,
  title,
  companyName,
  companyLogo,
  category,
  location,
  type,
  description,
  salary,
  publicationDate,
  isFavorited,
  onFavoriteClick,
}: JobDetailsProps) {
  const router = useRouter()
  const translatedJobType = translateJobType(type)
  const formattedDate = useMemo(() => {
    try {
      // Primeiro limpa a data removendo qualquer parte de timezone ou milissegundos
      const cleanDate = publicationDate.split("T")[0]
      const date = parseISO(cleanDate)
      return format(date, "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })
    } catch (error) {
      console.error("Error formatting date:", error, publicationDate)
      return publicationDate
    }
  }, [publicationDate])

  return (
    <div className="container mx-auto flex gap-16 relative min-h-[calc(100vh-6rem)]">
      {/* Primeira parte - Informações principais (Fixa) */}
      <div className="w-[400px] flex-shrink-0">
        <div className="fixed w-[400px]">
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

          <div className="mt-24">
            {/* Ações no topo */}
            <div className="absolute top-16 right-0 flex items-center gap-3">
              <Button
                variant={isFavorited ? "default" : "outline"}
                size="icon"
                className="h-11 w-11 shrink-0"
                onClick={onFavoriteClick}
                aria-label={
                  isFavorited
                    ? "Remover dos favoritos"
                    : "Adicionar aos favoritos"
                }
                aria-pressed={isFavorited}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorited ? "fill-current text-red-500" : ""
                  }`}
                  aria-hidden="true"
                />
              </Button>
              <ShareButton className="h-11 w-11 shrink-0 text-green-400 hover:text-green-500 border-green-400 hover:border-green-500 cursor-pointer" />
            </div>

            {/* Logo da empresa */}
            <div className="relative w-32 h-32 mx-auto">
              <div className="w-full h-full rounded-xl bg-muted overflow-hidden">
                {companyLogo ? (
                  <Image
                    src={companyLogo}
                    alt={`${companyName} logo`}
                    fill
                    className="object-contain bg-white p-2 select-none rounded-xl"
                    draggable="false"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <Building2 className="w-20 h-20 p-4" />
                  </div>
                )}
              </div>
            </div>

            {/* Nome da empresa */}
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold">{companyName}</h2>
            </div>

            {/* Título da vaga */}
            <div className="mt-8">
              <h1 className="text-3xl font-bold">{title}</h1>
            </div>

            {/* Informações adicionais */}
            <div className="space-y-2 mt-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 shrink-0" />
                <span className="truncate">{location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Timer className="h-5 w-5 shrink-0" />
                <span className="truncate">{translatedJobType}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5 shrink-0" />
                <span className="truncate">{formattedDate}</span>
              </div>
            </div>

            {/* Botão de ação */}
            <div className="flex items-center pt-6">
              <Button
                size="lg"
                className="flex-1 bg-green-400 hover:bg-green-500 text-black font-semibold transition-colors duration-200 cursor-pointer"
                onClick={() => window.open(window.location.href, "_blank")}
              >
                Candidatar-se
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Segunda parte - Descrição (Scrollável) */}
      <div className="flex-1 py-8">
        <div className="max-w-3xl">
          <div
            className="prose prose-lg dark:prose-invert 
              prose-p:text-foreground prose-p:!text-inherit
              prose-li:text-foreground prose-li:!text-inherit
              prose-strong:text-foreground prose-strong:!text-inherit
              prose-em:text-foreground prose-em:!text-inherit
              prose-headings:text-foreground prose-headings:!text-inherit
              prose-a:text-foreground prose-a:!text-inherit
              prose-code:text-foreground prose-code:!text-inherit
              prose-pre:text-foreground prose-pre:!text-inherit
              prose-blockquote:text-foreground prose-blockquote:!text-inherit
              prose-figure:text-foreground prose-figure:!text-inherit
              prose-figcaption:text-foreground prose-figcaption:!text-inherit
              prose-table:text-foreground prose-table:!text-inherit
              prose-th:text-foreground prose-th:!text-inherit
              prose-td:text-foreground prose-td:!text-inherit
              [&_*]:!text-inherit [&_*]:!important
              [&_span]:!text-inherit [&_div]:!text-inherit
              [&_*]:![background-color:transparent]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  )
}
