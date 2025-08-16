"use client"

import { Pagination } from "@/components/Pagination"
import { useDebounce } from "@/hooks/useDebounce"
import { useFavoriteJobs, useToggleFavorite } from "@/hooks/useFavoriteJobs"
import { useJobs } from "@/hooks/useJobs"
import { useUserId } from "@/hooks/useUserId"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { JobFilters } from "../components/JobFilters"
import { JobList } from "../components/JobList"

export default function Home() {
  const searchParams = useSearchParams()
  const userId = useUserId()
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  )
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  const debouncedSearch = useDebounce(search)

  const { data, isLoading } = useJobs(currentPage, category, debouncedSearch)
  const { data: favoriteJobs = [] } = useFavoriteJobs(userId)
  const toggleFavorite = useToggleFavorite(userId)

  const handleFavoriteToggle = async (jobId: number) => {
    if (!userId) return
    await toggleFavorite.mutateAsync(jobId.toString())
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-7">
      <JobFilters
        search={search}
        category={category}
        isLoading={isLoading}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      <JobList
        jobs={data?.jobs}
        isLoading={isLoading}
        favoritedJobIds={favoriteJobs.map((fav) => fav.jobId)}
        onFavoriteClick={handleFavoriteToggle}
      />

      {data?.jobs.length ? (
        <nav aria-label="Paginação">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil((data?.totalJobs || 0) / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            totalItems={data?.totalJobs || 0}
            onPageChange={handlePageChange}
          />
        </nav>
      ) : null}
    </div>
  )
}
