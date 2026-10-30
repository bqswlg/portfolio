/**
 * 1. 頁眉動態滑塊與滾輪過半自動切換 (ScrollSpy at 50% Viewport)
 */
(function initHeaderScrollSpy() {
    const nav = document.getElementById('top-nav');
    const indicator = document.getElementById('nav-indicator');
    const navLinks = Array.from(document.querySelectorAll('#top-nav .nav-link'));
    const sections = navLinks
        .map(link => document.getElementById(link.getAttribute('data-section')))
        .filter(Boolean);

    let currentActiveSectionId = 'home';

    function updateIndicatorPosition(activeLink) {
        if (!activeLink || !indicator || !nav) return;
        const navRect = nav.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        const left = linkRect.left - navRect.left;
        indicator.style.width = `${linkRect.width}px`;
        indicator.style.transform = `translateX(${left}px)`;
    }

    function setActiveNav(sectionId) {
        const targetLink = navLinks.find(link => link.getAttribute('data-section') === sectionId);
        if (!targetLink) return;

        currentActiveSectionId = sectionId;

        navLinks.forEach(link => {
            if (link === targetLink) {
                link.setAttribute('aria-current', 'page');
                link.classList.remove('text-on-surface-variant', 'font-medium', 'hover:text-primary');
                link.classList.add('text-on-primary-fixed', 'font-bold');
            } else {
                link.removeAttribute('aria-current');
                link.classList.remove('text-on-primary-fixed', 'font-bold');
                link.classList.add('text-on-surface-variant', 'font-medium', 'hover:text-primary');
            }
        });

        updateIndicatorPosition(targetLink);
    }

    function onScrollCheck() {
        const viewportMiddle = window.scrollY + window.innerHeight * 0.5;
        let matchedSectionId = sections[0].id;

        for (const sec of sections) {
            const top = sec.offsetTop;
            const bottom = top + sec.offsetHeight;
            if (viewportMiddle >= top && viewportMiddle < bottom) {
                matchedSectionId = sec.id;
                break;
            }
        }

        if (matchedSectionId !== currentActiveSectionId) {
            setActiveNav(matchedSectionId);
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const secId = link.getAttribute('data-section');
            setActiveNav(secId);
        });
    });

    window.addEventListener('scroll', onScrollCheck, { passive: true });
    window.addEventListener('resize', () => {
        const activeLink = navLinks.find(l => l.getAttribute('data-section') === currentActiveSectionId);
        updateIndicatorPosition(activeLink);
    });

    window.addEventListener('DOMContentLoaded', () => {
        setActiveNav('home');
        onScrollCheck();
    });
    setTimeout(() => setActiveNav(currentActiveSectionId), 100);
})();



/**
 * 自動從 stamps/ 資料夾載入圖片清單：
 * 直接抓取 stamps/ 目錄下的所有圖片檔案。
 * (請確保使用的 Local Server 有開啟目錄索引 Directory Listing，例如 VSCode Live Server 或 Python http.server)
 */
/**
 * 透過 stamps/manifest.json 載入圖片清單與敘述
 */
async function loadStampsFromFolder() {
    try {
        // 請求 stamps 資料夾下的 manifest.json
        const response = await fetch('stamps/manifest.json', { cache: 'no-store' });

        if (response.ok) {
            const manifest = await response.json();

            // 確認 JSON 內有資料
            if (manifest && manifest.length > 0) {
                return manifest.map((item, idx) => ({
                    id: `stamp-${idx}`,
                    // 自動判斷是否已經有 stamps/ 前綴，若無則自動補上
                    src: item.src.startsWith('http') || item.src.startsWith('stamps/')
                        ? item.src
                        : `stamps/${item.src}`,
                    tag: item.tag || 'ACTIVITY STAMP',
                    title: item.title || '活動紀錄',
                    desc: item.desc || '活動參與紀錄與技術交流足跡'
                }));
            }
        }
    } catch (error) {
        console.error('無法讀取 manifest.json，請確認 Local Server 是否啟動，或 JSON 格式是否正確。', error);
    }

    // 若讀取失敗或 JSON 檔案為空，回退至預設展示照片確保版面正常運作
    return FALLBACK_STAMPS_DATA.map((item, idx) => ({
        ...item,
        id: `stamp-${idx}`
    }));
}

(function initStampsCarousel() {
    const row1El = document.getElementById('stamp-row-1');
    const row2El = document.getElementById('stamp-row-2');
    const imgLayerA = document.getElementById('stamp-featured-img-a');
    const imgLayerB = document.getElementById('stamp-featured-img-b');
    const featuredTag = document.getElementById('stamp-featured-tag');
    const featuredTitle = document.getElementById('stamp-featured-title');
    const featuredDesc = document.getElementById('stamp-featured-desc');
    const textBox = document.getElementById('stamp-text-box');
    const progressBar = document.getElementById('stamp-progress-bar');

    let queue = [];
    const domMap = new Map(); // id -> button DOM element (保留節點以進行絲滑 FLIP 動畫)
    let activeImgLayer = 'A';

    const ROTATE_INTERVAL_MS = 2500;
    const TICK_MS = 40;
    let elapsedMs = 0;

    // 絲滑更新左側主圖 (雙圖層 Crossfade + 文字淡入)
    function updateFeaturedView(item, immediate = false) {
        if (!item) return;

        if (immediate) {
            if (imgLayerA) {
                imgLayerA.src = item.src;
                imgLayerA.classList.remove('opacity-0', 'scale-[1.03]');
                imgLayerA.classList.add('opacity-100', 'scale-100');
            }
            if (imgLayerB) {
                imgLayerB.classList.remove('opacity-100', 'scale-100');
                imgLayerB.classList.add('opacity-0', 'scale-[1.03]');
            }
            activeImgLayer = 'A';
        } else {
            const incoming = activeImgLayer === 'A' ? imgLayerB : imgLayerA;
            const outgoing = activeImgLayer === 'A' ? imgLayerA : imgLayerB;

            if (incoming && outgoing) {
                incoming.src = item.src;
                incoming.classList.remove('opacity-0', 'scale-[1.03]');
                incoming.classList.add('opacity-100', 'scale-100');

                outgoing.classList.remove('opacity-100', 'scale-100');
                outgoing.classList.add('opacity-0', 'scale-[1.03]');

                activeImgLayer = activeImgLayer === 'A' ? 'B' : 'A';
            }
        }

        if (textBox && !immediate) {
            textBox.style.opacity = '0.35';
            textBox.style.transform = 'translateY(3px)';
            setTimeout(() => {
                if (featuredTag) featuredTag.textContent = item.tag;
                if (featuredTitle) featuredTitle.textContent = item.title;
                if (featuredDesc) featuredDesc.textContent = item.desc;
                textBox.style.opacity = '1';
                textBox.style.transform = 'translateY(0)';
            }, 140);
        } else {
            if (featuredTag) featuredTag.textContent = item.tag;
            if (featuredTitle) featuredTitle.textContent = item.title;
            if (featuredDesc) featuredDesc.textContent = item.desc;
        }
    }

    // 建立單一候選縮圖節點 (高度100%均分，寬度依圖片原始比例自然呈現，不加編號標籤)
    function createThumbElement(item) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.dataset.stampId = item.id;
        btn.className = 'stamp-thumb relative h-full overflow-hidden shrink-0 border transition-opacity duration-300';
        btn.innerHTML = `
            <img src="${item.src}" alt="${item.title}" class="h-full w-auto max-w-none object-cover block select-none pointer-events-none" />
        `;
        btn.addEventListener('click', () => {
            const targetIndex = queue.findIndex(q => q.id === item.id);
            if (targetIndex > 0) {
                const moved = queue.splice(0, targetIndex);
                queue.push(...moved);
                elapsedMs = 0;
                renderQueueWithFLIP(false);
            }
        });
        return btn;
    }

    /**
     * 依照：
     * 第一排：1, 2, 3, ..., Math.floor(n / 2)
     * 第二排：Math.floor(n / 2) + 1, ..., n
     * 排列候選照片，並使用 FLIP 動畫讓每張照片絲滑往前替補
     */
    function renderQueueWithFLIP(immediate = false) {
        if (!row1El || !row2El || queue.length === 0) return;

        // 1. FIRST: 記錄移動前每個候選縮圖的螢幕座標
        const firstRects = new Map();
        if (!immediate) {
            domMap.forEach((el, id) => {
                if (el.isConnected) {
                    firstRects.set(id, el.getBoundingClientRect());
                }
            });
        }

        // 2. 更新左側大圖為隊伍第 1 張 (queue[0])
        updateFeaturedView(queue[0], immediate);

        // 3. 計算雙排分割點：上排 0 ~ splitIndex-1，下排 splitIndex ~ n-1
        const n = queue.length;
        const splitIndex = Math.max(1, Math.floor(n / 2));

        // 4. 將節點依新順序掛載至第一排與第二排
        queue.forEach((item, idx) => {
            let btn = domMap.get(item.id);
            if (!btn) {
                btn = createThumbElement(item);
                domMap.set(item.id, btn);
            }

            // 第 1 張 (目前展示中) 加上主題色高亮外框，其餘候選照片維持半透明待命
            if (idx === 0) {
                btn.classList.add('border-primary', 'ring-2', 'ring-primary', 'opacity-100');
                btn.classList.remove('border-outline-variant/40', 'opacity-70', 'hover:opacity-100');
            } else {
                btn.classList.remove('border-primary', 'ring-2', 'ring-primary', 'opacity-100');
                btn.classList.add('border-outline-variant/40', 'opacity-70', 'hover:opacity-100');
            }

            if (idx < splitIndex) {
                row1El.appendChild(btn);
            } else {
                row2El.appendChild(btn);
            }
        });

        // 5. LAST & INVERT & PLAY: 執行 FLIP 平滑位移補間
        if (!immediate && firstRects.size > 0) {
            queue.forEach((item, idx) => {
                const btn = domMap.get(item.id);
                const firstRect = firstRects.get(item.id);
                if (!btn || !firstRect) return;

                const lastRect = btn.getBoundingClientRect();
                const deltaX = firstRect.left - lastRect.left;
                const deltaY = firstRect.top - lastRect.top;

                if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
                    // 剛從第一排第 1 張退到第二排隊尾的照片，用淡入滑入避免橫跨整個畫面造成視覺干擾
                    const wrappedToTail = idx === queue.length - 1 && deltaX < -120;

                    btn.style.transition = 'none';
                    if (wrappedToTail) {
                        btn.style.opacity = '0';
                        btn.style.transform = 'translateX(28px)';
                    } else {
                        btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                    }

                    // 強制 Reflow 後平滑滑入新位置
                    void btn.offsetHeight;

                    btn.style.transition = 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.65s ease';
                    btn.style.transform = 'translate(0, 0)';
                    if (wrappedToTail) {
                        btn.style.opacity = '';
                    }
                }
            });
        }
    }

    function rotateNextStamp() {
        if (queue.length <= 1) return;
        const first = queue.shift();
        if (first) queue.push(first);
        renderQueueWithFLIP(false);
    }

    // 啟動：先載入 stamps/ 資料夾照片，再開始每 2.5 秒自動輪替
    loadStampsFromFolder().then(loadedStamps => {
        queue = loadedStamps;
        renderQueueWithFLIP(true);

        setInterval(() => {
            elapsedMs += TICK_MS;
            if (progressBar) {
                const pct = Math.min(100, (elapsedMs / ROTATE_INTERVAL_MS) * 100);
                progressBar.style.width = `${pct}%`;
            }
            if (elapsedMs >= ROTATE_INTERVAL_MS) {
                elapsedMs = 0;
                rotateNextStamp();
            }
        }, TICK_MS);
    });
})();

/**
 * 3. 參與專案 (PROJECTS) 領域篩選、時間排序與排除專案變暗後置
 */
function applyProjectFilter(filterValue) {
    const filterButtons = document.querySelectorAll('#project-filter-group .project-filter-btn');
    const projectCards = Array.from(document.querySelectorAll('#projects-container .project-card'));

    filterButtons.forEach(btn => {
        const isTarget = btn.getAttribute('data-filter') === filterValue;
        if (isTarget) {
            btn.classList.add('bg-primary', 'text-on-primary-fixed', 'font-bold');
            btn.classList.remove('text-on-surface-variant', 'hover:text-primary');
        } else {
            btn.classList.remove('bg-primary', 'text-on-primary-fixed', 'font-bold');
            btn.classList.add('text-on-surface-variant', 'hover:text-primary');
        }
    });

    const sortedByDate = [...projectCards].sort((a, b) => {
        const dateA = a.getAttribute('data-date') || '';
        const dateB = b.getAttribute('data-date') || '';
        return dateB.localeCompare(dateA);
    });

    sortedByDate.forEach((card, index) => {
        const categories = (card.getAttribute('data-categories') || '').split(/\s+/);
        const isMatched = filterValue === 'all' || categories.includes(filterValue);

        if (isMatched) {
            card.style.order = index + 1;
            card.classList.remove('opacity-35', 'brightness-50', 'saturate-50', 'scale-[0.98]');
            card.classList.add('opacity-100');
        } else {
            card.style.order = index + 100;
            card.classList.remove('opacity-100');
            card.classList.add('opacity-35', 'brightness-50', 'saturate-50', 'scale-[0.98]');
        }
    });
}

(function initProjectFilterButtons() {
    const filterButtons = document.querySelectorAll('#project-filter-group .project-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            applyProjectFilter(filterValue);
        });
    });
})();

/**
 * 4. CAPABILITIES 四格大方向點擊跳轉至對應專案並自動套用主題篩選
 */
function jumpToProjectsWithCategory(category, targetProjectId) {
    applyProjectFilter(category);
    const targetEl = document.getElementById(targetProjectId) || document.getElementById('projects');
    if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * 5. 專案成果點擊跳轉至對應經歷並高亮閃爍
 */
function highlightExperience(expId) {
    const expEl = document.getElementById(expId);
    if (!expEl) return;
    expEl.classList.remove('exp-highlight');
    void expEl.offsetWidth;
    expEl.classList.add('exp-highlight');
}

/**
 * 6. 架構拓撲 Modal 與聯繫表單工具函式
 */
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        ['modal-traffic', 'modal-guidesense', 'modal-artecho'].forEach(id => {
            const m = document.getElementById(id);
            if (m && !m.classList.contains('hidden')) {
                m.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

function updateTaipeiClock() {
    const clockEl = document.getElementById('live-taipei-clock');
    if (!clockEl) return;
    const now = new Date();
    const formatted = new Intl.DateTimeFormat('zh-TW', {
        timeZone: 'Asia/Taipei',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(now);
    clockEl.textContent = 'Asia/Taipei GMT+8: ' + formatted;
}
updateTaipeiClock();
setInterval(updateTaipeiClock, 1000);

function copyEmailTarget() {
    const emailEl = document.getElementById('email-address-target');
    if (!emailEl) return;
    navigator.clipboard.writeText(emailEl.textContent.trim()).then(() => {
        const btn = document.getElementById('copy-btn');
        const original = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">done</span>';
        setTimeout(() => { btn.innerHTML = original; }, 2000);
    });
}

function handleFormSubmission(event) {
    event.preventDefault();
    const submitBtn = document.getElementById('submit-form-btn');
    const submitIcon = document.getElementById('submit-icon');
    const submitLabel = document.getElementById('submit-label');
    const toast = document.getElementById('status-toast');

    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75');
    submitIcon.textContent = 'sync';
    submitIcon.classList.add('animate-spin');
    submitLabel.textContent = '封裝發送中...';

    setTimeout(() => {
        submitIcon.classList.remove('animate-spin');
        submitIcon.textContent = 'check';
        submitLabel.textContent = '傳送完畢 (Dispatched)';
        toast.classList.remove('hidden');

        setTimeout(() => {
            document.getElementById('contact-quick-form').reset();
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-75');
            submitIcon.textContent = 'rocket_launch';
            submitLabel.textContent = '傳送訊息 (Send Message)';
        }, 3500);
    }, 900);
}