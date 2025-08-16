"use client"

import { useUserId } from "@/hooks/useUserId"
import { ReactNode, createContext, useContext } from "react"

interface UserContextType {
  userId: string | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Contexto para armazenar o ID do usuário
export function UserProvider({ children }: { children: ReactNode }) {
  const userId = useUserId()

  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser deve ser usado dentro de um UserProvider")
  }
  return context
}
