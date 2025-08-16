import { Building2, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CompanySectionProps {
  id: number
  companyName: string
  companyLogo?: string
  location: string
  locationPreview: string
}

export function CompanySection({
  id,
  companyName,
  companyLogo,
  location,
  locationPreview,
}: CompanySectionProps) {
  return (
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <Link
        href={`/job/${id}`}
        className="block"
        aria-label={`Ver logo da empresa ${companyName}`}
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
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-lg font-medium border-1">
              <Building2
                className="w-12 h-12 p-3 border-1 rounded-lg"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          href={`/job/${id}`}
          className="inline-block max-w-[85%]"
          aria-label={`Ver detalhes da vaga na empresa ${companyName}`}
        >
          <span className="font-medium truncate hover:text-gray-300 transition-colors duration-200 block">
            {companyName}
          </span>
        </Link>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
          <Link
            href={`/job/${id}`}
            className="inline-block max-w-[85%]"
            aria-label={`Ver detalhes da localização: ${location}`}
          >
            <span
              className="truncate hover:text-gray-300 transition-colors duration-200 block"
              title={location}
            >
              {locationPreview}
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
