import { useEffect } from 'react'

/**
 * 進場淡入：對 .reveal 元素進入視窗時加上 .is-visible。
 * 另含「掃描」與 hashchange 補償，避免經由錨點跳轉而被永久卡在隱形。
 */
export function useReveal() {
  useEffect(() => {
    const revealAll = () => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))

    if (!('IntersectionObserver' in window)) {
      revealAll()
      return
    }

    // 已在視窗內或上方者直接顯示（避免跳轉後永久隱形）
    const sweep = () =>
      document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible')
      })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

    sweep()
    const t = setTimeout(sweep, 400)
    const onHash = () => setTimeout(sweep, 450)
    window.addEventListener('hashchange', onHash)

    return () => {
      io.disconnect()
      clearTimeout(t)
      window.removeEventListener('hashchange', onHash)
    }
  }, [])
}
