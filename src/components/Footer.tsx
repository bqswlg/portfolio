const LINKS = [
  { id: 'home', label: '個人簡介' },
  { id: 'experiences', label: '競賽經歷' },
  { id: 'projects', label: '參與專案' },
  { id: 'gallery', label: '活動戳記' },
  { id: 'contact', label: '聯繫方式' },
]

export default function Footer() {
  return (
    <footer className="bg-paper border-t border-line py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center">
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-ink text-sm">郭敏彥 · 逢甲大學資工系</p>
            <p className="text-xs text-ink-soft">© 2026 Kuo Min Yen. All rights reserved.</p>
          </div>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink-soft">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="hover:text-blue transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
