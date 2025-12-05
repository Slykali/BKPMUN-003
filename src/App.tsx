import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PopupManager from './components/PopupManager'
import ToastProvider from './components/ToastProvider'
import ScrollToTop from './components/ScrollToTop'
import StarryBackground from './components/StarryBackground'
import ParticleEffect from './components/ParticleEffect'
import CursorFollower from './components/CursorFollower'
import ParallaxLayers from './components/ParallaxLayers'
import PageTransition from './components/PageTransition'
import WeAreBackPopup from './components/WeAreBackPopup'
import Home from './pages/Home'
import StudyGuides from './pages/StudyGuides'
import Committees from './pages/Committees'
import Schedule from './pages/Schedule'
import Team from './pages/Team'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col relative">
      <StarryBackground />
      <ParticleEffect />
      <ParallaxLayers />
      <CursorFollower />
      <Navbar />
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/study-guides"
              element={
                <PageTransition>
                  <StudyGuides />
                </PageTransition>
              }
            />
            <Route
              path="/committees"
              element={
                <PageTransition>
                  <Committees />
                </PageTransition>
              }
            />
            <Route
              path="/schedule"
              element={
                <PageTransition>
                  <Schedule />
                </PageTransition>
              }
            />
            <Route
              path="/teachers"
              element={
                <PageTransition>
                  <Team />
                </PageTransition>
              }
            />
            <Route
              path="/team"
              element={
                <PageTransition>
                  <Team />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <PopupManager />
      <WeAreBackPopup />
      <ToastProvider />
      <ScrollToTop />
    </div>
  )
}

export default App

