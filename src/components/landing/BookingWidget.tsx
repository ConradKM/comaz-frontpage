import { useMemo, useState } from 'react'
import {
  DEMO_BUSINESS,
  DEMO_SERVICES,
  WEEKDAYS,
  isOpen,
  longDate,
  sameDay,
  shortDate,
  slotsFor,
  startOfDay,
} from '../../lib/demo'
import { CheckIcon, ClockIcon } from '../icons'

const MONTHS_AHEAD = 2

// Near the end of a month most of the grid is in the past, so start on next month
// instead to show a calendar that actually looks bookable.
function firstOpenDay(today: Date) {
  const d = startOfDay(today)
  const lastOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  let openLeft = 0
  for (let day = today.getDate() + 1; day <= lastOfMonth; day++) {
    if (isOpen(new Date(today.getFullYear(), today.getMonth(), day), today)) openLeft++
  }
  if (openLeft < 6) d.setDate(lastOfMonth)
  do {
    d.setDate(d.getDate() + 1)
  } while (!isOpen(d, today))
  return d
}

export default function BookingWidget() {
  const today = useMemo(() => new Date(), [])
  const [serviceId, setServiceId] = useState(DEMO_SERVICES[0].id)
  const [selected, setSelected] = useState(() => firstOpenDay(today))
  const [month, setMonth] = useState(() => new Date(selected.getFullYear(), selected.getMonth(), 1))
  const [time, setTime] = useState<string | null>(null)
  const [booked, setBooked] = useState(false)

  const service = DEMO_SERVICES.find((s) => s.id === serviceId) ?? DEMO_SERVICES[0]
  const slots = slotsFor(selected, service)

  const minMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const maxMonth = new Date(today.getFullYear(), today.getMonth() + MONTHS_AHEAD, 1)
  const offset = (month.getDay() + 6) % 7
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells: (Date | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1),
    ),
  ]

  const shiftMonth = (delta: number) =>
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1))

  if (booked && time) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-12 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white">
          <CheckIcon />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">
          Booking request sent
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
          {DEMO_BUSINESS} will review it and confirm by email shortly. Nothing lands on their
          schedule until the team approves it.
        </p>
        <dl className="mt-6 w-full max-w-sm divide-y divide-silver rounded-xl bg-paper text-left text-sm">
          {[
            ['What', `${service.name} · ${service.minutes} min`],
            ['When', `${longDate(selected)}, ${time}`],
            ['Price', `£${service.price}${service.deposit ? ` · £${service.deposit} deposit` : ''}`],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-4 px-4 py-3">
              <dt className="w-14 shrink-0 text-muted">{k}</dt>
              <dd className="font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          onClick={() => {
            setBooked(false)
            setTime(null)
          }}
          className="mt-6 cursor-pointer text-sm font-medium text-ink underline-offset-4 hover:underline"
        >
          Book another
        </button>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-[230px_1fr_190px]">
      {/* Business + service */}
      <div className="border-b border-silver p-5 md:border-r md:border-b-0">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-display text-xs font-semibold text-white">
            HS
          </span>
          <p className="text-sm font-medium text-muted">{DEMO_BUSINESS}</p>
        </div>
        <p className="mt-4 font-display text-lg font-semibold tracking-tight text-ink">
          {service.name}
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <ClockIcon className="h-4 w-4" /> {service.minutes} min · £{service.price}
        </p>

        <fieldset className="mt-5">
          <legend className="text-xs font-medium text-faint">Choose a service</legend>
          <div className="mt-2 flex flex-wrap gap-1.5 md:flex-col md:items-start">
            {DEMO_SERVICES.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={s.id === serviceId}
                onClick={() => {
                  setServiceId(s.id)
                  setTime(null)
                }}
                className={`cursor-pointer rounded-full px-3 py-1 text-xs transition-colors ${
                  s.id === serviceId
                    ? 'bg-ink text-white'
                    : 'bg-paper text-graphite hover:bg-silver'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </fieldset>

        <p className="mt-5 hidden text-xs text-faint md:block">Europe/London</p>
      </div>

      {/* Calendar */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-ink">
            {month.toLocaleDateString('en-GB', { month: 'long' })}{' '}
            <span className="text-muted">{month.getFullYear()}</span>
          </p>
          <div className="flex gap-1">
            {[
              { d: -1, label: 'Previous month', path: 'M15 6l-6 6 6 6', disabled: month <= minMonth },
              { d: 1, label: 'Next month', path: 'M9 6l6 6-6 6', disabled: month >= maxMonth },
            ].map((b) => (
              <button
                key={b.d}
                type="button"
                aria-label={b.label}
                disabled={b.disabled}
                onClick={() => shiftMonth(b.d)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-graphite hover:bg-paper disabled:cursor-default disabled:text-silver disabled:hover:bg-transparent"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d={b.path} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((w) => (
            <span key={w} className="pb-1 text-[11px] font-medium tracking-wide text-faint uppercase">
              {w}
            </span>
          ))}
          {cells.map((d, i) => {
            if (!d) return <span key={`blank-${i}`} />
            const open = isOpen(d, today)
            const active = sameDay(d, selected)
            return (
              <button
                key={d.getDate()}
                type="button"
                disabled={!open}
                aria-pressed={active}
                aria-label={longDate(d)}
                onClick={() => {
                  setSelected(d)
                  setTime(null)
                }}
                className={`relative aspect-square rounded-lg text-sm transition-colors ${
                  active
                    ? 'cursor-pointer bg-ink font-medium text-white'
                    : open
                      ? 'cursor-pointer bg-paper font-medium text-ink hover:bg-silver'
                      : 'text-faint/70'
                }`}
              >
                {d.getDate()}
                {sameDay(d, today) && (
                  <span
                    className={`absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
                      active ? 'bg-white' : 'bg-ink'
                    }`}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Slots */}
      <div className="border-t border-silver p-5 md:border-t-0 md:border-l">
        <p className="text-sm font-medium text-ink">{shortDate(selected)}</p>
        <div className="mt-4 grid max-h-[300px] grid-cols-3 gap-2 overflow-y-auto pr-1 md:grid-cols-1">
          {slots.length === 0 && <p className="text-sm text-muted">Fully booked — try another day.</p>}
          {slots.map((t) =>
            t === time ? (
              <div key={t} className="col-span-3 grid grid-cols-2 gap-2 md:col-span-1">
                <span className="flex items-center justify-center rounded-lg bg-graphite py-2 text-sm font-medium text-white">
                  {t}
                </span>
                <button
                  type="button"
                  onClick={() => setBooked(true)}
                  className="cursor-pointer rounded-lg bg-ink py-2 text-sm font-medium text-white shadow-button hover:bg-graphite"
                >
                  Book
                </button>
              </div>
            ) : (
              <button
                key={t}
                type="button"
                onClick={() => setTime(t)}
                className="cursor-pointer rounded-lg border border-silver py-2 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                {t}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
