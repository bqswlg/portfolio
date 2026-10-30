import type { ReactNode } from 'react'

/** 專案主題篩選值 */
export type ProjectFilter = 'all' | 'cv' | 'vlm' | 'edge'
export type ProjectCategory = 'cv' | 'vlm' | 'edge'

/** 頁眉導覽項目 */
export interface NavItem {
  /** 對應區段的 DOM id */
  id: string
  label: string
}

/** 活動戳記（正規化後） */
export interface Stamp {
  id: string
  src: string
  tag: string
  title: string
  desc: string
}

/** stamps/manifest.json 的原始項目 */
export interface StampManifestItem {
  src: string
  tag?: string
  title?: string
  desc?: string
}

/** 能力矩陣方格 */
export interface Capability {
  icon: string
  num: string
  title: string
  desc: string
  tags: string[]
  filter: ProjectFilter
  targetId: string
  /** 以下為「字面」Tailwind class（v4 JIT 僅掃描字面字串，不可字串拼接） */
  iconClass: string
  iconHoverClass: string
  borderHoverClass: string
  accentHoverText: string
}

/** 專案成果統計 */
export interface ProjectStat {
  value: string
  valueClass: string
  caption: string
}

/** 參與專案卡片 */
export interface Project {
  id: string
  categories: ProjectCategory[]
  date: string
  // 標頭
  metaBadge: string
  metaBadgeClass: string
  metaRight: string
  metaRightClass: string
  title: string
  subtitle: string
  subtitleClass: string
  // 技術標籤（第一個為高亮）
  tags: string[]
  firstTagClass: string
  // 痛點 / 概述
  painIcon: string
  pain: string
  overview: string
  // 我的貢獻
  contribBorderClass: string
  contribArrowClass: string
  contributions: string[]
  // 成果與榮譽（連結至經歷）
  outcome: {
    expId: string
    icon: string
    label: string
    linkClass: string
    accentText: string
    stats: ProjectStat[]
  }
  // 右欄
  image: string
  imageAlt: string
  imageBadges: ReactNode
  visual: ReactNode
  githubUrl: string
  modalId: string
  modalIcon: string
  modalLabel: string
}

/** 專案架構拓撲 Modal */
export interface ModalStep {
  title: string
  desc: string
  accentClass: string
}

export interface ArchModal {
  id: string
  eyebrow: string
  eyebrowClass: string
  title: string
  gridClass: string
  steps: ModalStep[]
}

/** 競賽經歷 */
export interface Experience {
  id: string
  date: string
  tag: string
  tagClass: string
  title: string
  result: string
  resultClass: string
  scrollMt?: boolean
}
