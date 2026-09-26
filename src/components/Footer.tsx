import { Link } from 'react-router-dom'
import { APP_URL, CURRENT_YEAR, SUPPORT_EMAIL, SUPPORT_MAILTO } from '../lib/constants'
import Logo from './Logo'

const linkClass = 'transition-colors hover:text-ink'

export default function Footer() {
  return (
    <footer className="border-t border-silver bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-6 text-muted">
              Online booking, an AI phone assistant and automatic reminders for businesses that
              run on appointments.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-8">
            <div>
              <h3 className="text-xs font-medium tracking-wide text-faint uppercase">Product</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                <li>
                  <Link to="/" className={linkClass}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className={linkClass}>
                    Pricing
                  </Link>
                </li>
                <li>
                  <a href={APP_URL} className={linkClass}>
                    Open the app
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-medium tracking-wide text-faint uppercase">Company</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                <li>
                  <Link to="/about" className={linkClass}>
                    About
                  </Link>
                </li>
                <li>
                  <a href={SUPPORT_MAILTO} className={linkClass}>
                    {SUPPORT_EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-silver pt-6 text-sm text-faint">
          © {CURRENT_YEAR} CoMaz OS™. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
