export interface ReservationRequest {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  requests: string
}

export interface ReservationResult {
  ok: boolean
  reference?: string
  error?: string
}

/**
 * Reservation service boundary.
 *
 * This is intentionally the single integration point for a real booking
 * backend (SevenRooms, OpenTable, Resy, or a bespoke API). Replace the
 * body of `submitReservation` with a real `fetch` call and the UI will
 * work unchanged — it already handles pending / success / error states.
 *
 * Example:
 *   const res = await fetch('/api/reservations', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(request),
 *   })
 *   if (!res.ok) return { ok: false, error: await res.text() }
 *   return { ok: true, reference: (await res.json()).reference }
 */
export async function submitReservation(
  request: ReservationRequest,
): Promise<ReservationResult> {
  // Simulated latency so the UI's pending state can be exercised.
  await new Promise((r) => setTimeout(r, 1100))

  // No backend is connected yet: we acknowledge receipt of the request
  // without pretending a table has been confirmed.
  const reference = `EL-${request.date.replace(/-/g, '').slice(2)}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`
  return { ok: true, reference }
}
