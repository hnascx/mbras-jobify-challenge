"use client"

import { JobCard } from "@/components/JobCard"
import { JobSkeleton } from "@/components/JobSkeleton"
import { Pagination } from "@/components/Pagination"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDebounce } from "@/hooks/useDebounce"
import { useFavoriteJobs, useToggleFavorite } from "@/hooks/useFavoriteJobs"
import { useJobs } from "@/hooks/useJobs"
import { useUserId } from "@/hooks/useUserId"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

const categoryOptions = [
  { value: "all", label: "Todas as categorias" },
  { value: "software_development", label: "Desenvolvimento de Software" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Vendas/Negócios" },
  { value: "customer_service", label: "Atendimento ao Cliente" },
  { value: "product", label: "Produto" },
  { value: "data", label: "Dados" },
  { value: "devops", label: "DevOps" },
  { value: "finance", label: "Financeiro/Jurídico" },
  { value: "hr", label: "Recursos Humanos" },
  { value: "qa", label: "QA" },
  { value: "writing", label: "Escrita" },
  { value: "other", label: "Outras categorias" },
]

export default function Home() {
  const searchParams = useSearchParams()
  const userId = useUserId()
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)

  const debouncedSearch = useDebounce(search)

  const { data, isLoading } = useJobs(currentPage, category, debouncedSearch)
  const { data: favoriteJobs = [] } = useFavoriteJobs(userId)
  const toggleFavorite = useToggleFavorite(userId)

  const handleFavoriteToggle = async (jobId: number) => {
    await toggleFavorite.mutateAsync(jobId.toString())
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleItemsPerPageChange = (items: number) => {
    // Mantido para compatibilidade com o componente Pagination
  }

  return (
    <div className="space-y-7">
      <div
        className="flex flex-col sm:flex-row gap-4"
        role="search"
        aria-label="Filtrar vagas"
      >
        <Input
          placeholder="Buscar vagas..."
          className="flex-1 focus-visible:ring-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          aria-label="Buscar vagas por palavra-chave"
        />
        <Select
          value={category}
          onValueChange={setCategory}
          name="category"
          aria-label="Filtrar por categoria"
        >
          <SelectTrigger className="w-full sm:w-[250px] focus-visible:ring-1">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent className="backdrop-blur-none">
            {categoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div aria-live="polite" aria-busy="true">
          <JobSkeleton />
        </div>
      ) : data?.jobs.length ? (
        <>
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            role="feed"
            aria-label="Lista de vagas"
            aria-busy={isLoading}
          >
            {data.jobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                companyName={job.company_name}
                companyLogo={job.company_logo || undefined}
                category={job.category}
                location={job.candidate_required_location}
                description={job.description}
                isFavorited={favoriteJobs.some(
                  (fav) => fav.jobId === job.id.toString()
                )}
                onFavoriteClick={() => handleFavoriteToggle(job.id)}
              />
            ))}
          </div>

          <nav aria-label="Paginação">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil((data?.totalJobs || 0) / itemsPerPage)}
              itemsPerPage={itemsPerPage}
              totalItems={data?.totalJobs || 0}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </nav>
        </>
      ) : (
        <div className="text-center py-8" role="status" aria-live="polite">
          <p className="text-lg text-muted-foreground">
            Nenhuma vaga encontrada. Tente ajustar sua busca ou filtros.
          </p>
        </div>
      )}
    </div>
  )
}
