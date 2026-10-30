import type { Project } from '../types'

/** 範例專案的灰底佔位圖 */
const SAMPLE_IMG = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='640' height='400'><rect width='100%' height='100%' fill='#ececea'/><text x='50%' y='50%' fill='#9aa0ab' font-family='sans-serif' font-size='22' text-anchor='middle' dominant-baseline='middle'>範例專案 · 待補圖片</text></svg>",
)}`

/**
 * 參與專案（展開後含動機／貢獻／成果／GitHub）
 * 前 3 筆為真實專案，後 3 筆為範例卡，請於此檔替換為真實內容。
 */
export const PROJECTS: Project[] = [
  {
    id: 'project-traffic',
    name: '智慧交通違規科技執法系統',
    subtitle: 'Automated Traffic Enforcement & Multi-Object Tracking',
    intro:
      '端到端邊緣智慧執法與案件覆核平台，結合多目標持續追蹤與違規關鍵影格自動擷取；以 TensorRT INT8 量化於 Jetson 邊緣端達成 45 FPS 即時推論。',
    tags: ['YOLOv8 / ByteTrack', 'TensorRT INT8', 'FastAPI', 'Redis Stream'],
    date: '2025.09',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DMVfB-D76guON1aT2_lYTazNs2bbxyVlaTKHyX7ssX4SYo-g2fqjst_FTecU9tbGJ0H9F2MKwTxQdPW_zPCDmQa2DWHoLRdCbPvyIRNg3bqMqX7Uor7smQoKXhDdiCyO_F-zPf-P2Zu3dCmfblzoePAUbjdYev5ysHNonLcNBSNmqlC41QtQ0kAxH3PEd-0iBNH572qVc5NSm44JGIvGHlyc_DgL9_ZSa42i',
    motivation:
      '傳統路口科技執法於尖峰車流密集遮擋易產生軌跡中斷與誤檢，高精準重型網路又無法於邊緣硬體維持 30+ FPS，導致雲端頻寬與人工覆核成本居高不下。',
    contributions: [
      '主導模型結構化剪枝與 TensorRT INT8 量化，模型體積壓縮 60%，於邊緣端達成 45 FPS 穩定推論。',
      '設計 ByteTrack 軌跡關聯與多邊形 IoU 違規關鍵影格擷取邏輯，並以 FastAPI + Redis 解耦高併發串流。',
    ],
    outcomes: [
      { value: '-78% 誤檢率', caption: '大幅降低人工覆核成本' },
      { value: '總統盃 / PUPC 銀獎', caption: '45 FPS 多路實地路口驗證' },
    ],
    github: 'https://github.com',
  },
  {
    id: 'project-guidesense',
    name: 'GuideSense 視障者多模態空間導引系統',
    subtitle: 'Wearable mmWave Radar & Vision-Language Navigation',
    intro:
      '結合抗候性 60GHz 毫米波雷達 3D 點雲與輕量化視覺語言模型（VLM）的穿戴式全天候避障系統，將前方障礙方位與語意即時轉為低延遲語音導引（端到端 114ms）。',
    tags: ['VLM (MiniCPM-V)', 'mmWave Radar', '3D CNN', 'WebSocket'],
    date: '2024.11',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkl7wnTkGqVVdUU3COkZg-GAb9brMWsRxRGg1RCUSV4n8IjqZaKVMZj2PrcaQ4twMZjRmJ41tSL-BavAWdC1ubzjV7f5NvpC3rGFvzpUkCrX_9pJ8kvm_Hy10SLwW2kU-ZibgH2Qvd-As6d_r9Fnp5Gn0NDB4dvOCgUexbMU1zAshrFdGTR6F2QZ7gGvQAU6tIlyjjsH1YEasyk2Md_7Y6HPB-Ybq4jMvhvxEP',
    motivation:
      '傳統導盲杖與超音波僅能偵測單點距離，缺乏空間語意理解且無法預警懸空障礙；純視覺相機在強光、夜間或雨霧環境下極易失效。',
    contributions: [
      '設計 3D CNN 跨模態特徵對齊網路，融合毫米波雷達稀疏點雲與 RGB 影像特徵，克服背光與視線死角。',
      '微調輕量化 VLM 並建構雙向音訊串流管線，將端到端語音導引延遲壓縮至 114ms 以內。',
    ],
    outcomes: [
      { value: '全國第二名 (亞軍)', caption: '全國毫米波雷達智慧感測競賽' },
      { value: '國科會計畫核定', caption: '大專學生研究計畫補助執行' },
    ],
    github: 'https://github.com',
  },
  {
    id: 'project-artecho',
    name: 'ArtEcho 多模態 RAG 藝術策展導覽系統',
    subtitle: 'Multimodal Self-RAG Art Curation & Retrieval',
    intro:
      '以 CLIP 雙編碼向量檢索與 Self-RAG 反思驗證機制打造支援「以圖搜史料」的智慧導覽平台，強制核對館藏文獻編號後生成回答，史料查核精準度達 96.5%。',
    tags: ['Multimodal Self-RAG', 'CLIP ViT-L/14', 'ChromaDB', 'LangChain'],
    date: '2024.05',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrMjbeuRP6RMcFX5sA8rWF6xZnv9NWqnPZ8RNvYvpD_rehlRsKkLKeBEvyGPWef6-GkCsCMoARQDngQqcqY152qr4Q5i-f7CbwwEt95DPvUmo1KrsY3u4hccXedNgk-Gd9DRgYjsRrZl9HIhpIOwOoupjAQleuUcadbZ8zLyvvGyCJMzqcPMaArEqG15q1ab5SrfmsCBzoYKhgBSZt2PjnjewbKmtCv6F4h9cq',
    motivation:
      '傳統語音導覽僅能單向播放固定腳本；直接套用通用 LLM 解說本土畫作與生僻史料會產生高達 34% 的事實幻覺，缺乏史料引用根據。',
    contributions: [
      '使用 CLIP ViT-L/14 與 ChromaDB 建構十萬級圖文同構向量資料庫，實現毫秒級跨模態相似度檢索。',
      '實作 Self-RAG Critic 反思過濾節點，強制核對館藏文獻編號後才生成回答，將事實精準度推升至 96.5%。',
    ],
    outcomes: [
      { value: '96.5% 查核精準度', caption: '有效抑制 LLM 史料幻覺' },
      { value: '最佳技術創新獎', caption: '展區停留互動時長提升 3.4 倍' },
    ],
    github: 'https://github.com',
  },
  // ── 以下為範例卡，請替換為真實專案 ──
  {
    id: 'project-sample-1',
    name: '範例專案一',
    subtitle: 'Sample Project — replace in src/data/projects.tsx',
    intro: '這是範例專案卡。請於 src/data/projects.tsx 替換為真實的專案名稱、簡介、技術標籤與時間。',
    tags: ['Tag A', 'Tag B', 'Tag C'],
    date: '2024.03',
    image: SAMPLE_IMG,
    sample: true,
    motivation: '（範例）此處說明專案動機與要解決的痛點，請替換為真實內容。',
    contributions: ['（範例）你在此專案的核心貢獻一。', '（範例）你在此專案的核心貢獻二。'],
    outcomes: [
      { value: '範例成果', caption: '量化指標或獎項' },
      { value: '範例獎項', caption: '補充說明' },
    ],
    github: 'https://github.com',
  },
  {
    id: 'project-sample-2',
    name: '範例專案二',
    subtitle: 'Sample Project — replace in src/data/projects.tsx',
    intro: '這是範例專案卡。請於 src/data/projects.tsx 替換為真實的專案名稱、簡介、技術標籤與時間。',
    tags: ['Tag A', 'Tag B', 'Tag C'],
    date: '2023.11',
    image: SAMPLE_IMG,
    sample: true,
    motivation: '（範例）此處說明專案動機與要解決的痛點，請替換為真實內容。',
    contributions: ['（範例）你在此專案的核心貢獻一。', '（範例）你在此專案的核心貢獻二。'],
    outcomes: [
      { value: '範例成果', caption: '量化指標或獎項' },
      { value: '範例獎項', caption: '補充說明' },
    ],
    github: 'https://github.com',
  },
  {
    id: 'project-sample-3',
    name: '範例專案三',
    subtitle: 'Sample Project — replace in src/data/projects.tsx',
    intro: '這是範例專案卡。請於 src/data/projects.tsx 替換為真實的專案名稱、簡介、技術標籤與時間。',
    tags: ['Tag A', 'Tag B', 'Tag C'],
    date: '2023.06',
    image: SAMPLE_IMG,
    sample: true,
    motivation: '（範例）此處說明專案動機與要解決的痛點，請替換為真實內容。',
    contributions: ['（範例）你在此專案的核心貢獻一。', '（範例）你在此專案的核心貢獻二。'],
    outcomes: [
      { value: '範例成果', caption: '量化指標或獎項' },
      { value: '範例獎項', caption: '補充說明' },
    ],
    github: 'https://github.com',
  },
]
