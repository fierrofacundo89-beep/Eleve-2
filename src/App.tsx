import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import SectionDivider from './components/SectionDivider'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Philosophy from './components/Philosophy'
import Menu from './components/Menu'
import Chef from './components/Chef'
import Gallery from './components/Gallery'
import Reservations from './components/Reservations'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [ready, setReady] = useState(false)
  useLenis(ready)

  // Recalculate scroll positions once media has had a chance to size.
  useEffect(() => {
    if (!ready) return
    const t = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => clearTimeout(t)
  }, [ready])

  return (
    <div className="min-h-screen bg-ink text-ivory">
      <a
        href="#main"
        className="sr-only z-[110] bg-champagne px-6 py-3 text-xs uppercase tracking-luxe text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero ready={ready} />
        <Experience />
        <SectionDivider />
        <Philosophy />
        <Menu />
        <SectionDivider />
        <Chef />
        <Gallery />
        <Reservations />
      </main>
      <Footer />
    </div>
  )
}
