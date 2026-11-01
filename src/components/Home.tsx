import Icon from './Icon'

const TAGS = [
  { en: 'Grade', label: 'GPA', value: '3.8', unit: '/ 4.3', icon: 'school' },
  { en: 'Contest', label: '競賽參與', value: '8+', unit: '場', icon: 'emoji_events' },
  { en: 'Project', label: '專案參與', value: '12+', unit: '個', icon: 'code' },
]

const PORTRAIT =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCo98IeVkVVflaoGaGH_u5YG4FYNRyO1RSpVEcPbqN1dqHWECCLOp92vLqDvC0lNFasI6t89J7WKrVouqP0s3qMIVD3xxw3Hc5x1_nGBWovTvz-QN_Xac-bY1qyvDu3hZOBuJSSOIy2mqlVznEPab4NYsy8cqyTd3FdloS0M_5kvGfpyD9qGR1pXNC2bvaKV_OwsLma48GtTVCwr-Ww81aN5fHBaIWC-Bp6gBFZ'

/** 個人簡介（首頁＋理念簡介合併，單一滿版畫面：左文字＋標籤、右照片） */
export default function Home() {
  return (
    <section
      id="home"
      className="scroll-mt-20 bg-paper min-h-[calc(100vh-5rem)] flex items-center px-6 py-16 border-b border-line"
    >
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* 左：文字 + 標籤 */}
        <div>
          <p className="font-mono text-xs tracking-[0.22em] uppercase text-blue mb-4">個人簡介 · Profile</p>
          <h1 className="font-display text-5xl sm:text-6xl xl:text-7xl font-extrabold text-ink tracking-tight leading-none">
            郭敏彥
          </h1>
          <p className="mt-5 font-display text-lg sm:text-xl font-semibold text-ink-soft">
            Amity Kuo
          </p>
          <div className="mt-5 h-1 w-16 bg-blue" />
          <p className="mt-6 text-ink-soft leading-loose max-w-xl">
            目前就讀逢甲大學資訊工程學系，長期投入 ACM-ICPC 程式競賽建立紮實演算法基礎，並擔任系上 C/C++
            程式設計助教；持續參與專案型投稿競賽累積實戰經驗，擅長運用 AI 輔助工具加速開發，核心專注於影像辨識與全端系統開發。
          </p>

          <div className="mt-9 grid grid-cols-3 gap-3 max-w-lg">
            {TAGS.map((t) => (
              <div key={t.label} className="relative px-2 pt-8 pb-1 text-center">
                {/* 淺色英文字 */}
                <span className="pointer-events-none select-none absolute top-1 inset-x-0 font-display text-base font-extrabold uppercase tracking-wide text-ink/15">
                  {t.en}
                </span>
                <Icon name={t.icon} className="relative text-[28px] text-slate" />
                <div className="relative mt-1 font-display text-2xl font-extrabold text-ink leading-none">
                  {t.value}
                  <span className="text-xs font-normal text-ink-soft"> {t.unit}</span>
                </div>
                <div className="relative mt-2">
                  <span className="text-[12px] font-medium text-ink">{t.label}</span>
                  <span className="mx-auto mt-1 block h-0.5 w-6 bg-blue" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右：個人照片 */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm aspect-[4/5] bg-white p-2.5 border border-line shadow-xl">
            <img
              alt="郭敏彥"
              src={PORTRAIT}
              className="w-full h-full object-cover object-center grayscale-[0.15] contrast-[1.02]"
            />
            <div className="absolute -bottom-3 -left-3 bg-blue text-white px-3 py-1.5 font-mono text-xs shadow-lg">
              FCU · CSIE
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
