import { translateJobType } from "@/lib/utils"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, MapPin, Timer } from "lucide-react"
import { useMemo } from "react"

interface JobInfoProps {
  title: string
  location: string
  type: string
  publicationDate: string
}

export function JobInfo({
  title,
  location,
  type,
  publicationDate,
}: JobInfoProps) {
  const translatedJobType = translateJobType(type)
  const formattedDate = useMemo(() => {
    try {
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
    <>
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
    </>
  )
}
