import { useEffect, useMemo, useRef, useState } from 'react'
import {
  DEMO_BUSINESS,
  DEMO_SERVICES,
  longDate,
  nextWeekday,
  shortDate,
  slotsFor,
} from '../../lib/demo'
import { CheckIcon, PhoneIcon } from '../icons'

type Line =
  | { kind: 'assistant' | 'caller'; text: string }
  | { kind: 'tool'; name: string; detail: string }

const spoken = (t: string) => t.replace(/^0/, '')

/**
 * The script mirrors the real assistant's booking sequence (MOT-backend
 * app/ai_voice/instructions.py): look up services → check live slots → offer only
 * returned times → read back price and deposit → confirm → create_booking → report the
 * real status (a request pending review, not an instant confirmation) → end_call.
 */
function buildScript(today: Date) {
  const service = DEMO_SERVICES[0]
  const day = nextWeekday(today, 4) // Thursday
  const morning = slotsFor(day, service).filter((t) => t < '12:00')
  const offered = morning.length >= 2 ? morning.slice(0, 3) : ['09:30', '10:30', '11:15']
  const pick = offered[1]
  const offeredText =
    offered.length === 3
      ? `${spoken(offered[0])}, ${spoken(offered[1])} or ${spoken(offered[2])}`
      : `${spoken(offered[0])} or ${spoken(offered[1])}`

  const lines: Line[] = [
    { kind: 'assistant', text: `Hi, thanks for calling ${DEMO_BUSINESS} — how can I help today?` },
    { kind: 'caller', text: 'Hi! I’d like to book a consultation — Thursday morning if you have anything.' },
    { kind: 'tool', name: 'get_appointment_types', detail: `${DEMO_SERVICES.length} services` },
    { kind: 'tool', name: 'get_available_slots', detail: `${shortDate(day)} · ${morning.length || 3} free before noon` },
    {
      kind: 'assistant',
      text: `On ${longDate(day)} I’ve got ${offeredText} free for an initial consultation. Would any of those work?`,
    },
    { kind: 'caller', text: `${spoken(pick)} is perfect.` },
    { kind: 'assistant', text: 'Lovely. Could I take your name, please?' },
    { kind: 'caller', text: 'Sam Clarke.' },
    {
      kind: 'assistant',
      text: `Thanks, Sam. That’s an initial consultation on ${longDate(day)} at ${spoken(pick)}, which is £${service.price}. There’s a £${service.deposit} deposit to secure it — I’ll text a secure payment link to this number. Shall I book that in?`,
    },
    { kind: 'caller', text: 'Yes please.' },
    { kind: 'tool', name: 'create_booking', detail: 'request created · payment link sent by SMS' },
    {
      kind: 'assistant',
      text: 'Done — I’ve texted you the payment link. Your booking’s on hold until the deposit’s paid, then the team will confirm it with you. Anything else I can help with?',
    },
    { kind: 'caller', text: 'No, that’s everything. Thanks!' },
    { kind: 'assistant', text: 'Great — see you then, Sam. Bye for now!' },
    { kind: 'tool', name: 'end_call', detail: 'conversation complete' },
  ]

  return { lines, day, pick, service }
}

function delayFor(line: Line) {
  if (line.kind === 'tool') return 750
  return Math.min(700 + line.text.length * 14, 2200)
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function formatElapsed(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export default function CallDemo() {
  const { lines, day, pick, service } = useMemo(() => buildScript(new Date()), [])
  const bookingIndex = lines.findIndex((l) => l.kind === 'tool' && l.name === 'create_booking')

  const [reduced] = useState(prefersReducedMotion)
  const [phase, setPhase] = useState<'ringing' | 'live' | 'ended'>(reduced ? 'ended' : 'ringing')
  const [shown, setShown] = useState(reduced ? lines.length : 0)
  const [elapsed, setElapsed] = useState(reduced ? 94 : 0)

  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Pick up the call once the demo scrolls into view.
  useEffect(() => {
    if (phase !== 'ringing' || !rootRef.current) return
    let pickUp: ReturnType<typeof setTimeout> | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          pickUp = setTimeout(() => setPhase('live'), 900)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(rootRef.current)
    return () => {
      observer.disconnect()
      clearTimeout(pickUp)
    }
  }, [phase])

  // Reveal the next line after a pause that roughly matches its length.
  useEffect(() => {
    if (phase !== 'live') return
    if (shown >= lines.length) {
      const t = setTimeout(() => setPhase('ended'), 500)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setShown((s) => s + 1), delayFor(lines[shown]))
    return () => clearTimeout(t)
  }, [phase, shown, lines])

  useEffect(() => {
    if (phase !== 'live') return
    const t = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(t)
  }, [phase])

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
  }, [shown, reduced])

  const replay = () => {
    setShown(0)
    setElapsed(0)
    setPhase('live')
  }

  const next = lines[shown]
  const typing = phase === 'live' && next && next.kind !== 'tool' ? next.kind : null
  const bookingVisible = shown > bookingIndex

  return (
    <div ref={rootRef} className="space-y-4">
      <div className="overflow-hidden rounded-xl bg-white shadow-card">
        {/* Call header */}
        <div className="flex items-center justify-between gap-3 border-b border-silver px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white">
              <PhoneIcon className="h-5 w-5" />
              {phase === 'ringing' && (
                <span className="absolute inset-0 animate-ping rounded-full bg-ink/30" />
              )}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">+44 7700 900481</p>
              <p className="truncate text-xs text-muted">Answered by the {DEMO_BUSINESS} AI assistant</p>
            </div>
          </div>
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium tabular-nums ${
              phase === 'live' ? 'bg-ink text-white' : 'bg-paper text-muted'
            }`}
          >
            {phase === 'live' && (
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#34d399]" />
            )}
            {phase === 'ringing' ? 'Ringing…' : phase === 'live' ? formatElapsed(elapsed) : `Ended · ${formatElapsed(elapsed)}`}
          </span>
        </div>

        {/* Transcript */}
        <div
          ref={listRef}
          aria-live="polite"
          className="h-[400px] space-y-3 overflow-y-auto bg-[#fafafa] px-4 py-5 sm:px-5"
        >
          {phase === 'ringing' && shown === 0 && (
            <p className="pt-32 text-center text-sm text-faint">Incoming call…</p>
          )}
          {lines.slice(0, shown).map((line, i) =>
            line.kind === 'tool' ? (
              <div key={i} className="flex animate-rise justify-center">
                <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-silver bg-white px-2.5 py-1 text-[11px] text-muted">
                  <CheckIcon className="h-3 w-3 shrink-0 text-ink" />
                  <span className="font-mono text-ink">{line.name}</span>
                  <span className="truncate">· {line.detail}</span>
                </span>
              </div>
            ) : (
              <div
                key={i}
                className={`flex animate-rise ${line.kind === 'caller' ? 'justify-end' : 'justify-start'}`}
              >
                <p
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                    line.kind === 'caller'
                      ? 'rounded-br-md bg-ink text-white'
                      : 'rounded-bl-md bg-white text-graphite shadow-card'
                  }`}
                >
                  {line.text}
                </p>
              </div>
            ),
          )}
          {typing && (
            <div className={`flex ${typing === 'caller' ? 'justify-end' : 'justify-start'}`}>
              <span
                className={`inline-flex gap-1 rounded-2xl px-3.5 py-3 ${
                  typing === 'caller' ? 'bg-ink/80' : 'bg-white shadow-card'
                }`}
                aria-hidden
              >
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    style={{ animationDelay: `${d}ms` }}
                    className={`h-1.5 w-1.5 animate-bounce rounded-full ${
                      typing === 'caller' ? 'bg-white/70' : 'bg-faint'
                    }`}
                  />
                ))}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-silver px-5 py-3">
          <p className="text-xs text-faint">Illustrative call · real booking flow</p>
          <button
            type="button"
            onClick={replay}
            disabled={phase !== 'ended'}
            className="cursor-pointer rounded-full border border-silver px-3 py-1 text-xs font-medium text-ink transition-colors hover:border-ink disabled:cursor-default disabled:opacity-40 disabled:hover:border-silver"
          >
            Replay call
          </button>
        </div>
      </div>

      {/* Where the call lands */}
      <div className="rounded-xl bg-white p-4 shadow-card sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-ink">Booking requests</p>
          <span className="text-xs text-muted">{bookingVisible ? '2 to review' : '1 to review'}</span>
        </div>
        <ul className="mt-3 space-y-2">
          {bookingVisible && (
            <li className="flex animate-rise items-center justify-between gap-3 rounded-lg bg-paper px-3 py-2.5 text-sm">
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">Sam Clarke · {service.name}</p>
                <p className="truncate text-xs text-muted">
                  {shortDate(day)} · {pick} · via phone
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
                Awaiting deposit
              </span>
            </li>
          )}
          <li className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm">
            <div className="min-w-0">
              <p className="truncate font-medium text-ink">Maya Okafor · Standard session</p>
              <p className="truncate text-xs text-muted">Booked online · earlier today</p>
            </div>
            <span className="shrink-0 rounded-full bg-paper px-2 py-0.5 text-[11px] font-medium text-graphite">
              Pending review
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
