type IconProps = { className?: string }

const base = 'h-6 w-6'

export function CalendarIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M7.5 13h3M7.5 16.5h3M13.5 13h3M13.5 16.5h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function BellIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 10.5a6 6 0 1 1 12 0c0 4 1.5 5 1.5 5h-15s1.5-1 1.5-5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function UserPortalIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3.5" y="4" width="17" height="16" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="10.5" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 17c1-2.2 3-3 5-3s4 .8 5 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function ChecklistIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4.5" y="3.5" width="15" height="17" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.5 8.5l1.3 1.3L12.5 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 8.3h4.5M8.5 14.5l1.3 1.3 2.7-2.8M14.5 14.3h4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function ShieldIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3.5 5 6v5.2c0 4.6 3 8 7 9.3 4-1.3 7-4.7 7-9.3V6l-7-2.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function UsersIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="9" cy="8.5" r="2.7" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.8 19c.8-3 3-4.5 5.2-4.5s4.4 1.5 5.2 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="16.5" cy="9" r="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M15 14.8c1.7.2 3.5 1.4 4.2 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function SparkIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3.5c.5 3 2.3 4.8 5.3 5.3-3 .5-4.8 2.3-5.3 5.3-.5-3-2.3-4.8-5.3-5.3 3-.5 4.8-2.3 5.3-5.3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 15c.3 1.5 1.1 2.4 2.6 2.6-1.5.3-2.4 1.1-2.6 2.6-.3-1.5-1.1-2.4-2.6-2.6 1.5-.3 2.4-1.1 2.6-2.6Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PhoneIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5.5 4.5h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 4 5.6a1.5 1.5 0 0 1 1.5-1.1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M15 4.8c1.9.4 3.4 1.9 3.8 3.8M15 8.2c.9.2 1.6.9 1.8 1.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CheckIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
