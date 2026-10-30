import { useState } from 'react'
import type { ProjectFilter } from './types'
import { ARCH_MODALS } from './data/modals'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Capabilities from './components/Capabilities'
import Stamps from './components/Stamps'
import Projects from './components/Projects'
import Experiences from './components/Experiences'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Modal from './components/Modal'

export default function App() {
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>('all')
  const [openModalId, setOpenModalId] = useState<string | null>(null)

  // 能力方格 → 套用篩選並捲動至對應專案
  function handleJump(filter: ProjectFilter, targetId: string) {
    setProjectFilter(filter)
    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  // 專案成果 → 高亮對應經歷列（捲動由錨點 href 處理）
  function handleHighlightExp(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    el.classList.remove('exp-highlight')
    void el.offsetWidth // 強制 reflow 以重新觸發動畫
    el.classList.add('exp-highlight')
  }

  const openModal = ARCH_MODALS.find((m) => m.id === openModalId) ?? null

  return (
    <>
      <Header />

      <main className="w-full pt-20 bg-surface">
        {/* 首頁區段：Hero + ABOUT + CAPABILITIES */}
        <div id="home" className="scroll-mt-20">
          <Hero />
          <About />
          <Capabilities onJump={handleJump} />
        </div>

        <Stamps />

        <Projects
          filter={projectFilter}
          onFilterChange={setProjectFilter}
          onOpenModal={setOpenModalId}
          onHighlightExp={handleHighlightExp}
        />

        <Experiences />

        <Contact />
      </main>

      <Footer />

      <Modal modal={openModal} onClose={() => setOpenModalId(null)} />
    </>
  )
}
