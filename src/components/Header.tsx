import type { NavItem } from '../types'
import { useScrollSpy } from '../hooks/useScrollSpy'

const NAV: NavItem[] = [
  { id: 'home', top: '個人', bottom: '簡介' },
  { id: 'projects', top: '參與', bottom: '專案' },
  { id: 'experiences', top: '競賽', bottom: '經歷' },  
  { id: 'gallery', top: '活動', bottom: '戳記' },
  { id: 'contact', top: '聯繫', bottom: '方式' },
]
const SPY_IDS = NAV.map((n) => n.id)

/** 頁眉 — 參考松山文創園區：深灰橫幅 + 左側 logo（屋頂線條 + 姓名 + 英文副標） */
export default function Header() {
  const active = useScrollSpy(SPY_IDS, 'home')

  return (
    <header className="sticky top-0 z-50 bg-slate text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        <a href="#home" className="flex items-center shrink-0">
          <div className="leading-tight">
            <div className="font-display font-extrabold text-lg sm:text-xl text-white">郭敏彥</div>
            <div className="font-mono text-[10px] tracking-[0.18em] text-white/45">KUO MIN YEN · PORTFOLIO</div>
          </div>
        </a>

        <nav className="flex items-stretch gap-0.5 overflow-x-auto -mr-2 pr-2">
          {NAV.map((item) => {
            const on = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={on ? 'true' : undefined}
                className={
                  'relative px-3 sm:px-4 py-2 text-center leading-tight whitespace-nowrap transition-colors ' +
                  (on ? 'text-white' : 'text-white/55 hover:text-white')
                }
              >
                <span className="block text-[13px] font-medium">{item.top}</span>
                <span className="block text-[13px] font-medium">{item.bottom}</span>
                <span
                  className={'absolute left-2 right-2 bottom-0 h-0.5 transition-colors ' + (on ? 'bg-blue' : 'bg-transparent')}
                />
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
