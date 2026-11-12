import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { dishes } from '../data/menu'
import { Eyebrow, MaskedLines, ParallaxImage, Reveal } from './primitives'

gsap.registerPlugin(ScrollTrigger)

function DishRow({ index }: { index: number }) {
  const dish = dishes[index]
  const flipped = index % 2 === 1

  return (
    <article
      className={`group grid items-center gap-8 md:grid-cols-12 md:gap-0 ${
        index > 0 ? 'mt-24 md:mt-40' : ''
      }`}
    >
      {/* Image */}
      <div
        className={`relative md:col-span-6 ${
          flipped ? 'md:order-2 md:col-start-7' : 'md:col-start-1'
        }`}
      >
        <div className="relative overflow-hidden" data-cursor="zoom">
          <ParallaxImage
            src={dish.image}
            alt={dish.alt}
            className="aspect-[4/5] md:aspect-[5/6]"
            imgClassName="transition-transform duration-[1.6s] ease-silk group-hover:scale-[1.17]"
            speed={8}
          />
          <div className="pointer-events-none absolute inset-0 bg-ink/15 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </div>
        {/* Floating numeral overlapping the image */}
        <span
          aria-hidden
          className={`pointer-events-none absolute -top-10 select-none font-display text-8xl font-light italic text-champagne/80 transition-transform duration-1000 ease-silk group-hover:-translate-y-2 md:text-9xl ${
            flipped ? '-right-3 md:-right-8' : '-left-3 md:-left-8'
          }`}
        >
          {dish.numeral}
        </span>
      </div>

      {/* Copy */}
      <div
        className={`md:col-span-5 ${
          flipped ? 'md:order-1 md:col-start-1 md:pr-10' : 'md:col-start-8 md:pl-2'
        }`}
      >
        <Reveal>
          <p className="text-[0.62rem] uppercase tracking-luxe text-champagne">{dish.category}</p>
          <h3 className="mt-4 font-display text-4xl font-light leading-tight text-ivory md:text-5xl">
            {dish.name}
          </h3>
          <div className="mt-6 h-px w-14 bg-champagne/50 transition-all duration-700 ease-silk group-hover:w-28 group-hover:bg-champagne" />
          <p className="mt-6 max-w-sm text-[0.92rem] font-light leading-[1.95] text-stone">
            {dish.description}
          </p>
          <p className="mt-7 font-display text-2xl font-light italic text-champagne">
            {dish.price}
          </p>
        </Reveal>
      </div>
    </article>
  )
}

export default function Menu() {
  const filmRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        filmRef.current,
        { clipPath: 'inset(10% 12% 10% 12%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: filmRef.current,
            start: 'top 85%',
            end: 'top 30%',
            scrub: true,
          },
        },
      )
    })
    const video = videoRef.current
    let observer: IntersectionObserver | undefined
    if (video) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) video.play().catch(() => {})
          else video.pause()
        },
        { threshold: 0.2 },
      )
      observer.observe(video)
    }
    return () => {
      ctx.revert()
      observer?.disconnect()
    }
  }, [])

  return (
    <section id="menu" className="relative bg-ink py-28 md:py-44">
      <div className="mx-auto max-w-[1680px] px-6 md:px-12">
        {/* Heading */}
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Reveal>
              <Eyebrow>03 — The Menu</Eyebrow>
            </Reveal>
            <MaskedLines
              lines={['Nine acts.', 'One season.']}
              className="mt-8 font-display text-5xl font-light leading-[1.02] text-ivory md:text-7xl"
            />
          </div>
          <div className="flex items-end md:col-span-5 md:col-start-8">
            <Reveal delay={0.15}>
              <p className="max-w-md text-[0.95rem] font-light leading-[1.9] text-stone">
                A selection from the current tasting menu. The full menu changes with the
                market each morning — what follows is tonight's overture.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Courses */}
        <div className="mt-24 md:mt-36">
          <DishRow index={0} />
          <DishRow index={1} />

          {/* Cinematic interlude — the signature dish, in motion */}
          <div
            ref={filmRef}
            className="relative mt-24 aspect-video overflow-hidden md:mt-40"
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src="/videos/signature-dish.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/dish-beef.jpg"
              aria-label="Slow cinematic film of the signature beef course"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <p className="text-[0.62rem] uppercase tracking-luxe text-champagne">
                Signature · Filet des Prairies
              </p>
              <p className="mt-2 max-w-xs font-display text-xl font-light italic text-ivory md:text-2xl">
                Ten years of patience, reduced to a glaze.
              </p>
            </div>
          </div>

          <DishRow index={2} />
          <DishRow index={3} />
          <DishRow index={4} />
        </div>

        {/* Tasting menu call-out */}
        <Reveal className="mt-28 border-t border-champagne/15 pt-14 md:mt-40">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="font-display text-3xl font-light text-ivory md:text-4xl">
                The full tasting menu — <span className="italic text-champagne">€185</span>
              </p>
              <p className="mt-3 max-w-lg text-sm font-light leading-relaxed text-stone">
                Nine courses with optional wine pairing (€95). Vegetal and pescatarian
                journeys available with notice.
              </p>
            </div>
            <a href="#reservations" className="btn-luxe btn-ghost shrink-0">
              Reserve a table
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
