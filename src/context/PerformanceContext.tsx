import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

type PerformancePreference = 'system' | 'on' | 'off'

interface PerformanceContextValue {
  performanceMode: boolean
  preference: PerformancePreference
  cyclePreference: () => void
}

const PerformanceContext = createContext<PerformanceContextValue | undefined>(undefined)

const getStoredPreference = (): PerformancePreference => {
  if (typeof window === 'undefined') return 'system'
  const stored = window.localStorage.getItem('performancePreference')
  if (stored === 'on' || stored === 'off') {
    return stored
  }
  return 'system'
}

const getMotionMediaPreference = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const PerformanceProvider = ({ children }: { children: ReactNode }) => {
  const [preference, setPreference] = useState<PerformancePreference>(() => getStoredPreference())
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => getMotionMediaPreference())

  useEffect(() => {
    setPrefersReducedMotion(getMotionMediaPreference())
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const cyclePreference = () => {
    setPreference((prev) => {
      if (typeof window === 'undefined') return prev
      const next = prev === 'system' ? 'on' : prev === 'on' ? 'off' : 'system'
      if (next === 'system') {
        window.localStorage.removeItem('performancePreference')
      } else {
        window.localStorage.setItem('performancePreference', next)
      }
      return next
    })
  }

  const performanceMode =
    preference === 'on'
      ? true
      : preference === 'off'
        ? false
        : prefersReducedMotion

  const value = useMemo(
    () => ({
      performanceMode,
      preference,
      cyclePreference,
    }),
    [performanceMode, preference],
  )

  return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>
}

export const usePerformanceMode = () => {
  const context = useContext(PerformanceContext)
  if (!context) {
    throw new Error('usePerformanceMode must be used within a PerformanceProvider')
  }
  return context
}

