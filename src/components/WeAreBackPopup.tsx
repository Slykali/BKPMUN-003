import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock } from 'lucide-react'

const WeAreBackPopup = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if popup was already closed
    const wasClosed = localStorage.getItem('weAreBackPopupClosed')
    if (!wasClosed) {
      // Show popup after a short delay
      setTimeout(() => {
        setIsVisible(true)
      }, 500)
    }
  }, [])

  const handleClose = () => {
    setShowPasswordModal(true)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '1234') {
      setIsVisible(false)
      setShowPasswordModal(false)
      localStorage.setItem('weAreBackPopupClosed', 'true')
      setPassword('')
      setError('')
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '') // Only numbers
    if (value.length <= 4) {
      setPassword(value)
      setError('')
    }
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
            onClick={handleClose}
          />

          {/* Main Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              {/* Hidden Close Button - Still functional but invisible */}
              <motion.button
                onClick={handleClose}
                className="absolute -top-4 -right-4 z-10 w-16 h-16 opacity-0 cursor-pointer"
                aria-label="Close popup"
              >
                <X className="w-8 h-8" />
              </motion.button>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-effect-dark rounded-3xl p-12 md:p-16 text-center relative overflow-hidden starry-border pulse-glow"
              >
                {/* Decorative Background */}
                <div className="absolute inset-0 gradient-mesh opacity-50" />
                <div className="absolute top-0 left-0 w-64 h-64 bg-dark-yellow/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 floating" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-dark-red/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 floating" style={{ animationDelay: '1s' }} />

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.3, stiffness: 200 }}
                    className="mb-8"
                  >
                    <Lock className="w-20 h-20 mx-auto text-dark-yellow-light glow-pulse" />
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-7xl md:text-9xl font-orbitron font-black mb-6 gradient-text-premium neon-glow glow-pulse"
                  >
                    WE ARE BACK
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-2xl md:text-3xl text-white/80 mb-4"
                  >
                    Welcome to BKPMUN
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-lg text-white/60"
                  >
                    Click anywhere to continue
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Password Modal */}
          <AnimatePresence>
            {showPasswordModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[102] flex items-center justify-center p-4"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setShowPasswordModal(false)
                    setPassword('')
                    setError('')
                  }
                }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="glass-effect-dark rounded-2xl p-8 max-w-md w-full relative overflow-hidden starry-border"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ rotate: -180 }}
                      animate={{ rotate: 0 }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-dark-yellow-light to-dark-red-light flex items-center justify-center glow-pulse"
                    >
                      <Lock className="w-8 h-8 text-black" />
                    </motion.div>

                    <h2 className="text-3xl font-orbitron font-bold gradient-text-premium neon-glow mb-2">
                      Enter Password
                    </h2>
                    <p className="text-white/60 mb-6">
                      Please enter the 4-digit password to continue
                    </p>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={password}
                          onChange={handlePasswordChange}
                          placeholder="0000"
                          maxLength={4}
                          className="w-full px-6 py-4 text-center text-3xl font-orbitron font-bold tracking-widest bg-black/50 border-2 border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-dark-yellow-light focus:ring-2 focus:ring-dark-yellow-light/50 transition-all neon-border"
                          autoFocus
                        />
                      </div>

                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm"
                        >
                          {error}
                        </motion.p>
                      )}

                      <div className="flex gap-4">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setShowPasswordModal(false)
                            setPassword('')
                            setError('')
                          }}
                          className="flex-1 py-3 border-2 border-white/30 rounded-xl text-white font-semibold hover:bg-white/10 transition-all"
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 py-3 warm-gradient rounded-xl text-black font-bold hover:shadow-lg hover:shadow-white/20 transition-all elegant-button pulse-glow"
                        >
                          Submit
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}

export default WeAreBackPopup

