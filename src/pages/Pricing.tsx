import { Link } from 'react-router-dom'
import Container from '../components/Container'
import { CheckIcon } from '../components/icons'
import { SUPPORT_EMAIL, SUPPORT_MAILTO } from '../lib/constants'

const tiers = [
  {
    name: 'Starter',
    description: 'For a single business getting off paper diaries and spreadsheets.',
    highlighted: false,
    features: [
      '1 business location',
      'Up to 2 staff logins',
      'Online booking page',
      'Automatic reminders',
      'Customer self-service portal',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    description: 'For busier teams that need checklists and more hands on deck.',
    highlighted: true,
    features: [
      'Everything in Starter',
      'Up to 8 staff logins',
      'Digital checklists with photo & video evidence',
      'Booking request review & approval queue',
      'Priority email support',
    ],
  },
  {
    name: 'Multi-Site',
    description: 'For businesses running more than one site under one roof.',
    highlighted: false,
    features: [
      'Everything in Growth',
      'Unlimited locations',
      'Unlimited staff logins',
      'Dedicated onboarding',
      'SLA-backed support',
    ],
  },
]

const faqs = [
  {
    question: 'Is there a free trial?',
    answer:
      'New businesses are onboarded directly by our team so your account is set up correctly from day one — get in touch and we’ll get you trialling the plan that fits.',
  },
  {
    question: 'Do you charge per customer or per booking?',
    answer:
      'No — pricing isn’t based on how many customers or bookings you have. Get in touch and we’ll put together a quote based on your business’s size and needs.',
  },
  {
    question: 'Can I change plans later?',
    answer:
      'Yes, you can move between plans as your business grows. Talk to us and we’ll switch you over with no disruption to your schedule.',
  },
  {
    question: 'Is support included?',
    answer:
      'Every plan includes support by email. Growth and Multi-Site get priority handling, and Multi-Site includes an SLA.',
  },
  {
    question: 'Is my data kept separate from other businesses?',
    answer:
      'Always. CoMaz OS is built so each business’s customers, records and bookings are fully isolated from every other business on the platform.',
  },
]

export default function Pricing() {
  return (
    <div>
      <section className="bg-slate-50 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Pricing
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Pricing that scales with your business
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              We're finalising plan pricing. Get in touch and we'll put together a quote based on
              your business's size and needs.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  tier.highlighted
                    ? 'border-blue-600 shadow-xl shadow-blue-600/10'
                    : 'border-slate-200'
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}
                <h2 className="text-lg font-semibold text-slate-900">{tier.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{tier.description}</p>
                <div className="mt-6">
                  <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Enquire
                  </span>
                </div>
                <a
                  href={SUPPORT_MAILTO}
                  className={`mt-6 block rounded-full px-5 py-3 text-center text-sm font-semibold transition-colors ${
                    tier.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border border-slate-300 text-slate-900 hover:border-slate-400'
                  }`}
                >
                  Enquire
                </a>
                <ul className="mt-8 space-y-3 text-sm text-slate-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <CheckIcon className="h-5 w-5 shrink-0 text-blue-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <div className="mt-12 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
              {faqs.map((faq) => (
                <details key={faq.question} className="group p-6 open:bg-slate-50/60">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-900">
                    {faq.question}
                    <span className="shrink-0 text-slate-400 transition-transform group-open:rotate-45">
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-8 py-14 text-center shadow-xl shadow-blue-600/20 sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Not sure which plan fits?
            </h2>
            <p className="mt-4 text-base leading-7 text-blue-100">
              Drop us a line at {SUPPORT_EMAIL} and we’ll help you pick the right plan for your
              business.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={SUPPORT_MAILTO}
                className="w-full rounded-full bg-white px-7 py-3.5 text-center text-sm font-semibold text-blue-700 shadow-sm transition-colors hover:bg-blue-50 sm:w-auto"
              >
                Enquire
              </a>
              <Link
                to="/about"
                className="w-full rounded-full border border-white/40 px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Learn more about us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
