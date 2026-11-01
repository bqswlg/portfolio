import type { Project } from '../types'

/** 架構圖待補的灰底佔位圖（請置換為實際架構圖） */
const PENDING_IMG = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='640' height='400'><rect width='100%' height='100%' fill='#ececea'/><text x='50%' y='50%' fill='#9aa0ab' font-family='sans-serif' font-size='22' text-anchor='middle' dominant-baseline='middle'>架構圖 · 待補</text></svg>",
)}`

/**
 * 參與專案（展開後含動機／貢獻／成果／GitHub）
 * 依時間新到舊排序；架構圖與 GitHub 連結為佔位，請替換為實際內容。
 */
export const PROJECTS: Project[] = [
  {
    id: 'project-traffic-triage',
    name: '基於 AI 多模態技術之交通違規樣態自動辨識與智慧化案件分級系統',
    subtitle: 'Multimodal Traffic Violation Recognition & Case Triage',
    intro:
      '整合 YOLO 物件偵測與 VLM 情境判讀，分析交通違規行為及其發生情境，輔助辨識特殊交通情境，並提供案件分級與審查參考。',
    tags: ['Python', 'FastAPI', 'YOLO', 'BoT-SORT', 'VLM', 'LLM', 'RAG', 'Kafka', 'JavaScript', 'Firebase', 'JWT'],
    date: '2025.09 - 現在',
    image: PENDING_IMG,
    motivation:
      '現行科技執法系統主要依據影像辨識結果判定違規，對於施工改道、禮讓救護車等特殊交通情境，較缺乏進一步的情境判讀機制。此外，影像辨識誤判可能增加無效違規案件，使審查人員仍需投入大量時間進行人工確認。',
    contributions: [
      '負責影像資料標記與清洗，建立模型訓練所需資料集。',
      '進行 YOLO 模型訓練與參數微調，驗證集各物件類別 mAP@50 平均約 0.9。',
      '使用 Python 開發違規判定邏輯與案件資料封裝流程。',
      '透過 Kafka 串接 YOLO、VLM 與 LLM 模組，建立跨模型資料傳遞流程。',
      '規劃並實作前端審查介面與案件管理功能。',
    ],
    outcomes: [
      { value: '台南市交通警察大隊實測', caption: '系統實地測試並獲得肯定' },
      { value: '國科會大專生研究計畫', caption: '通過核定（115-2813-C-035-123-E）' },
    ],
    github: 'https://github.com',
  },
  {
    id: 'project-guidesense',
    name: '整合毫米波雷達與輕量化視覺以提升路口通行安全之多模態輔助導航系統',
    subtitle: 'mmWave Radar × Lightweight Vision Assistive Navigation',
    intro:
      '結合 YOLO 影像辨識與毫米波雷達感測技術，提供視障者戶外行走時的交通號誌辨識及障礙物距離感知輔助。',
    tags: ['mmWave Radar', 'YOLOv8n', 'Python', '3D CNN', 'Raspberry Pi', 'Swift'],
    date: '2025.09 - 2026.09',
    image: PENDING_IMG,
    motivation:
      '傳統輔具及單一視覺或雷達感測系統，難以同時滿足視障者在戶外行走時對交通號誌辨識與障礙物距離感知的需求，因此透過不同感測技術的應用，改善單一感測方式在環境適應上的限制。',
    contributions: [
      '負責毫米波雷達資料蒐集、整理與前處理。',
      '進行 3D CNN 深度學習模型訓練與調整。',
      '執行系統效能評估與模擬測試，檢視模型辨識表現。',
    ],
    outcomes: [
      { value: '全國第二名', caption: '第二屆毫米波雷達 AI 創意應用賽' },
      { value: 'IJEIE 國際期刊收錄', caption: 'DOI 10.6636/IJEIE.202612_18(2).02（In Press, Dec. 2026）' },
      { value: 'ICIC 2026 國際研討會', caption: '論文發表' },
    ],
    github: 'https://github.com',
  },
  {
    id: 'project-art-companion',
    name: '數據回饋自我察覺之生成式 AI 藝術陪伴系統',
    subtitle: 'Generative-AI Art Companion for Self-Awareness',
    intro:
      '以藝術創作過程中的操作與影像資料為基礎，結合生成式 AI 提供互動式情緒引導，協助使用者整理創作歷程並進行自我覺察。',
    tags: ['Fabric.js', 'Vision API', 'OpenCV', 'FastAPI', 'RAG', 'LLM', 'PostgreSQL', 'S3 / MinIO'],
    date: '2026.03 - 2026.05',
    image: PENDING_IMG,
    motivation:
      '隨著青少年心理健康議題受到重視，傳統心理輔導資源面臨人力與服務可近性限制；另一方面，生成式 AI 的發展也使數位工具逐漸成為使用者尋求情緒支持的管道，因此希望透過藝術創作資料與 AI 技術，提供輔助性的自我探索方式。',
    contributions: [
      '串接 OpenAI API，結合 Prompt Engineering 與 RAG 技術，設計蘇格拉底式提問流程，提供非診斷性的開放式情緒引導。',
      '將前端應用部署至 Vercel，運用 CDN 與自動化 CI/CD 流程，支援跨裝置存取與版本更新。',
      '透過 FastAPI 整合 Fabric.js 筆跡資料、OpenCV 影像特徵與 PostgreSQL／S3 資料儲存服務。',
    ],
    outcomes: [
      { value: '共善創新競賽 佳作', caption: '2026 逢甲大學－心科技・創未來' },
      { value: '藝術治療師專業訪談', caption: '台灣藝術治療學會，獲正面回饋' },
    ],
    github: 'https://github.com',
  },
  {
    id: 'project-fintech',
    name: '智慧理財應用程式',
    subtitle: 'AI Personal Finance & Smart Savings App',
    intro:
      '整合收支管理、語音記帳與 AI 消費分析功能，運用機器學習與生成式 AI 分析使用者消費習慣，提供個人化理財建議及儲蓄規劃，協助使用者掌握財務狀況。',
    tags: ['Flutter', 'NLP', 'SQLite', 'FastAPI', 'Python', 'Gemini API', 'ML KMeans', 'Pydantic', 'Render'],
    date: '2025.01 - 2025.04',
    image: PENDING_IMG,
    motivation:
      '傳統記帳軟體多以收支紀錄為主，較缺乏消費行為分析、個人化理財建議與長期儲蓄目標追蹤功能，因此希望結合機器學習與生成式 AI，提升記帳資料的應用價值。',
    contributions: [
      '開發智慧儲蓄規劃模組，結合 Pydantic 資料驗證與規劃演算法，追蹤儲蓄進度並提供財務調整建議。',
      '使用 FastAPI 與 Python 開發後端服務，將理財及分析功能封裝為 RESTful API，供前端應用介接。',
    ],
    outcomes: [{ value: 'Hack to the Top 決賽入圍', caption: 'AI 金融創新黑客松' }],
    github: 'https://github.com',
  },
  {
    id: 'project-nantou-travel',
    name: '透過生成式 AI 與資料驅動的旅遊文案寫作推動南投縣多點旅遊計畫',
    subtitle: 'Generative-AI Travel Copywriting for Nantou Tourism',
    intro:
      '結合生成式 AI 與遊戲化打卡機制開發旅遊 App，運用 RAG 技術整合南投地區景點資料，生成具動漫風格的旅遊文案，提升非熱門景點的曝光度，促進觀光人潮分流與在地旅遊發展。',
    tags: ['OpenAI API', 'RAG', '圖像辨識模型', 'Swift'],
    date: '2024.07 - 2024.10',
    image: PENDING_IMG,
    motivation:
      '觀光人潮集中於少數熱門景點，容易造成交通壅塞，而部分非熱門景點則因缺乏有效的行銷方式與曝光管道，較難吸引旅客，因此希望透過生成式 AI 與遊戲化機制，提高旅客探索不同景點的意願。',
    contributions: [
      '蒐集政府公開資料、網路資源與實地調查紀錄，進行資料清洗、結構化整理及特徵萃取，建立旅遊領域知識資料庫。',
    ],
    outcomes: [{ value: '全國第三名', caption: '2024 南投縣數位山城黑客松' }],
    github: 'https://github.com',
  },
  {
    id: 'project-familyactive',
    name: 'FamilyActive 家庭運動紀錄框架',
    subtitle: 'FamilyActive — OOP Exercise-Tracking Framework (Java)',
    intro:
      '以家庭運動紀錄為應用情境，開發 Java Console App 框架，透過運動點數與家庭旅遊基金的轉換機制，結合物件導向設計、SOLID 原則及七種設計模式，提升程式架構的模組化程度與擴充性。',
    tags: ['Java 11', 'MVC 架構', 'SOLID 原則', 'OOP', 'Design Patterns', 'Console App 開發'],
    date: '2024.07 - 2024.10',
    image: PENDING_IMG,
    motivation:
      '希望透過遊戲化的運動紀錄與家庭獎勵機制，提高使用者持續運動的意願，並藉由此專案練習物件導向設計、設計模式及軟體架構規劃。',
    contributions: ['個人練習專案，負責整體程式架構設計與功能實作。'],
    outcomes: [{ value: '個人技術練習專案', caption: 'OOP／SOLID／設計模式實作' }],
    github: 'https://github.com',
  },
]
