import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eyebrow, MaskedLines, ParallaxImage, Reveal } from './primitives'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const videoBandRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Scale the cinematic band from inset to full-bleed as it enters.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoBandRef.current,
        { clipPath: 'inset(8% 10% 8% 10%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: videoBandRef.current,
            start: 'top 85%',
            end: 'top 25%',
            scrub: true,
          },
        },
      )
    })
    // Play/pause the ambience video only while visible (battery friendly).
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
    <section id="experience" className="relative bg-ink pt-28 md:pt-44">
      <div className="mx-auto max-w-[1680px] px-6 md:px-12">
        {/* Heading */}
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>01 — The Experience</Eyebrow>
            </Reveal>
            <MaskedLines
              lines={['An evening', 'measured in', 'moments.']}
              className="mt-8 font-display text-5xl font-light leading-[1.02] text-ivory md:text-7xl"
            />
          </div>
          <div className="flex items-end md:col-span-6 md:col-start-7">
            <Reveal delay={0.15}>
              <p className="max-w-md text-[0.95rem] font-light leading-[1.9] tracking-wide text-stone">
                From the first glass poured at the threshold to the final petit four, an
                evening at ÉLÉVÉ unfolds as a single, unhurried composition — nine courses
                in dialogue with the season, served at the pace of conversation.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Asymmetric editorial collage */}
        <div className="mt-20 grid grid-cols-12 gap-5 md:mt-28 md:gap-8">
          <div className="col-span-12 md:col-span-7">
            <ParallaxImage
              src="/images/dining-room.webp"
              alt="The ÉLÉVÉ dining room — walnut panelling, raw stone and brass under warm light"
              className="aspect-[4/3]"
              speed={10}
            />
            <Reveal delay={0.1} className="mt-5 flex items-baseline justify-between">
              <p className="text-[0.62rem] uppercase tracking-luxe text-stone">
                The dining room · 34 seats
              </p>
              <span className="hidden h-px w-24 bg-champagne/40 md:block" />
            </Reveal>
          </div>

          <div className="col-span-10 col-start-3 mt-4 md:col-span-4 md:col-start-9 md:mt-40">
            <ParallaxImage
              src="/images/table-setting.webp"
              alt="Knotted linen napkin, crystal coupes and candlelight on walnut"
              className="aspect-[3/4]"
              speed={16}
            />
            <Reveal delay={0.1} className="mt-5">
              <p className="text-[0.62rem] uppercase tracking-luxe text-stone">
                Mise en place · Hand-thrown stoneware
              </p>
            </Reveal>
          </div>

          <div className="col-span-11 mt-6 md:col-span-5 md:col-start-2 md:-mt-10">
            <ParallaxImage
              src="/images/dining-couple.webp"
              alt="Two guests in conversation over wine in the candlelit dining room"
              className="aspect-[16/11]"
              speed={12}
            />
          </div>

          <div className="col-span-12 flex items-center md:col-span-4 md:col-start-8 md:mt-16">
            <Reveal delay={0.2}>
              <p className="font-display text-2xl font-light italic leading-relaxed text-ivory/90 md:text-[1.7rem]">
                “Luxury is not abundance.{' '}
                <span className="text-champagne">It is precision</span>, offered quietly.”
              </p>
              <p className="mt-6 text-[0.62rem] uppercase tracking-luxe text-stone">
                — The house credo
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Cinematic full-bleed ambience film */}
      <div ref={videoBandRef} className="relative mt-24 h-[72vh] overflow-hidden md:mt-36 md:h-[88vh]">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/videos/dining-ambience.mp4"
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/dining-room.webp"
          aria-label="Ambient film of the ÉLÉVÉ dining room by candlelight"
        />
        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <MaskedLines
            lines={['Where time', 'slows to taste.']}
            className="text-center font-display text-4xl font-light italic leading-tight text-ivory md:text-6xl"
          />
        </div>
      </div>
    </section>
  )
}
