import { useEffect, useRef, useState } from 'react'
import type { Project } from '../types'
import { PROJECTS } from '../data/projects'
import SectionTitle from './SectionTitle'
import Icon from './Icon'

/**
 * 參與專案
 * 狀態 A（預設）：三欄式卡片格。
 * 狀態 B（點擊卡片）：左右兩區塊 — 左側為被點卡片（加陰影上浮）＋ 其餘卡片收合標題鈕（上方僅一顆、整顆
 *                   往頂端淡出；下方第一顆清晰、第二顆往邊緣淡出；可捲動），右側為詳細內容（技術標籤移至此）。
 */
export default function Projects() {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedIndex = selected ? PROJECTS.findIndex((p) => p.id === selected) : -1
  const sel = selectedIndex >= 0 ? PROJECTS[selectedIndex] : null

  const leftScrollRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef<HTMLDivElement>(null)

  // 桌面：被選卡片置中對齊右卡中線（緩動捲動）；僅在該側仍有內容時淡出；高度變動時重新置中
  useEffect(() => {
    const el0 = leftScrollRef.current
    if (!el0) return
    const c: HTMLDivElement = el0
    c.style.scrollBehavior = 'auto'
    c.style.overflowAnchor = 'none' // 關閉捲動錨定，避免置中後字體／版面微調把捲動位置頂掉

    const isDesktop = () => window.innerWidth >= 1024

    function updateFade() {
      if (!isDesktop()) {
        c.style.maskImage = ''
        c.style.webkitMaskImage = ''
        return
      }
      const vH = c.clientHeight
      const atTop = c.scrollTop <= 1
      const atBottom = c.scrollTop + vH >= c.scrollHeight - 1
      const cRect = c.getBoundingClientRect()
      const card = selectedRef.current
      const aboveEl = card?.previousElementSibling ?? null
      const belowEl = card?.nextElementSibling ?? null
      // 上方：整顆（唯一一顆）按鈕淡出 —— 從視窗頂端淡入到卡片上緣
      const cardTopY = card ? Math.max(0, Math.round(card.getBoundingClientRect().top - cRect.top)) : 0
      // 下方：第一顆相鄰按鈕保持清晰，從第二顆開始往邊緣淡出
      const bottomBand = belowEl ? Math.max(0, cRect.bottom - belowEl.getBoundingClientRect().bottom) : 0
      const topPart = atTop || !aboveEl || cardTopY <= 0 ? '#000 0px' : `transparent 0px, #000 ${cardTopY}px`
      const botPart = atBottom || bottomBand <= 0 ? '#000 100%' : `#000 ${vH - bottomBand}px, transparent ${vH}px`
      const grad = `linear-gradient(to bottom, ${topPart}, ${botPart})`
      c.style.maskImage = grad
      c.style.webkitMaskImage = grad
    }

    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

    function targetTop() {
      const el = selectedRef.current
      if (!el) return 0
      const max = Math.max(0, c.scrollHeight - c.clientHeight)
      // 卡片上方只保留一顆（淡出）按鈕：把上方第一顆按鈕頂端貼近視窗頂端
      const aboveEl = el.previousElementSibling as HTMLElement | null
      const want = aboveEl ? aboveEl.offsetTop - 12 : 0
      return Math.max(0, Math.min(max, want))
    }

    let raf = 0
    let animating = true // 進場即視為動畫中，避免 ResizeObserver 初次回呼搶先 snap 打斷進場
    let pendingSnap = false

    function snap() {
      c.scrollTop = targetTop()
      updateFade()
    }

    function animateTo() {
      const start = c.scrollTop
      const t0 = performance.now()
      animating = true
      pendingSnap = false
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / 1000)
        const to = targetTop() // 每幀重算目標：字體／版面於動畫期間才穩定也能收斂
        c.scrollTop = start + (to - start) * ease(t)
        updateFade()
        if (t < 1) {
          raf = requestAnimationFrame(step)
        } else {
          animating = false
          snap() // 收尾對準正確置中位置
          if (pendingSnap) {
            // 動畫期間版面曾變動（面板高度/字體），等穩定後再對準一次
            pendingSnap = false
            requestAnimationFrame(snap)
          }
        }
      }
      raf = requestAnimationFrame(step)
    }

    function recenter(animate: boolean) {
      if (!isDesktop() || !selectedRef.current) {
        animating = false
        updateFade()
        return
      }
      // 分頁隱藏時 rAF 會暫停，動畫跑不動；直接對準以確保靜止位置正確
      if (document.hidden) {
        animating = false
        snap()
        return
      }
      if (animate) animateTo()
      else if (animating) pendingSnap = true // 動畫中先記下，結束後再對準，避免打斷
      else snap()
    }

    // 進場/切換：等版面穩定後再做緩動置中
    let r1 = requestAnimationFrame(() => {
      r1 = requestAnimationFrame(() => recenter(true))
    })

    const onScroll = () => updateFade()
    const onResize = () => recenter(false)
    c.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    // 高度變動（內容/字體/面板高度）時重新置中；動畫中則延後到結束再對準
    const ro = new ResizeObserver(() => recenter(false))
    ro.observe(c)
    if (selectedRef.current) ro.observe(selectedRef.current)
    document.fonts?.ready.then(() => recenter(false)).catch(() => {})

    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(raf)
      c.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
    }
  }, [selected])

  return (
    <section id="projects" className="scroll-mt-24 bg-mist py-20 sm:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle zh="參與專案" en="Projects" />

        {sel === null ? (
          // ── 狀態 A：三欄式卡片格 ──
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <Card key={p.id} p={p} onClick={() => setSelected(p.id)} />
            ))}
          </div>
        ) : (
          // ── 狀態 B：左右分割 ──
          <div className="grid lg:grid-cols-3 gap-6 lg:items-stretch">
            {/* 左側：前卡標題鈕 → 被點卡片 → 後卡標題鈕（置中、動態淡出、可捲動） */}
            <div className="lg:col-span-1 lg:relative lg:min-h-[40rem]">
              <div
                ref={leftScrollRef}
                className="space-y-3 lg:absolute lg:inset-0 lg:overflow-y-auto lg:py-24 lg:px-3 no-scrollbar"
              >
                {PROJECTS.slice(0, selectedIndex).map((p) => (
                  <TitleButton key={p.id} p={p} onClick={() => setSelected(p.id)} />
                ))}
                <div ref={selectedRef} className="relative z-10 card-lift">
                  <Card p={sel} selected hideTags />
                </div>
                {PROJECTS.slice(selectedIndex + 1).map((p) => (
                  <TitleButton key={p.id} p={p} onClick={() => setSelected(p.id)} />
                ))}
              </div>
            </div>
            {/* 右側：詳細內容（含技術標籤；切換時淡入上滑） */}
            <div className="lg:col-span-2">
              <DetailPanel key={sel.id} p={sel} onClose={() => setSelected(null)} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/** 專案卡片（狀態 A 格子 / 狀態 B 左側被選卡片；hideTags 時隱藏技術標籤） */
function Card({
  p,
  selected,
  onClick,
  hideTags,
}: {
  p: Project
  selected?: boolean
  onClick?: () => void
  hideTags?: boolean
}) {
  return (
    <div
      onClick={onClick}
      className={
        'group flex flex-col bg-paper transition-all duration-300 ' +
        (onClick ? 'cursor-pointer hover:border-blue/50 hover:shadow-lg hover:-translate-y-0.5 ' : '') +
        (selected ? 'border-blue shadow-xl' : 'border-line')
      }
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-mist">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover grayscale-[0.15] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
        />
        <span className="absolute top-0 left-0 bg-blue text-white font-mono text-xs px-2.5 py-1">{p.date}</span>
        {p.sample && <span className="absolute top-0 right-0 bg-ink/70 text-white text-[11px] px-2 py-1">範例</span>}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-lg font-bold text-ink leading-snug">{p.name}</h3>
        <p className="mt-1 font-mono text-[11px] text-ink-soft">{p.subtitle}</p>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed flex-1">{p.intro}</p>
        {!hideTags && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="text-[11px] px-2 py-0.5 border border-line text-ink-soft">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/** 收合的標題鈕（狀態 B 左側上下方） */
function TitleButton({ p, onClick }: { p: Project; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full flex items-center justify-between gap-3 px-4 py-3 bg-paper border border-line hover:border-blue hover:bg-blue-soft/40 transition-colors text-left"
    >
      <span className="flex items-center gap-2.5 min-w-0">
        <span className="font-mono text-[11px] text-blue shrink-0">{p.date}</span>
        <span className="font-display text-sm font-bold text-ink truncate group-hover:text-blue">{p.name}</span>
        {p.sample && <span className="shrink-0 text-[10px] px-1.5 py-0.5 bg-mist-2 text-ink-soft">範例</span>}
      </span>
      <Icon name="chevron_right" className="shrink-0 text-ink-soft group-hover:text-blue text-[18px]" />
    </button>
  )
}

/** 右側詳細內容（含技術標籤；不重複名稱/時間；切換時淡入上滑） */
function DetailPanel({ p, onClose }: { p: Project; onClose: () => void }) {
  return (
    <div className="panel-in bg-paper">
      {/* 僅保留返回鈕，不再重複專案名稱與時間 */}
      <div className="flex justify-end p-3 border-b border-line">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1 px-2 py-1 text-sm text-ink-soft hover:text-blue transition-colors"
          aria-label="返回三欄瀏覽"
        >
          <Icon name="close" className="text-[18px]" />
          <span>返回</span>
        </button>
      </div>

      <div className="p-6 lg:p-8 space-y-6">
        {/* 技術標籤（由左卡移至此） */}
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 bg-mist border border-line text-ink-soft">
              {t}
            </span>
          ))}
        </div>

        {/* 動機 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Icon name="lightbulb" className="text-blue text-[18px]" />
            <h4 className="font-mono text-xs tracking-[0.18em] uppercase text-blue">動機 · Motivation</h4>
          </div>
          <p className="text-sm text-ink-soft leading-relaxed">{p.motivation}</p>
        </div>

        {/* 貢獻 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Icon name="engineering" className="text-blue text-[18px]" />
            <h4 className="font-mono text-xs tracking-[0.18em] uppercase text-blue">貢獻 · Contributions</h4>
          </div>
          <ul className="space-y-1.5">
            {p.contributions.map((contribution, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-soft leading-relaxed">
                <span className="text-blue font-bold">›</span>
                <span>{contribution}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 成果 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Icon name="workspace_premium" className="text-blue text-[18px]" />
            <h4 className="font-mono text-xs tracking-[0.18em] uppercase text-blue">成果 · Outcome</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {p.outcomes.map((o, i) => (
              <div key={i} className="bg-mist border-l-2 border-blue px-3 py-2">
                <div className="font-display font-bold text-ink">{o.value}</div>
                <p className="text-xs text-ink-soft mt-0.5">{o.caption}</p>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub */}
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue text-white font-medium hover:bg-blue-dark transition-colors"
        >
          <Icon name="code" className="text-[18px]" />
          <span>GitHub Repo</span>
        </a>
      </div>
    </div>
  )
}
