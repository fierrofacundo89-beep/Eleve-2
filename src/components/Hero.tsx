import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TITLE = ['É', 'L', 'É', 'V', 'É']

export default function Hero({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const played = useRef(false)

  // Entrance choreography — fires once the preloader has lifted.
  useEffect(() => {
    if (!ready || played.current) return
    played.current = true
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo(
        '[data-hero-img]',
        { scale: 1.25, autoAlpha: 0.4 },
        { scale: 1.05, autoAlpha: 1, duration: 2.4, ease: 'power2.inOut' },
        0,
      )
        .fromTo(
          '[data-hero-letter]',
          { yPercent: 120, rotate: 4 },
          { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.08 },
          0.5,
        )
        .fromTo(
          '[data-hero-rule]',
          { scaleX: 0 },
          { scaleX: 1, duration: 1.4, ease: 'power3.inOut' },
          0.9,
        )
        .fromTo(
          '[data-hero-tag]',
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 1.2 },
          1.2,
        )
        .fromTo(
          '[data-hero-cta]',
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.12 },
          1.5,
        )
        .fromTo('[data-hero-scroll]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, 2)
    }, rootRef)
    return () => ctx.revert()
  }, [ready])

  // Scroll parallax: image drifts slower than the page, content lifts away.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to('[data-hero-content]', {
        yPercent: -14,
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '75% top',
          scrub: true,
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex h-[100svh] min-h-[620px] items-end overflow-hidden"
    >
      {/* Cinematic image */}
      <div ref={imgRef} data-hero-img className="absolute inset-0 will-change-transform">
        <img
          src="/images/hero-plating.jpg"
          alt="An ÉLÉVÉ chef finishing a plate with tweezers at the kitchen pass"
          className="h-full w-full scale-105 object-cover object-center"
        />
        {/* Light treatment */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(9,9,9,0.55)_100%)]" />
      </div>

      {/* Content */}
      <div
        data-hero-content
        className="relative z-10 mx-auto w-full max-w-[1680px] px-6 pb-24 md:px-12 md:pb-28"
      >
        <p
          data-hero-tag
          className="mb-5 text-[0.66rem] uppercase tracking-luxe text-champagne md:text-[0.72rem]"
          style={{ visibility: ready ? undefined : 'hidden' }}
        >
          Contemporary Haute Cuisine — Paris
        </p>

        <h1
          className="flex select-none items-baseline font-display font-light leading-none text-ivory"
          aria-label="ÉLÉVÉ"
        >
          {TITLE.map((l, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.06em]">
              <span
                data-hero-letter
                className="inline-block text-[clamp(4.4rem,16vw,13.5rem)] tracking-[0.08em] will-change-transform"
                style={{ visibility: ready ? undefined : 'hidden' }}
              >
                {l}
              </span>
            </span>
          ))}
        </h1>

        <div
          data-hero-rule
          className="my-7 h-px w-full max-w-xl origin-left bg-gradient-to-r from-champagne via-champagne/50 to-transparent"
          style={{ visibility: ready ? undefined : 'hidden' }}
        />

        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div data-hero-tag style={{ visibility: ready ? undefined : 'hidden' }}>
            <p className="font-display text-2xl font-light italic leading-snug text-ivory md:text-[2.1rem]">
              A different perspective on fine dining.
            </p>
            <p className="mt-3 max-w-md text-sm font-light leading-relaxed tracking-wide2 text-stone">
              Nine courses. One season. An evening composed like a piece of music.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              data-hero-cta
              href="#experience"
              className="btn-luxe btn-gold"
              style={{ visibility: ready ? undefined : 'hidden' }}
            >
              Discover the experience
            </a>
            <a
              data-hero-cta
              href="#reservations"
              className="btn-luxe btn-ghost"
              style={{ visibility: ready ? undefined : 'hidden' }}
            >
              Reserve a table
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero-scroll
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        style={{ visibility: ready ? undefined : 'hidden' }}
      >
        <span className="text-[0.58rem] uppercase tracking-luxe text-stone">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-ivory/15">
          <span className="absolute left-0 top-0 h-full w-full animate-[scrollhint_2.2s_cubic-bezier(0.76,0,0.24,1)_infinite] bg-champagne" />
        </span>
        <style>{`@keyframes scrollhint { 0% { transform: translateY(-100%); } 55% { transform: translateY(0); } 100% { transform: translateY(100%); } }`}</style>
      </div>
    </section>
  )
}
