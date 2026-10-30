import { useMemo } from 'react'
import type { ProjectFilter } from '../types'
import { PROJECTS } from '../data/projects'
import ProjectCard from './ProjectCard'

interface ProjectsProps {
  filter: ProjectFilter
  onFilterChange: (filter: ProjectFilter) => void
  onOpenModal: (id: string) => void
  onHighlightExp: (id: string) => void
}

const FILTERS: { value: ProjectFilter; label: string }[] = [
  { value: 'all', label: '全部依時間排序 (All: 3)' },
  { value: 'cv', label: '電腦視覺 (Computer Vision)' },
  { value: 'vlm', label: '多模態與 VLM' },
  { value: 'edge', label: '邊緣端與 MLOps' },
]

export default function Projects({ filter, onFilterChange, onOpenModal, onHighlightExp }: ProjectsProps) {
  // 依日期新到舊排序後，計算每張卡片的 flex order 與是否符合篩選（不符者變暗並後置）
  const layout = useMemo(() => {
    const sorted = [...PROJECTS].sort((a, b) => b.date.localeCompare(a.date))
    const map = new Map<string, { order: number; matched: boolean }>()
    sorted.forEach((p, idx) => {
      const matched = filter === 'all' || p.categories.includes(filter as 'cv' | 'vlm' | 'edge')
      map.set(p.id, { order: matched ? idx + 1 : idx + 100, matched })
    })
    return map
  }, [filter])

  return (
    <section
      id="projects"
      className="w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center bg-surface py-24 px-6 border-t border-outline-variant/30 scroll-mt-20"
    >
      <div className="max-w-7xl w-full mx-auto space-y-12">
        {/* 標題與主題篩選器 */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-display-hero text-headline-lg sm:text-display-hero-mobile font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary via-primary-fixed to-secondary">
              PROJECTS
            </h2>
          </div>

          <div className="flex items-center flex-wrap gap-2 p-1.5 bg-surface-container-lowest border border-outline-variant/30">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => onFilterChange(f.value)}
                className={
                  'project-filter-btn px-4 py-2 font-label-badge text-label-badge transition-all ' +
                  (filter === f.value ? 'bg-primary text-on-primary-fixed font-bold' : 'text-on-surface-variant hover:text-primary')
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 專案卡片容器 */}
        <div className="flex flex-col gap-12">
          {PROJECTS.map((p) => {
            const info = layout.get(p.id)!
            return (
              <ProjectCard
                key={p.id}
                project={p}
                dimmed={!info.matched}
                order={info.order}
                onOpenModal={onOpenModal}
                onHighlightExp={onHighlightExp}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
