import { Building2 } from "lucide-react"
import Image from "next/image"

interface CompanyInfoProps {
  companyName: string
  companyLogo?: string
}

export function CompanyInfo({ companyName, companyLogo }: CompanyInfoProps) {
  return (
    <>
      {/* Logo da empresa */}
      <div className="relative w-20 h-20 md:w-32 md:h-32 mx-auto">
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
              <Building2 className="w-20 h-20 p-1" />
            </div>
          )}
        </div>
      </div>

      {/* Nome da empresa */}
      <div className="text-center mt-4">
        <h2 className="text-lg md:text-2xl font-bold">{companyName}</h2>
      </div>
    </>
  )
}
