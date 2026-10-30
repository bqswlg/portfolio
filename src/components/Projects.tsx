import { useState } from 'react'
import type { Project } from '../types'
import { PROJECTS } from '../data/projects'
import SectionTitle from './SectionTitle'
import Icon from './Icon'

/**
 * 參與專案
 * 狀態 A（預設）：三欄式卡片格。
 * 狀態 B（點擊卡片）：左右兩區塊 — 左側為被點卡片 + 其餘卡片收合標題鈕（前者在上、後者在下），
 *                   右側為詳細內容（動機／貢獻／成果／GitHub），右上角「✕ 返回」回到三欄格。
 */
export default function Projects() {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedIndex = selected ? PROJECTS.findIndex((p) => p.id === selected) : -1
  const sel = selectedIndex >= 0 ? PROJECTS[selectedIndex] : null

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
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            {/* 左側：前卡標題鈕 → 被點卡片 → 後卡標題鈕 */}
            <div className="lg:col-span-1 space-y-3">
              {PROJECTS.slice(0, selectedIndex).map((p) => (
                <TitleButton key={p.id} p={p} onClick={() => setSelected(p.id)} />
              ))}
              <Card p={sel} selected />
              {PROJECTS.slice(selectedIndex + 1).map((p) => (
                <TitleButton key={p.id} p={p} onClick={() => setSelected(p.id)} />
              ))}
            </div>
            {/* 右側：詳細內容 */}
            <div className="lg:col-span-2">
              <DetailPanel p={sel} onClose={() => setSelected(null)} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/** 專案卡片（狀態 A 格子 / 狀態 B 左側被選卡片） */
function Card({ p, selected, onClick }: { p: Project; selected?: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={
        'group flex flex-col bg-paper transition-all duration-300 ' +
        (onClick ? 'cursor-pointer hover:border-blue/50 hover:shadow-lg hover:-translate-y-0.5 ' : '') +
        (selected ? 'border-blue' : 'border-line')
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

/** 右側詳細內容 */
function DetailPanel({ p, onClose }: { p: Project; onClose: () => void }) {
  return (
    <div className="bg-paper">
      <div className="flex items-start justify-between gap-4 p-6 lg:p-8 border-b border-line">
        <div className="min-w-0">
          <p className="font-mono text-xs text-blue">{p.date}</p>
          <h3 className="mt-0.5 font-display text-xl font-bold text-ink leading-snug">{p.name}</h3>
          <p className="mt-0.5 font-mono text-[11px] text-ink-soft">{p.subtitle}</p>
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
            {p.contributions.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-soft leading-relaxed">
                <span className="text-blue font-bold">›</span>
                <span>{c}</span>
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
