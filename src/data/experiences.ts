import type { Experience } from '../types'

/** 歷史回顧 = 經歷與競賽參與（新到舊，時間軸呈現） */
export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-cathay-2025',
    date: '2025.03',
    tag: '黑客松',
    title: '國泰金控 青年 AI 金融科技黑客松（Multi-Agent 企業徵信系統）',
    result: '佳作入選 (Honorable Mention)',
  },
  {
    id: 'exp-paper-2024',
    date: '2024.12',
    tag: '學術論文',
    title: 'RGB-D 視覺導航與異質感測點雲空間融合架構研究論文發表',
    result: '研討會論文收錄發表',
  },
  {
    id: 'exp-hackathon-2024',
    date: '2024.11',
    tag: '黑客松',
    title: '總統盃黑客松 / 全國 PUPC 開放資料與邊緣 AI 應用競賽',
    result: '全國銀獎 (Silver Award)',
  },
  {
    id: 'exp-ncpc-2024',
    date: '2024.10',
    tag: '程式競賽',
    title: '教育部全國大專電腦軟體設計競賽 (NCPC)',
    result: '連續入圍決賽晉級 (Finalist)',
  },
  {
    id: 'exp-mmwave-2024',
    date: '2024.08',
    tag: '智慧感測賽',
    title: '全國毫米波雷達智慧感測創意競賽（GuideSense 穿戴導引）',
    result: '全國第二名 / 亞軍 (2nd Place)',
  },
  {
    id: 'exp-nstc-2024',
    date: '2024.06',
    tag: '國科會',
    title: '國家科學及技術委員會 (NSTC) 大專學生研究計畫',
    result: '正式核定通過並獲研究補助',
  },
  {
    id: 'exp-nantou-2024',
    date: '2024.05',
    tag: '黑客松',
    title: '南投數位山城地方創生與 AIoT 應用黑客松',
    result: '最佳技術創新獎',
  },
  {
    id: 'exp-cpe-2024',
    date: '2024.03',
    tag: '程式競賽',
    title: 'ACM-ICPC 台灣委員會 CPE 大學程式能力檢定',
    result: '全國排名前 2% (Top 2% 頂標)',
  },
  {
    id: 'exp-ta-2023',
    date: '2023.09 - 至今',
    tag: '助教經歷',
    title: '逢甲大學資工系「C/C++ 程式設計」與「公共經濟學量化分析」雙門教學助教',
    result: '指導 120+ 名學生 / 自動評測開發',
  },
]

/**
 * 證明文件 = 競賽參與的證明文件（點擊於新分頁開啟 PDF）
 * url 請替換為實際 PDF 連結，或將檔案放入 public/certificates/
 */
export const CERTIFICATES: { name: string; url: string }[] = [
  { name: '總統盃與 PUPC 全國銀獎證書', url: '/certificates/01-president-cup-pupc.pdf' },
  { name: '國科會大專生研究計畫核定函', url: '/certificates/02-nstc-grant.pdf' },
  { name: '全國毫米波雷達競賽亞軍獎狀', url: '/certificates/03-mmwave-2nd.pdf' },
  { name: 'NCPC 全國大專軟體競賽決賽證明', url: '/certificates/04-ncpc-finalist.pdf' },
  { name: 'CPE 全國前 2% 頂標成績單與論文', url: '/certificates/05-cpe-top2.pdf' },
  { name: '逢甲資工 GPA 成績單與助教聘書', url: '/certificates/06-fcu-gpa-ta.pdf' },
]
