interface RooflineProps {
  className?: string
}

/** 鋸齒屋頂 / 山形線條 motif（呼應松山文創園區識別） */
export default function Roofline({ className }: RooflineProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M2 32 L2 14 L22 2 L42 14 L42 32" />
      <path d="M42 32 L42 16 L62 6 L82 16 L82 32" />
      <path d="M82 32 L82 12 L102 2 L122 12 L122 32" />
      <path d="M122 32 L122 16 L142 6 L162 16 L162 32" />
      <path d="M162 32 L162 14 L182 2 L202 14 L202 32" />
      <path d="M202 32 L202 16 L222 6 L238 16" />
      <line x1="0" y1="32" x2="240" y2="32" />
    </svg>
  )
}
