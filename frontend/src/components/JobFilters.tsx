"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const categoryOptions = [
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

interface JobFiltersProps {
  search: string
  category: string
  isLoading?: boolean
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
}

export function JobFilters({
  search,
  category,
  isLoading,
  onSearchChange,
  onCategoryChange,
}: JobFiltersProps) {
  return (
    <div
      className="flex flex-col sm:flex-row gap-4"
      role="search"
      aria-label="Filtrar vagas"
    >
      <Input
        placeholder="Buscar vagas..."
        className="flex-1 focus-visible:ring-1"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        type="search"
        aria-label="Buscar vagas por palavra-chave"
        disabled={isLoading}
      />
      <Select
        value={category}
        onValueChange={onCategoryChange}
        name="category"
        aria-label="Filtrar por categoria"
        disabled={isLoading}
      >
        <SelectTrigger className="cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categoryOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
