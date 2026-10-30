const FOOTER_LINKS = [
  { id: 'home', label: '首頁' },
  { id: 'stamps', label: '活動戳記' },
  { id: 'projects', label: '參與專案' },
  { id: 'experiences', label: '經歷' },
  { id: 'contact', label: '聯繫方式' },
]

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="font-code-block text-code-block text-on-surface font-semibold flex items-center gap-2">
            <span className="text-primary">λ</span>
            <span>Feng Chia University (逢甲大學資工系)</span>
          </div>
          <p className="font-label-caption text-label-caption text-on-surface-variant">
            © 2025 AI Systems &amp; Software Engineering. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container border border-outline-variant/40 font-code-inline text-code-inline text-on-surface-variant">
          <span className="w-2 h-2 bg-[#10b981] animate-ping" />
          <span className="text-on-surface font-medium">Model Inference Server:</span>
          <span className="text-primary">Online</span>
          <span className="text-outline">|</span>
          <span className="text-on-surface-variant">Latency: 18ms</span>
        </div>
        <div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm">
          {FOOTER_LINKS.map((l) => (
            <a key={l.id} className="hover:text-primary transition-colors" href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
