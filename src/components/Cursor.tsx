import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Custom cursor: a small champagne dot with a trailing ring.
 * Only mounted on fine-pointer devices; the native cursor remains
 * visible so usability is never compromised.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const dot = dotRef.current!
    const ring = ringRef.current!
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })

    let visible = false
    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
      const interactive = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, select, textarea, label, [data-cursor="zoom"]',
      )
      gsap.to(ring, {
        scale: interactive ? 2.1 : 1,
        borderColor: interactive ? 'rgba(197,164,109,0.9)' : 'rgba(197,164,109,0.45)',
        duration: 0.35,
        ease: 'power3',
      })
      gsap.to(dot, { scale: interactive ? 0 : 1, duration: 0.3 })
    }
    const onLeave = () => {
      visible = false
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden [@media(pointer:fine)]:block" aria-hidden>
      <div ref={dotRef} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-champagne" />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-champagne/45"
      />
    </div>
  )
}
