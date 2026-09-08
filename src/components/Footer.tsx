import { Link } from 'react-router-dom'
import { APP_URL, CURRENT_YEAR } from '../lib/constants'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Booking, reminders and customer management for service businesses — built to save
              your team the admin, one appointment at a time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Product</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-500">
                <li>
                  <Link to="/" className="hover:text-blue-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-blue-600">
                    Pricing
                  </Link>
                </li>
                <li>
                  <a href={APP_URL} className="hover:text-blue-600">
                    Open the app
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Company</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-500">
                <li>
                  <Link to="/about" className="hover:text-blue-600">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-400">
          © {CURRENT_YEAR} CoMaz OS™. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
