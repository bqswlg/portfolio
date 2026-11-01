import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { Project } from '../types'
import { PROJECTS } from '../data/projects'
import SectionTitle from './SectionTitle'
import Icon from './Icon'

/** 左欄上下邊緣淡出大小，同時作為「卡片被遮擋」的判定邊界 */
const FADE = 72

function applyEdgeFade(c: HTMLDivElement) {
  if (window.innerWidth < 1024) {
    c.style.maskImage = ''
    c.style.webkitMaskImage = ''
    return
  }
  const vH = c.clientHeight
  const atTop = c.scrollTop <= 1
  const atBottom = c.scrollTop + vH >= c.scrollHeight - 1
  const topPart = atTop ? '#000 0px' : `transparent 0px, #000 ${FADE}px`
  const botPart = atBottom ? '#000 100%' : `#000 ${vH - FADE}px, transparent ${vH}px`
  const grad = `linear-gradient(to bottom, ${topPart}, ${botPart})`
  c.style.maskImage = grad
  c.style.webkitMaskImage = grad
}

/** 被選卡片置中於「清晰區」（上下淡出之間）時，卡片上緣應在的位置 */
function restTopFor(cardH: number, clientH: number) {
  const zone = clientH - 2 * FADE
  if (cardH >= zone) return FADE
  return FADE + (zone - cardH) / 2
}

/**
 * 參與專案
 * 狀態 A（預設）：三欄式卡片格。
 * 狀態 B（點擊卡片）：左側可捲動清單（被選為簡介卡片、其餘為標題鈕），右側為詳細內容。
 *   捲動左欄時被選卡片一律完整顯示；一旦其上／下緣要被遮擋，即切換相鄰專案（下→下一個、上→上一個）
 *   並把新卡片重新置中；首／末張則固定維持完整顯示。
 */
export default function Projects() {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedIndex = selected ? PROJECTS.findIndex((p) => p.id === selected) : -1
  const sel = selectedIndex >= 0 ? PROJECTS[selectedIndex] : null
  const inSplit = sel !== null

  const leftScrollRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef<HTMLDivElement>(null)
  const selectedIdRef = useRef<string | null>(selected)
  selectedIdRef.current = selected
  const pendingRef = useRef<'click' | 'scroll' | null>(null)
  const suppressUntilRef = useRef(0) // 置中後短暫抑制偵測，避免殘留慣性立即覆蓋

  const isDesktop = () => window.innerWidth >= 1024
  const topInView = (el: Element, c: HTMLElement) => el.getBoundingClientRect().top - c.getBoundingClientRect().top

  function selectByClick(id: string) {
    pendingRef.current = 'click'
    setSelected(id)
  }

  // 置中被選卡片於清晰區（繪製前完成避免跳動）
  useLayoutEffect(() => {
    const c = leftScrollRef.current
    const card = selectedRef.current
    if (!c) return
    if (!card || !isDesktop()) {
      applyEdgeFade(c)
      return
    }
    const mode = pendingRef.current
    pendingRef.current = null
    const max = Math.max(0, c.scrollHeight - c.clientHeight)
    const restTop = restTopFor(card.offsetHeight, c.clientHeight)
    c.scrollTop = Math.max(0, Math.min(max, c.scrollTop + topInView(card, c) - restTop))
    // 僅點擊/進場需抑制偵測（避免殘留慣性覆蓋）；捲動切換靠 rAF 節流即可，保持順暢連續切換
    if (mode === 'click') suppressUntilRef.current = performance.now() + 300
    applyEdgeFade(c)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  // 捲動左欄：被選卡片上/下緣進入遮擋即切換相鄰專案；首末張則重新置中固定
  useEffect(() => {
    const c0 = leftScrollRef.current
    if (!c0 || !inSplit) return
    const c: HTMLDivElement = c0
    c.style.scrollBehavior = 'auto'
    c.style.overflowAnchor = 'none'

    let raf = 0
    function onScroll() {
      applyEdgeFade(c)
      if (performance.now() < suppressUntilRef.current || !isDesktop() || raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        if (performance.now() < suppressUntilRef.current || !isDesktop()) return
        const card = selectedRef.current
        if (!card) return
        const clientH = c.clientHeight
        const cardH = card.offsetHeight
        if (cardH > clientH - 2 * FADE) return // 卡片高於清晰區（極少數）：不切換
        const cardTop = topInView(card, c)
        const cardBottom = cardTop + cardH
        const idx = PROJECTS.findIndex((p) => p.id === selectedIdRef.current)
        if (cardTop < FADE - 1) {
          // 上緣被遮擋（往下捲）
          if (idx >= 0 && idx < PROJECTS.length - 1) {
            pendingRef.current = 'scroll'
            setSelected(PROJECTS[idx + 1].id)
          } else {
            c.scrollTop += cardTop - restTopFor(cardH, clientH) // 末張：重新置中固定
            applyEdgeFade(c)
          }
        } else if (cardBottom > clientH - FADE + 1) {
          // 下緣被遮擋（往上捲）
          if (idx > 0) {
            pendingRef.current = 'scroll'
            setSelected(PROJECTS[idx - 1].id)
          } else {
            c.scrollTop += cardTop - restTopFor(cardH, clientH) // 首張：重新置中固定
            applyEdgeFade(c)
          }
        }
      })
    }

    const onResize = () => applyEdgeFade(c)
    c.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    const ro = new ResizeObserver(() => applyEdgeFade(c))
    ro.observe(c)
    applyEdgeFade(c)

    return () => {
      cancelAnimationFrame(raf)
      c.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inSplit])

  return (
    <section id="projects" className="scroll-mt-24 bg-mist py-20 sm:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle zh="參與專案" en="Projects" />

        {sel === null ? (
          // ── 狀態 A：三欄式卡片格 ──
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <Card key={p.id} p={p} onClick={() => selectByClick(p.id)} />
            ))}
          </div>
        ) : (
          // ── 狀態 B：左右分割 ──
          <div className="grid lg:grid-cols-3 gap-6 lg:items-stretch">
            {/* 左側：可捲動清單（被選為卡片、其餘為標題鈕）；卡片完整顯示、遮擋即切換、邊緣淡出 */}
            <div className="lg:col-span-1 lg:relative lg:min-h-[40rem]">
              <div
                ref={leftScrollRef}
                className="space-y-3 lg:absolute lg:inset-0 lg:overflow-y-auto lg:py-32 lg:px-3 no-scrollbar"
              >
                {PROJECTS.slice(0, selectedIndex).map((p) => (
                  <TitleButton key={p.id} p={p} onClick={() => selectByClick(p.id)} />
                ))}
                <div ref={selectedRef} data-pid={sel.id} className="relative z-10 card-lift">
                  <Card p={sel} selected hideTitle />
                </div>
                {PROJECTS.slice(selectedIndex + 1).map((p) => (
                  <TitleButton key={p.id} p={p} onClick={() => selectByClick(p.id)} />
                ))}
              </div>
            </div>
            {/* 右側：詳細內容（含名稱中/英；切換時淡入上滑） */}
            <div className="lg:col-span-2">
              <DetailPanel p={sel} onClose={() => setSelected(null)} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/** 專案卡片（狀態 A 格子 / 狀態 B 左側被選卡片；hideTitle 時隱藏名稱與英文副標，名稱改由右側顯示） */
function Card({
  p,
  selected,
  onClick,
  hideTitle,
}: {
  p: Project
  selected?: boolean
  onClick?: () => void
  hideTitle?: boolean
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
        {!hideTitle && (
          <>
            <h3 className="font-display text-lg font-bold text-ink leading-snug">{p.name}</h3>
            <p className="mt-1 font-mono text-[11px] text-ink-soft">{p.subtitle}</p>
          </>
        )}
        <p className={(hideTitle ? '' : 'mt-3 ') + 'text-sm text-ink-soft leading-relaxed flex-1'}>{p.intro}</p>
        {/* 技術標籤（置於簡介卡片下方） */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 border border-line text-ink-soft">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/** 收合的標題鈕（狀態 B 左側清單；data-pid 供捲動偵測使用） */
function TitleButton({ p, onClick }: { p: Project; onClick: () => void }) {
  return (
    <button
      type="button"
      data-pid={p.id}
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

/** 右側詳細內容（含專案名稱中/英；切換時淡入上滑） */
function DetailPanel({ p, onClose }: { p: Project; onClose: () => void }) {
  return (
    <div className="panel-in bg-paper">
      {/* 專案名稱（中/英）+ 返回鈕 */}
      <div className="flex items-start justify-between gap-4 p-4 sm:p-6 border-b border-line">
        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold text-ink leading-snug">{p.name}</h3>
          <p className="mt-1 font-mono text-[11px] text-ink-soft">{p.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 inline-flex items-center gap-1 px-2 py-1 text-sm text-ink-soft hover:text-blue transition-colors"
          aria-label="返回三欄瀏覽"
        >
          <Icon name="close" className="text-[18px]" />
          <span>返回</span>
        </button>
      </div>

      <div className="p-6 lg:p-8 space-y-6">
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

        {/* 成果（左側藍色編號方框 + 右側數值與說明） */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Icon name="workspace_premium" className="text-blue text-[18px]" />
            <h4 className="font-mono text-xs tracking-[0.18em] uppercase text-blue">成果 · Outcome</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {p.outcomes.map((o, i) => (
              <div key={i} className="flex items-stretch border border-line overflow-hidden">
                <div className="shrink-0 w-10 bg-blue text-white flex items-center justify-center font-display font-bold">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0 bg-mist px-3 py-2">
                  <div className="font-display font-bold text-ink leading-snug">{o.value}</div>
                  <p className="mt-0.5 text-xs text-ink-soft leading-relaxed">{o.caption}</p>
                </div>
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
