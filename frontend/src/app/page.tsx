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
import { useUser } from "@/contexts/UserContext"
import { useDebounce } from "@/hooks/useDebounce"
import { api } from "@/lib/api"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

interface Job {
  id: number
  title: string
  company_name: string
  company_logo?: string
  category: string
  candidate_required_location: string
  description: string
}

interface FavoriteJob {
  jobId: string
}

interface CategoryOption {
  value: string
  label: string
}

const categoryOptions: CategoryOption[] = [
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
  const { userId } = useUser()
  const [jobs, setJobs] = useState<Job[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [favoritedJobIds, setFavoritedJobIds] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [totalJobs, setTotalJobs] = useState(0)

  const debouncedSearch = useDebounce(search)

  const loadJobs = useCallback(async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      if (debouncedSearch) params.append("search", debouncedSearch)
      if (category && category !== "all") params.append("category", category)
      params.append("page", currentPage.toString())
      params.append("limit", itemsPerPage.toString())

      const response = await api.get(`/jobs?${params.toString()}`)
      setJobs(response.data.jobs)
      setTotalJobs(response.data.totalJobs)
    } catch (error) {
      console.error("Error loading jobs:", error)
      toast.error("Failed to load jobs")
    } finally {
      setIsLoading(false)
    }
  }, [debouncedSearch, category, currentPage, itemsPerPage])

  const loadFavorites = useCallback(async () => {
    if (!userId) return

    try {
      const response = await api.get<FavoriteJob[]>("/favorited-jobs")
      const favoriteIds = new Set(
        response.data.map((fav) => fav.jobId)
      ) as Set<string>
      setFavoritedJobIds(favoriteIds)
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error)
      toast.error("Falha ao carregar favoritos")
    }
  }, [userId])

  const handleFavoriteToggle = async (jobId: number) => {
    if (!userId) return

    const isFavorited = favoritedJobIds.has(jobId.toString())
    const job = jobs.find((j) => j.id === jobId)
    if (!job) return

    try {
      await api.post("/favorited-jobs/toggle", { jobId: jobId.toString() })
      setFavoritedJobIds((prev) => {
        const next = new Set(prev)
        if (next.has(jobId.toString())) {
          next.delete(jobId.toString())
        } else {
          next.add(jobId.toString())
        }
        return next
      })
      toast.success(
        isFavorited
          ? `Vaga removida dos favoritos`
          : `Vaga adicionada aos favoritos`
      )
    } catch (error) {
      console.error("Erro ao atualizar status de favorito:", error)
      toast.error("Falha ao atualizar status de favorito")
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }

  useEffect(() => {
    loadJobs()
  }, [loadJobs])

  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  // Reset to first page when search or category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, category])

  return (
    <div className="space-y-7">
      {/* Filtros sempre visíveis */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Buscar vagas..."
          className="flex-1 focus-visible:ring-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isLoading}
        />
        <Select
          value={category}
          onValueChange={setCategory}
          disabled={isLoading}
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

      {/* Conteúdo condicional */}
      {isLoading ? (
        <JobSkeleton />
      ) : jobs.length > 0 ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                companyName={job.company_name}
                companyLogo={job.company_logo}
                category={job.category}
                location={job.candidate_required_location}
                description={job.description}
                isFavorited={favoritedJobIds.has(job.id.toString())}
                onFavoriteClick={() => handleFavoriteToggle(job.id)}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalJobs / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            totalItems={totalJobs}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground">
            Nenhuma vaga encontrada. Tente ajustar sua busca ou filtros.
          </p>
        </div>
      )}
    </div>
  )
}
