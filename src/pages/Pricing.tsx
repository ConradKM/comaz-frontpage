import { Link } from 'react-router-dom'
import Container from '../components/Container'
import { CheckIcon } from '../components/icons'
import { SUPPORT_EMAIL, SUPPORT_MAILTO } from '../lib/constants'
import { btnGhost, btnGhostOnDark, btnOnDark, btnPrimary, eyebrow, h1, h2, lead } from '../lib/styles'

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
    description: 'For businesses running more than one location under one roof.',
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
    question: 'Can the AI phone assistant use my existing number?',
    answer:
      'Yes. It can answer on the number your customers already know, or sit behind an option in your existing phone menu. Get in touch and we’ll set it up with you.',
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
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className={eyebrow}>Pricing</span>
            <h1 className={`mt-6 ${h1}`}>Pricing that scales with your business</h1>
            <p className={`mx-auto mt-6 max-w-xl ${lead}`}>
              We’re finalising plan pricing. Get in touch and we’ll put together a quote based on
              your business’s size and needs.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-xl bg-white p-7 ${
                  tier.highlighted ? 'shadow-card ring-2 ring-ink' : 'shadow-card'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {tier.name}
                  </h2>
                  {tier.highlighted && (
                    <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-medium text-white">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="mt-2 min-h-12 text-sm leading-6 text-muted">{tier.description}</p>
                <p className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink">
                  Enquire
                </p>
                <a
                  href={SUPPORT_MAILTO}
                  className={`mt-6 ${tier.highlighted ? btnPrimary : btnGhost}`}
                >
                  Get a quote
                </a>
                <ul className="mt-8 space-y-3 border-t border-silver pt-6 text-sm text-graphite">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <CheckIcon className="h-5 w-5 shrink-0 text-ink" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-silver bg-white py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className={`text-center ${h2}`}>Frequently asked questions</h2>
            <div className="mt-12 divide-y divide-silver rounded-xl bg-paper">
              {faqs.map((faq) => (
                <details key={faq.question} className="group px-6 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="shrink-0 text-faint transition-transform group-open:rotate-45">
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="rounded-xl bg-ink px-6 py-14 text-center sm:px-16 sm:py-16">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Not sure which plan fits?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/65">
              Drop us a line at {SUPPORT_EMAIL} and we’ll help you pick the right plan for your
              business.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={SUPPORT_MAILTO} className={`${btnOnDark} w-full sm:w-auto`}>
                Get a quote
              </a>
              <Link to="/about" className={`${btnGhostOnDark} w-full sm:w-auto`}>
                Learn more about us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
