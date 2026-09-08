import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { APP_URL } from '../lib/constants'
import Logo from './Logo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
]

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <NavLink to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClasses} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={APP_URL}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600"
          >
            Open the app
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <a
            href={APP_URL}
            className="mt-3 block rounded-full bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-600"
          >
            Open the app
          </a>
        </div>
      )}
    </header>
  )
}
