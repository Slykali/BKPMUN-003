import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PopupManager from './components/PopupManager'
import ToastProvider from './components/ToastProvider'
import ScrollToTop from './components/ScrollToTop'
import StarryBackground from './components/StarryBackground'
import Home from './pages/Home'
import StudyGuides from './pages/StudyGuides'
import Schedule from './pages/Schedule'
import Committees from './pages/Committees'
import Team from './pages/Team'
import { usePerformanceMode } from './context/PerformanceContext'

function App() {
  const { performanceMode } = usePerformanceMode()

  return (
    <MotionConfig reducedMotion={performanceMode ? 'always' : 'user'}>
      <div className="min-h-screen flex flex-col relative">
        <StarryBackground />
        <Navbar />
        <main className="flex-grow relative z-10">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/study-guides"
              element={<StudyGuides />}
            />
            <Route
              path="/schedule"
              element={<Schedule />}
            />
            <Route
              path="/committees"
              element={<Committees />}
            />
            <Route
              path="/teachers"
              element={<Team />}
            />
            <Route
              path="/team"
              element={<Team />}
            />
          </Routes>
        </main>
        <Footer />
        <PopupManager />
        <ToastProvider />
        <ScrollToTop />
      </div>
    </MotionConfig>
  )
}

export default App
