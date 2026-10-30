import type { Project } from '../types'
import Icon from './Icon'

interface ProjectCardProps {
  project: Project
  dimmed: boolean
  order: number
  onOpenModal: (id: string) => void
  onHighlightExp: (id: string) => void
}

export default function ProjectCard({ project: p, dimmed, order, onOpenModal, onHighlightExp }: ProjectCardProps) {
  return (
    <article
      id={p.id}
      style={{ order }}
      className={
        'project-card grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8 bg-surface-container-low border border-outline-variant/30 transition-all duration-500 items-stretch ' +
        (dimmed ? 'opacity-35 brightness-50 saturate-50 scale-[0.98]' : 'opacity-100')
      }
    >
      {/* 左欄 (7 cols) */}
      <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className={`px-2.5 py-1 font-code-inline text-label-caption ${p.metaBadgeClass}`}>{p.metaBadge}</span>
            <span className={`font-code-inline text-label-caption ${p.metaRightClass}`}>{p.metaRight}</span>
          </div>

          <div>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">{p.title}</h3>
            <p className={`font-code-inline text-code-inline mt-0.5 ${p.subtitleClass}`}>{p.subtitle}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((tag, i) =>
              i === 0 ? (
                <span key={tag} className={`px-2.5 py-1 bg-surface-container-high font-label-badge text-label-badge ${p.firstTagClass}`}>
                  {tag}
                </span>
              ) : (
                <span key={tag} className="px-2.5 py-1 bg-surface-container font-label-badge text-label-badge text-on-surface-variant">
                  {tag}
                </span>
              ),
            )}
          </div>

          {/* 痛點 */}
          <div className="p-3.5 bg-surface-container border-l-2 border-error">
            <div className="flex items-center gap-1.5 font-code-inline text-label-badge text-error mb-1">
              <Icon name={p.painIcon} className="text-[16px]" />
              <span>痛點 (PAIN POINT)</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{p.pain}</p>
          </div>

          {/* 概述 */}
          <div className="p-3.5 bg-surface-container border-l-2 border-tertiary">
            <div className="flex items-center gap-1.5 font-code-inline text-label-badge text-tertiary mb-1">
              <Icon name="description" className="text-[16px]" />
              <span>概述 (OVERVIEW)</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{p.overview}</p>
          </div>

          {/* 我的貢獻 */}
          <div className={`p-3.5 bg-surface-container border-l-2 ${p.contribBorderClass}`}>
            <div className={`flex items-center gap-1.5 font-code-inline text-label-badge mb-1.5 ${p.contribArrowClass}`}>
              <Icon name="engineering" className="text-[16px]" />
              <span>我的貢獻 (MY CONTRIBUTIONS)</span>
            </div>
            <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
              {p.contributions.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className={`font-bold ${p.contribArrowClass}`}>›</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 成果與榮譽（跳轉經歷） */}
        <a
          href={`#${p.outcome.expId}`}
          onClick={() => onHighlightExp(p.outcome.expId)}
          className={`group block p-4 bg-surface-container-high border transition-all ${p.outcome.linkClass}`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className={`flex items-center gap-1.5 font-code-inline text-label-badge ${p.outcome.accentText}`}>
              <Icon name={p.outcome.icon} className="text-[16px]" />
              <span>{p.outcome.label}</span>
            </div>
            <Icon name="arrow_downward" className={`text-[18px] group-hover:translate-x-1 transition-transform ${p.outcome.accentText}`} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {p.outcome.stats.map((s, i) => (
              <div key={i}>
                <span className={`font-code-block text-headline-sm font-bold ${s.valueClass}`}>{s.value}</span>
                <p className="font-label-caption text-label-caption text-on-surface-variant">{s.caption}</p>
              </div>
            ))}
          </div>
        </a>
      </div>

      {/* 右欄 (5 cols) */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-4">
        <div className="relative overflow-hidden bg-surface-container-lowest border border-outline-variant/30">
          <img className="w-full h-56 sm:h-60 object-cover" src={p.image} alt={p.imageAlt} />
          {p.imageBadges}
        </div>

        {p.visual}

        <div className="grid grid-cols-2 gap-3 pt-1">
          <a
            href={p.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-primary text-on-primary-fixed font-label-badge text-label-badge font-bold hover:opacity-90 transition-all shadow-md"
          >
            <Icon name="code" className="text-[18px]" />
            <span>GitHub Repo 連結</span>
          </a>
          <button
            type="button"
            onClick={() => onOpenModal(p.modalId)}
            className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-badge text-label-badge font-semibold transition-all"
          >
            <Icon name={p.modalIcon} className="text-[18px]" />
            <span>{p.modalLabel}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
