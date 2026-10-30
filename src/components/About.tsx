interface Stat {
  label: string
  labelClass: string
  hoverBorder: string
  value: string
  suffix: string
}

const STATS: Stat[] = [
  { label: 'GPA', labelClass: 'text-primary', hoverBorder: 'hover:border-primary/60', value: '3.8', suffix: '/ 4.3' },
  { label: '競賽參與', labelClass: 'text-secondary', hoverBorder: 'hover:border-secondary/60', value: '8+', suffix: '場競賽' },
  { label: '學術累積', labelClass: 'text-tertiary', hoverBorder: 'hover:border-tertiary/60', value: '2', suffix: '項核心研究' },
  { label: '專案參與量', labelClass: 'text-primary-fixed', hoverBorder: 'hover:border-primary-fixed/60', value: '12+', suffix: '個系統' },
]

const SUBTEXT: string[] = [
  '逢甲資工系前23%',
  '黑客松、專案投稿競賽、程式競賽',
  '國科會大專生研究計畫 + ICIC 研討會論文發表',
  '涵蓋科技執法、盲人輔助與藝術治療等',
]

/** ABOUT ME 區塊 */
export default function About() {
  return (
    <section
      id="about"
      className="w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center bg-surface-container-lowest py-20 px-6 border-t border-outline-variant/20"
    >
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center text-center space-y-12">
        <h2 className="font-display-hero text-headline-lg sm:text-display-hero-mobile font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary via-primary-fixed to-secondary">
          ABOUT ME
        </h2>

        {/* 自我介紹 */}
        <div className="max-w-3xl bg-surface-container-low/80 p-7 sm:p-9 border border-outline-variant/30 shadow-lg text-left sm:text-center">
          <p className="font-body-lg text-body-md sm:text-body-lg text-on-surface leading-relaxed">
            目前就讀逢甲大學資訊工程學系，在學期間長期投入 ACM-ICPC 程式競賽，建立紮實的演算法基礎，並於 2024 及 2026
            年擔任系上 C/C++ 程式設計助教，透過引導學生除錯，培養出能將複雜程式邏輯轉化為清晰白話解說的溝通表達能力。除維持課業外，持續參與專案型投稿競賽以累積實戰經驗，擅長運用
            AI 輔助工具加速開發迭代，核心專注於影像辨識與全端系統開發。
          </p>
        </div>

        {/* 四個核心標籤 */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center p-6 bg-surface-container-low border border-outline-variant/30 transition-all ${stat.hoverBorder}`}
            >
              <span className={`font-code-inline text-label-badge uppercase tracking-wider mb-2 ${stat.labelClass}`}>
                {stat.label}
              </span>
              <span className="font-display-hero text-headline-lg font-extrabold text-on-surface">
                {stat.value} <span className="text-body-md font-normal text-outline">{stat.suffix}</span>
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-2">{SUBTEXT[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
