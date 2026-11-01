import { useState } from 'react'
import { EXPERIENCES, CERTIFICATES } from '../data/experiences'
import type { ExperienceCategory } from '../types'
import SectionTitle from './SectionTitle'
import Icon from './Icon'

const FILTERS: ExperienceCategory[] = ['競賽', '獲獎', '學術']
const TIMELINE_LIMIT = 7

/** 競賽經歷 = 經歷與競賽時間軸（可依類型篩選）+ 證明文件（點擊於新分頁開啟 PDF；最多 6 份，其餘摺疊） */
export default function Experiences() {
  const [showAllCerts, setShowAllCerts] = useState(false)
  const [filter, setFilter] = useState<ExperienceCategory | null>(null)
  const [showAllExp, setShowAllExp] = useState(false)

  // 競賽：含競賽與獲獎；獲獎：僅獲獎；學術：僅學術；預設（null）顯示全部
  const shown = EXPERIENCES.filter((exp) => {
    if (!filter) return true
    if (filter === '競賽') return exp.category === '競賽' || exp.category === '獲獎'
    return exp.category === filter
  })
  // 時間軸超過 7 筆即折疊，其餘以展開鈕顯示
  const visibleExp = showAllExp ? shown : shown.slice(0, TIMELINE_LIMIT)

  const filterButtons = (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((c) => {
        const active = filter === c
        return (
          <button
            key={c}
            type="button"
            aria-pressed={active}
            onClick={() => {
              setFilter(active ? null : c)
              setShowAllExp(false)
            }}
            className={
              'px-3.5 py-1.5 text-sm font-medium border transition-colors ' +
              (active
                ? 'bg-blue border-blue text-white'
                : 'border-line text-ink-soft hover:border-blue hover:text-blue')
            }
          >
            {c}
          </button>
        )
      })}
    </div>
  )

  return (
    <section id="experiences" className="scroll-mt-24 bg-paper py-20 sm:py-24 px-6 border-b border-line">
      <div className="max-w-5xl mx-auto">
        <SectionTitle zh="競賽經歷" en="Experience & Competitions" action={filterButtons} />

        {/* 時間軸（依篩選顯示；超過 7 筆折疊；標籤與備註前 icon 已移除） */}
        <div className="relative border-l-2 border-line ml-2 pl-8 space-y-9">
          {visibleExp.map((exp) => (
            <div key={exp.id} id={exp.id} className="relative scroll-mt-28">
              <span className="absolute -left-[40px] top-1.5 w-3.5 h-3.5 bg-blue border-2 border-mist" />
              <span className="font-mono text-lg font-semibold text-blue">{exp.date}</span>
              <h3 className="mt-2 font-display text-lg font-bold text-ink leading-snug">{exp.title}</h3>
              {exp.result ? <p className="mt-1.5 text-sm text-ink-soft">{exp.result}</p> : null}
            </div>
          ))}
        </div>

        {shown.length > TIMELINE_LIMIT && (
          <div className="mt-8 ml-2 pl-8">
            <button
              type="button"
              onClick={() => setShowAllExp((v) => !v)}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-line text-sm font-medium text-ink-soft hover:border-blue hover:text-blue transition-colors"
            >
              <Icon name={showAllExp ? 'expand_less' : 'expand_more'} className="text-[18px]" />
              {showAllExp ? '收合' : `顯示其餘 ${shown.length - TIMELINE_LIMIT} 筆`}
            </button>
          </div>
        )}

        {/* 證明文件（點擊於新分頁開啟 PDF；最多顯示 6 份，其餘摺疊） */}
        <div className="reveal mt-16 pt-10 border-t border-line">
          <div className="mb-6">
            <h3 className="font-display text-xl font-bold text-ink">證明文件</h3>
            <p className="mt-1 font-mono text-xs tracking-widest uppercase text-ink-soft">Credentials</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {(showAllCerts ? CERTIFICATES : CERTIFICATES.slice(0, 6)).map((cert) => (
              <a
                key={cert.name}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 p-4 bg-paper border border-line hover:border-blue/50 hover:bg-blue-soft transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 w-9 h-11 bg-mist border border-line flex items-center justify-center text-blue">
                    <Icon name="picture_as_pdf" className="text-[20px]" />
                  </span>
                  <span className="truncate text-sm font-medium text-ink group-hover:text-blue">{cert.name}</span>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 font-mono text-xs text-blue">
                  <Icon name="open_in_new" className="text-[16px]" />
                  瀏覽
                </span>
              </a>
            ))}
          </div>

          {CERTIFICATES.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAllCerts((v) => !v)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 border border-line text-sm font-medium text-ink-soft hover:border-blue hover:text-blue transition-colors"
            >
              <Icon name={showAllCerts ? 'expand_less' : 'expand_more'} className="text-[18px]" />
              {showAllCerts ? '收合' : `顯示其餘 ${CERTIFICATES.length - 6} 份`}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
