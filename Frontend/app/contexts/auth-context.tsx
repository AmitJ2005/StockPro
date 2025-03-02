'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axiosInstance from '../lib/axios'

interface AuthContextType {
  isAuthenticated: boolean
  username: string | null
  logout: () => void
  setAuthDetails: (username: string) => void
  checkAuth: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: null,
  logout: () => {},
  setAuthDetails: () => {},
  checkAuth: async () => false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token')
    const storedUsername = localStorage.getItem('username')
    
    if (token && storedUsername) {
      try {
        // Test the token with a request
        await axiosInstance.get('/api/watchlist/')
        setIsAuthenticated(true)
        setUsername(storedUsername)
        return true
      } catch {
        // If the request fails even after token refresh, clear auth state
        logout()
        return false
      }
    }
    return false
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('username')
    setIsAuthenticated(false)
    setUsername(null)
  }

  const setAuthDetails = (username: string) => {
    setIsAuthenticated(true)
    setUsername(username)
    localStorage.setItem('username', username)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, logout, setAuthDetails, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)