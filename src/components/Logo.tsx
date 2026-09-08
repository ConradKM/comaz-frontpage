export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-extrabold tracking-tight ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-sm">
        <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
          <path
            d="M4 13.5 6.2 7a2 2 0 0 1 1.9-1.4h7.8a2 2 0 0 1 1.9 1.4L20 13.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="3.2"
            y="13.5"
            width="17.6"
            height="6"
            rx="1.6"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="7.5" cy="19.5" r="1.4" fill="currentColor" />
          <circle cx="16.5" cy="19.5" r="1.4" fill="currentColor" />
        </svg>
      </span>
      <span className="text-slate-900">
        CoMaz<span className="text-blue-600"> OS</span>
      </span>
    </span>
  )
}
