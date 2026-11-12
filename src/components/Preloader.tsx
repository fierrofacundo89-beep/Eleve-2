import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LETTERS = ['É', 'L', 'É', 'V', 'É']

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLeaving(true), 2050)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!leaving && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="flex overflow-hidden">
            {LETTERS.map((l, i) => (
              <motion.span
                key={i}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.25 + i * 0.09,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display text-5xl font-light tracking-luxe text-ivory md:text-7xl"
              >
                {l}
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 h-px w-40 origin-left bg-champagne/70 md:w-56"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-6 text-[0.62rem] uppercase tracking-luxe text-stone"
          >
            Fine Dining · Est. MMXVIII
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
