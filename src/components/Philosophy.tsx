import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eyebrow, ParallaxImage, Reveal } from './primitives'

gsap.registerPlugin(ScrollTrigger)

const STATEMENT =
  'La cocina excepcional nace del respeto por el ingrediente, la precisión en la técnica y una búsqueda incesante de la perfección.'

export default function Philosophy() {
  const rootRef = useRef<HTMLElement>(null)

  // Word-by-word illumination tied to scroll: the statement reads itself in.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = rootRef.current!.querySelectorAll('[data-word]')
      gsap.fromTo(
        words,
        { opacity: 0.14, y: 8 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-statement]',
            start: 'top 78%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const accent = new Set(['respeto', 'precisión', 'perfección.'])

  return (
    <section ref={rootRef} id="philosophy" className="relative overflow-hidden bg-coal">
      {/* Oversized ghost numeral for depth */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 top-10 select-none font-display text-[26rem] font-light leading-none text-outline opacity-40 md:text-[38rem]"
      >
        02
      </span>

      <div className="relative mx-auto max-w-[1680px] px-6 py-28 md:px-12 md:py-44">
        <div className="grid gap-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow>02 — Nuestra Filosofía</Eyebrow>
            </Reveal>
            <p
              data-statement
              className="mt-10 max-w-3xl font-display text-[clamp(1.9rem,4.4vw,3.6rem)] font-light leading-[1.25] text-ivory"
            >
              {STATEMENT.split(' ').map((w, i) => (
                <span
                  key={i}
                  data-word
                  className={`inline-block will-change-transform ${
                    accent.has(w.toLowerCase()) ? 'italic text-champagne' : ''
                  }`}
                >
                  {w}
                  {' '}
                </span>
              ))}
            </p>

            <Reveal delay={0.15} className="mt-14 grid max-w-xl gap-10 sm:grid-cols-2">
              <div>
                <p className="font-display text-4xl font-light text-champagne">09</p>
                <p className="mt-2 text-[0.62rem] uppercase tracking-luxe text-stone">
                  Pases, compuestos cada noche
                </p>
              </div>
              <div>
                <p className="font-display text-4xl font-light text-champagne">48h</p>
                <p className="mt-2 text-[0.62rem] uppercase tracking-luxe text-stone">
                  De la cosecha a la mesa, como máximo
                </p>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <ParallaxImage
              src="/images/dish-amuse.webp"
              alt="Un amuse-bouche emplatado a la luz de las velas sobre cerámica martillada"
              className="aspect-[3/4] md:mt-24"
              speed={14}
            />
            <Reveal delay={0.1} className="mt-5">
              <p className="text-[0.62rem] uppercase tracking-luxe text-stone">
                Nada en el plato sin un propósito.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
