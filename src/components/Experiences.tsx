import { EXPERIENCES, CERTIFICATES } from '../data/experiences'
import Icon from './Icon'

export default function Experiences() {
  return (
    <section
      id="experiences"
      className="w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center bg-surface-container-lowest py-24 px-6 border-t border-outline-variant/30 scroll-mt-20"
    >
      <div className="max-w-6xl w-full mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="font-display-hero text-headline-lg sm:text-display-hero-mobile font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary via-primary-fixed to-secondary">
            EXPERIENCES
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            依時間由新到舊條列黑客松、論文、程式競賽、助教經歷與國科會計畫
          </p>
        </div>

        {/* 極簡分隔線列表 */}
        <div className="divide-y divide-outline-variant/30 border-t border-b border-outline-variant/30">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              id={exp.id}
              className={
                'py-5 px-3 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-container-low/50 transition-colors' +
                (exp.scrollMt ? ' scroll-mt-28' : '')
              }
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <span className="font-code-block text-code-block text-primary font-semibold w-28 shrink-0">{exp.date}</span>
                <span className={`font-label-caption text-label-caption px-2.5 py-0.5 bg-surface-container-high w-fit ${exp.tagClass}`}>
                  {exp.tag}
                </span>
                <h3 className="font-headline-sm text-body-lg font-bold text-on-surface">{exp.title}</h3>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                <span className={`font-headline-sm text-body-md font-bold ${exp.resultClass}`}>{exp.result}</span>
                <a href="#master-certificates" className="inline-flex items-center gap-1 font-code-inline text-code-inline text-primary hover:underline">
                  <span>證明連結</span>
                  <Icon name="verified" className="text-[16px]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 總證明彙整區塊 */}
        <div id="master-certificates" className="pt-6 scroll-mt-24">
          <div className="p-6 sm:p-8 bg-surface-container-low border border-primary/40 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <Icon name="folder_special" className="text-[28px]" />
                </div>
                <div>
                  <span className="font-code-inline text-label-caption text-primary uppercase tracking-wider">
                    MASTER VERIFICATION ARCHIVE
                  </span>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                    總證明文件彙整 (All-in-One Credentials Portfolio)
                  </h3>
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-on-primary-fixed font-label-badge text-label-badge font-bold hover:opacity-90 transition-all shrink-0"
              >
                <Icon name="download" className="text-[18px]" />
                <span>一鍵下載全套證明 PDF (8.4 MB)</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 font-code-inline text-code-inline">
              {CERTIFICATES.map((name) => (
                <a
                  key={name}
                  href="#contact"
                  className="flex items-center justify-between p-3.5 bg-surface-container hover:bg-surface-container-high transition-colors group"
                >
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <Icon name="picture_as_pdf" className="text-primary text-[18px]" />
                    <span className="truncate text-on-surface group-hover:text-primary">{name}</span>
                  </div>
                  <Icon name="open_in_new" className="text-outline text-[16px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
