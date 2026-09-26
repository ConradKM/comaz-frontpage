import { Link } from 'react-router-dom'
import Container from '../components/Container'
import { ShieldIcon, SparkIcon, UserPortalIcon, UsersIcon } from '../components/icons'
import { APP_URL } from '../lib/constants'
import { btnGhostOnDark, btnOnDark, card, eyebrow, h1, h2, h3, lead } from '../lib/styles'

const values = [
  {
    icon: SparkIcon,
    title: 'Simple by default',
    description:
      'Small businesses run on tight margins and tighter schedules. Every screen in CoMaz OS is built to be understood in seconds, not taught in a training session.',
  },
  {
    icon: UsersIcon,
    title: 'Built around how you actually work',
    description:
      'We design around how bookings, calls, checklists and reminders really happen day to day — not around what looks good in a slide deck.',
  },
  {
    icon: ShieldIcon,
    title: 'Your data stays yours',
    description:
      'Every business on the platform is fully isolated from every other. Your customers, records and history are never shared or mixed with anyone else’s.',
  },
  {
    icon: UserPortalIcon,
    title: 'Honest automation',
    description:
      'Our AI assistant only answers from your real data. When it doesn’t know, it says so and hands the caller to your team — it never makes things up.',
  },
]

const audience = [
  'Independent businesses replacing paper diaries and spreadsheets',
  'Busy front desks that can’t get to every phone call',
  'Teams that need one shared schedule everyone can trust',
  'Growing groups that need every location kept cleanly separate',
]

export default function About() {
  return (
    <div>
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className={eyebrow}>About CoMaz OS</span>
            <h1 className={`mt-6 ${h1}`}>Built for the businesses that run on appointments</h1>
            <p className={`mx-auto mt-6 max-w-2xl ${lead}`}>
              Clinics, salons, studios, trades and consultants keep their communities running,
              usually with software that was never built for them. CoMaz OS exists to change
              that — one booking, one call and one returning customer at a time.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-16">
            <div>
              <h2 className={h2}>Why we built it</h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-muted">
                <p>
                  Too many independent businesses still run their diary on paper, their reminders
                  from memory, and their customer history in whoever’s head happened to take the
                  call. It works, right up until the day it doesn’t — a missed call, a
                  double-booking, a regular who quietly starts going somewhere else.
                </p>
                <p>
                  CoMaz OS is one place for the whole job. Customers book online without needing
                  an account, or call and speak to an AI assistant that books them in from your
                  live calendar. Staff review and confirm the schedule, checklists capture the work
                  with photo evidence, and reminders go out on their own. Nothing exotic — just
                  the admin, handled, so your team can get on with the work.
                </p>
              </div>
            </div>
            <div className={`${card} p-7`}>
              <p className="text-sm font-medium text-ink">Who it’s for</p>
              <ul className="mt-5 space-y-3.5 text-sm leading-6 text-muted">
                {audience.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-silver bg-white py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className={h2}>What we believe</h2>
          </div>
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="rounded-xl bg-paper p-7">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-ink shadow-card">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className={`mt-5 ${h3}`}>{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{value.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="rounded-xl bg-ink px-6 py-14 text-center sm:px-16 sm:py-16">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Now answering the phone
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/65">
              The CoMaz AI assistant picks up every call, books from your live calendar and hands
              over to your team when a person is needed — on top of the booking, checklist and
              portal tools already in the platform.
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
