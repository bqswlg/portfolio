import { useEffect } from 'react'
import type { ArchModal } from '../types'
import Icon from './Icon'

interface ModalProps {
  modal: ArchModal | null
  onClose: () => void
}

/** 專案架構拓撲彈窗 */
export default function Modal({ modal, onClose }: ModalProps) {
  useEffect(() => {
    if (!modal) return
    document.body.style.overflow = 'hidden'
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = 'auto'
    }
  }, [modal, onClose])

  if (!modal) return null

  return (
    <div className="fixed inset-0 z-50 bg-surface/90 backdrop-blur-xl p-4 lg:p-8 flex items-center justify-center overflow-y-auto">
      <div className="w-full max-w-4xl p-6 lg:p-8 bg-surface-container-low shadow-2xl relative border border-outline-variant/40">
        <button
          type="button"
          className="absolute top-6 right-6 p-2 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
          onClick={onClose}
          aria-label="關閉視窗"
        >
          <Icon name="close" />
        </button>
        <div className="space-y-2 mb-6">
          <span className={`font-code-inline text-label-caption uppercase ${modal.eyebrowClass}`}>{modal.eyebrow}</span>
          <h4 className="font-headline-md text-headline-md font-bold text-on-surface">{modal.title}</h4>
        </div>
        <div className={`grid grid-cols-1 gap-4 p-4 bg-surface-container-lowest font-code-inline text-code-inline mb-6 ${modal.gridClass}`}>
          {modal.steps.map((step) => (
            <div key={step.title} className="p-4 bg-surface-container space-y-2">
              <div className={`font-bold ${step.accentClass}`}>{step.title}</div>
              <p className="text-label-caption text-on-surface-variant">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="px-5 py-2 bg-surface-container text-on-surface font-label-badge text-label-badge hover:bg-surface-container-high"
            onClick={onClose}
          >
            關閉視窗
          </button>
        </div>
      </div>
    </div>
  )
}
