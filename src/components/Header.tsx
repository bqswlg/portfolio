import { useCallback, useLayoutEffect, useRef } from 'react'
import type { NavItem } from '../types'
import { useScrollSpy } from '../hooks/useScrollSpy'

const NAV: NavItem[] = [
  { id: 'home', label: '關於我' },
  { id: 'stamps', label: '活動戳記' },
  { id: 'projects', label: '參與專案' },
  { id: 'experiences', label: '競賽經歷' },
  { id: 'contact', label: '聯繫方式' },
]
const NAV_IDS = NAV.map((n) => n.id)

export default function Header() {
  const activeId = useScrollSpy(NAV_IDS, 'home')
  const navRef = useRef<HTMLElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  const reposition = useCallback(() => {
    const nav = navRef.current
    const indicator = indicatorRef.current
    const activeLink = linkRefs.current[activeId]
    if (!nav || !indicator || !activeLink) return
    const navRect = nav.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()
    indicator.style.width = `${linkRect.width}px`
    indicator.style.transform = `translateX(${linkRect.left - navRect.left}px)`
  }, [activeId])

  useLayoutEffect(() => {
    reposition()
    window.addEventListener('resize', reposition)
    // 字體載入後寬度可能改變，重新定位
    document.fonts?.ready.then(reposition).catch(() => {})
    return () => window.removeEventListener('resize', reposition)
  }, [reposition])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-stretch justify-center overflow-x-auto">
        <nav className="relative flex items-stretch" id="top-nav" ref={navRef}>
          {/* 動態平滑滑動背景色塊 */}
          <div
            ref={indicatorRef}
            className="absolute top-0 bottom-0 left-0 bg-primary transition-all duration-300 ease-out pointer-events-none z-0"
          />

          {NAV.map((item) => {
            const isActive = item.id === activeId
            return (
              <a
                key={item.id}
                ref={(el) => {
                  linkRefs.current[item.id] = el
                }}
                href={`#${item.id}`}
                aria-current={isActive ? 'page' : undefined}
                className={
                  'nav-link relative z-10 h-full flex items-center px-5 sm:px-8 font-body-lg text-body-md sm:text-body-lg transition-colors duration-200 whitespace-nowrap ' +
                  (isActive
                    ? 'text-on-primary-fixed font-bold'
                    : 'text-on-surface-variant font-medium hover:text-primary')
                }
              >
                {item.label}
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
