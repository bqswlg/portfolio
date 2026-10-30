import { EXPERIENCES, CERTIFICATES } from '../data/experiences'
import SectionTitle from './SectionTitle'
import Icon from './Icon'

/** 競賽經歷 = 經歷與競賽時間軸 + 證明文件下載（原「檔案下載」併入） */
export default function Experiences() {
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

        {/* 證明文件下載（原檔案下載） */}
        <div className="reveal mt-16 pt-10 border-t border-line">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h3 className="font-display text-xl font-bold text-ink">證明文件下載</h3>
              <p className="mt-1 font-mono text-xs tracking-widest uppercase text-ink-soft">Credentials</p>
            </div>
            <a
              href="#experiences"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-blue text-white font-medium hover:bg-blue-dark transition-colors"
            >
              <Icon name="folder_zip" className="text-[20px]" />
              <span>一鍵下載全套 (PDF · 8.4 MB)</span>
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {CERTIFICATES.map((name) => (
              <a
                key={name}
                href="#experiences"
                className="group flex items-center justify-between gap-3 p-4 bg-paper border border-line hover:border-blue/50 hover:bg-blue-soft transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 w-9 h-11 bg-mist border border-line flex items-center justify-center text-blue">
                    <Icon name="picture_as_pdf" className="text-[20px]" />
                  </span>
                  <span className="truncate text-sm font-medium text-ink group-hover:text-blue">{name}</span>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 font-mono text-xs text-blue">
                  <Icon name="download" className="text-[16px]" />
                  下載
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
