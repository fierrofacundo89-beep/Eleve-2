import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eyebrow, MaskedLines, ParallaxImage, Reveal } from './primitives'

gsap.registerPlugin(ScrollTrigger)

export default function Chef() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.2 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="chef" className="relative overflow-hidden bg-coal py-28 md:py-44">
      {/* Ghost numeral */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-10 bottom-0 select-none font-display text-[24rem] font-light leading-none text-outline opacity-30 md:text-[34rem]"
      >
        04
      </span>

      <div className="relative mx-auto max-w-[1680px] px-6 md:px-12">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          {/* Portrait */}
          <div className="relative md:col-span-5">
            <ParallaxImage
              src="/images/chef-portrait.webp"
              alt="Executive chef Julien Moreau in the ÉLÉVÉ dining room"
              className="aspect-[4/5]"
              speed={10}
            />
            <Reveal delay={0.1} className="mt-5 flex items-baseline justify-between">
              <p className="text-[0.62rem] uppercase tracking-luxe text-stone">
                Julien Moreau · Executive Chef
              </p>
              <span className="h-px w-16 bg-champagne/40" />
            </Reveal>
          </div>

          {/* Bio */}
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <Eyebrow>04 — The Chef</Eyebrow>
            </Reveal>
            <MaskedLines
              lines={['Julien', 'Moreau']}
              className="mt-8 font-display text-6xl font-light leading-[0.98] text-ivory md:text-8xl"
            />
            <Reveal delay={0.15}>
              <p className="mt-5 font-display text-xl font-light italic text-champagne md:text-2xl">
                “I don't invent dishes. I listen to the season until it tells me what it
                wants to become.”
              </p>
              <div className="mt-10 max-w-xl space-y-6 text-[0.93rem] font-light leading-[1.95] text-stone">
                <p>
                  Trained in the exacting kitchens of Lyon and refined through a decade at
                  three-star houses in Paris and Copenhagen, Julien Moreau returned home
                  with a singular conviction: that haute cuisine should feel inevitable,
                  never performed.
                </p>
                <p>
                  At ÉLÉVÉ he leads a brigade of twelve, working with a closed circle of
                  growers, fishers and foragers within two hundred kilometres. Each menu
                  begins at dawn in the market and ends, nine acts later, at your table.
                </p>
              </div>
              <div className="mt-10 flex gap-14">
                <div>
                  <p className="font-display text-3xl font-light text-champagne">22</p>
                  <p className="mt-1 text-[0.6rem] uppercase tracking-luxe text-stone">
                    Years at the stove
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl font-light text-champagne">12</p>
                  <p className="mt-1 text-[0.6rem] uppercase tracking-luxe text-stone">
                    Hands in the brigade
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl font-light text-champagne">200<span className="text-xl">km</span></p>
                  <p className="mt-1 text-[0.6rem] uppercase tracking-luxe text-stone">
                    Sourcing radius
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* The craft, in motion */}
        <div className="mt-24 grid gap-8 md:mt-36 md:grid-cols-12">
          <div className="md:col-span-7 md:col-start-2">
            <Reveal className="overflow-hidden">
              <video
                ref={videoRef}
                className="aspect-video h-auto w-full object-cover"
                src="/videos/chef-plating.mp4"
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/hero-plating.webp"
                aria-label="Chef Moreau plating a dish at the kitchen pass"
              />
            </Reveal>
          </div>
          <div className="flex items-end md:col-span-3 md:col-start-10">
            <Reveal delay={0.2}>
              <p className="font-display text-xl font-light italic leading-relaxed text-ivory/85">
                Tweezers, patience and firelight — the last thirty seconds of a dish are
                its most honest.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
