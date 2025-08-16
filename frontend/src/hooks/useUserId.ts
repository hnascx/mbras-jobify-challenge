"use client"

import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

const USER_ID_KEY = "@jobify:userId"

// Hook para buscar o ID do usuário
export function useUserId() {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const storedId = localStorage.getItem(USER_ID_KEY)
    if (storedId) {
      setUserId(storedId)
    } else {
      const newId = uuidv4()
      localStorage.setItem(USER_ID_KEY, newId)
      setUserId(newId)
    }
  }, [])

  return userId
}
