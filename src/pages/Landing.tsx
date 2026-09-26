import { Link } from 'react-router-dom'
import Container from '../components/Container'
import {
  BellIcon,
  CalendarIcon,
  CardIcon,
  ChatIcon,
  ChecklistIcon,
  HandoffIcon,
  MoonIcon,
  PhoneIcon,
  RepeatIcon,
  UserPortalIcon,
  UsersIcon,
} from '../components/icons'
import BookingWidget from '../components/landing/BookingWidget'
import CallDemo from '../components/landing/CallDemo'
import { APP_URL } from '../lib/constants'
import {
  btnGhost,
  btnGhostOnDark,
  btnOnDark,
  btnPrimary,
  card,
  eyebrow,
  h1,
  h2,
  h3,
  lead,
} from '../lib/styles'

const industries = [
  'Clinics',
  'Salons & barbers',
  'Physio & therapy',
  'Beauty',
  'Fitness studios',
  'Tutors',
  'Trades & repairs',
  'Consultants',
  'Pet care',
]

const phoneCapabilities = [
  {
    icon: MoonIcon,
    title: 'Answers every call, 24/7',
    description: 'Evenings, weekends, or when the whole team is busy — no more voicemail.',
  },
  {
    icon: CalendarIcon,
    title: 'Books from your live calendar',
    description:
      'It checks your real services, prices and open slots before offering anything. It never guesses.',
  },
  {
    icon: RepeatIcon,
    title: 'Cancels and reschedules',
    description: 'Finds the caller’s existing appointment and reads it back before changing it.',
  },
  {
    icon: CardIcon,
    title: 'Takes deposits',
    description: 'Texts a secure payment link when a service needs a deposit to secure it.',
  },
  {
    icon: ChatIcon,
    title: 'Answers your FAQs',
    description: 'Parking, policies, what to bring — in your words. If it doesn’t know, it says so.',
  },
  {
    icon: HandoffIcon,
    title: 'Hands over to your team',
    description: 'When a caller needs a person, it passes them through instead of improvising.',
  },
]

const features = [
  {
    icon: CalendarIcon,
    title: 'Online booking, 24/7',
    description:
      'Customers book from your website with no app and no account. Requests land in one queue for your team to approve.',
  },
  {
    icon: PhoneIcon,
    title: 'An AI phone assistant',
    description:
      'Answers your phone around the clock, books into the same calendar, and works with your existing number or phone menu.',
  },
  {
    icon: BellIcon,
    title: 'Repeat business, automatically',
    description:
      'Each customer’s next appointment is tracked, so reminders go out on their own — before they drift to a competitor.',
  },
  {
    icon: UserPortalIcon,
    title: 'A customer portal',
    description:
      'Customers sign in with their email and an account reference to see history and upcoming appointments. No password to forget.',
  },
  {
    icon: ChecklistIcon,
    title: 'Checklists with evidence',
    description:
      'Back every job with time-stamped photos and video — a clear record if a job’s ever questioned.',
  },
  {
    icon: UsersIcon,
    title: 'Built for your whole team',
    description:
      'Owner and staff roles keep the right people on the right things, with one schedule everyone trusts.',
  },
]

const steps = [
  {
    title: 'Customers book online or by phone',
    description:
      'They pick a service and a time from your live availability — on your booking page, or by calling the AI assistant.',
  },
  {
    title: 'Your team reviews and confirms',
    description:
      'Every request waits in one queue until staff approve it, so nothing hits the schedule by accident.',
  },
  {
    title: 'Reminders bring them back',
    description:
      'As each customer’s next appointment comes due, CoMaz OS reminds them automatically and points them back to you.',
  },
]

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <a href="#phone" className={`${eyebrow} transition-shadow hover:shadow-card-hover`}>
              <span className="rounded-full bg-accent-soft px-1.5 py-px text-[11px] font-semibold text-accent">
                New
              </span>
              An AI assistant that answers your phone
              <span aria-hidden className="text-faint">
                →
              </span>
            </a>
            <h1 className={`mt-6 ${h1}`}>The front desk that never closes</h1>
            <p className={`mx-auto mt-6 max-w-2xl ${lead}`}>
              CoMaz OS gives your customers a live booking page, an AI assistant that picks up
              every call, and reminders that bring them back — all feeding one schedule your team
              controls.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={APP_URL} className={`${btnPrimary} w-full sm:w-auto`}>
                Open the app
              </a>
              <Link to="/pricing" className={`${btnGhost} w-full sm:w-auto`}>
                See pricing
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-4xl">
            <div className={`${card} overflow-hidden`}>
              <BookingWidget />
            </div>
            <p className="mt-4 text-center text-xs text-faint">
              Try it — this is what your customers see. (Demo business, no real booking made.)
            </p>
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="pb-20 sm:pb-24">
        <Container>
          <p className="text-center text-sm text-muted">
            Built for any business that runs on appointments
          </p>
          <ul className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-2">
            {industries.map((name) => (
              <li
                key={name}
                className="rounded-full bg-white px-3.5 py-1.5 text-sm text-graphite shadow-card"
              >
                {name}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* AI phone assistant */}
      <section id="phone" className="scroll-mt-20 border-y border-silver bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,500px)] lg:items-start lg:gap-16">
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1 text-xs font-medium text-graphite">
                <PhoneIcon className="h-3.5 w-3.5" /> AI phone assistant
              </span>
              <h2 className={`mt-5 ${h2}`}>Never miss a booking because nobody picked up</h2>
              <p className={`mt-5 ${lead}`}>
                A missed call is usually a missed customer. The CoMaz assistant answers in a warm,
                natural voice, books straight into your calendar, and sends every booking to your
                team to review — just like one made online.
              </p>

              <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {phoneCapabilities.map((c) => {
                  const Icon = c.icon
                  return (
                    <li key={c.title} className="flex gap-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper text-ink">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-ink">{c.title}</p>
                        <p className="mt-1 text-sm leading-6 text-muted">{c.description}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <p className="mt-10 text-sm text-muted">
                Keep your existing number, or add it as an option in your phone menu.
              </p>
            </div>

            <CallDemo />
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className={h2}>Everything you need, nothing you don’t</h2>
            <p className={`mt-4 ${lead}`}>
              CoMaz OS replaces the diary, the spreadsheet and the sticky notes with one place
              your whole team can trust.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className={`${card} p-6 transition-shadow hover:shadow-card-hover`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-paper text-ink">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className={`mt-5 ${h3}`}>{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="pb-20 sm:pb-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className={h2}>How it works</h2>
            <p className={`mt-4 ${lead}`}>
              From first booking to the next reminder, three steps keep your calendar full.
            </p>
          </div>

          <ol className="mt-14 grid gap-5 lg:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className={`${card} p-7`}>
                <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-ink px-2 text-xs font-medium text-white">
                  {i + 1}
                </span>
                <h3 className={`mt-5 ${h3}`}>{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-20 sm:pb-24">
        <Container>
          <div className="rounded-xl bg-ink px-6 py-14 text-center sm:px-16 sm:py-16">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to see it in action?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/65">
              Open the app to explore CoMaz OS, or take a look at pricing to find the right plan
              for your business.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={APP_URL} className={`${btnOnDark} w-full sm:w-auto`}>
                Open the app
              </a>
              <Link to="/pricing" className={`${btnGhostOnDark} w-full sm:w-auto`}>
                See pricing
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
