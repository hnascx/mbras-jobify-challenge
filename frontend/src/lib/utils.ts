import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const translateJobType = (jobType: string): string => {
  const jobTypeMap: { [key: string]: string } = {
    full_time: "Tempo integral",
    part_time: "Meio período",
    contract: "Contrato",
    freelance: "Freelance",
    internship: "Estágio",
  }

  return jobTypeMap[jobType] || jobType
}

export const translateCategory = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    // Valores exatos que vêm da API do Remotive
    "Software Development": "Desenvolvimento de Software",
    Design: "Design",
    Marketing: "Marketing",
    "Sales / Business": "Vendas/Negócios",
    "Customer Service": "Atendimento ao Cliente",
    Product: "Produto",
    "Data Analysis": "Dados",
    "DevOps / Sysadmin": "DevOps",
    "Finance / Legal": "Financeiro/Jurídico",
    "Human Resources": "Recursos Humanos",
    QA: "QA",
    Writing: "Escrita",
    "All others": "Outras categorias",
  }

  return categoryMap[category] || category
}

export const getCategoryColor = (
  category: string
): { text: string; border: string; bg: string } => {
  const colorMap: {
    [key: string]: { text: string; border: string; bg: string }
  } = {
    "Software Development": {
      text: "text-blue-800 dark:text-blue-300",
      border: "border-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/50",
    },
    Design: {
      text: "text-purple-800 dark:text-purple-300",
      border: "border-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/50",
    },
    Marketing: {
      text: "text-pink-800 dark:text-pink-300",
      border: "border-pink-500",
      bg: "bg-pink-100 dark:bg-pink-900/50",
    },
    "Sales / Business": {
      text: "text-green-800 dark:text-green-300",
      border: "border-green-500",
      bg: "bg-green-100 dark:bg-green-900/50",
    },
    "Customer Service": {
      text: "text-amber-800 dark:text-amber-300",
      border: "border-amber-500",
      bg: "bg-amber-100 dark:bg-amber-900/50",
    },
    Product: {
      text: "text-indigo-800 dark:text-indigo-300",
      border: "border-indigo-500",
      bg: "bg-indigo-100 dark:bg-indigo-900/50",
    },
    "Data Analysis": {
      text: "text-yellow-800 dark:text-yellow-300",
      border: "border-yellow-500",
      bg: "bg-yellow-100 dark:bg-yellow-900/50",
    },
    "DevOps / Sysadmin": {
      text: "text-red-800 dark:text-red-300",
      border: "border-red-500",
      bg: "bg-red-100 dark:bg-red-900/50",
    },
    "Finance / Legal": {
      text: "text-emerald-800 dark:text-emerald-300",
      border: "border-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-900/50",
    },
    "Human Resources": {
      text: "text-cyan-800 dark:text-cyan-300",
      border: "border-cyan-500",
      bg: "bg-cyan-100 dark:bg-cyan-900/50",
    },
    QA: {
      text: "text-orange-800 dark:text-orange-300",
      border: "border-orange-500",
      bg: "bg-orange-100 dark:bg-orange-900/50",
    },
    Writing: {
      text: "text-teal-800 dark:text-teal-300",
      border: "border-teal-500",
      bg: "bg-teal-100 dark:bg-teal-900/50",
    },
    "All others": {
      text: "text-gray-800 dark:text-gray-300",
      border: "border-gray-500",
      bg: "bg-gray-100 dark:bg-gray-900/50",
    },
  }

  return colorMap[category] || colorMap["All others"]
}
