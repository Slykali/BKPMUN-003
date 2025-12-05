import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { User, Mail, ClipboardList, Mic } from 'lucide-react'

const Team = () => {
  const teamRef = useRef(null)
  const staffRef = useRef(null)
  const teamInView = useInView(teamRef, { once: true, amount: 0.2 })
  const staffInView = useInView(staffRef, { once: true })

  const team = [
    { name: 'customizable', role: 'customizable', bio: 'customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable', email: 'customizable' },
    { name: 'customizable', role: 'customizable', bio: 'customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable customizable', email: 'customizable' },
  ]

  const staff = [
    { icon: ClipboardList, title: 'customizable', description: 'customizable customizable customizable customizable customizable customizable' },
    { icon: Mic, title: 'customizable', description: 'customizable customizable customizable customizable customizable customizable' },
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
            Team
          </motion.h1>
          <p className="text-xl text-white/70 text-reveal-animation">
            This page displays information about team members organizing the BKPMUN event
          </p>
        </motion.div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12 gradient-text-premium neon-glow">Event Organizers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={teamInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.02, rotateY: 5 }}
                className="glass-effect rounded-2xl p-8 text-center hover:border-white/30 transition-all group card-hover card-3d starry-border hover-lift floating"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 flex items-center justify-center group-hover:border-white/40 transition-all"
                >
                  <User className="w-16 h-16 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-white transition-colors">
                  {member.name}
                </h3>
                <p className="text-white/80 font-semibold mb-4">{member.role}</p>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">{member.bio}</p>
                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
                    <Mail className="w-4 h-4" />
                    <span className="break-all">{member.email}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section ref={staffRef} className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12 gradient-text-premium neon-glow">Support Staff</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staff.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={staffInView ? { opacity: 1, scale: 1 } : {}}
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
                  <h4 className="text-lg font-bold mb-2 text-white">{item.title}</h4>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Team

