import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Bell } from 'lucide-react'
import { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  type?: 'save-date' | 'announcement' | 'info'
  title?: string
  content?: string
  date?: string
}

const Modal = ({ isOpen, onClose, type = 'info', title, content, date }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-effect-dark rounded-3xl p-8 max-w-md w-full relative overflow-hidden ornamental-border starry-border pulse-glow"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-warm/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative z-10">
                {type === 'save-date' && (
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-white to-white/80 flex items-center justify-center glow-pulse floating"
                    >
                      <Calendar className="w-10 h-10 text-black" />
                    </motion.div>
                    <h2 className="text-3xl font-orbitron font-bold gradient-text-premium neon-glow mb-2">
                      Save the Date!
                    </h2>
                    {date && (
                      <p className="text-2xl font-bold text-white mb-4">{date}</p>
                    )}
                    {title && (
                      <p className="text-white/80 text-lg">{title}</p>
                    )}
                  </div>
                )}

                {type === 'announcement' && (
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-white to-white/80 flex items-center justify-center glow-pulse floating"
                    >
                      <Bell className="w-10 h-10 text-black" />
                    </motion.div>
                    <h2 className="text-3xl font-orbitron font-bold gradient-text-premium neon-glow mb-4">
                      {title || 'Important Announcement'}
                    </h2>
                    {content && (
                      <p className="text-white/80 leading-relaxed">{content}</p>
                    )}
                  </div>
                )}

                {type === 'info' && (
                  <div>
                    {title && (
                      <h2 className="text-2xl font-orbitron font-bold gradient-text-premium neon-glow mb-4">
                        {title}
                      </h2>
                    )}
                    {content && (
                      <p className="text-white/80 leading-relaxed">{content}</p>
                    )}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-full mt-6 py-3 warm-gradient rounded-xl text-black font-bold hover:shadow-lg hover:shadow-white/20 transition-all elegant-button ripple-effect pulse-glow"
                >
                  Got it!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal

