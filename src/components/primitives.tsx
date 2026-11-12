import { ReactNode, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Fade + rise into view on scroll. */
export function Reveal({
  children,
  delay = 0,
  y = 48,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current!
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.4,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        },
      )
    })
    return () => ctx.revert()
  }, [delay, y])

  return (
    <div ref={ref} className={className} style={{ visibility: 'hidden' }}>
      {children}
    </div>
  )
}

/**
 * Image that unveils with a clip-path wipe and drifts with a subtle
 * parallax while it travels through the viewport.
 */
export function ParallaxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  speed = 12,
  eager = false,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  /** Parallax travel, in percent of image height. */
  speed?: number
  eager?: boolean
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current!
    const img = imgRef.current!
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { clipPath: 'inset(12% 6% 12% 6%)', autoAlpha: 0.65 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          autoAlpha: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: wrap, start: 'top 85%' },
        },
      )
      gsap.fromTo(
        img,
        { yPercent: -speed, scale: 1.12 },
        {
          yPercent: speed,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })
    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        className={`h-full w-full object-cover will-change-transform ${imgClassName}`}
      />
    </div>
  )
}

/** Eyebrow label with an animated rule. */
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span className="inline-block h-px w-10 bg-champagne" />
      <span
        className={`text-[0.66rem] font-light uppercase tracking-luxe ${
          light ? 'text-stone' : 'text-champagne'
        }`}
      >
        {children}
      </span>
    </div>
  )
}

/** Headline whose lines slide up from behind a mask on scroll. */
export function MaskedLines({
  lines,
  className = '',
  lineClassName = '',
  stagger = 0.12,
}: {
  lines: string[]
  className?: string
  lineClassName?: string
  stagger?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current!
    const targets = el.querySelectorAll('[data-line]')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.3,
          stagger,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 86%' },
        },
      )
    })
    return () => ctx.revert()
  }, [stagger])

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <span data-line className={`block will-change-transform ${lineClassName}`}>
            {line}
          </span>
        </span>
      ))}
    </div>
  )
}
