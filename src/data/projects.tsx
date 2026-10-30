import type { Project } from '../types'

/** PROJECTS — 三個參與專案（含影像浮標與各自獨特的模擬示意 SVG） */
export const PROJECTS: Project[] = [
  // ============ 專案 1：智慧交通違規科技執法 ============
  {
    id: 'project-traffic',
    categories: ['cv', 'edge'],
    date: '2025-09',
    metaBadge: '2025.09 // PRODUCTION SYSTEM',
    metaBadgeClass: 'bg-surface-container text-primary',
    metaRight: 'Jetson AGX Orin • CUDA',
    metaRightClass: 'text-on-surface-variant',
    title: '智慧交通違規多目標辨識與追蹤科技執法系統',
    subtitle: 'Automated Traffic Enforcement & Multi-Object Tracking Platform',
    subtitleClass: 'text-primary-fixed-dim',
    tags: ['YOLOv8 / ByteTrack', 'TensorRT INT8 PTQ', 'FastAPI', 'Redis Stream', 'Firebase Firestore'],
    firstTagClass: 'text-primary',
    painIcon: 'crisis_alert',
    pain: '傳統路口科技執法因尖峰車流密集遮擋（Occlusion）易產生軌跡中斷與誤檢，且高精準度重型網路無法於邊緣硬體維持 30+ FPS 即時運算，導致雲端串流頻寬與人工覆核成本極高。',
    overview:
      '建構端到端邊緣智慧執法與案件覆核平台，結合多目標持續追蹤、違規關鍵影格（Keyframe）自動擷取規則與即時後端驗證介面，實現低延遲多路 RTSP 串流自動化違規舉發。',
    contribBorderClass: 'border-primary',
    contribArrowClass: 'text-primary',
    contributions: [
      '主導模型結構化剪枝與 TensorRT INT8 量化，模型體積壓縮 60%，於邊緣端達成 45 FPS 穩定推論。',
      '設計 ByteTrack 軌跡關聯與多邊形 IoU 違規關鍵影格擷取邏輯，並以 FastAPI + Redis 解耦高併發串流。',
    ],
    outcome: {
      expId: 'exp-hackathon-2024',
      icon: 'military_tech',
      label: '成果與榮譽 (OUTCOME — 點擊跳轉至對應競賽經歷)',
      linkClass: 'hover:bg-primary/15 border-primary/40',
      accentText: 'text-primary',
      stats: [
        { value: '-78% 誤檢率', valueClass: 'text-primary', caption: '大幅降低人工覆核成本' },
        { value: '總統盃 / PUPC 銀獎', valueClass: 'text-on-surface', caption: '45 FPS 多路實地路口驗證' },
      ],
    },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DMVfB-D76guON1aT2_lYTazNs2bbxyVlaTKHyX7ssX4SYo-g2fqjst_FTecU9tbGJ0H9F2MKwTxQdPW_zPCDmQa2DWHoLRdCbPvyIRNg3bqMqX7Uor7smQoKXhDdiCyO_F-zPf-P2Zu3dCmfblzoePAUbjdYev5ysHNonLcNBSNmqlC41QtQ0kAxH3PEd-0iBNH572qVc5NSm44JGIvGHlyc_DgL9_ZSa42i',
    imageAlt: 'Traffic System UI',
    imageBadges: (
      <>
        <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-surface/90 backdrop-blur-md font-code-inline text-label-caption text-on-surface">
          <span className="w-2 h-2 bg-error animate-ping"></span>
          <span>系統畫面 // CAM-04A 違規偵測</span>
        </div>
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-surface/90 backdrop-blur-md font-code-inline text-label-caption text-primary">
          TensorRT: 21.8ms (45.2 FPS)
        </div>
      </>
    ),
    visual: (
      <div className="flex-1 flex flex-col justify-between p-4 bg-surface-container border border-outline-variant/25">
        <div className="flex items-center justify-between text-label-caption font-code-inline text-on-surface-variant mb-2">
          <span>專案模擬示意圖 // 軌跡追蹤與 FPS 穩定度模擬</span>
          <span className="text-primary font-bold">ByteTrack + Kalman</span>
        </div>
        <div className="w-full h-24 flex items-center">
          <svg className="w-full h-full stroke-primary fill-transparent overflow-visible" viewBox="0 0 300 70">
            <line className="text-outline-variant/30" stroke="currentColor" strokeDasharray="2,4" x1="0" x2="300" y1="15" y2="15" />
            <line className="text-outline-variant/30" stroke="currentColor" strokeDasharray="2,4" x1="0" x2="300" y1="50" y2="50" />
            <path
              className="text-primary"
              d="M 0 42 L 30 36 L 60 40 L 90 28 L 120 25 L 150 30 L 180 22 L 210 20 L 240 24 L 270 19 L 300 18"
              stroke="currentColor"
              strokeWidth="2.2"
            />
            <path
              className="fill-primary/15"
              d="M 0 42 L 30 36 L 60 40 L 90 28 L 120 25 L 150 30 L 180 22 L 210 20 L 240 24 L 270 19 L 300 18 L 300 68 L 0 68 Z"
              stroke="none"
            />
            <circle className="fill-primary" cx="180" cy="22" r="3.5" />
            <text className="fill-primary font-code-inline text-[9px]" x="145" y="12">
              Keyframe Triggered
            </text>
          </svg>
        </div>
        <div className="flex justify-between font-code-inline text-label-caption text-outline pt-1">
          <span>RTSP Ingest</span>
          <span>INT8 Inference</span>
          <span>Violation Verified</span>
        </div>
      </div>
    ),
    githubUrl: 'https://github.com',
    modalId: 'modal-traffic',
    modalIcon: 'schema',
    modalLabel: '系統架構拓撲',
  },

  // ============ 專案 2：GuideSense 視障者多模態空間導引 ============
  {
    id: 'project-guidesense',
    categories: ['vlm', 'edge'],
    date: '2024-11',
    metaBadge: '2024.11 // NSTC FUNDED RESEARCH',
    metaBadgeClass: 'bg-secondary-container text-on-secondary-container',
    metaRight: '60GHz mmWave + VLM',
    metaRightClass: 'text-secondary',
    title: 'GuideSense — 視障者多模態穿戴式空間導引與避障系統',
    subtitle: 'Wearable mmWave Radar & Vision-Language Spatial Navigation System',
    subtitleClass: 'text-secondary',
    tags: ['VLM (MiniCPM-V)', 'TI IWR6843 mmWave', '3D CNN PointCloud', 'FastAPI WebSocket'],
    firstTagClass: 'text-secondary',
    painIcon: 'accessibility_new',
    pain: '傳統導盲杖與超音波僅能偵測單點距離，缺乏「空間語意理解」且無法預警懸空障礙物；純視覺相機則在強光眩光、夜間或雨霧環境下極易失效。',
    overview:
      '結合抗候性 60GHz 毫米波雷達 3D 點雲與輕量化視覺語言模型（VLM），建構穿戴式全天候空間感知系統，將前方障礙物方位、距離與語意即時轉為低延遲語音導引。',
    contribBorderClass: 'border-secondary',
    contribArrowClass: 'text-secondary',
    contributions: [
      '設計 3D CNN 跨模態特徵對齊網路，融合毫米波雷達稀疏點雲與 RGB 影像特徵，克服背光與視線死角。',
      '微調輕量化 VLM 並建構雙向音訊串流管線，將端到端語音導引延遲壓縮至 114ms 以內。',
    ],
    outcome: {
      expId: 'exp-mmwave-2024',
      icon: 'workspace_premium',
      label: '成果與榮譽 (OUTCOME — 點擊跳轉至對應競賽與國科會經歷)',
      linkClass: 'hover:bg-secondary/15 border-secondary/40',
      accentText: 'text-secondary',
      stats: [
        { value: '全國第二名 (亞軍)', valueClass: 'text-secondary', caption: '全國毫米波雷達智慧感測競賽' },
        { value: '國科會計畫核定', valueClass: 'text-primary', caption: '大專學生研究計畫補助執行' },
      ],
    },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkl7wnTkGqVVdUU3COkZg-GAb9brMWsRxRGg1RCUSV4n8IjqZaKVMZj2PrcaQ4twMZjRmJ41tSL-BavAWdC1ubzjV7f5NvpC3rGFvzpUkCrX_9pJ8kvm_Hy10SLwW2kU-ZibgH2Qvd-As6d_r9Fnp5Gn0NDB4dvOCgUexbMU1zAshrFdGTR6F2QZ7gGvQAU6tIlyjjsH1YEasyk2Md_7Y6HPB-Ybq4jMvhvxEP',
    imageAlt: 'GuideSense UI',
    imageBadges: (
      <>
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-surface/90 backdrop-blur-md font-code-inline text-label-caption text-secondary">
          系統畫面 // 點雲與 VLM 空間融合
        </div>
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-surface/90 backdrop-blur-md font-code-inline text-label-caption text-on-surface">
          E2E Latency: 114 ms
        </div>
      </>
    ),
    visual: (
      <div className="flex-1 flex flex-col justify-between p-4 bg-surface-container border border-outline-variant/25">
        <div className="flex items-center justify-between text-label-caption font-code-inline text-on-surface-variant mb-2">
          <span>專案模擬示意圖 // 扇形雷達點雲聚類與距離扇區</span>
          <span className="text-secondary font-bold">3D Conv Mesh</span>
        </div>
        <div className="w-full h-24 flex items-center justify-center">
          <svg className="w-full h-full text-secondary fill-transparent" viewBox="0 0 260 80">
            <path className="fill-secondary/10 stroke-outline-variant/40" d="M 130 75 L 30 15 A 120 120 0 0 1 230 15 Z" strokeWidth="1" />
            <path className="stroke-outline-variant/30" d="M 130 75 L 60 30 A 80 80 0 0 1 200 30 Z" strokeDasharray="2,2" />
            <circle className="fill-primary" cx="95" cy="40" r="4" />
            <circle className="fill-primary/60" cx="102" cy="44" r="3" />
            <circle className="fill-secondary animate-pulse" cx="155" cy="30" r="5" />
            <circle className="fill-secondary/70" cx="162" cy="32" r="3" />
            <text className="fill-on-surface-variant font-code-inline text-[9px]" textAnchor="middle" x="130" y="72">
              Wearable Sensor Origin
            </text>
            <text className="fill-secondary font-code-inline text-[9px]" x="170" y="28">
              懸空障礙 (1.8m)
            </text>
          </svg>
        </div>
        <div className="flex justify-between font-code-inline text-label-caption text-outline pt-1">
          <span>60GHz Radar</span>
          <span>Cross-Attention</span>
          <span>Audio Stream</span>
        </div>
      </div>
    ),
    githubUrl: 'https://github.com',
    modalId: 'modal-guidesense',
    modalIcon: 'account_tree',
    modalLabel: '模態管線拓撲',
  },

  // ============ 專案 3：ArtEcho 多模態 RAG 藝術策展導覽 ============
  {
    id: 'project-artecho',
    categories: ['vlm', 'cv'],
    date: '2024-05',
    metaBadge: '2024.05 // EXHIBITION DEPLOYED',
    metaBadgeClass: 'bg-surface-container text-primary',
    metaRight: '1,200+ 觀展互動',
    metaRightClass: 'text-on-surface-variant',
    title: 'ArtEcho — 多模態檢索增強生成之藝術策展智慧導覽系統',
    subtitle: 'Multimodal Self-RAG Art Curation & Visual Retrieval System',
    subtitleClass: 'text-primary-fixed-dim',
    tags: ['Multimodal Self-RAG', 'CLIP ViT-L/14', 'ChromaDB / pgvector', 'LangChain'],
    firstTagClass: 'text-primary',
    painIcon: 'museum',
    pain: '傳統語音導覽機僅能單向播放固定腳本；而直接套用通用 LLM 解說本土畫作與生僻史料時，會產生高達 34% 的嚴重事實幻覺（Hallucination），缺乏史料引用根據。',
    overview:
      '打造支援「以圖搜史料、跨畫作風格比對」的多模態智慧導覽平台，透過雙編碼向量索引與自我反思驗證機制（Self-RAG），提供具備100%館藏出處標註的互動式導覽體驗。',
    contribBorderClass: 'border-primary',
    contribArrowClass: 'text-primary',
    contributions: [
      '使用 CLIP ViT-L/14 與 ChromaDB 建構十萬級圖文同構向量資料庫，實現毫秒級跨模態相似度檢索。',
      '實作 Self-RAG Critic 反思過濾節點，強制核對館藏文獻編號後才生成回答，將事實精準度推升至 96.5%。',
    ],
    outcome: {
      expId: 'exp-nantou-2024',
      icon: 'show_chart',
      label: '成果與榮譽 (OUTCOME — 點擊跳轉至對應創新競賽經歷)',
      linkClass: 'hover:bg-primary/15 border-primary/40',
      accentText: 'text-primary',
      stats: [
        { value: '96.5% 查核精準度', valueClass: 'text-primary', caption: '有效抑制 LLM 史料幻覺' },
        { value: '最佳技術創新獎', valueClass: 'text-on-surface', caption: '展區停留互動時長提升 3.4 倍' },
      ],
    },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrMjbeuRP6RMcFX5sA8rWF6xZnv9NWqnPZ8RNvYvpD_rehlRsKkLKeBEvyGPWef6-GkCsCMoARQDngQqcqY152qr4Q5i-f7CbwwEt95DPvUmo1KrsY3u4hccXedNgk-Gd9DRgYjsRrZl9HIhpIOwOoupjAQleuUcadbZ8zLyvvGyCJMzqcPMaArEqG15q1ab5SrfmsCBzoYKhgBSZt2PjnjewbKmtCv6F4h9cq',
    imageAlt: 'ArtEcho UI',
    imageBadges: (
      <>
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-surface/90 backdrop-blur-md font-code-inline text-label-caption text-primary">
          系統畫面 // 跨模態向量檢索與溯源對話
        </div>
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-surface/90 backdrop-blur-md font-code-inline text-label-caption text-on-surface">
          Cosine Sim: 0.962
        </div>
      </>
    ),
    visual: (
      <div className="flex-1 flex flex-col justify-between p-4 bg-surface-container border border-outline-variant/25 font-code-inline text-label-caption">
        <div className="flex items-center justify-between text-on-surface-variant mb-2">
          <span>專案模擬示意圖 // TOP-3 向量相似度分布</span>
          <span className="text-primary font-bold">HNSW Index</span>
        </div>
        <div className="space-y-2.5 my-auto">
          <div>
            <div className="flex justify-between text-on-surface mb-1">
              <span>Doc #8491 (館藏史料原文)</span>
              <span className="text-primary font-bold">0.962</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-high overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '96.2%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-on-surface mb-1">
              <span>Doc #2203 (筆觸視覺特徵對齊)</span>
              <span className="text-primary font-bold">0.894</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-high overflow-hidden">
              <div className="h-full bg-primary/70" style={{ width: '89.4%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-on-surface mb-1">
              <span>Doc #5512 (時代背景交叉註解)</span>
              <span className="text-primary font-bold">0.817</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-high overflow-hidden">
              <div className="h-full bg-primary/40" style={{ width: '81.7%' }}></div>
            </div>
          </div>
        </div>
      </div>
    ),
    githubUrl: 'https://github.com',
    modalId: 'modal-artecho',
    modalIcon: 'account_tree',
    modalLabel: 'RAG 檢索拓撲',
  },
]
