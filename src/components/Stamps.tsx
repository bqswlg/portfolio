import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { Stamp } from '../types'
import { FALLBACK_STAMPS, normalizeStamps } from '../data/stamps'

/** 缺少實際照片時的佔位圖（提示使用者將照片放入 public/stamps/） */
const PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='#1c1f2a'/><text x='50%' y='50%' fill='#4cd7f6' font-family='monospace' font-size='16' text-anchor='middle' dominant-baseline='middle'>待補活動照片</text></svg>",
)}`

const ROTATE_INTERVAL_MS = 2500

export default function Stamps() {
  const [queue, setQueue] = useState<Stamp[]>([])
  const [resetNonce, setResetNonce] = useState(0)

  // 主圖雙圖層 crossfade
  const [layers, setLayers] = useState<{ a: string; b: string; active: 'a' | 'b' }>({ a: '', b: '', active: 'a' })
  const firstFeaturedRef = useRef(true)

  // 文字淡入（延遲替換製造 dip 效果）
  const [displayText, setDisplayText] = useState<{ tag: string; title: string; desc: string }>({
    tag: 'STAMPS GALLERY',
    title: '活動紀錄照片',
    desc: '隨機捕捉活動瞬間，展現豐富的專案實作與技術交流足跡。',
  })
  const [textDim, setTextDim] = useState(false)
  const firstTextRef = useRef(true)

  // FLIP
  const thumbRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const prevRects = useRef<Map<string, DOMRect>>(new Map())
  const progressBarRef = useRef<HTMLDivElement>(null)

  const featured = queue[0]

  // ---------- 載入戳記（manifest 優先，失敗回退 FALLBACK） ----------
  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch('/stamps/manifest.json', { cache: 'no-store' })
        if (res.ok) {
          const manifest = await res.json()
          if (Array.isArray(manifest) && manifest.length > 0 && !cancelled) {
            setQueue(normalizeStamps(manifest))
            return
          }
        }
      } catch {
        /* 忽略，改用後備資料 */
      }
      if (!cancelled) setQueue(normalizeStamps(FALLBACK_STAMPS))
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  // ---------- 主圖 crossfade ----------
  useEffect(() => {
    if (!featured) return
    setLayers((prev) => {
      if (firstFeaturedRef.current) {
        firstFeaturedRef.current = false
        return { a: featured.src, b: '', active: 'a' }
      }
      const incoming = prev.active === 'a' ? 'b' : 'a'
      return incoming === 'a'
        ? { a: featured.src, b: prev.b, active: 'a' }
        : { a: prev.a, b: featured.src, active: 'b' }
    })
  }, [featured?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // ---------- 文字延遲淡入 ----------
  useEffect(() => {
    if (!featured) return
    if (firstTextRef.current) {
      firstTextRef.current = false
      setDisplayText({ tag: featured.tag, title: featured.title, desc: featured.desc })
      return
    }
    setTextDim(true)
    const t = setTimeout(() => {
      setDisplayText({ tag: featured.tag, title: featured.title, desc: featured.desc })
      setTextDim(false)
    }, 140)
    return () => clearTimeout(t)
  }, [featured?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // ---------- 自動輪播 + 進度條（CSS 動畫，避免每 40ms 重繪） ----------
  useEffect(() => {
    if (queue.length <= 1) return
    function startBar() {
      const bar = progressBarRef.current
      if (!bar) return
      bar.style.transition = 'none'
      bar.style.width = '0%'
      void bar.offsetHeight // 強制 reflow
      bar.style.transition = `width ${ROTATE_INTERVAL_MS}ms linear`
      bar.style.width = '100%'
    }
    startBar()
    const timer = setInterval(() => {
      setQueue((q) => (q.length <= 1 ? q : [...q.slice(1), q[0]]))
      startBar()
    }, ROTATE_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [queue.length, resetNonce])

  // ---------- FLIP：縮圖絲滑位移 ----------
  useLayoutEffect(() => {
    const newRects = new Map<string, DOMRect>()
    thumbRefs.current.forEach((el, id) => newRects.set(id, el.getBoundingClientRect()))
    newRects.forEach((newRect, id) => {
      const prev = prevRects.current.get(id)
      const el = thumbRefs.current.get(id)
      if (!el || !prev) return
      const dx = prev.left - newRect.left
      const dy = prev.top - newRect.top
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        el.style.transition = 'none'
        el.style.transform = `translate(${dx}px, ${dy}px)`
        void el.offsetHeight
        el.style.transition = 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
        el.style.transform = 'translate(0, 0)'
      }
    })
    prevRects.current = newRects
  }, [queue])

  function handleThumbClick(id: string) {
    const idx = queue.findIndex((s) => s.id === id)
    if (idx > 0) {
      setQueue((q) => [...q.slice(idx), ...q.slice(0, idx)])
      setResetNonce((n) => n + 1)
    }
  }

  const n = queue.length
  const split = Math.max(1, Math.floor(n / 2))
  const row1 = queue.slice(0, split)
  const row2 = queue.slice(split)

  function renderThumb(stamp: Stamp, isFirst: boolean) {
    return (
      <button
        key={stamp.id}
        type="button"
        ref={(el) => {
          if (el) thumbRefs.current.set(stamp.id, el)
          else thumbRefs.current.delete(stamp.id)
        }}
        onClick={() => handleThumbClick(stamp.id)}
        className={
          'stamp-thumb relative h-full overflow-hidden shrink-0 border transition-opacity duration-300 ' +
          (isFirst
            ? 'border-primary ring-2 ring-primary opacity-100'
            : 'border-outline-variant/40 opacity-70 hover:opacity-100')
        }
      >
        <img
          src={stamp.src}
          alt={stamp.title}
          onError={(e) => {
            if (e.currentTarget.src !== PLACEHOLDER) e.currentTarget.src = PLACEHOLDER
          }}
          className="h-full w-auto max-w-none object-cover block select-none pointer-events-none"
        />
      </button>
    )
  }

  return (
    <section
      id="stamps"
      className="w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center bg-surface-container-lowest py-20 px-6 border-t border-outline-variant/30 scroll-mt-20"
    >
      <div className="max-w-7xl w-full mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="font-display-hero text-headline-lg sm:text-display-hero-mobile font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary via-primary-fixed to-secondary">
            STAMPS
          </h2>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container font-code-inline text-label-caption text-primary border border-outline-variant/30">
              <span className="w-2 h-2 bg-primary animate-ping" />
              <span>AUTO-ROTATING GALLERY</span>
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant hidden md:inline">
              動態讀取 <code className="text-primary font-code-inline">stamps/</code> 資料夾照片，自動絲滑替補輪播
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:h-[520px]">
          {/* 左側：主展示照片 + 敘述 */}
          <div className="w-full lg:w-[440px] xl:w-[480px] shrink-0 flex flex-col bg-surface-container-low overflow-hidden border border-outline-variant/40 shadow-xl">
            <div className="relative w-full h-72 lg:h-auto lg:flex-1 overflow-hidden bg-surface-container-lowest">
              <img
                src={layers.a || PLACEHOLDER}
                alt="Featured Event Stamp"
                onError={(e) => {
                  if (e.currentTarget.src !== PLACEHOLDER) e.currentTarget.src = PLACEHOLDER
                }}
                className={
                  'stamp-main-img-layer absolute inset-0 w-full h-full object-cover ' +
                  (layers.active === 'a' ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]')
                }
              />
              <img
                src={layers.b || PLACEHOLDER}
                alt="Featured Event Stamp"
                onError={(e) => {
                  if (e.currentTarget.src !== PLACEHOLDER) e.currentTarget.src = PLACEHOLDER
                }}
                className={
                  'stamp-main-img-layer absolute inset-0 w-full h-full object-cover ' +
                  (layers.active === 'b' ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]')
                }
              />

              <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-surface/90 backdrop-blur-md font-code-inline text-label-caption text-primary border border-outline-variant/30">
                {displayText.tag}
              </div>
              {/* 底部進度條 */}
              <div className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-surface-container-highest overflow-hidden">
                <div ref={progressBarRef} className="h-full bg-primary" style={{ width: '0%' }} />
              </div>
            </div>
            <div
              className="stamp-text-fade p-5 bg-surface-container-low border-t border-outline-variant/30"
              style={{ opacity: textDim ? 0.35 : 1, transform: textDim ? 'translateY(3px)' : 'translateY(0)' }}
            >
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">{displayText.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed line-clamp-2">
                {displayText.desc}
              </p>
            </div>
          </div>

          {/* 右側：上下兩排候選隊伍 */}
          <div className="flex-1 overflow-x-auto overflow-y-hidden pb-2 lg:pb-0">
            <div className="flex flex-col gap-4 h-[360px] lg:h-full justify-between">
              <div className="flex items-stretch gap-4 h-[calc(50%-0.5rem)]">
                {row1.map((stamp) => renderThumb(stamp, stamp.id === featured?.id))}
              </div>
              <div className="flex items-stretch gap-4 h-[calc(50%-0.5rem)]">
                {row2.map((stamp) => renderThumb(stamp, stamp.id === featured?.id))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
