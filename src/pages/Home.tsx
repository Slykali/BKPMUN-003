import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Calendar, Globe, Shirt, FileText, Trophy, Book } from 'lucide-react'
import MagneticButton from '../components/MagneticButton'
import Confetti from '../components/Confetti'
import GlitchText from '../components/GlitchText'

const Home = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 200])
  const y2 = useTransform(scrollY, [0, 300], [0, 100])
  const y3 = useTransform(scrollY, [0, 300], [0, 150])
  const y4 = useTransform(scrollY, [0, 300], [0, 50])
  const [confettiTrigger, setConfettiTrigger] = useState(false)

  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 })
  const statsInView = useInView(statsRef, { once: true })

  const features = [
    { icon: Calendar, title: 'customizable', description: 'customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable' },
    { icon: Globe, title: 'customizable', description: 'customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable' },
    { icon: Shirt, title: 'customizable', description: 'customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable' },
    { icon: FileText, title: 'customizable', description: 'customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable' },
    { icon: Trophy, title: 'customizable', description: 'customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable' },
    { icon: Book, title: 'customizable', description: 'customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable' },
  ]

  const stats = [
    { value: 0, label: 'customizable' },
    { value: 0, label: 'customizable' },
    { value: 0, label: 'customizable' },
    { value: 0, label: 'customizable' },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ y: y1 }}
            className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute top-40 right-20 w-96 h-96 bg-white/3 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y3 }}
            className="absolute bottom-20 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y4 }}
            className="absolute bottom-40 right-1/3 w-96 h-96 bg-white/3 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-lg mb-4 font-medium"
            >
              Welcome to
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
              className="text-6xl md:text-8xl font-orbitron font-black mb-6 gradient-text-premium neon-glow"
            >
              <GlitchText text="BKPMUN" />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-white font-semibold mb-8"
            >
              customizable customizable customizable
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white/60 text-lg max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              customizable customizable customizable customizable customizable customizable customizable
              customizable customizable customizable customizable customizable customizable customizable
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <MagneticButton
                onClick={() => {
                  setConfettiTrigger(true)
                  setTimeout(() => setConfettiTrigger(false), 3000)
                }}
                className="group relative px-8 py-4 warm-gradient rounded-full font-semibold text-black overflow-hidden transition-all hover:shadow-2xl hover:shadow-white/20 card-hover pulse-glow ripple-effect"
              >
                <Link to="/study-guides" className="relative z-10 flex items-center gap-2">
                  View Study Guides
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white to-white/80"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </MagneticButton>
              <MagneticButton
                className="px-8 py-4 border-2 border-white rounded-full font-semibold text-white hover:bg-white/10 transition-all card-hover neon-border ripple-effect"
              >
                <Link to="/committees">See Committees</Link>
              </MagneticButton>
            </motion.div>
            <Confetti trigger={confettiTrigger} />
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 2 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-dark-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            className="text-5xl font-orbitron font-bold text-center mb-4 gradient-text-premium neon-glow"
          >
            Event Information
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={featuresInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-center text-white/60 mb-12"
          >
            This page displays event information.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02, rotateY: 5 }}
                  className="glass-effect rounded-2xl p-6 hover:border-white/30 transition-all group card-hover ornamental-border starry-border particle-bg hover-lift card-3d shimmer"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl mb-4 inline-block"
                  >
                    <Icon className="text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.1 }}
                className="text-center glass-effect rounded-2xl p-8 card-hover starry-border pulse-glow hover-lift"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : {}}
                  className="text-5xl font-orbitron font-black gradient-text-premium neon-glow mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-white/60 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

