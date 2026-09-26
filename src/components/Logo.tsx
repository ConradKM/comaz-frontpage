export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-white">
        <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
          <path
            d="M21 10.5a7.5 7.5 0 1 0 0 11"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="22" cy="16" r="2" fill="currentColor" />
        </svg>
      </span>
      <span className="font-display text-[17px] font-semibold tracking-tight text-ink">
        CoMaz<span className="text-faint"> OS</span>
      </span>
    </span>
  )
}
