"use client"

import { useUserId } from "@/hooks/useUserId"
import { ReactNode, createContext, useContext } from "react"

interface UserContextType {
  userId: string | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const userId = useUserId()

  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
