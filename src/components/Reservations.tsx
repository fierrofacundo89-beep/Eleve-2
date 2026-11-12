import { FormEvent, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { submitReservation, type ReservationRequest } from '../lib/reservations'
import { Eyebrow, MaskedLines, Reveal } from './primitives'

type Status = 'idle' | 'pending' | 'sent' | 'error'

const EMPTY: ReservationRequest = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '19:00',
  guests: '2',
  requests: '',
}

export default function Reservations() {
  const [form, setForm] = useState<ReservationRequest>(EMPTY)
  const [status, setStatus] = useState<Status>('idle')
  const [reference, setReference] = useState<string>()

  const minDate = useMemo(() => new Date().toISOString().split('T')[0], [])

  const set = (key: keyof ReservationRequest) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'pending') return
    setStatus('pending')
    try {
      const result = await submitReservation(form)
      if (result.ok) {
        setReference(result.reference)
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="reservations" className="relative overflow-hidden bg-coal">
      {/* Atmospheric backdrop */}
      <div className="absolute inset-0">
        <img
          src="/images/dining-hall.jpg"
          alt=""
          aria-hidden
          loading="lazy"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-coal/85 to-ink" />
      </div>

      <div className="relative mx-auto max-w-[1680px] px-6 py-28 md:px-12 md:py-44">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Intro column */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>06 — Reservations</Eyebrow>
            </Reveal>
            <MaskedLines
              lines={['Your table', 'awaits.']}
              className="mt-8 font-display text-5xl font-light leading-[1.02] text-ivory md:text-7xl"
            />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-md text-[0.95rem] font-light leading-[1.9] text-stone">
                We welcome guests Tuesday through Saturday from seven in the evening.
                Requests are answered personally by our maître d'hôtel within one working
                day.
              </p>
              <div className="mt-12 space-y-5 text-sm font-light text-stone">
                <p className="flex gap-4">
                  <span className="w-20 shrink-0 text-[0.62rem] uppercase tracking-luxe text-champagne/80 leading-5">
                    Address
                  </span>
                  12 Rue de l'Éclat, 75004 Paris
                </p>
                <p className="flex gap-4">
                  <span className="w-20 shrink-0 text-[0.62rem] uppercase tracking-luxe text-champagne/80 leading-5">
                    Hours
                  </span>
                  Tue — Sat · 19:00 — 23:30
                </p>
                <p className="flex gap-4">
                  <span className="w-20 shrink-0 text-[0.62rem] uppercase tracking-luxe text-champagne/80 leading-5">
                    Contact
                  </span>
                  reservations@eleve-paris.example · +33 1 42 00 00 00
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1} className="border border-ivory/10 bg-ink/60 p-7 backdrop-blur-sm md:p-12">
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="py-10 text-center"
                    role="status"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-champagne/50"
                    >
                      <span className="text-xl text-champagne">✦</span>
                    </motion.div>
                    <h3 className="mt-8 font-display text-3xl font-light text-ivory">
                      Request received
                    </h3>
                    <p className="mx-auto mt-4 max-w-sm text-sm font-light leading-relaxed text-stone">
                      Thank you, {form.name.split(' ')[0] || 'guest'}. Your reservation
                      request <span className="text-champagne">{reference}</span> has been
                      recorded. Our maître d'hôtel will write to{' '}
                      <span className="text-ivory/90">{form.email}</span> to confirm your
                      table — no reservation is final until then.
                    </p>
                    <button
                      onClick={() => {
                        setForm(EMPTY)
                        setStatus('idle')
                      }}
                      className="btn-luxe btn-ghost mt-10"
                    >
                      New request
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={onSubmit}
                    noValidate={false}
                  >
                    <div className="grid gap-9 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label htmlFor="r-name" className="mb-2 block text-[0.6rem] uppercase tracking-luxe text-stone">
                          Full name
                        </label>
                        <input
                          id="r-name"
                          required
                          autoComplete="name"
                          className="field-luxe"
                          placeholder="Marie Laurent"
                          value={form.name}
                          onChange={(e) => set('name')(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="r-email" className="mb-2 block text-[0.6rem] uppercase tracking-luxe text-stone">
                          Email
                        </label>
                        <input
                          id="r-email"
                          type="email"
                          required
                          autoComplete="email"
                          className="field-luxe"
                          placeholder="marie@example.com"
                          value={form.email}
                          onChange={(e) => set('email')(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="r-phone" className="mb-2 block text-[0.6rem] uppercase tracking-luxe text-stone">
                          Phone
                        </label>
                        <input
                          id="r-phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          className="field-luxe"
                          placeholder="+33 6 00 00 00 00"
                          value={form.phone}
                          onChange={(e) => set('phone')(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="r-date" className="mb-2 block text-[0.6rem] uppercase tracking-luxe text-stone">
                          Date
                        </label>
                        <input
                          id="r-date"
                          type="date"
                          required
                          min={minDate}
                          className="field-luxe"
                          value={form.date}
                          onChange={(e) => set('date')(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="r-time" className="mb-2 block text-[0.6rem] uppercase tracking-luxe text-stone">
                          Time
                        </label>
                        <select
                          id="r-time"
                          className="field-luxe"
                          value={form.time}
                          onChange={(e) => set('time')(e.target.value)}
                        >
                          {['19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="r-guests" className="mb-2 block text-[0.6rem] uppercase tracking-luxe text-stone">
                          Guests
                        </label>
                        <select
                          id="r-guests"
                          className="field-luxe"
                          value={form.guests}
                          onChange={(e) => set('guests')(e.target.value)}
                        >
                          {['1', '2', '3', '4', '5', '6'].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === '1' ? 'guest' : 'guests'}
                            </option>
                          ))}
                          <option value="7+">7 or more — private dining</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="r-requests" className="mb-2 block text-[0.6rem] uppercase tracking-luxe text-stone">
                          Special requests <span className="normal-case text-stone/60">(optional)</span>
                        </label>
                        <textarea
                          id="r-requests"
                          rows={3}
                          className="field-luxe resize-none"
                          placeholder="Allergies, occasions, wine preferences…"
                          value={form.requests}
                          onChange={(e) => set('requests')(e.target.value)}
                        />
                      </div>
                    </div>

                    {status === 'error' && (
                      <p role="alert" className="mt-6 text-sm font-light text-red-300/90">
                        Something went wrong sending your request. Please try again, or call
                        us directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'pending'}
                      className="btn-luxe btn-gold mt-10 w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                    >
                      {status === 'pending' ? 'Sending…' : 'Request a table'}
                    </button>
                    <p className="mt-5 text-[0.7rem] font-light leading-relaxed text-stone/70">
                      Submitting sends a request only — your table is confirmed personally
                      by email, never automatically.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
