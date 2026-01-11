import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Clock, FileText, ArrowRight, Globe, Shield } from 'lucide-react'
import { useToast } from '../hooks/useToast'

const StudyGuides = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })
  const toast = useToast()

  interface Guide {
    category: string
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    duration: string
    pages: string
    tags: string[]
  }

  const guides: Guide[] = [
    {
      category: 'health',
      icon: Globe,
      title: 'WHO Study Guide',
      description: 'Comprehensive study guide for the World Health Organization committee covering global health issues, disease prevention, and healthcare accessibility.',
      duration: '45 min read',
      pages: '600 KB PDF',
      tags: ['Health', 'Global Issues', 'Disease Prevention', 'Healthcare'],
    },
    {
      category: 'human-rights',
      icon: Shield,
      title: 'UNWOMEN Study Guide',
      description: 'Detailed study guide for the UN Women committee focusing on gender equality, women\'s rights, and empowerment issues on a global scale.',
      duration: '40 min read',
      pages: 'PDF',
      tags: ['Gender Equality', 'Women\'s Rights', 'Empowerment', 'Human Rights'],
    },
  ]

  const filteredGuides = guides.filter((guide: Guide) => {
    const matchesFilter = filter === 'all' || guide.category === filter
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const filters = [
    { id: 'all', label: 'All Topics' },
    { id: 'health', label: 'Health' },
    { id: 'human-rights', label: 'Human Rights' },
    { id: 'security', label: 'Security' },
    { id: 'economic', label: 'Economic' },
    { id: 'environmental', label: 'Environmental' },
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
            Study Guides
          </motion.h1>
          <p className="text-xl text-white/70 text-reveal-animation">
            This page displays study guides and resources for students preparing for the BKPMUN event
          </p>
        </motion.div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md mx-auto md:mx-0">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search study guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass-effect border border-white/20 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all elegant-focus"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {filters.map((filterOption) => (
                <button
                  key={filterOption.id}
                  onClick={() => setFilter(filterOption.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    filter === filterOption.id
                      ? 'warm-gradient text-black shadow-lg shadow-white/20'
                      : 'glass-effect text-white/70 hover:bg-white/10 border border-white/20'
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section ref={sectionRef} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredGuides.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">Study guides will be available soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGuides.map((guide, index) => {
                const Icon = guide.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="glass-effect rounded-2xl p-6 hover:border-white/30 transition-all group card-hover starry-border shimmer hover-lift"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        guide.category === 'security' ? 'bg-red-500/20 text-red-400' :
                        guide.category === 'environmental' ? 'bg-green-500/20 text-green-400' :
                        guide.category === 'health' ? 'bg-blue-500/20 text-blue-400' :
                        guide.category === 'human-rights' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {guide.category}
                      </span>
                    </div>
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="text-4xl mb-4 inline-block"
                    >
                      <Icon className="text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 leading-relaxed">{guide.description}</p>
                    <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {guide.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {guide.pages}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.tags.map((tag: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-white/10 text-white/70 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href="https://drive.google.com/drive/folders/1UtOlBqlOHXSOhPmTPJXszpRohFt68fBS?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        toast.showInfo('Opening study guide...')
                      }}
                      className="w-full py-2 warm-gradient rounded-lg text-black font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-white/20 transition-all group elegant-button ripple-effect pulse-glow"
                    >
                      Download Guide
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}

export default StudyGuides
