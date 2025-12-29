import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CountdownTimerProps {
  targetDate: string // Format: "YYYY-MM-DD HH:mm:ss" or ISO string
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime()
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        setIsExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      return { days, hours, minutes, seconds }
    }

    // Calculate immediately
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mt-8"
      >
        <div className="glass-effect rounded-2xl p-8 inline-block card-hover starry-border pulse-glow">
          <p className="text-3xl md:text-4xl font-orbitron font-bold gradient-text-premium neon-glow mb-2">
            Etkinlik Başladı! 🎉
          </p>
          <p className="text-white/70 text-lg">
            BKPMUN'a hoş geldiniz!
          </p>
        </div>
      </motion.div>
    )
  }

  const timeUnits = [
    { label: 'Gün', value: timeLeft.days },
    { label: 'Saat', value: timeLeft.hours },
    { label: 'Dakika', value: timeLeft.minutes },
    { label: 'Saniye', value: timeLeft.seconds },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mt-8"
    >
      <p className="text-white/70 text-lg mb-6 font-medium">Etkinlik başlangıcına kalan süre:</p>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.1 }}
            className="glass-effect rounded-2xl p-6 min-w-[100px] text-center card-hover starry-border pulse-glow hover-lift"
          >
            <motion.div
              key={unit.value}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-5xl font-orbitron font-black gradient-text-premium neon-glow mb-2"
            >
              {String(unit.value).padStart(2, '0')}
            </motion.div>
            <div className="text-white/60 text-sm font-semibold uppercase tracking-wider">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default CountdownTimer

