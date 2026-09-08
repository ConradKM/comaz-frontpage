import { Link } from 'react-router-dom'
import Container from '../components/Container'
import {
  BellIcon,
  CalendarIcon,
  ChecklistIcon,
  PhoneIcon,
  UserPortalIcon,
  UsersIcon,
} from '../components/icons'
import { APP_URL } from '../lib/constants'

const features = [
  {
    icon: CalendarIcon,
    title: 'Online booking, 24/7',
    description:
      'Customers book straight from your website — no app, no account, no phone tag. Requests land in one queue for your team to approve.',
  },
  {
    icon: BellIcon,
    title: 'Repeat business, automatically',
    description:
      'Every customer’s next appointment is tracked automatically, so reminders go out on their own — filling your calendar with returning customers your team never had to chase, before they drift to a competitor.',
  },
  {
    icon: UserPortalIcon,
    title: 'A portal your customers actually use',
    description:
      'Customers sign in with just their email and an account reference to see their history, status and appointments — no password to forget.',
  },
  {
    icon: ChecklistIcon,
    title: 'Checklists that protect your business',
    description:
      'Every inspection is backed by time-stamped photos and video, so there’s a clear record for every job — fewer disputes, stronger customer trust, and evidence on hand if a job’s ever questioned.',
  },
  {
    icon: UsersIcon,
    title: 'Built for your whole team',
    description:
      'Owner and staff roles keep the right people doing the right things, with a shared schedule everyone can see and trust.',
  },
  {
    icon: PhoneIcon,
    title: 'Phone & WhatsApp, powered by Twilio',
    description:
      'Every business gets its own secure Twilio connection under the hood — the groundwork for the call and WhatsApp reminders we’re rolling out next, so you can reach customers however suits them best.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Customers book online',
    description:
      'They pick an appointment type and a time from your live availability — no calls, no voicemail, no chasing.',
  },
  {
    number: '02',
    title: 'Your team reviews and confirms',
    description:
      'Booking requests wait in one place until staff approve them, so nothing hits the schedule by accident.',
  },
  {
    number: '03',
    title: 'Reminders bring them back',
    description:
      'As each customer’s next appointment comes due, CoMaz OS reminds them automatically — and points them straight back to you.',
  },
]

export default function Landing() {
  return (
    <div>
      <section className="relative overflow-hidden bg-slate-50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(37,99,235,0.14),transparent)]"
        />
        <Container className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              For service businesses
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Run your business without the admin headache
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
              CoMaz OS brings online booking, automatic reminders and a customer portal into
              one simple platform — so your team spends less time on the phone and more time with
              customers.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={APP_URL}
                className="w-full rounded-full bg-blue-600 px-7 py-3.5 text-center text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-700 sm:w-auto"
              >
                Open the app
              </a>
              <Link
                to="/pricing"
                className="w-full rounded-full border border-slate-300 bg-white px-7 py-3.5 text-center text-sm font-semibold text-slate-900 transition-colors hover:border-slate-400 sm:w-auto"
              >
                See pricing
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/5">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Moorshoot Service Centre
                    </p>
                    <p className="text-xs text-slate-500">Today’s schedule</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    6 booked · 2 pending
                  </span>
                </div>
                <ul className="mt-4 space-y-3">
                  {[
                    { time: '09:00', name: 'J. Whitfield', service: 'Full consultation', status: 'Confirmed' },
                    { time: '10:30', name: 'A. Osei', service: 'Follow-up appointment', status: 'Confirmed' },
                    { time: '13:15', name: 'R. Patel', service: 'Initial assessment', status: 'Pending' },
                  ].map((row) => (
                    <li
                      key={row.time}
                      className="flex items-center justify-between rounded-lg bg-white px-4 py-3 text-sm shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs font-semibold text-slate-400">
                          {row.time}
                        </span>
                        <div>
                          <p className="font-medium text-slate-900">{row.name}</p>
                          <p className="text-xs text-slate-500">{row.service}</p>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          row.status === 'Confirmed'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {row.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything a modern business needs, nothing it doesn’t
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              CoMaz OS replaces the diary, the spreadsheet and the sticky notes with one place
              your whole team can trust.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 p-6 transition-shadow hover:shadow-lg hover:shadow-slate-900/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="bg-slate-900 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              From first booking to the next reminder, three simple stages keep your calendar
              full.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <span className="text-sm font-mono font-semibold text-blue-400">
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-8 py-14 text-center shadow-xl shadow-blue-600/20 sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to see it in action?
            </h2>
            <p className="mt-4 text-base leading-7 text-blue-100">
              Open the app to explore CoMaz OS, or take a look at pricing to find the right plan
              for your business.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={APP_URL}
                className="w-full rounded-full bg-white px-7 py-3.5 text-center text-sm font-semibold text-blue-700 shadow-sm transition-colors hover:bg-blue-50 sm:w-auto"
              >
                Open the app
              </a>
              <Link
                to="/pricing"
                className="w-full rounded-full border border-white/40 px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
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
