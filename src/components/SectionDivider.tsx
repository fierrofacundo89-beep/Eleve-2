import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Ornamental divider: two gold hairlines draw outward from a central
 * diamond as the divider enters the viewport.
 */
export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current!
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-rule]'),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.6,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        },
      )
      gsap.fromTo(
        el.querySelector('[data-gem]'),
        { rotate: 225, autoAlpha: 0, scale: 0 },
        {
          rotate: 45,
          autoAlpha: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="mx-auto flex max-w-[1680px] items-center gap-6 px-6 md:px-12"
    >
      <span data-rule className="h-px flex-1 origin-right bg-gradient-to-l from-champagne/45 to-transparent" />
      <span data-gem className="block h-1.5 w-1.5 shrink-0 bg-champagne/80" />
      <span data-rule className="h-px flex-1 origin-left bg-gradient-to-r from-champagne/45 to-transparent" />
    </div>
  )
}
