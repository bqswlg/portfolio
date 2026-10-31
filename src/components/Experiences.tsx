import { useState } from 'react'
import { EXPERIENCES, CERTIFICATES } from '../data/experiences'
import SectionTitle from './SectionTitle'
import Icon from './Icon'

/** 競賽經歷 = 經歷與競賽時間軸 + 證明文件（點擊於新分頁開啟 PDF；最多 6 份，其餘摺疊） */
export default function Experiences() {
  const [showAllCerts, setShowAllCerts] = useState(false)

  return (
    <section id="experiences" className="scroll-mt-24 bg-paper py-20 sm:py-24 px-6 border-b border-line">
      <div className="max-w-5xl mx-auto">
        <SectionTitle zh="競賽經歷" en="Experience & Competitions" />

        {/* 時間軸 */}
        <div className="relative border-l-2 border-line ml-2 pl-8 space-y-9">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} id={exp.id} className="reveal relative scroll-mt-28">
              <span className="absolute -left-[40px] top-1.5 w-3.5 h-3.5 bg-blue border-2 border-mist" />
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-lg font-semibold text-blue">{exp.date}</span>
                <span className="text-[11px] font-medium tracking-wider px-2 py-0.5 bg-blue-soft text-blue">{exp.tag}</span>
              </div>
              <h3 className="mt-2 font-display text-lg font-bold text-ink leading-snug">{exp.title}</h3>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-soft">
                <Icon name="workspace_premium" className="text-[18px] text-blue" />
                <span>{exp.result}</span>
              </p>
            </div>
          ))}
        </div>

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
