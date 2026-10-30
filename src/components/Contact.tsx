import { useEffect, useState } from 'react'
import Icon from './Icon'

/* ── 聯絡資訊（請替換為實際值） ───────────────────────── */
const PRIMARY_EMAIL = 'dev.ai.engineer@example.com'
const PHONE_DISPLAY = '+886 912-345-678'
const PHONE_TEL = '+886912345678'
const GITHUB_URL = 'https://github.com'
/* ──────────────────────────────────────────────────── */

const CARD_BASE =
  'flex flex-col justify-between p-6 bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-md'

function formatTaipei(): string {
  const formatted = new Intl.DateTimeFormat('zh-TW', {
    timeZone: 'Asia/Taipei',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date())
  return `Asia/Taipei GMT+8: ${formatted}`
}

export default function Contact() {
  const [clock, setClock] = useState('Asia/Taipei GMT+8: Calculating...')
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null)

  useEffect(() => {
    setClock(formatTaipei())
    const timer = setInterval(() => setClock(formatTaipei()), 1000)
    return () => clearInterval(timer)
  }, [])

  function copy(value: string, which: 'email' | 'phone') {
    navigator.clipboard
      ?.writeText(value)
      .then(() => {
        setCopied(which)
        setTimeout(() => setCopied(null), 2000)
      })
      .catch(() => {})
  }

  return (
    <section
      id="contact"
      className="w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center relative overflow-hidden bg-surface py-24 px-6 border-t border-outline-variant/30 scroll-mt-20"
    >
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-linear-to-b from-primary/15 via-secondary-container/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10 space-y-12">
        <div className="flex flex-col items-start max-w-4xl space-y-3">
          <h2 className="font-display-hero text-headline-lg sm:text-display-hero-mobile font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary via-primary-fixed to-secondary">
            聯繫方式 CONTACT
          </h2>
          <p className="font-body-lg text-body-md sm:text-body-lg text-on-surface-variant max-w-3xl">
            正在積極尋找 AI 軟體工程師、電腦視覺演算法或後端系統架構實習與全職機會。歡迎技術交流、架構探討或職缺邀約！
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container font-code-inline text-code-inline text-on-surface border border-outline-variant/30">
              <span className="w-2 h-2 bg-primary-container animate-ping" />
              <span>Available Immediately</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container font-code-inline text-code-inline text-on-surface-variant border border-outline-variant/30">
              <Icon name="schedule" className="text-primary text-[18px]" />
              <span>{clock}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container font-code-inline text-code-inline text-on-surface-variant border border-outline-variant/30">
              <Icon name="location_on" className="text-tertiary text-[18px]" />
              <span>Taichung • Taipei • Global Remote</span>
            </div>
          </div>
        </div>

        {/* 三種聯絡方式：Email / 手機 / GitHub */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email */}
          <div className={CARD_BASE}>
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center text-primary">
                  <Icon name="mail" className="text-[26px]" />
                </div>
                <span className="font-label-badge text-label-badge text-primary bg-surface-container-lowest px-2.5 py-1">
                  &lt; 12h 回覆保證
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">電子郵件</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                歡迎提供職位規格書 (JD)、技術交流邀約，或探討分散式訓練與邊緣推論架構。
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-surface-container-lowest">
                  <div className="min-w-0 pr-2">
                    <p className="font-label-caption text-label-caption text-outline uppercase">Work Email</p>
                    <p className="font-code-inline text-code-inline text-on-surface font-semibold truncate">{PRIMARY_EMAIL}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copy(PRIMARY_EMAIL, 'email')}
                    className="shrink-0 p-2 bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary-fixed transition-all"
                    title="複製郵件地址"
                  >
                    <Icon name={copied === 'email' ? 'done' : 'content_copy'} className="text-[18px]" />
                  </button>
                </div>
              </div>
            </div>
            <a
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-primary text-on-primary-fixed font-headline-sm text-body-md font-bold hover:opacity-90 transition-all"
              href={`mailto:${PRIMARY_EMAIL}?subject=Job%20Opportunity%20/%20Technical%20Inquiry`}
            >
              <Icon name="send" className="text-[20px]" />
              <span>開啟郵件客戶端寄信</span>
            </a>
          </div>

          {/* 手機 */}
          <div className={CARD_BASE}>
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center text-secondary">
                  <Icon name="call" className="text-[26px]" />
                </div>
                <span className="font-label-badge text-label-badge text-secondary bg-surface-container-lowest px-2.5 py-1">
                  可來電 / Line
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">手機聯繫</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                方便即時討論面試安排與技術細節；工作時間以外請改以電子郵件聯繫。
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-surface-container-lowest">
                  <div className="min-w-0 pr-2">
                    <p className="font-label-caption text-label-caption text-outline uppercase">Mobile</p>
                    <p className="font-code-inline text-code-inline text-on-surface font-semibold truncate">{PHONE_DISPLAY}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copy(PHONE_DISPLAY, 'phone')}
                    className="shrink-0 p-2 bg-surface-container-high text-secondary hover:bg-secondary hover:text-on-secondary-fixed transition-all"
                    title="複製手機號碼"
                  >
                    <Icon name={copied === 'phone' ? 'done' : 'content_copy'} className="text-[18px]" />
                  </button>
                </div>
              </div>
            </div>
            <a
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-surface-container-highest text-on-surface font-headline-sm text-body-md font-semibold hover:bg-surface-bright transition-all"
              href={`tel:${PHONE_TEL}`}
            >
              <Icon name="call" className="text-[20px]" />
              <span>撥打電話</span>
            </a>
          </div>

          {/* GitHub */}
          <div className={CARD_BASE}>
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center text-primary">
                  <Icon name="code" className="text-[26px]" />
                </div>
                <span className="font-label-badge text-label-badge text-primary bg-surface-container-lowest px-2.5 py-1">
                  Verified Codebase
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">開源專案 GitHub</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                查驗公開開源專案、完整重現基準效能、論文實作與技術社群交流。
              </p>
              <div className="space-y-3 mb-6">
                <a
                  className="flex items-center justify-between p-3 bg-surface-container-lowest hover:bg-surface-container-high transition-all"
                  href={GITHUB_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex items-center gap-3">
                    <Icon name="code" className="text-primary text-[20px]" />
                    <div>
                      <p className="font-headline-sm text-body-md text-on-surface font-semibold">GitHub Profile</p>
                      <p className="font-label-caption text-label-caption text-on-surface-variant">Pinned Benchmarks &amp; CUDA Tools</p>
                    </div>
                  </div>
                  <Icon name="north_east" className="text-outline text-[18px]" />
                </a>
              </div>
            </div>
            <a
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-surface-container-highest text-on-surface font-headline-sm text-body-md font-semibold hover:bg-surface-bright transition-all"
              href={GITHUB_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name="terminal" className="text-[20px]" />
              <span>前往 GitHub Profile</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
