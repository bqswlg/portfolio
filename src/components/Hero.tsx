import Icon from './Icon'

/** 首頁第一屏 Hero */
export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex items-center overflow-hidden bg-surface py-12">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-[450px] w-[450px] bg-secondary-container/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 bg-primary-container/10 blur-[100px]" />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* 左側大標題與按鈕 */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-code-block text-code-block text-primary">
                <span className="text-tertiary">system.role</span>
                <span className="text-on-surface-variant">=</span>
                <span className="text-primary-fixed">"Vision &amp; Multimodal Architect"</span>
              </div>
              <h1 className="font-display-hero text-headline-lg sm:text-display-hero-mobile xl:text-display-hero font-extrabold text-on-surface tracking-tight leading-tight">
                專注於電腦視覺與<br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary-fixed to-secondary">
                  多模態系統
                </span>{' '}
                的<br />
                AI 軟體工程師
              </h1>
              <p className="font-headline-sm text-headline-sm text-tertiary-fixed-dim font-medium tracking-normal pt-1 max-w-xl">
                Bridging bleeding-edge Deep Learning research with production-grade distributed systems.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-linear-to-r from-primary-container to-secondary-container text-on-primary-fixed font-headline-sm text-body-md font-bold shadow-[0_0_24px_rgba(6,182,212,0.35)] hover:shadow-[0_0_32px_rgba(6,182,212,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                href="#contact"
              >
                <Icon name="download" className="text-[20px]" />
                <span>下載完整履歷 (PDF)</span>
              </a>
              <a
                className="inline-flex items-center gap-2 px-4 py-3 bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-badge text-label-badge transition-all hover:scale-[1.02]"
                href="https://github.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon name="code" className="text-primary text-[18px]" />
                <span>GitHub (20+ Repos)</span>
              </a>
              <a
                className="inline-flex items-center gap-2 px-4 py-3 bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-badge text-label-badge transition-all hover:scale-[1.02]"
                href="https://linkedin.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon name="share" className="text-tertiary text-[18px]" />
                <span>LinkedIn</span>
              </a>
              <a
                className="inline-flex items-center gap-2 px-4 py-3 bg-surface-container-low hover:bg-surface-container text-primary-fixed-dim font-label-badge text-label-badge transition-all"
                href="#contact"
              >
                <Icon name="calendar_month" className="text-[18px]" />
                <span>預約技術交流</span>
              </a>
            </div>
          </div>

          {/* 右側形象照與指標 */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end py-4">
            <div className="relative w-full max-w-[340px] xl:max-w-[400px] aspect-square bg-surface-container-low p-2 shadow-2xl border border-outline-variant/30">
              <div className="relative w-full h-full overflow-hidden bg-surface-container-highest">
                <img
                  alt="AI Software Engineer Profile"
                  className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[0.98]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo98IeVkVVflaoGaGH_u5YG4FYNRyO1RSpVEcPbqN1dqHWECCLOp92vLqDvC0lNFasI6t89J7WKrVouqP0s3qMIVD3xxw3Hc5x1_nGBWovTvz-QN_Xac-bY1qyvDu3hZOBuJSSOIy2mqlVznEPab4NYsy8cqyTd3FdloS0M_5kvGfpyD9qGR1pXNC2bvaKV_OwsLma48GtTVCwr-Ww81aN5fHBaIWC-Bp6gBFZ"
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 px-3 py-2 bg-surface-container-lowest/85 backdrop-blur-md flex items-center justify-between border border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary animate-pulse" />
                    <span className="font-code-inline text-code-inline text-on-surface font-medium">
                      engine_session: active
                    </span>
                  </div>
                  <span className="font-code-inline text-label-caption text-primary">CUDA::ARCH_90</span>
                </div>
              </div>

              <div className="absolute -top-5 -left-4 sm:-left-8 bg-surface-container-high/95 backdrop-blur-xl px-4 py-3 shadow-xl flex items-center gap-3 border border-outline-variant/40">
                <div className="w-10 h-10 bg-primary-container/20 flex items-center justify-center text-primary">
                  <Icon name="speed" className="text-[22px]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caption text-label-caption text-on-surface-variant uppercase tracking-wider">
                    Inference Speed
                  </span>
                  <span className="font-code-block text-headline-sm font-bold text-on-surface">
                    120+ <span className="text-primary text-code-inline font-normal">FPS (TensorRT)</span>
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-surface-container-high/95 backdrop-blur-xl px-4 py-3 shadow-xl flex items-center gap-3 border border-outline-variant/40">
                <div className="w-10 h-10 bg-secondary-container/30 flex items-center justify-center text-secondary">
                  <Icon name="target" className="text-[22px]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caption text-label-caption text-on-surface-variant uppercase tracking-wider">
                    Vision Benchmark
                  </span>
                  <span className="font-code-block text-headline-sm font-bold text-on-surface">
                    94.2% <span className="text-secondary text-code-inline font-normal">mAP@0.5</span>
                  </span>
                </div>
              </div>

              <div className="absolute top-1/2 -left-8 -translate-y-1/2 hidden xl:flex bg-surface-container-lowest/95 backdrop-blur-md px-3.5 py-2.5 shadow-lg flex-col gap-1 border border-outline-variant/40">
                <span className="font-label-caption text-label-caption text-on-surface-variant">Production Deployed</span>
                <div className="flex items-center gap-2">
                  <span className="font-code-block text-body-lg font-bold text-primary">12+ Models</span>
                  <span className="font-code-inline text-label-caption text-outline">Triton/k8s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
