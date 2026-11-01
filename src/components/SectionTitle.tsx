import type { ReactNode } from 'react'

interface SectionTitleProps {
  zh: string
  en: string
  /** 深底區段用淺色文字 */
  invert?: boolean
  /** 標題右側的附加內容（例如篩選按鈕） */
  action?: ReactNode
}

/** 區段大標：中文大標 + 藍色底線 + 英文副標（仿松山區段標題） */
export default function SectionTitle({ zh, en, invert, action }: SectionTitleProps) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight ${invert ? 'text-white' : 'text-ink'}`}>
          {zh}
        </h2>
        <div className="mt-3 h-1 w-16 bg-blue" />
        <p className={`mt-3 font-mono text-xs tracking-[0.2em] uppercase ${invert ? 'text-white/50' : 'text-ink-soft'}`}>{en}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
