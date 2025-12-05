import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ParallaxLayers = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/3 to-transparent"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-0 left-1/2 w-full h-full bg-gradient-to-t from-white/5 to-transparent"
      />
    </div>
  )
}

export default ParallaxLayers

