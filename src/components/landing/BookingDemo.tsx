import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from 'react'
import {
  DEMO_BUSINESS,
  DEMO_SERVICES,
  WEEKDAYS,
  dayLevel,
  formatMinutes,
  longDate,
  nextWeekday,
  sameDay,
  slotsFor,
  startOfDay,
  type DayLevel,
  type DemoService,
} from '../../lib/demo'
import { CheckIcon } from '../icons'

/**
 * A self-playing walkthrough of the customer booking page. The steps, labels and copy
 * mirror the real wizard (MOT-frontend src/pages/customer/BookingWizard.tsx): Service →
 * Date & time → Your details → Review → "Request received". Nothing here talks to the API.
 */

type StepKey = 'service' | 'time' | 'details' | 'review' | 'done'
type FieldKey = 'first' | 'last' | 'email' | 'phone'

type DemoState = {
  step: StepKey
  serviceId: string | null
  date: Date | null
  time: string | null
  fields: Record<FieldKey, string>
  focus: FieldKey | null
  /** data-demo key of the button currently shown pressed. */
  pressed: string | null
}

type Beat = {
  /** How long to hold before the next beat. */
  wait: number
  /** data-demo key the pointer travels to. */
  move?: string
  /** Show a click ripple on the pointer during this beat. */
  click?: boolean
  /** Patches the screen state; the screen at beat N is every `apply` up to N folded together. */
  apply?: (s: DemoState) => DemoState
}

const STEPS = [
  { key: 'service', label: 'Service' },
  { key: 'time', label: 'Date & time' },
  { key: 'details', label: 'Your details' },
  { key: 'review', label: 'Review' },
] as const

const PERSON = {
  first: 'Priya',
  last: 'Nair',
  email: 'priya.nair@example.com',
  phone: '07700 900317',
} satisfies Record<FieldKey, string>

// Same shape as the real thing: "BK" + 7 characters from an alphabet with no 0/O/1/I/L.
const REFERENCE = 'BK4T9XQ2M'

const EMPTY: DemoState = {
  step: 'service',
  serviceId: null,
  date: null,
  time: null,
  fields: { first: '', last: '', email: '', phone: '' },
  focus: null,
  pressed: null,
}

const ymd = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

function addMinutes(time: string, minutes: number) {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + minutes
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

/**
 * The first mid-week day with plenty of room, so the demo always books something real-looking.
 * Near the end of a month the calendar would be mostly greyed-out past days, so book into the
 * next month instead.
 */
function pickDate(today: Date, service: DemoService) {
  const daysLeft =
    new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - today.getDate()
  const from = daysLeft < 10 ? daysLeft + 3 : 2
  for (let i = from; i < from + 30; i++) {
    const d = startOfDay(today)
    d.setDate(d.getDate() + i)
    const dow = d.getDay()
    if (
      dow >= 2 &&
      dow <= 5 &&
      dayLevel(d, today, service) === 'open' &&
      slotsFor(d, service).length >= 6
    ) {
      return d
    }
  }
  return nextWeekday(today, 4)
}

const set = (patch: Partial<DemoState>) => (s: DemoState) => ({ ...s, ...patch })

/** Press a button: show it pressed for a beat, then move on. */
function press(key: string, next: Partial<DemoState>): Beat[] {
  return [
    { wait: 220, click: true, apply: set({ pressed: key }) },
    { wait: 550, apply: set({ ...next, pressed: null }) },
  ]
}

function typeInto(field: FieldKey, text: string): Beat[] {
  return Array.from(text, (_, i) => ({
    wait: 55 + ((i * 37) % 45),
    apply: (s: DemoState) => ({ ...s, fields: { ...s.fields, [field]: text.slice(0, i + 1) } }),
  }))
}

function fillField(field: FieldKey, text: string): Beat[] {
  return [
    { wait: 700, move: `field-${field}` },
    { wait: 260, click: true, apply: set({ focus: field }) },
    ...typeInto(field, text),
    { wait: 350 },
  ]
}

function buildScript(today: Date) {
  const service = DEMO_SERVICES[1]
  const date = pickDate(today, service)
  const slots = slotsFor(date, service).slice(0, 6)
  const time = slots[Math.min(3, slots.length - 1)]

  const beats: Beat[] = [
    { wait: 1000 },
    { wait: 850, move: `service-${service.id}` },
    { wait: 550, click: true, apply: set({ serviceId: service.id }) },
    { wait: 800, move: 'continue' },
    ...press('continue', { step: 'time' }),
    { wait: 900, move: `day-${ymd(date)}` },
    { wait: 650, click: true, apply: set({ date }) },
    { wait: 800, move: `slot-${time}` },
    { wait: 500, click: true, apply: set({ time }) },
    { wait: 800, move: 'continue' },
    ...press('continue', { step: 'details' }),
    ...fillField('first', PERSON.first),
    ...fillField('last', PERSON.last),
    ...fillField('email', PERSON.email),
    ...fillField('phone', PERSON.phone),
    { wait: 700, move: 'continue', apply: set({ focus: null }) },
    ...press('continue', { step: 'review' }),
    { wait: 2400 },
    { wait: 800, move: 'confirm' },
    ...press('confirm', { step: 'done' }),
  ]

  return { service, date, slots, beats }
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const panelTitle = 'font-display text-lg font-semibold tracking-tight text-ink'

const levelStyle: Record<DayLevel, { cell: string; label: string; legend: string; dot: string }> = {
  open: {
    cell: 'border-silver bg-white text-ink',
    label: 'Open',
    legend: 'Good availability',
    dot: 'bg-ink',
  },
  limited: {
    cell: 'border-silver bg-paper text-graphite',
    label: 'Few left',
    legend: 'Few left',
    dot: 'bg-faint',
  },
  full: {
    cell: 'border-transparent bg-paper text-faint line-through',
    label: 'Full',
    legend: 'Full',
    dot: 'bg-silver',
  },
  closed: { cell: 'border-transparent text-faint/50', label: '', legend: '', dot: '' },
}

type View = {
  state: DemoState
  today: Date
  service: DemoService
  targetDate: Date
  slots: string[]
  /** A hidden copy used only to size the frame; it carries no pointer targets. */
  ghost?: boolean
}

/** How long the confirmation stays up before the demo starts over. */
const HOLD_MS = 5000

export default function BookingDemo() {
  const today = useMemo(() => new Date(), [])
  const script = useMemo(() => buildScript(today), [today])
  const { service, date: targetDate, slots, beats } = script

  const [reduced] = useState(prefersReducedMotion)
  const [beat, setBeat] = useState(reduced ? beats.length : 0)
  // Set once the demo has reached the middle of the screen; `inView` tracks it after that.
  const [started, setStarted] = useState(false)
  const [inView, setInView] = useState(false)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  // What's on screen is a pure function of how far through the script we are, so there's
  // no state to keep in sync (and reduced-motion users simply start at the last beat).
  const state = useMemo(
    () => beats.slice(0, beat + 1).reduce((s, b) => (b.apply ? b.apply(s) : s), EMPTY),
    [beats, beat],
  )
  const cursorKey = useMemo(
    () => beats.slice(0, beat + 1).reduce<string | null>((key, b) => b.move ?? key, null),
    [beats, beat],
  )
  const playing = started && !reduced && beat < beats.length
  const current = beats[beat]

  // Start once the demo reaches the middle of the screen, so a visitor who scrolls down to it
  // sees it from the first step rather than arriving partway through.
  useEffect(() => {
    if (reduced || started || !rootRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-35% 0px -35% 0px' },
    )
    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [reduced, started])

  // Pause while it's scrolled out of view, so a demo nobody can see isn't ticking away.
  useEffect(() => {
    if (reduced || !rootRef.current) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [reduced])

  // Hold each beat for its `wait`, then move to the next. After the last one, linger on the
  // confirmation and start over, so the demo loops for as long as it's on screen.
  useEffect(() => {
    if (reduced || !started || !inView) return
    const atEnd = beat >= beats.length
    const t = setTimeout(
      () => {
        if (atEnd) {
          setPos(null)
          setBeat(0)
        } else {
          setBeat(beat + 1)
        }
      },
      atEnd ? HOLD_MS : beats[beat].wait,
    )
    return () => clearTimeout(t)
  }, [reduced, started, inView, beat, beats])

  // Glide the pointer to whatever it's aimed at, re-measuring after each render and resize.
  const place = useCallback(() => {
    const stage = stageRef.current
    if (!stage || !cursorKey) return
    const el = stage.querySelector<HTMLElement>(`[data-demo="${cursorKey}"]`)
    if (!el) return
    const s = stage.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    setPos({ x: r.left - s.left + Math.min(r.width / 2, 110), y: r.top - s.top + r.height / 2 })
  }, [cursorKey])

  useLayoutEffect(() => {
    place()
  }, [place, beat, state.step])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const observer = new ResizeObserver(place)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [place])

  // Park the pointer top-right before its first move.
  useLayoutEffect(() => {
    const stage = stageRef.current
    if (playing && !pos && stage) setPos({ x: stage.clientWidth * 0.82, y: 150 })
  }, [playing, pos])

  const view: View = { state, today, service, targetDate, slots }
  // One hidden copy of every step, each fully filled in, to size the frame by the tallest.
  const filled = beats.reduce((s, b) => (b.apply ? b.apply(s) : s), EMPTY)
  const ghostViews: View[] = STEPS.map(({ key }) => ({
    ...view,
    state: { ...filled, step: key, focus: null, pressed: null },
    ghost: true,
  }))

  return (
    <div ref={rootRef} className="grid grid-cols-1 @container">
      <p className="sr-only">
        An animated demo of a customer booking an appointment: they choose a service, pick a date
        and time, enter their details, review, and send a booking request.
      </p>

      {/* The window you see is only as tall as the step it's showing. In the two-column hero
          (xl and up) it sits in room reserved for the tallest step, by the hidden copy below, so
          the text beside it never moves; everywhere else the page just flows around it. */}
      <div className="col-start-1 row-start-1 min-w-0 self-start xl:self-center">
        <div inert aria-hidden>
          <Frame stageRef={stageRef} hug>
            {state.step === 'done' ? (
              <div className="mx-auto w-full max-w-lg min-w-0 animate-rise pt-4">
                <Confirmation state={state} />
              </div>
            ) : (
              <div className="mx-auto w-full max-w-xl min-w-0">
                <Wizard view={view} />
              </div>
            )}

            {/* Pointer */}
            {pos && (
              <div
                className={`pointer-events-none absolute top-0 left-0 z-20 transition-[transform,opacity] duration-[650ms] ease-out ${
                  playing ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
              >
                <span className="relative -mt-[3px] -ml-[4px] block">
                  {current?.click && (
                    <span
                      key={beat}
                      className="absolute -top-2.5 -left-2.5 h-7 w-7 animate-ping rounded-full bg-ink/25"
                    />
                  )}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    className="relative drop-shadow-md"
                  >
                    <path
                      d="M5 3l14 7.5-6 1.8-2.4 6.2L5 3z"
                      fill="#101010"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            )}
          </Frame>
        </div>
        <Caption />
      </div>

      <div
        inert
        aria-hidden
        className="pointer-events-none invisible col-start-1 row-start-1 min-w-0 select-none max-xl:hidden"
      >
        <Frame>
          {ghostViews.map((g) => (
            <div
              key={g.state.step}
              className="col-start-1 row-start-1 mx-auto w-full max-w-xl min-w-0"
            >
              <Wizard view={g} />
            </div>
          ))}
          <div className="col-start-1 row-start-1 mx-auto w-full max-w-lg min-w-0 pt-4">
            <Confirmation state={filled} />
          </div>
        </Frame>
        <Caption />
      </div>
    </div>
  )
}

/**
 * The browser-style window around the booking page: the customer header bar, then the page.
 * With `hug`, the page area animates to the height of whatever it's currently showing.
 */
function Frame({
  stageRef,
  hug,
  children,
}: {
  stageRef?: Ref<HTMLDivElement>
  hug?: boolean
  children: ReactNode
}) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>()

  useEffect(() => {
    const el = innerRef.current
    if (!hug || !el) return
    const observer = new ResizeObserver(() => setHeight(el.offsetHeight))
    observer.observe(el)
    return () => observer.disconnect()
  }, [hug])

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card">
      {/* Customer page header, as in the app */}
      <div className="flex items-center justify-between border-b border-silver px-4 py-3 @xl:px-6">
        <span className="text-sm font-semibold text-ink">CoMaz OS</span>
        <span className="rounded-md bg-ink px-3 py-1.5 text-xs font-medium text-white">
          Sign In
        </span>
      </div>
      <div
        ref={stageRef}
        className={`relative bg-[#fafafa] ${
          hug ? 'overflow-hidden transition-[height] duration-300 ease-out' : ''
        }`}
        style={hug && height !== undefined ? { height } : undefined}
      >
        <div ref={innerRef} className="grid grid-cols-1 px-3 py-6 @lg:px-6 @xl:py-7 @2xl:px-8">
          {children}
        </div>
      </div>
    </div>
  )
}

function Caption() {
  return (
    <p className="mt-4 px-1 text-xs text-faint">
      What your customers see — a made-up business, no real booking made.
    </p>
  )
}

function Wizard({ view }: { view: View }) {
  const { state, ghost } = view
  // Pointer targets only exist on the live copy.
  const dk = (key: string) => (ghost ? undefined : key)
  const stepIndex = Math.max(
    STEPS.findIndex((s) => s.key === state.step),
    0,
  )

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-display text-xs font-semibold text-white">
          HS
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted">Book an appointment</p>
          <p className="truncate font-display text-lg font-semibold tracking-tight text-ink">
            {DEMO_BUSINESS}
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div>
        <p className="text-sm font-medium text-muted">
          Step {stepIndex + 1} of {STEPS.length}: {STEPS[stepIndex].label}
        </p>
        <ol className="mt-3 flex items-center">
          {STEPS.map((s, i) => {
            const st = i < stepIndex ? 'done' : i === stepIndex ? 'current' : 'upcoming'
            return (
              <li key={s.key} className="flex flex-1 items-center last:flex-none">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-300 ${
                      st === 'done'
                        ? 'bg-ink text-white'
                        : st === 'current'
                          ? 'bg-white text-ink ring-2 ring-ink'
                          : 'bg-silver text-faint'
                    }`}
                  >
                    {st === 'done' ? <CheckIcon className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  <span
                    className={`hidden text-xs font-medium @lg:block ${
                      st === 'upcoming' ? 'text-faint' : 'text-graphite'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && <span className="mx-3 h-px flex-1 bg-silver" />}
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-6 rounded-lg bg-white p-4 shadow-card @xl:p-6">
        {/* Keyed on the step so the fade replays on each transition. */}
        <div key={state.step} className={ghost ? undefined : 'animate-rise'}>
          {state.step === 'service' && <ServicePanel view={view} dk={dk} />}
          {state.step === 'time' && <TimePanel view={view} dk={dk} />}
          {state.step === 'details' && <DetailsPanel view={view} dk={dk} />}
          {state.step === 'review' && <ReviewPanel view={view} />}
        </div>

        {/* Back / Continue */}
        <div className="mt-6 flex items-center justify-between border-t border-paper pt-5">
          {state.step !== 'service' ? (
            <span className="rounded-md border border-silver px-4 py-2 text-sm font-medium text-graphite">
              Back
            </span>
          ) : (
            <span />
          )}
          {state.step === 'review' ? (
            <span
              data-demo={dk('confirm')}
              className={`rounded-md bg-ink px-4 py-2 text-sm font-medium text-white transition-transform duration-150 ${
                state.pressed === 'confirm' ? 'scale-95 bg-graphite' : ''
              }`}
            >
              Confirm Booking
            </span>
          ) : (
            <span
              data-demo={dk('continue')}
              className={`rounded-md bg-ink px-4 py-2 text-sm font-medium text-white transition-all duration-150 ${
                state.pressed === 'continue' ? 'scale-95 bg-graphite' : ''
              } ${state.step === 'time' && !state.time ? 'opacity-40' : ''}`}
            >
              Continue
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

type PanelProps = { view: View; dk: (key: string) => string | undefined }

function ServicePanel({ view: { state, service }, dk }: PanelProps) {
  const selectedService = DEMO_SERVICES.find((s) => s.id === state.serviceId) ?? null
  return (
    <div>
      <h2 className={panelTitle}>Choose a service</h2>
      <ul className="mt-4 space-y-2">
        {DEMO_SERVICES.map((s) => {
          const selected = s.id === state.serviceId
          return (
            <li key={s.id}>
              <div
                data-demo={dk(`service-${s.id}`)}
                className={`rounded-md border px-3 py-2 text-left transition-colors duration-200 ${
                  selected ? 'border-ink bg-ink text-white' : 'border-silver bg-white'
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="min-w-0 font-medium">{s.name}</span>
                  <span className={`shrink-0 text-sm ${selected ? 'text-white/75' : 'text-muted'}`}>
                    £{s.price} · {s.minutes} min
                  </span>
                </span>
                <span
                  className={`mt-0.5 block text-xs ${selected ? 'text-white/65' : 'text-muted'}`}
                >
                  {s.description}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
      <p
        className={`mt-4 text-sm text-muted transition-opacity duration-300 ${
          selectedService ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span aria-hidden>✓</span> Included in {selectedService?.name ?? service.name}: a one-to-one
        session and a written summary.
      </p>
    </div>
  )
}

function TimePanel({ view: { state, today, service, targetDate, slots }, dk }: PanelProps) {
  // Calendar for the month being booked.
  const month = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1)
  const offset = (month.getDay() + 6) % 7
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells: (Date | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1),
    ),
  ]

  return (
    <div>
      <h2 className={panelTitle}>Pick a date &amp; time</h2>
      <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-muted">
        <span>
          Booking <span className="font-medium text-ink">{service.name}</span> ·{' '}
          {formatMinutes(service.minutes)}
        </span>
        <span className="text-xs font-medium underline">Change</span>
      </p>

      <div className="mt-4 @lg:grid @lg:grid-cols-[minmax(0,1fr)_170px] @lg:items-start @lg:gap-3 @2xl:grid-cols-[minmax(0,1fr)_190px]">
        <div className="rounded-lg border border-silver p-3 @xl:p-4">
          <div className="flex items-center justify-between">
            <span className="flex h-7 w-8 items-center justify-center rounded-md border border-silver text-sm text-faint">
              ‹
            </span>
            <p className="text-sm font-semibold text-ink">
              {month.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </p>
            <span className="flex h-7 w-8 items-center justify-center rounded-md border border-silver text-sm text-graphite">
              ›
            </span>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-medium text-faint">
            {WEEKDAYS.map((w) => (
              <div key={w} className="py-1">
                {w}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <div key={`blank-${i}`} />
              const level = dayLevel(d, today, service)
              const style = levelStyle[level]
              const selected = state.date !== null && sameDay(d, state.date)
              return (
                <div
                  key={d.getDate()}
                  data-demo={dk(`day-${ymd(d)}`)}
                  className={`flex h-9 flex-col items-center justify-center rounded-md border text-sm transition-colors duration-200 @xl:h-10 ${
                    selected ? 'border-ink bg-ink text-white' : style.cell
                  }`}
                >
                  <span className="text-[13px] leading-none font-semibold">{d.getDate()}</span>
                  {level !== 'closed' && (
                    <>
                      <span
                        className={`mt-1 hidden text-[9px] leading-none @2xl:block ${
                          selected ? 'text-white/70' : ''
                        }`}
                      >
                        {style.label}
                      </span>
                      <span
                        className={`mt-1 h-1 w-1 rounded-full @2xl:hidden ${
                          selected ? 'bg-white' : style.dot
                        }`}
                      />
                    </>
                  )}
                </div>
              )
            })}
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            {(['open', 'limited', 'full'] as const).map((l) => (
              <li key={l} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${levelStyle[l].dot}`} />
                {levelStyle[l].legend}
              </li>
            ))}
          </ul>
        </div>

        {/* Beside the calendar its column is always held open, so the calendar doesn't resize when
            a day is picked; stacked below it, it only takes room once there's something to show. */}
        <div
          className={`mt-3 rounded-lg border border-silver p-3 @xl:p-4 @lg:mt-0 ${
            state.date ? 'animate-rise' : 'hidden @lg:block @lg:invisible'
          }`}
        >
          <h3 className="text-sm font-semibold text-ink">Times for {longDate(targetDate)}</h3>
          <ul className="mt-3 grid grid-cols-3 gap-2 @lg:grid-cols-2">
            {slots.map((t) => {
              const selected = t === state.time
              return (
                <li key={t}>
                  <div
                    data-demo={dk(`slot-${t}`)}
                    className={`flex min-h-11 flex-col items-center justify-center rounded-md border px-2 py-1.5 text-sm transition-colors duration-200 ${
                      selected ? 'border-ink bg-ink text-white' : 'border-silver'
                    }`}
                  >
                    <span className="font-semibold">{t}</span>
                    <span
                      className={`text-[11px] leading-none ${selected ? 'text-white/70' : 'text-muted'}`}
                    >
                      Available
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function DetailsPanel({ view: { state }, dk }: PanelProps) {
  const when = state.date && state.time ? `${longDate(state.date)} at ${state.time}` : ''
  return (
    <div>
      {when && <SlotBanner when={when} />}
      <h2 className={panelTitle}>Your details</h2>
      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-3 @xl:gap-4">
          <FieldBox
            label="First name"
            demo={dk('field-first')}
            value={state.fields.first}
            focused={state.focus === 'first'}
          />
          <FieldBox
            label="Last name"
            demo={dk('field-last')}
            value={state.fields.last}
            focused={state.focus === 'last'}
          />
        </div>
        <FieldBox
          label="Email"
          demo={dk('field-email')}
          value={state.fields.email}
          focused={state.focus === 'email'}
        />
        <FieldBox
          label="Mobile number"
          demo={dk('field-phone')}
          value={state.fields.phone}
          placeholder="07123 456789"
          focused={state.focus === 'phone'}
        />
        <p className="-mt-2 text-xs text-faint">
          We’ll text you about this booking - no need to add +44, just enter it as you normally
          would.
        </p>
      </div>
    </div>
  )
}

function ReviewPanel({ view: { state, service } }: Pick<PanelProps, 'view'>) {
  const finish = state.time ? addMinutes(state.time, service.minutes) : ''
  const fullName = `${state.fields.first} ${state.fields.last}`.trim()
  return (
    <div>
      <h2 className={panelTitle}>Review</h2>
      <p className="mt-1 text-sm text-muted">Please check everything below before you submit.</p>
      <div className="mt-4 space-y-3">
        <SummarySection title="Appointment">
          <SummaryRow label="Business" value={DEMO_BUSINESS} />
          <SummaryRow label="Service" value={service.name} />
          <SummaryRow label="Price" value={`£${service.price}`} />
          <SummaryRow label="Date" value={state.date ? longDate(state.date) : '—'} />
          <SummaryRow label="Time" value={state.time ? `${state.time}–${finish}` : '—'} />
        </SummarySection>
        <SummarySection title="Your details">
          <SummaryRow label="Name" value={fullName} />
          <SummaryRow label="Email" value={state.fields.email} />
          <SummaryRow label="Mobile number" value={state.fields.phone} />
        </SummarySection>
      </div>
      <p className="mt-4 text-sm text-muted">
        Submitting sends a request to {DEMO_BUSINESS}. They’ll review it and be in touch at{' '}
        {state.fields.email || 'the email you gave'} to confirm.
      </p>
    </div>
  )
}

/** The "Request received" screen, shown instead of the wizard once submitted. */
function Confirmation({ state }: { state: DemoState }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white">
        <CheckIcon className="h-6 w-6" />
      </div>
      <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
        Request received
      </h2>
      <p className="mt-2 text-muted">
        Thanks, {state.fields.first || PERSON.first}. We’ve sent your request for{' '}
        {state.date ? longDate(state.date) : ''} at {state.time}. The business will review it and be
        in touch at {state.fields.email || PERSON.email} to confirm.
      </p>
      <div className="mt-4 w-full rounded-md border border-silver bg-white px-4 py-3">
        <p className="text-xs font-medium tracking-wide text-faint uppercase">Booking reference</p>
        <p className="mt-0.5 font-mono text-lg font-semibold text-ink">{REFERENCE}</p>
        <p className="mt-1 text-xs text-muted">
          Keep this to sign in and check your booking later.
        </p>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <span className="rounded-md border border-silver bg-white px-4 py-2 text-sm font-medium text-graphite">
          Book another appointment
        </span>
        <span className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-white">
          View my account
        </span>
      </div>
    </div>
  )
}

function SlotBanner({ when }: { when: string }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4 rounded-lg border border-silver bg-paper px-4 py-3">
      <div className="min-w-0 text-sm">
        <p className="font-medium text-ink">Your selected time</p>
        <p className="text-muted">{when}</p>
      </div>
      <span className="shrink-0 rounded-md border border-silver bg-white px-3 py-1.5 text-sm font-medium text-graphite">
        Change
      </span>
    </div>
  )
}

function FieldBox({
  label,
  value,
  placeholder,
  focused,
  demo,
}: {
  label: string
  value: string
  placeholder?: string
  focused: boolean
  demo: string | undefined
}) {
  return (
    <div className="min-w-0">
      <p className="text-sm font-medium text-graphite">
        {label} <span className="text-muted">*</span>
      </p>
      <div
        data-demo={demo}
        className={`mt-1 flex h-10 items-center overflow-hidden rounded-md border bg-white px-3 text-sm transition-colors duration-150 ${
          focused ? 'border-ink ring-1 ring-ink' : 'border-silver'
        }`}
      >
        {value ? (
          <span className="truncate text-ink">{value}</span>
        ) : (
          <span className="truncate text-faint">{placeholder ?? ''}</span>
        )}
        {focused && <span className="ml-px h-4 w-px shrink-0 animate-pulse bg-ink" />}
      </div>
    </div>
  )
}

function SummarySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-md border border-silver p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <span className="text-xs font-medium text-muted">Edit</span>
      </div>
      <dl className="mt-2 space-y-1">{children}</dl>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd className="min-w-0 truncate text-right text-graphite">{value}</dd>
    </div>
  )
}
