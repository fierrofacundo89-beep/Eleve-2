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
          src="/images/dining-hall.webp"
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
              <Eyebrow>06 — Reservas</Eyebrow>
            </Reveal>
            <MaskedLines
              lines={['Tu mesa', 'te espera.']}
              className="mt-8 font-display text-5xl font-light leading-[1.02] text-ivory md:text-7xl"
            />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-md text-[0.95rem] font-light leading-[1.9] text-stone">
                Recibimos a nuestros comensales de martes a sábado a partir de las siete
                de la tarde. Nuestro maître d'hôtel responde personalmente cada solicitud
                en el plazo de un día laborable.
              </p>
              <div className="mt-12 space-y-5 text-sm font-light text-stone">
                <p className="flex gap-4">
                  <span className="w-20 shrink-0 text-[0.62rem] uppercase tracking-luxe text-champagne/80 leading-5">
                    Dirección
                  </span>
                  12 Rue de l'Éclat, 75004 París
                </p>
                <p className="flex gap-4">
                  <span className="w-20 shrink-0 text-[0.62rem] uppercase tracking-luxe text-champagne/80 leading-5">
                    Horario
                  </span>
                  Mar — Sáb · 19:00 — 23:30
                </p>
                <p className="flex gap-4">
                  <span className="w-20 shrink-0 text-[0.62rem] uppercase tracking-luxe text-champagne/80 leading-5">
                    Contacto
                  </span>
                  <span className="break-all">reservations@eleve-paris.example</span> ·{' '}
                  <span className="whitespace-nowrap">+33 1 42 00 00 00</span>
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
                      Solicitud recibida
                    </h3>
                    <p className="mx-auto mt-4 max-w-sm text-sm font-light leading-relaxed text-stone">
                      Gracias, {form.name.split(' ')[0] || 'estimado comensal'}. Tu
                      solicitud de reserva <span className="text-champagne">{reference}</span>{' '}
                      ha quedado registrada. Nuestro maître d'hôtel escribirá a{' '}
                      <span className="text-ivory/90">{form.email}</span> para confirmar tu
                      mesa — ninguna reserva es definitiva hasta entonces.
                    </p>
                    <button
                      onClick={() => {
                        setForm(EMPTY)
                        setStatus('idle')
                      }}
                      className="btn-luxe btn-ghost mt-10"
                    >
                      Nueva solicitud
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
                          Nombre completo
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
                          Correo electrónico
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
                          Teléfono
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
                          Fecha
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
                          Hora
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
                          Comensales
                        </label>
                        <select
                          id="r-guests"
                          className="field-luxe"
                          value={form.guests}
                          onChange={(e) => set('guests')(e.target.value)}
                        >
                          {['1', '2', '3', '4', '5', '6'].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === '1' ? 'comensal' : 'comensales'}
                            </option>
                          ))}
                          <option value="7+">7 o más — comedor privado</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="r-requests" className="mb-2 block text-[0.6rem] uppercase tracking-luxe text-stone">
                          Peticiones especiales <span className="normal-case text-stone/60">(opcional)</span>
                        </label>
                        <textarea
                          id="r-requests"
                          rows={3}
                          className="field-luxe resize-none"
                          placeholder="Alergias, ocasiones especiales, preferencias de vino…"
                          value={form.requests}
                          onChange={(e) => set('requests')(e.target.value)}
                        />
                      </div>
                    </div>

                    {status === 'error' && (
                      <p role="alert" className="mt-6 text-sm font-light text-red-300/90">
                        Algo salió mal al enviar tu solicitud. Inténtalo de nuevo o
                        llámanos directamente.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'pending'}
                      className="btn-luxe btn-gold mt-10 w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                    >
                      {status === 'pending' ? 'Enviando…' : 'Solicitar mesa'}
                    </button>
                    <p className="mt-5 text-[0.7rem] font-light leading-relaxed text-stone/70">
                      Al enviar solo se registra una solicitud — tu mesa se confirma
                      personalmente por correo, nunca de forma automática.
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
