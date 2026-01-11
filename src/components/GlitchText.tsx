import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePerformanceMode } from '../context/PerformanceContext'

interface GlitchTextProps {
  text: string
  className?: string
}

const GlitchText = ({ text, className = '' }: GlitchTextProps) => {
  const [glitched, setGlitched] = useState(false)
  const { performanceMode } = usePerformanceMode()

  useEffect(() => {
    if (performanceMode) {
      setGlitched(false)
      return
    }

    const interval = setInterval(() => {
      setGlitched(true)
      setTimeout(() => setGlitched(false), 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [performanceMode])

  return (
    <motion.span
      className={className}
      animate={
        glitched
          ? {
              x: [0, -2, 2, -2, 2, 0],
              textShadow: [
                '0 0 0 white',
                '2px 0 0 #ff00ff, -2px 0 0 #00ffff',
                '2px 0 0 #ff00ff, -2px 0 0 #00ffff',
                '0 0 0 white',
              ],
            }
          : {}
      }
      transition={{ duration: 0.2 }}
    >
      {text}
    </motion.span>
  )
}

export default GlitchText
