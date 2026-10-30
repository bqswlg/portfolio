/** 頁眉／吸頂分頁導覽項目（兩字一行，仿松山） */
export interface NavItem {
  id: string
  top: string
  bottom: string
}

/** 活動戳記 / 參觀園區照片（正規化後） */
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

/** 參與專案（展開後含動機／貢獻／成果／GitHub） */
export interface Project {
  id: string
  name: string
  subtitle: string
  intro: string
  tags: string[]
  date: string
  image: string
  motivation: string
  contributions: string[]
  outcomes: { value: string; caption: string }[]
  github: string
  /** 範例/待補專案（顯示「範例」標記） */
  sample?: boolean
}

/** 歷史回顧 = 經歷與競賽（時間軸） */
export interface Experience {
  id: string
  date: string
  tag: string
  title: string
  result: string
}
