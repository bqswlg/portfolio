import Icon from './Icon'

const TAGS = [
  { en: 'Grade', label: 'GPA', value: '3.8', unit: '/ 4.3', icon: 'school' },
  { en: 'Contest', label: '競賽參與', value: '8+', unit: '場', icon: 'emoji_events' },
  { en: 'Project', label: '專案參與', value: '12+', unit: '個', icon: 'code' },
]

const PORTRAIT = '/portrait.jpg'

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
            郭旻晏
          </h1>
          <p className="mt-5 font-display text-lg sm:text-xl font-semibold text-ink-soft">
            Amity Kuo
          </p>
          <div className="mt-5 h-1 w-16 bg-blue" />
          <p className="mt-6 text-ink-soft leading-loose max-w-xl">
            目前就讀逢甲大學資訊工程學系。
            在學期間長期投入ICPC 程式競賽，建立紮實的演算法基礎，並於2024 及2026 年擔任系上C/C++ 程式設計助教，累積程式除錯、問題分析及技術溝通經驗。
            在專案開發方面，持續參與專案競賽，具備前後端系統開發與整合實作經驗，能從需求分析、系統架構設計到前端介面實作，完成系統功能開發與整合。善於運用AI 輔助工具提升開發效率，並透過程式驗證與除錯確保實作品質，致力於將 技術能力轉化為穩定且具實用性的軟體系統。
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
              alt="郭旻晏"
              src={PORTRAIT}
              className="w-full h-full object-cover object-center grayscale-[0.15] contrast-[1.02]"
            />
            <div className="absolute -bottom-3 -left-3 bg-blue text-white px-3 py-1.5 font-mono text-xs shadow-lg">
              FCU · IECS
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
