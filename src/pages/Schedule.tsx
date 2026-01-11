import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, MapPin, Calendar } from 'lucide-react'

const Schedule = () => {
  const scheduleRef = useRef(null)
  const committeeRef = useRef(null)
  const scheduleInView = useInView(scheduleRef, { once: true, amount: 0.2 })
  const committeeInView = useInView(committeeRef, { once: true })

  const days = [
    {
      title: 'January 12, 2026 - Day 1',
      events: [
        { time: '09:30 - 10:15', title: 'Opening Ceremony', description: 'Welcome address and official opening of the BKPMUN conference', location: 'Main Hall' },
        { time: '10:30 - 11:30', title: 'Session 1', description: 'First committee session of the day', location: 'Committee Rooms' },
        { time: '11:30 - 12:00', title: 'Coffee Break', description: 'Networking and refreshments', location: 'Lobby' },
        { time: '12:00 - 13:20', title: 'Session 2', description: 'Second committee session', location: 'Committee Rooms' },
        { time: '13:30 - 14:00', title: 'Lunch', description: 'Lunch break for all participants', location: 'Dining Hall' },
        { time: '14:00 - 15:30', title: 'Session 3', description: 'Third committee session', location: 'Committee Rooms' },
        { time: '15:30 - 16:00', title: 'Coffee Break', description: 'Afternoon networking and refreshments', location: 'Lobby' },
        { time: '16:00 - 17:00', title: 'Session 4', description: 'Fourth and final session of Day 1', location: 'Committee Rooms' },
      ]
    },
    {
      title: 'January 13, 2026 - Day 2',
      events: [
        { time: '09:30 - 10:15', title: 'Session 5', description: 'First committee session of Day 2', location: 'Committee Rooms' },
        { time: '11:00 - 11:30', title: 'Coffee Break', description: 'Morning networking and refreshments', location: 'Lobby' },
        { time: '11:30 - 13:20', title: 'Session 6', description: 'Second committee session', location: 'Committee Rooms' },
        { time: '13:20 - 14:00', title: 'Lunch', description: 'Lunch break for all participants', location: 'Dining Hall' },
        { time: '14:00 - 15:30', title: 'Session 7', description: 'Final committee session', location: 'Committee Rooms' },
        { time: '15:30 - 17:00', title: 'Closing Ceremony', description: 'Awards ceremony and official closing of BKPMUN 2026', location: 'Main Hall' },
      ]
    },
  ]

  const committees = [
    { name: 'customizable', time: 'customizable', location: 'customizable', topics: 'customizable' },
    { name: 'customizable', time: 'customizable', location: 'customizable', topics: 'customizable' },
    { name: 'customizable', time: 'customizable', location: 'customizable', topics: 'customizable' },
    { name: 'customizable', time: 'customizable', location: 'customizable', topics: 'customizable' },
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
            Schedule
          </motion.h1>
          <p className="text-xl text-white/70 text-reveal-animation">
            This page displays the event schedule and committee schedule for BKPMUN
          </p>
        </motion.div>
      </section>

      {/* Event Schedule */}
      <section ref={scheduleRef} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12 gradient-text-premium neon-glow">Event Schedule</h2>
          <div className="space-y-8">
            {days.map((day, dayIndex) => (
              <motion.div
                key={dayIndex}
                initial={{ opacity: 0, x: -50 }}
                animate={scheduleInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: dayIndex * 0.2 }}
                className="glass-effect rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-white border-b-2 border-white/30 pb-3">
                  {day.title}
                </h3>
                <div className="space-y-4">
                  {day.events.map((event, eventIndex) => (
                    <motion.div
                      key={eventIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={scheduleInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: dayIndex * 0.2 + eventIndex * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex gap-6 p-6 bg-white/10 rounded-xl border-l-4 border-white hover:bg-white/15 transition-all"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex items-center gap-2 text-white font-orbitron font-bold text-lg">
                          <Clock className="w-5 h-5" />
                          {event.time}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-xl font-bold mb-2 text-white">{event.title}</h4>
                        <p className="text-white/60 mb-3 leading-relaxed">{event.description}</p>
                        <div className="flex items-center gap-2 text-white/70 text-sm font-semibold">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Schedule */}
      <section ref={committeeRef} className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12 gradient-text-premium neon-glow">Committee Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {committees.map((committee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={committeeInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-effect rounded-xl p-6 card-hover"
              >
                <h3 className="text-xl font-bold mb-4 text-white border-b-2 border-white/30 pb-2">
                  {committee.name}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-white/70">
                    <Clock className="w-4 h-4 text-white" />
                    <span><strong>Time:</strong> {committee.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <MapPin className="w-4 h-4 text-white" />
                    <span><strong>Location:</strong> {committee.location}</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/70">
                    <Calendar className="w-4 h-4 text-white mt-0.5" />
                    <span><strong>Topics:</strong> {committee.topics}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Schedule

