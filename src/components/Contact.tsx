import { useState } from 'react'
import SectionTitle from './SectionTitle'
import Icon from './Icon'

/* ── 聯絡資訊（請替換為實際值） ───────────────────────── */
const PRIMARY_EMAIL = 'dev.ai.engineer@example.com'
const PHONE_DISPLAY = '+886 912-345-678'
const PHONE_TEL = '+886912345678'
const GITHUB_URL = 'https://github.com'
const RESUME_URL = '#contact' // ← 換成履歷 PDF 連結
/* ──────────────────────────────────────────────────── */

/** 聯繫方式（原「園區資訊」）— 下方有 GitHub 按鍵與履歷下載 */
export default function Contact() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard
      ?.writeText(PRIMARY_EMAIL)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {})
  }

  return (
    <section id="contact" className="scroll-mt-16 bg-slate text-white py-20 sm:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle zh="聯繫方式" en="Contact" invert />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* 聯絡資訊 */}
          <div className="reveal space-y-5">
            <div className="flex items-center justify-between gap-3 p-4 bg-white/5 border border-white/10">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">Email</p>
                <p className="font-mono text-sm text-white truncate">{PRIMARY_EMAIL}</p>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                title="複製郵件地址"
                className="shrink-0 p-2 text-white/70 hover:text-white hover:bg-blue transition-colors"
              >
                <Icon name={copied ? 'done' : 'content_copy'} className="text-[18px]" />
              </button>
            </div>

            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center justify-between gap-3 p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">Mobile</p>
                <p className="font-mono text-sm text-white truncate">{PHONE_DISPLAY}</p>
              </div>
              <Icon name="call" className="shrink-0 text-white/70 text-[18px]" />
            </a>
          </div>

          {/* GitHub 按鍵 + 履歷下載 */}
          <div className="reveal flex flex-col justify-center gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-blue text-white font-semibold hover:bg-blue-dark transition-colors"
            >
              <Icon name="code" className="text-[22px]" />
              <span>前往 GitHub</span>
            </a>
            <a
              href={RESUME_URL}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              <Icon name="download" className="text-[22px]" />
              <span>下載履歷 (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
