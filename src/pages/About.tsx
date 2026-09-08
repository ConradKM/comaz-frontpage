import { Link } from 'react-router-dom'
import Container from '../components/Container'
import { ShieldIcon, SparkIcon, UserPortalIcon, UsersIcon } from '../components/icons'
import { APP_URL } from '../lib/constants'

const values = [
  {
    icon: SparkIcon,
    title: 'Simple by default',
    description:
      'Businesses run on tight margins and tighter schedules. Every screen in CoMaz OS is built to be understood in seconds, not taught in a training session.',
  },
  {
    icon: UsersIcon,
    title: 'Built around how you actually work',
    description:
      'We design around how bookings, checklists and reminders actually happen day to day — not around what looks good in a slide deck.',
  },
  {
    icon: ShieldIcon,
    title: 'Your data stays yours',
    description:
      'Every business on the platform is fully isolated from every other. Your customers, records and history are never shared or mixed with anyone else’s.',
  },
  {
    icon: UserPortalIcon,
    title: 'Fewer excuses to call it in',
    description:
      'The easier it is for a customer to book and stay reminded online, the less falls to your front desk to chase by phone.',
  },
]

export default function About() {
  return (
    <div>
      <section className="bg-slate-50 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              About CoMaz OS
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Built for the people who keep service businesses running smoothly
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Service businesses keep the country moving, usually with software that was never
              built for them. CoMaz OS exists to change that — one booking, one reminder and one
              happy returning customer at a time.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Why we built it</h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
                <p>
                  Too many independent businesses still run their diary on paper, their reminders
                  from memory, and their customer history in whoever’s head happened to take the
                  call. It works, right up until the day it doesn’t — a missed appointment, a
                  double-booking, a regular customer who quietly starts going somewhere else.
                </p>
                <p>
                  CoMaz OS is a single place for the whole job: customers book online without
                  needing an account, staff review and confirm the schedule, checklists capture
                  the work with photo evidence, and reminders go out on their own before every
                  appointment falls due. Nothing exotic — just the admin, handled, so your team
                  can get on with the work.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <p className="text-sm font-semibold text-slate-900">Who it’s for</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Independent service businesses replacing paper diaries and spreadsheets
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Busy teams that need one shared schedule everyone can trust
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Growing business groups who need every site kept cleanly separate
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What we believe
            </h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 px-8 py-14 text-center sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What’s next
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              We’re building towards phone and WhatsApp reminders, so customers can be reached
              however suits them best — on top of the booking, checklist and portal tools already
              in the platform today.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={APP_URL}
                className="w-full rounded-full bg-blue-600 px-7 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 sm:w-auto"
              >
                Open the app
              </a>
              <Link
                to="/pricing"
                className="w-full rounded-full border border-slate-300 px-7 py-3.5 text-center text-sm font-semibold text-slate-900 transition-colors hover:border-slate-400 sm:w-auto"
              >
                See pricing
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
