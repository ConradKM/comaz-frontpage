// Made-up business and availability for the Landing page demos. Nothing here talks to
// the real API — it's deterministic so the demos look the same on every visit.

export const DEMO_BUSINESS = 'Harbour Studio'

export type DemoService = {
  id: string
  name: string
  description: string
  minutes: number
  price: number
  deposit?: number
}

export const DEMO_SERVICES: DemoService[] = [
  {
    id: 'consult',
    name: 'Initial consultation',
    description: 'A first conversation to understand what you need.',
    minutes: 30,
    price: 45,
    deposit: 10,
  },
  {
    id: 'session',
    name: 'Standard session',
    description: 'A full one-to-one session.',
    minutes: 60,
    price: 70,
  },
  {
    id: 'followup',
    name: 'Follow-up',
    description: 'A short check-in after a previous visit.',
    minutes: 20,
    price: 30,
  },
]

export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  )
}

/** The next given weekday strictly after today (0 = Sunday … 6 = Saturday). */
export function nextWeekday(from: Date, weekday: number) {
  const d = startOfDay(from)
  const diff = (weekday - d.getDay() + 7) % 7 || 7
  d.setDate(d.getDate() + diff)
  return d
}

// Cheap stable hash so the same day always has the same slots taken.
function hash(n: number) {
  let x = n | 0
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b)
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b)
  return (x ^ (x >>> 16)) >>> 0
}

function dayKey(d: Date) {
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()
}

/** Closed on Sundays, and in the past. */
export function isOpen(d: Date, today: Date) {
  return d.getDay() !== 0 && startOfDay(d) > startOfDay(today)
}

/** Open times for a day, every half hour from 09:00 (Sat: until 13:00). */
export function slotsFor(d: Date, service: DemoService) {
  const close = d.getDay() === 6 ? 13 * 60 : 17 * 60
  const step = 30
  const slots: string[] = []
  for (let t = 9 * 60, i = 0; t + service.minutes <= close; t += step, i++) {
    if (t >= 12 * 60 + 30 && t < 13 * 60 + 30 && d.getDay() !== 6) continue // lunch
    if (hash(dayKey(d) * 31 + i) % 5 < 2) continue // already booked
    slots.push(`${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`)
  }
  return slots
}

export type DayLevel = 'open' | 'limited' | 'full' | 'closed'

/** How busy a day looks on the calendar, derived from how many times are left. */
export function dayLevel(d: Date, today: Date, service: DemoService): DayLevel {
  if (!isOpen(d, today)) return 'closed'
  const free = slotsFor(d, service).length
  if (free === 0) return 'full'
  return free <= 4 ? 'limited' : 'open'
}

export function formatMinutes(minutes: number) {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h} h ${m} min` : `${h} h`
}

export function longDate(d: Date) {
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
}

export function shortDate(d: Date) {
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}
