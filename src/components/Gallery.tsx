import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { galleryItems } from '../data/gallery'
import { Eyebrow, MaskedLines, Reveal } from './primitives'

function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number
  onClose: () => void
  onStep: (dir: 1 | -1) => void
}) {
  const item = galleryItems[index]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onStep])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-5 backdrop-blur-sm md:p-14"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.caption} — imagen ${index + 1} de ${galleryItems.length}`}
      onClick={onClose}
    >
      <AnimatePresence mode="wait">
        <motion.figure
          key={item.src}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[78vh] w-auto max-w-full object-contain"
          />
          <figcaption className="mt-5 flex items-baseline justify-between gap-6">
            <span className="font-display text-lg font-light italic text-ivory">
              {item.caption}
            </span>
            <span className="text-[0.62rem] tracking-luxe text-stone">
              {String(index + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}
            </span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onStep(-1)
        }}
        aria-label="Imagen anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 p-4 text-2xl font-light text-stone transition-colors hover:text-champagne md:left-8"
      >
        ←
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onStep(1)
        }}
        aria-label="Imagen siguiente"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-4 text-2xl font-light text-stone transition-colors hover:text-champagne md:right-8"
      >
        →
      </button>
      <button
        onClick={onClose}
        aria-label="Cerrar galería"
        className="absolute right-5 top-5 p-3 text-[0.68rem] uppercase tracking-luxe text-stone transition-colors hover:text-champagne md:right-10 md:top-8"
      >
        Cerrar ✕
      </button>
    </motion.div>
  )
}

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + galleryItems.length) % galleryItems.length,
      ),
    [],
  )

  return (
    <section id="gallery" className="relative bg-ink py-28 md:py-44">
      <div className="mx-auto max-w-[1680px] px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <Eyebrow>05 — Galería</Eyebrow>
            </Reveal>
            <MaskedLines
              lines={['La calma,', 'capturada.']}
              className="mt-8 font-display text-5xl font-light leading-[1.02] text-ivory md:text-7xl"
            />
          </div>
          <div className="flex items-end md:col-span-4 md:col-start-9">
            <Reveal delay={0.15}>
              <p className="text-[0.95rem] font-light leading-[1.9] text-stone">
                Fragmentos de la sala, de la mesa y del plato — fotografiados tal y como
                los encontramos, con su propia luz.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Editorial masonry */}
        <div className="mt-20 columns-2 gap-5 md:mt-28 md:columns-3 md:gap-8 [column-fill:_balance]">
          {galleryItems.map((item, i) => (
            <Reveal
              key={item.src}
              delay={(i % 3) * 0.08}
              className="mb-5 break-inside-avoid md:mb-8"
            >
              <button
                onClick={() => setActive(i)}
                data-cursor="zoom"
                className="group block w-full overflow-hidden text-left"
                aria-label={`Abrir imagen: ${item.caption}`}
              >
                <div
                  className={`overflow-hidden ${
                    item.ratio === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.5s] ease-silk group-hover:scale-110"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-[0.62rem] uppercase tracking-luxe text-stone transition-colors duration-500 group-hover:text-champagne">
                    {item.caption}
                  </span>
                  <span className="text-[0.6rem] text-stone/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <Lightbox index={active} onClose={() => setActive(null)} onStep={step} />
        )}
      </AnimatePresence>
    </section>
  )
}
