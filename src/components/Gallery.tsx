import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { Stamp } from '../types'
import { FALLBACK_STAMPS, normalizeStamps } from '../data/stamps'
import SectionTitle from './SectionTitle'

/** 缺圖佔位（提示把照片放入 public/stamps/） */
const PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='#ececea'/><text x='50%' y='50%' fill='#9aa0ab' font-family='sans-serif' font-size='16' text-anchor='middle' dominant-baseline='middle'>待補活動照片</text></svg>",
)}`

const ROTATE_INTERVAL_MS = 2500

/** 活動戳記 = 自動切換輪播（左大圖 crossfade、右候選縮圖、2.5s 輪替、點縮圖插隊） */
export default function Gallery() {
  const [queue, setQueue] = useState<Stamp[]>([])
  const [resetNonce, setResetNonce] = useState(0)

  // 主圖雙圖層 crossfade
  const [layers, setLayers] = useState<{ a: string; b: string; active: 'a' | 'b' }>({ a: '', b: '', active: 'a' })
  const firstFeaturedRef = useRef(true)

  // 文字延遲淡入
  const [displayText, setDisplayText] = useState({ tag: 'ACTIVITY STAMP', title: '活動紀錄', desc: '活動參與紀錄與技術交流足跡' })
  const [textDim, setTextDim] = useState(false)
  const firstTextRef = useRef(true)

  // FLIP
  const thumbRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const prevRects = useRef<Map<string, DOMRect>>(new Map())
  const progressBarRef = useRef<HTMLDivElement>(null)

  const featured = queue[0]

  // ---------- 載入（manifest 優先，失敗回退 FALLBACK） ----------
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

  // ---------- 自動輪播 + 進度條 ----------
  useEffect(() => {
    if (queue.length <= 1) return
    function startBar() {
      const bar = progressBarRef.current
      if (!bar) return
      bar.style.transition = 'none'
      bar.style.width = '0%'
      void bar.offsetHeight
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

  function renderThumb(stamp: Stamp) {
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
          'stamp-thumb relative h-full overflow-hidden shrink-0 transition-opacity duration-300 '
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
      id="gallery"
      className="scroll-mt-24 bg-mist min-h-[calc(100vh-5rem)] flex flex-col justify-center py-20 px-6 border-b border-line"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionTitle zh="活動戳記" en="Activity Stamps" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:h-[440px]">
          {/* 左：主展示（雙層 crossfade） */}
          <div className="w-full lg:w-[420px] xl:w-[460px] shrink-0 flex flex-col bg-paper overflow-hidden border border-line shadow-sm">
            <div className="relative w-full h-72 lg:h-auto lg:flex-1 overflow-hidden bg-mist-2">
              <img
                src={layers.a || PLACEHOLDER}
                alt="活動照片"
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
                alt="活動照片"
                onError={(e) => {
                  if (e.currentTarget.src !== PLACEHOLDER) e.currentTarget.src = PLACEHOLDER
                }}
                className={
                  'stamp-main-img-layer absolute inset-0 w-full h-full object-cover ' +
                  (layers.active === 'b' ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]')
                }
              />
              <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-blue text-white font-mono text-[11px] tracking-wider">
                {displayText.tag}
              </div>
            </div>
            <div
              className="stamp-text-fade p-5 bg-paper border-t border-line"
              style={{ opacity: textDim ? 0.35 : 1, transform: textDim ? 'translateY(3px)' : 'translateY(0)' }}
            >
              <h3 className="font-display text-lg font-bold text-ink truncate">{displayText.title}</h3>
              <p className="mt-1.5 text-sm text-ink-soft leading-relaxed line-clamp-2">{displayText.desc}</p>
            </div>
          </div>

          {/* 右：候選縮圖雙排 */}
          <div className="flex-1 overflow-x-auto overflow-y-hidden pb-2 lg:pb-0">
            <div className="flex flex-col gap-4 h-[320px] lg:h-full justify-between">
              <div className="flex items-stretch gap-4 h-[calc(50%-0.5rem)]">
                {row1.map((stamp) => renderThumb(stamp))}
              </div>
              <div className="flex items-stretch gap-4 h-[calc(50%-0.5rem)]">
                {row2.map((stamp) => renderThumb(stamp))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
