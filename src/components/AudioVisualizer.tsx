import { useEffect, useRef } from 'react'

const AudioVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
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

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Create wave effect
      for (let i = 0; i < 5; i++) {
        const y = canvas.height / 2 + Math.sin(time + i) * 50
        ctx.beginPath()
        ctx.moveTo(0, y)
        for (let x = 0; x < canvas.width; x += 10) {
          const waveY = y + Math.sin((x / 100) + time + i) * 20
          ctx.lineTo(x, waveY)
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - i * 0.02})`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
    />
  )
}

export default AudioVisualizer

