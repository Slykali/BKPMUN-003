import { useEffect, useRef } from 'react'
import { usePerformanceMode } from '../context/PerformanceContext'

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { performanceMode } = usePerformanceMode()

  useEffect(() => {
    if (performanceMode) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    const stars: Array<{
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      brightness: number
    }> = []

    // Create stars
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        brightness: Math.random(),
      })
    }

    let animationId: number | undefined

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        star.x += star.vx
        star.y += star.vy
        star.brightness += 0.02

        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0

        const alpha = (Math.sin(star.brightness) + 1) / 2
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        
        // Mix colors: white, yellow, red
        const colorMix = Math.random()
        let fillColor
        if (colorMix < 0.6) {
          fillColor = `rgba(255, 255, 255, ${alpha * 0.8 + 0.2})`
        } else if (colorMix < 0.8) {
          fillColor = `rgba(218, 165, 32, ${alpha * 0.7 + 0.2})`
        } else {
          fillColor = `rgba(165, 42, 42, ${alpha * 0.6 + 0.2})`
        }
        
        ctx.fillStyle = fillColor
        ctx.fill()

        // Add glow effect with mixed colors
        ctx.shadowBlur = 10
        if (colorMix < 0.6) {
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
        } else if (colorMix < 0.8) {
          ctx.shadowColor = 'rgba(218, 165, 32, 0.7)'
        } else {
          ctx.shadowColor = 'rgba(165, 42, 42, 0.6)'
        }
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      if (animationId !== undefined) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [performanceMode])

  if (performanceMode) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-black via-dark-900 to-dark-900 opacity-90" />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}

export default StarryBackground
