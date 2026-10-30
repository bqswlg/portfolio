import { useEffect, useState } from 'react'

/**
 * 以「視窗中線」(scrollY + innerHeight*0.5) 落在哪個區段，決定目前 active 的 section id。
 * 對應原 index.js 的 onScrollCheck。
 */
export function useScrollSpy(sectionIds: string[], defaultId: string): string {
  const [activeId, setActiveId] = useState(defaultId)

  useEffect(() => {
    function onScrollCheck() {
      const viewportMiddle = window.scrollY + window.innerHeight * 0.5
      let matched = sectionIds[0] ?? defaultId
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.offsetTop
        const bottom = top + el.offsetHeight
        if (viewportMiddle >= top && viewportMiddle < bottom) {
          matched = id
          break
        }
      }
      setActiveId((prev) => (prev === matched ? prev : matched))
    }

    onScrollCheck()
    window.addEventListener('scroll', onScrollCheck, { passive: true })
    window.addEventListener('resize', onScrollCheck)
    return () => {
      window.removeEventListener('scroll', onScrollCheck)
      window.removeEventListener('resize', onScrollCheck)
    }
  }, [sectionIds, defaultId])

  return activeId
}
