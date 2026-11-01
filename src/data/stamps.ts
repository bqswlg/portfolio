import type { Stamp, StampManifestItem } from '../types'

/**
 * 戳記後備資料（修掉原 index.js 參考未定義 FALLBACK_STAMPS_DATA 的 bug）。
 * 執行期會優先 fetch public/stamps/manifest.json；失敗時回退至此。
 */
export const FALLBACK_STAMPS: StampManifestItem[] = [
  { src: 'mmWave.jpg', tag: 'COMPETITION', title: '2026 毫米波雷達 AI 創意競賽', desc: '全國第二名得獎合照' },
  { src: '2026PUPC.JPG', tag: 'COMPETITION', title: '2026 PUPC', desc: '全國銀獎得獎合照' },
  { src: 'ArtEcho.jpg', tag: 'COMPETITION', title: '逢甲共善創新競賽', desc: '心科技・創未來 佳作' },
  { src: 'nantou.jpg', tag: 'HACKATHON', title: '2024 南投縣數位山城黑客松', desc: '全國第三名得獎合照' },
  { src: 'it-month.jpg', tag: 'COMPETITION', title: '2024 資訊月', desc: 'C/C++ 團體組第二名' },
  { src: 'HackToTheTop.jpg', tag: 'HACKATHON', title: 'Hack to the Top AI 金融創新黑客松', desc: '決賽入圍' },
  { src: '2024NCPC.jpg', tag: 'COMPETITION', title: '2024 NCPC', desc: '全國大專程式設計競賽決賽' },
  { src: 'AITEC.jpg', tag: 'PROJECT', title: '交通違規辨識分級系統', desc: 'AITEC 專案展示' },
  { src: 'mmWave2.jpg', tag: 'COMPETITION', title: '2026 毫米波雷達 AI 創意競賽', desc: '專案發表' },
  { src: 'HackToTheTop2.jpg', tag: 'HACKATHON', title: 'Hack to the Top AI 金融創新黑客松', desc: '活動過程' },
  { src: 'HackToTheTop3.jpg', tag: 'HACKATHON', title: 'Hack to the Top AI 金融創新黑客松', desc: '團隊合影' },
  { src: 'nantou2.jpg', tag: 'HACKATHON', title: '2024 南投縣數位山城黑客松', desc: '活動紀錄' },
  { src: 'messageImage_1793283935190_0.jpg', tag: 'COMPETITION', title: '2024 資訊月', desc: '資訊應用技能競賽合影' },
  { src: 'AITEC2.jpg', tag: 'PROJECT', title: '交通違規辨識分級系統', desc: 'AITEC 專案展示' },
  { src: 'AITEC3.jpg', tag: 'PROJECT', title: '交通違規辨識分級系統', desc: 'AITEC 專案展示' },
]

/** 將 manifest 項目正規化為 Stamp（自動補上 stamps/ 前綴與預設文案） */
export function normalizeStamps(items: StampManifestItem[]): Stamp[] {
  return items.map((item, idx) => ({
    id: `stamp-${idx}`,
    src:
      item.src.startsWith('http') || item.src.startsWith('stamps/')
        ? item.src.startsWith('stamps/')
          ? `/${item.src}`
          : item.src
        : `/stamps/${item.src}`,
    tag: item.tag || 'ACTIVITY STAMP',
    title: item.title || '活動紀錄',
    desc: item.desc || '活動參與紀錄與技術交流足跡',
  }))
}
