import { useUserId } from "@/hooks/useUserId"
import { ReactNode, createContext, useContext } from "react"

interface UserContextType {
  userId: string | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const userId = useUserId()

  return (
    <UserContext.Provider value={{ userId }}>
      {userId ? children : <div>Carregando...</div>}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }

  return context
}
