"use client"

import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (items: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      <div className="text-sm text-muted-foreground">
        Exibindo{" "}
        <span className="font-medium text-foreground">
          vagas de {startItem} a {endItem}
        </span>{" "}
        <span className="font-medium text-foreground">
          ({totalItems} resultados)
        </span>{" "}
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="border-green-400 cursor-pointer hover:border-green-500 transition-colors duration-200"
            size="icon"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4 text-green-400 hover:text-green-500 transition-colors duration-200" />
          </Button>
          <Button
            variant="outline"
            className="border-green-400 cursor-pointer hover:border-green-500 transition-colors duration-200"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 text-green-400 hover:text-green-500 transition-colors duration-200" />
          </Button>
          <span className="text-sm">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            className="border-green-400 cursor-pointer hover:border-green-500 transition-colors duration-200"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4 text-green-400 hover:text-green-500 transition-colors duration-200" />
          </Button>
          <Button
            variant="outline"
            className="border-green-400 cursor-pointer hover:border-green-500 transition-colors duration-200"
            size="icon"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4 text-green-400 hover:text-green-500 transition-colors duration-200" />
          </Button>
        </div>
      </div>
    </div>
  )
}
