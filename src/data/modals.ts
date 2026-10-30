import type { ArchModal } from '../types'

/** 專案架構拓撲 Modal 內容 */
export const ARCH_MODALS: ArchModal[] = [
  {
    id: 'modal-traffic',
    eyebrow: 'SYSTEM ARCHITECTURE',
    eyebrowClass: 'text-primary',
    title: '智慧交通違規科技執法：資料流與拓撲架構',
    gridClass: 'md:grid-cols-4',
    steps: [
      {
        title: '1. 擷取與預處理',
        desc: 'RTSP 串流經 GStreamer 硬解，CUDA 色彩轉換與尺度調整。',
        accentClass: 'text-primary',
      },
      {
        title: '2. INT8 模型推論',
        desc: 'TensorRT 加速 YOLOv8，INT8 PTQ 量化引擎極限加速檢測。',
        accentClass: 'text-primary',
      },
      {
        title: '3. 多目標關聯',
        desc: 'ByteTrack 處理暫態遮擋，Redis Stream 非同步佇列派發事件。',
        accentClass: 'text-primary',
      },
      {
        title: '4. 違規裁決核心',
        desc: '多邊形區域交集 (IoU) 擷取關鍵違規影格，自動寫入 Firestore。',
        accentClass: 'text-primary',
      },
    ],
  },
  {
    id: 'modal-guidesense',
    eyebrow: 'MULTIMODAL PIPELINE',
    eyebrowClass: 'text-secondary',
    title: 'GuideSense：毫米波雷達與 VLM 深度融合管線',
    gridClass: 'md:grid-cols-3',
    steps: [
      {
        title: '1. 異質感知輸入',
        desc: 'IWR6843 點雲獲取都卜勒速度與深度，同步觸發廣角鏡頭擷取。',
        accentClass: 'text-secondary',
      },
      {
        title: '2. 空間交叉注意力',
        desc: '3D CNN 提取點雲幾何特徵，與影像 Patch 做 Cross-Attention。',
        accentClass: 'text-secondary',
      },
      {
        title: '3. 語音流式輸出',
        desc: '輕量化 VLM 解碼空間語意，WebSocket 低延遲串流語音反饋。',
        accentClass: 'text-secondary',
      },
    ],
  },
  {
    id: 'modal-artecho',
    eyebrow: 'MULTIMODAL RAG ARCHITECTURE',
    eyebrowClass: 'text-primary',
    title: 'ArtEcho：十萬級藝術文物檢索增強與 Self-RAG',
    gridClass: 'md:grid-cols-3',
    steps: [
      {
        title: '1. 雙編碼超圖檢索',
        desc: 'CLIP ViT-L/14 同構嵌入畫作圖像與歷史文獻，HNSW 鄰近搜索。',
        accentClass: 'text-primary',
      },
      {
        title: '2. Self-RAG 反思過濾',
        desc: '內建 Critic 評估器評定文獻相關性，過濾無效檢索並重寫提示。',
        accentClass: 'text-primary',
      },
      {
        title: '3. 溯源引用生成',
        desc: '動態輸出具館藏編號與史實引用的多輪策展對話回應。',
        accentClass: 'text-primary',
      },
    ],
  },
]
