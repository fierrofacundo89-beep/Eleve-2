import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { label: 'The Experience', href: '#experience' },
  { label: 'Our Philosophy', href: '#philosophy' },
  { label: 'The Menu', href: '#menu' },
  { label: 'The Chef', href: '#chef' },
  { label: 'Gallery', href: '#gallery' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-ink/80 py-4 backdrop-blur-md shadow-[0_1px_0_rgba(197,164,109,0.12)]'
            : 'bg-transparent py-7'
        }`}
      >
        <nav className="mx-auto flex max-w-[1680px] items-center justify-between px-6 md:px-12">
          <a
            href="#top"
            className="font-display text-xl tracking-luxe text-ivory transition-colors duration-500 hover:text-champagne md:text-2xl"
            aria-label="ÉLÉVÉ — back to top"
          >
            ÉLÉVÉ
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="gold-underline text-[0.68rem] font-light uppercase tracking-luxe text-ivory/80 transition-colors duration-300 hover:text-ivory"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#reservations"
                className="border border-champagne/60 px-6 py-2.5 text-[0.68rem] uppercase tracking-luxe text-champagne transition-all duration-500 hover:bg-champagne hover:text-ink"
              >
                Reservations
              </a>
            </li>
          </ul>

          <button
            onClick={() => setOpen(true)}
            className="group flex flex-col items-end gap-[7px] p-2 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="h-px w-8 bg-ivory transition-all duration-500 group-hover:bg-champagne" />
            <span className="h-px w-5 bg-ivory transition-all duration-500 group-hover:w-8 group-hover:bg-champagne" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-coal"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-xl tracking-luxe text-ivory">ÉLÉVÉ</span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-[0.68rem] uppercase tracking-luxe text-stone transition-colors hover:text-champagne"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
              {[...LINKS, { label: 'Reservations', href: '#reservations' }].map((l, i) => (
                <div key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%', transition: { duration: 0.4 } }}
                    transition={{
                      delay: 0.35 + i * 0.07,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="block py-2 font-display text-4xl font-light text-ivory transition-colors duration-300 hover:text-champagne sm:text-5xl"
                  >
                    {l.label}
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="px-8 pb-10 text-[0.65rem] uppercase tracking-luxe text-stone"
            >
              12 Rue de l'Éclat, Paris · Tue — Sat, from 7pm
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
