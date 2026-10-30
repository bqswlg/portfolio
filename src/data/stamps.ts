import type { Stamp, StampManifestItem } from '../types'

/**
 * 戳記後備資料（修掉原 index.js 參考未定義 FALLBACK_STAMPS_DATA 的 bug）。
 * 執行期會優先 fetch public/stamps/manifest.json；失敗時回退至此。
 */
export const FALLBACK_STAMPS: StampManifestItem[] = [
  { src: 'DSC00342-1.jpg', tag: 'COMPETITION', title: '共善創新競賽', desc: '佳作得獎合照' },
  { src: 'IMG_0208.JPG', tag: 'COMPETITION', title: '2026 PUPC', desc: '銅獎得獎合照' },
  { src: 'LINE_ALBUM_0426_250426_20.jpg', tag: 'HACKATHON', title: 'Hack to the top AI金融創新黑客松', desc: '活動過程' },
  { src: 'LINE_ALBUM_2025426_261019_1.jpg', tag: 'HACKATHON', title: 'Hack to the top AI金融創新黑客松', desc: '活動合影' },
  { src: 'messageImage_1793283912577_0.jpg', tag: 'COMPETITION', title: '2024 NCPC', desc: '活動合影' },
  { src: 'messageImage_1793283923414_0.jpg', tag: 'HACKATHON', title: '2024 南投縣數位山城黑客松', desc: '第三名得獎合照' },
  { src: 'messageImage_1793283935190_0.jpg', tag: 'COMPETITION', title: '2024 資訊月', desc: '銅獎得獎合照' },
  { src: 'messageImage_1793283957130_0.jpg', tag: 'HACKATHON', title: 'Hack to the top AI金融創新黑客松', desc: '活動過程' },
  { src: 'S__22405151.jpg', tag: 'COMPETITION', title: '2026 毫米波雷達AI創意競賽', desc: '第二名得獎合照' },
  { src: 'S__22405152.jpg', tag: 'COMPETITION', title: '2026 毫米波雷達AI創意競賽', desc: '專案發表' },
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
