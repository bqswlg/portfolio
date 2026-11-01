import type { Experience } from '../types'

/** 歷史回顧 = 經歷與競賽參與（新到舊，時間軸呈現） */
export const EXPERIENCES: Experience[] = [
  { id: 'exp-ijeie-2026-10', date: '2026.10', category: '學術', title: 'I.J. of Electronics and Information Engineering (IJEIE) 國際期刊', result: '論文收錄' },
  { id: 'exp-icic-2026-10', date: '2026.10', category: '學術', title: 'International Conference on Intelligent Computing (ICIC) 國際研討會', result: '論文發表' },
  { id: 'exp-ncpc-2026-10', date: '2026.10', category: '競賽', title: 'National College Programming Contest (NCPC)', result: '入圍決賽' },
  { id: 'exp-topc-2026-09', date: '2026.09', category: '競賽', title: 'ICPC Asia Taiwan Online Programming Contest (TOPC)', result: '參與競賽' },
  { id: 'exp-ta-2026-09', date: '2026.09', category: '學術', title: '資電學院 程式設計助教', result: '擔任助教' },
  { id: 'exp-pupc-2026-07', date: '2026.07', category: '獲獎', title: 'ICPC Taiwan Private University Programming Contest (PUPC)', result: '榮獲銀獎' },
  { id: 'exp-nstc-2026-06', date: '2026.06', category: '學術', title: '國科會大專生研究計畫', result: '計畫通過' },
  { id: 'exp-fcu-innovation-2026-05', date: '2026.05', category: '獲獎', title: '逢甲大學共善創新競賽－心科技・創未來', result: '榮獲佳作' },
  { id: 'exp-mmwave-2026-03', date: '2026.03', category: '獲獎', title: '毫米波雷達 AI 創意競賽', result: '榮獲亞軍' },
  { id: 'exp-ncpc-2025-10', date: '2025.10', category: '競賽', title: 'National College Programming Contest (NCPC)', result: '入圍決賽' },
  { id: 'exp-topc-2025-09', date: '2025.09', category: '競賽', title: 'ICPC Asia Taiwan Online Programming Contest (TOPC)', result: '參與競賽' },
  { id: 'exp-pupc-2025-07', date: '2025.07', category: '競賽', title: 'ICPC Taiwan Private University Programming Contest (PUPC)', result: '參與競賽' },
  { id: 'exp-hack-2025-04', date: '2025.04', category: '獲獎', title: 'Hack to the top AI 金融創新黑客松', result: '入圍決賽' },
  { id: 'exp-nantou-2024-11', date: '2024.11', category: '獲獎', title: '南投縣山城數位黑客松', result: '榮獲季軍' },
  { id: 'exp-ncpc-2024-10', date: '2024.10', category: '競賽', title: 'National College Programming Contest (NCPC)', result: '入圍決賽' },
  { id: 'exp-topc-2024-09', date: '2024.09', category: '競賽', title: 'ICPC Asia Taiwan Online Programming Contest (TOPC)', result: '參與競賽' },
  { id: 'exp-infomonth-2024-08', date: '2024.08', category: '獲獎', title: '資訊月資訊應用技能競賽 (C/C++ 團體組)', result: '團體亞軍' },
]

/**
 * 證明文件 = 競賽參與的證明文件（點擊於新分頁開啟 PDF）
 */
export const CERTIFICATES: { name: string; url: string }[] = [
  { name: '2026 PUPC 獲獎證明', url: '/certificates/2026_PUPC.pdf' },
  { name: '2026 TOPC 參賽證明', url: '/certificates/2026_TOPC.pdf' },
  { name: '2025 PUPC 參賽證明', url: '/certificates/2025_PUPC.pdf' },
  { name: 'IJEIE 國際期刊證明', url: '/certificates/IJEIE.pdf' },
  { name: 'ICIC 國際研討會證明', url: '/certificates/ICIC.pdf' },
  { name: 'ArtEcho 證明文件', url: '/certificates/ArtEcho.pdf' },
  { name: 'Hack To The Top 證明文件', url: '/certificates/HackToTheTop.pdf' },
  { name: '毫米波雷達 AI 創意競賽證明', url: '/certificates/mmwave.pdf' },
  { name: '南投縣山城數位黑客松證明', url: '/certificates/nantou.pdf' },
  { name: '資訊月資訊應用技能競賽證明', url: '/certificates/it_month.pdf' },
]