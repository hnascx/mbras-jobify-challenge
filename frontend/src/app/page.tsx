"use client"

import { JobCard } from "@/components/JobCard"
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
  category: string
  candidate_required_location: string
  job_type: string
}

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
      const response = await api.get("/favorited-jobs")
      const favoriteIds = new Set(response.data.map((fav: any) => fav.jobId))
      setFavoritedJobIds(favoriteIds)
    } catch (error) {
      console.error("Error loading favorites:", error)
      toast.error("Failed to load favorite jobs")
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
          ? `Removed ${job.title} from favorites`
          : `Added ${job.title} to favorites`
      )
    } catch (error) {
      console.error("Error toggling favorite:", error)
      toast.error("Failed to update favorite status")
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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search jobs..."
          className="flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="frontend">Frontend</SelectItem>
            <SelectItem value="backend">Backend</SelectItem>
            <SelectItem value="fullstack">Fullstack</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="devops">DevOps</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: itemsPerPage }).map((_, i) => (
            <div
              key={i}
              className="space-y-4 p-6 border rounded-lg animate-pulse"
            >
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-muted rounded w-20"></div>
                <div className="h-6 bg-muted rounded w-20"></div>
              </div>
            </div>
          ))
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              companyName={job.company_name}
              category={job.category}
              location={job.candidate_required_location}
              type={job.job_type}
              isFavorited={favoritedJobIds.has(job.id.toString())}
              onFavoriteClick={() => handleFavoriteToggle(job.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-lg text-muted-foreground">
              No jobs found. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>

      {!isLoading && jobs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalJobs / itemsPerPage)}
          itemsPerPage={itemsPerPage}
          totalItems={totalJobs}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </div>
  )
}
