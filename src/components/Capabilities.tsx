import type { ProjectFilter } from '../types'
import { CAPABILITIES } from '../data/capabilities'
import Icon from './Icon'

interface CapabilitiesProps {
  onJump: (filter: ProjectFilter, targetId: string) => void
}

/** CAPABILITIES 四大能力矩陣（點擊跳轉至對應專案並套用篩選） */
export default function Capabilities({ onJump }: CapabilitiesProps) {
  return (
    <section
      id="capabilities"
      className="w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center bg-surface py-20 px-6 border-t border-outline-variant/20"
    >
      <div className="max-w-7xl w-full mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="font-display-hero text-headline-lg sm:text-display-hero-mobile font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary via-primary-fixed to-secondary">
            CAPABILITIES
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            點擊任一能力方格，將自動捲動至「參與專案」並篩選對應技術領域之案件
          </p>
        </div>

        {/* 四格大方向能力矩陣 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.num}
              onClick={() => onJump(cap.filter, cap.targetId)}
              className={`cursor-pointer group flex flex-col justify-between p-6 bg-surface-container-low hover:bg-surface-container border border-outline-variant/40 transition-all shadow-md ${cap.borderHoverClass}`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 bg-surface-container-high flex items-center justify-center transition-colors ${cap.iconClass} ${cap.iconHoverClass}`}
                  >
                    <Icon name={cap.icon} className="text-[26px]" />
                  </div>
                  <span className={`font-code-inline text-label-badge text-outline flex items-center gap-1 ${cap.accentHoverText}`}>
                    <span>{cap.num}</span>
                    <Icon name="arrow_outward" className="text-[16px]" />
                  </span>
                </div>
                <h3 className={`font-headline-sm text-headline-sm font-bold text-on-surface mb-2 transition-colors ${cap.accentHoverText}`}>
                  {cap.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 leading-relaxed">{cap.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-outline-variant/25">
                {cap.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-surface-container-high text-on-surface font-label-badge text-label-badge">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
