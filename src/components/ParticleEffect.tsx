import { useEffect, useRef } from 'react'

const ParticleEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1
        if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1
      })

      const html = particles
        .map(
          (p) => {
            const colorMix = Math.random()
            let bgColor, shadowColor
            if (colorMix < 0.5) {
              bgColor = 'white'
              shadowColor = 'white'
            } else if (colorMix < 0.75) {
              bgColor = '#DAA520'
              shadowColor = '#DAA520'
            } else {
              bgColor = '#A52A2A'
              shadowColor = '#A52A2A'
            }
            return `
        <div style="
          position: absolute;
          left: ${p.x}px;
          top: ${p.y}px;
          width: ${p.size}px;
          height: ${p.size}px;
          background: ${bgColor};
          border-radius: 50%;
          opacity: ${p.opacity};
          box-shadow: 0 0 ${p.size * 2}px ${shadowColor};
          pointer-events: none;
        "></div>
      `
          }
        )
        .join('')

      if (container) {
        container.innerHTML = html
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />
}

export default ParticleEffect

