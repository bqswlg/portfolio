# 郭旻晏 Amity Kuo · 個人作品集

逢甲大學資訊工程學系（FCU IECS）學生的個人作品集網站，以單頁滾動形式呈現個人簡介、參與專案、經歷累積、活動紀錄與聯絡方式。採用淺色、直角、排版導向的設計風格。

> 本站由原始的純靜態 HTML/JS 版本重構為 React 元件化架構，舊版備份保留於 [`legacy/`](legacy/)。

## 技術棧

| 類別 | 使用技術 |
|---|---|
| 框架 | React 18 + TypeScript 5（strict） |
| 建置工具 | Vite 6 |
| 樣式 | Tailwind CSS v4（CSS-first `@theme` 設定，`@tailwindcss/vite`） |
| 字體／圖示 | Google Fonts（Inter、Noto Sans TC、Plus Jakarta Sans、JetBrains Mono）、Material Symbols Outlined |

需求環境：Node.js 20+、npm 10+。

## 開始使用

```bash
npm install
```

```bash
npm run dev
```

開發伺服器預設於 `http://localhost:5173`（若被占用會自動換埠）。

### 指令

| 指令 | 說明 |
|---|---|
| `npm run dev` | 啟動開發伺服器（HMR） |
| `npm run build` | 型別檢查（`tsc -b`）並打包至 `dist/` |
| `npm run preview` | 本機預覽 `dist/` 打包結果 |

## 目錄結構

```
.
├─ public/
│  ├─ portrait.jpg          # 首頁個人照
│  ├─ projects/             # 各專案架構圖（traffic-triage.jpg 等）
│  └─ stamps/               # 活動照片 + manifest.json（活動戳記輪播來源）
├─ src/
│  ├─ main.tsx              # 進入點
│  ├─ App.tsx               # 組合各區段
│  ├─ index.css             # Tailwind v4 @theme tokens + 自訂 CSS
│  ├─ types.ts              # 共用型別
│  ├─ hooks/
│  │  └─ useScrollSpy.ts    # 頁眉滾動高亮
│  ├─ data/                 # ★ 網站內容資料（多數更新改這裡即可）
│  │  ├─ projects.tsx       # 參與專案
│  │  ├─ experiences.ts     # 經歷累積 + 證明文件
│  │  └─ stamps.ts          # 活動戳記後備資料
│  └─ components/           # Header / Home / Projects / Experiences / Gallery / Contact / Footer …
├─ legacy/                  # 原始靜態版本備份
└─ index.html              # Vite 進入 HTML（字體、#root）
```

## 更新內容指南

網站文案與資料集中在少數檔案，一般更新不需要動版面元件：

| 想更新的內容 | 檔案 |
|---|---|
| 姓名、簡介、首頁標籤、個人照 | [`src/components/Home.tsx`](src/components/Home.tsx)、`public/portrait.jpg` |
| 參與專案（動機／貢獻／成果／標籤／架構圖） | [`src/data/projects.tsx`](src/data/projects.tsx)，圖片放 `public/projects/` |
| 經歷累積時間軸、證明文件 | [`src/data/experiences.ts`](src/data/experiences.ts) |
| 活動照片輪播 | `public/stamps/manifest.json`（後備：[`src/data/stamps.ts`](src/data/stamps.ts)） |
| 聯絡資訊（Email／電話／GitHub） | [`src/components/Contact.tsx`](src/components/Contact.tsx) |

### 圖片放置原則

- 所有圖片放在 `public/`，於程式中以根路徑引用（例如 `/projects/traffic-triage.jpg`）。
- **專案架構圖**：放入 `public/projects/`，再於 `projects.tsx` 對應專案的 `image` 欄位填入路徑。
- **活動照片**：放入 `public/stamps/`，並在 `public/stamps/manifest.json` 加上一筆 `{ src, tag, title, desc }`（`src` 只填檔名即可）。
- 瀏覽器不支援 HEIC，請先轉為 JPG／PNG 再放入。

## 待補項目

- 各專案的 **GitHub 連結** 目前為佔位（`https://github.com`），請於 `projects.tsx` 的 `github` 欄位替換。
- 聯絡區的 **履歷下載** 連結為佔位，待放入實際 PDF。
- **證明文件** 目前為空陣列，填入 `experiences.ts` 的 `CERTIFICATES` 後，該區塊會自動顯示。
- 部分活動照片原圖較大（數 MB），建議壓縮以加快載入。

## 部署

本站為純前端靜態 SPA，`npm run build` 後將 `dist/` 部署到任何靜態主機（GitHub Pages、Vercel、Netlify 等）即可。
