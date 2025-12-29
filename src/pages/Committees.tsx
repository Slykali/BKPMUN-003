import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Globe, Calendar, MapPin, Shirt, FileText } from 'lucide-react'

const Committees = () => {
  const sectionRef = useRef(null)
  const infoRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })
  const infoInView = useInView(infoRef, { once: true })

  const committees = [
    { 
      icon: Globe, 
      name: 'WHO', 
      description: 'The World Health Organization committee focuses on global health issues, disease prevention, and healthcare accessibility worldwide.', 
      usg: 'Tuna Deveci',
      directorGeneral: 'Tuana Kendirici',
      status: 'Active', 
      topics: ['Global Health', 'Disease Prevention', 'Healthcare Access'] 
    },
    { 
      icon: Shield, 
      name: 'UNWOMEN', 
      description: 'The UN Women committee addresses gender equality, women\'s rights, and empowerment issues on a global scale.', 
      usg: 'Emir Karayazıcı',
      directorGeneral: null,
      status: 'Active', 
      topics: ['Gender Equality', 'Women\'s Rights', 'Empowerment'] 
    },
  ]

  const eventInfo = [
    { icon: Shirt, title: 'Dress Code', description: 'Formal clothing is required for all participants. Please adhere to the formal dress code throughout the conference.' },
  ]

  return (
    <div className="pt-32 min-h-screen">
      {/* Header */}
      <section className="relative py-20 overflow-hidden scan-line">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/3 to-white/5 gradient-mesh" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-6xl font-orbitron font-black mb-4 gradient-text-premium neon-glow glow-pulse"
          >
            Committees
          </motion.h1>
          <p className="text-xl text-white/70 text-reveal-animation">
            Explore the committees available at our BKPMUN event and learn about their topics and procedures
          </p>
        </motion.div>
      </section>

      {/* Committees Grid */}
      <section ref={sectionRef} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-orbitron font-bold text-center mb-4 gradient-text-premium neon-glow">UN Committees</h2>
          <p className="text-center text-white/70 mb-12">
            This page displays information about the committees available at your MUN event.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {committees.map((committee, index) => {
              const Icon = committee.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02, rotateY: 5 }}
                  className="glass-effect rounded-2xl p-8 text-center hover:border-white/30 transition-all group relative overflow-hidden card-hover card-3d starry-border hover-lift"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/5 transition-all" />
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="text-6xl mb-6 relative z-10"
                  >
                    <Icon className="text-white mx-auto" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white transition-colors relative z-10">
                    {committee.name}
                  </h3>
                  <p className="text-white/60 mb-6 leading-relaxed relative z-10">{committee.description}</p>
                  <div className="mb-6 relative z-10 space-y-3">
                    <div className="text-center">
                      <div className="text-sm text-white/70 mb-1">Under Secretary General</div>
                      <div className="text-lg font-semibold text-white">{committee.usg}</div>
                    </div>
                    {committee.directorGeneral && (
                      <div className="text-center">
                        <div className="text-sm text-white/70 mb-1">Director General</div>
                        <div className="text-lg font-semibold text-white">{committee.directorGeneral}</div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center gap-6 mb-6 relative z-10">
                    <div className="text-center">
                      <div className="text-2xl font-orbitron font-black gradient-text">{committee.status}</div>
                      <div className="text-xs text-white/50">Status</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mb-6 relative z-10">
                    {committee.topics.map((topic, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-xs font-semibold">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <button className="relative z-10 w-full py-3 warm-gradient rounded-lg text-black font-semibold hover:shadow-lg hover:shadow-white/20 transition-all elegant-button ripple-effect pulse-glow rotating-border">
                    View Details →
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Event Info */}
      <section ref={infoRef} className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12 gradient-text-premium neon-glow">Event Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={infoInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="glass-effect rounded-xl p-6 text-center card-hover"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl mb-4 inline-block"
                  >
                    <Icon className="text-white mx-auto" />
                  </motion.div>
                  <h4 className="text-lg font-bold mb-2 text-white">{info.title}</h4>
                  <p className="text-white/60 text-sm">{info.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Committees
