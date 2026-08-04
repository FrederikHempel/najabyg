/* ==========================================================
   Naja Byg — skovvangsvej.js
   Projekt-detaljeside: tab-galleri, inline sliders, lightbox
   ========================================================== */

/* Adgangsbeskyttelse */
if (sessionStorage.getItem('naja_access') !== 'granted') {
    window.location.replace('gate.html');
}

/* ----------------------------------------------------------
   Navbar — skygge ved scroll + hamburger
   ---------------------------------------------------------- */
const navbar = document.getElementById('navbar');
if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ----------------------------------------------------------
   Billeder per tab
   ---------------------------------------------------------- */
const tabs = {
    'som-koebt': [
        { src: 'assets/billeder/Skovvangsvej/Som købt/IMG_4980.jpeg', alt: 'Som købt' },
        { src: 'assets/billeder/Skovvangsvej/Som købt/IMG_4981.jpeg', alt: 'Som købt' },
        { src: 'assets/billeder/Skovvangsvej/Som købt/IMG_5031.jpeg', alt: 'Som købt' },
        { src: 'assets/billeder/Skovvangsvej/Som købt/IMG_5032.jpeg', alt: 'Som købt' },
        { src: 'assets/billeder/Skovvangsvej/Som købt/IMG_5033.jpeg', alt: 'Som købt' },
        { src: 'assets/billeder/Skovvangsvej/Som købt/IMG_5034.jpeg', alt: 'Som købt' },
        { src: 'assets/billeder/Skovvangsvej/Som købt/IMG_5035.jpeg', alt: 'Som købt' },
        { src: 'assets/billeder/Skovvangsvej/Som købt/IMG_5041.jpeg', alt: 'Som købt' },
        { src: 'assets/billeder/Skovvangsvej/Som købt/IMG_6177.jpeg', alt: 'Som købt' },
    ],
    'byggeproces': [
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6183.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6188.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6190.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6191.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6200.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6201.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6209.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6210.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6215.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6217.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6269.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6298.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6302.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6303.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6308.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6309.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6310.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6322.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6323.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6324.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6328.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6329.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6330.jpeg', alt: 'Under renovering' },
        { src: 'assets/billeder/Skovvangsvej/Byggeprocessen/IMG_6331.jpeg', alt: 'Under renovering' },
    ],
    'faerdig': [
        { src: 'assets/billeder/Skovvangsvej/Færdig lejlighed/IMG_6427.jpeg', alt: 'Færdigt resultat' },
        { src: 'assets/billeder/Skovvangsvej/Færdig lejlighed/IMG_6432.jpeg', alt: 'Færdigt resultat' },
        { src: 'assets/billeder/Skovvangsvej/Færdig lejlighed/IMG_6434.jpeg', alt: 'Færdigt resultat' },
        { src: 'assets/billeder/Skovvangsvej/Færdig lejlighed/IMG_6435.jpeg', alt: 'Færdigt resultat' },
        { src: 'assets/billeder/Skovvangsvej/Færdig lejlighed/IMG_6437.jpeg', alt: 'Færdigt resultat' },
        { src: 'assets/billeder/Skovvangsvej/Færdig lejlighed/IMG_6438.jpeg', alt: 'Færdigt resultat' },
        { src: 'assets/billeder/Skovvangsvej/Færdig lejlighed/IMG_6442.jpeg', alt: 'Færdigt resultat' },
        { src: 'assets/billeder/Skovvangsvej/Færdig lejlighed/IMG_6443.jpeg', alt: 'Færdigt resultat' },
        { src: 'assets/billeder/Skovvangsvej/Færdig lejlighed/IMG_6444.jpeg', alt: 'Færdigt resultat' },
        { src: 'assets/billeder/Skovvangsvej/Færdig lejlighed/IMG_6445.jpeg', alt: 'Færdigt resultat' },
        { src: 'assets/billeder/Skovvangsvej/Færdig lejlighed/IMG_6446.jpeg', alt: 'Færdigt resultat' },
    ],
};

/* ----------------------------------------------------------
   Render tab-galleri
   ---------------------------------------------------------- */
let activeTab = 'som-koebt';
let lightboxImages = [];  // billeder i aktiv tab
let lightboxIndex  = 0;

function renderTab(tabKey) {
    const images = tabs[tabKey] || [];
    const panel  = document.getElementById('tab-' + tabKey);
    if (!panel) return;

    if (!images.length) {
        panel.innerHTML = '<div class="gallery-empty">Billeder kommer snart</div>';
        return;
    }

    panel.innerHTML = images.map((img, idx) => `
        <div class="gallery-item" data-tab="${tabKey}" data-index="${idx}"
             role="button" tabindex="0" aria-label="Åbn billede ${idx + 1}">
            <img src="${img.src}" alt="${img.alt}" loading="lazy" />
        </div>
    `).join('');

    panel.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click',   () => openLightbox(tabKey, Number(item.dataset.index)));
        item.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(tabKey, Number(item.dataset.index));
            }
        });
    });
}

// Render alle tabs ved load
Object.keys(tabs).forEach(renderTab);

/* ----------------------------------------------------------
   Tab-skift
   ---------------------------------------------------------- */
document.querySelectorAll('.gallery-tab').forEach(btn => {
    btn.addEventListener('click', () => {
        // Deaktiver alle
        document.querySelectorAll('.gallery-tab').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        document.querySelectorAll('.gallery-panel').forEach(p => p.classList.remove('active'));

        // Aktiver valgt
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        activeTab = btn.dataset.tab;
        document.getElementById('tab-' + activeTab).classList.add('active');
    });
});

/* ----------------------------------------------------------
   Lightbox — enkeltbillede med navigation
   ---------------------------------------------------------- */
const lightbox        = document.getElementById('lightbox');
const lightboxClose   = document.getElementById('lightboxClose');
const lightboxPrev    = document.getElementById('lightboxPrev');
const lightboxNext    = document.getElementById('lightboxNext');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(tabKey, idx) {
    lightboxImages = tabs[tabKey] || [];
    lightboxIndex  = idx;
    showLightboxImage();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function showLightboxImage() {
    const img = lightboxImages[lightboxIndex];
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = `${img.alt} — ${lightboxIndex + 1} / ${lightboxImages.length}`;
}

function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function navigateLightbox(delta) {
    lightboxIndex = (lightboxIndex + delta + lightboxImages.length) % lightboxImages.length;
    showLightboxImage();
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click',  () => navigateLightbox(-1));
lightboxNext.addEventListener('click',  () => navigateLightbox(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

/* ----------------------------------------------------------
   Inline før/efter-sliders (rum for rum)
   Initialiserer hvert .inline-ba-slider element uafhængigt
   ---------------------------------------------------------- */
document.querySelectorAll('.inline-ba-slider').forEach(slider => {
    const beforeImg = slider.querySelector('.iba-before');
    const handle    = slider.querySelector('.iba-handle');
    let isDragging  = false;

    function setPos(pct) {
        const clamped = Math.max(0, Math.min(100, pct));
        beforeImg.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
        handle.style.left = `${clamped}%`;
    }

    function getPercent(e) {
        const rect    = slider.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        return ((clientX - rect.left) / rect.width) * 100;
    }

    function startDrag(e) {
        isDragging = true;
        setPos(getPercent(e));
        e.preventDefault();
    }

    function onDrag(e)  { if (isDragging) setPos(getPercent(e)); }
    function endDrag()  { isDragging = false; }

    slider.addEventListener('mousedown',  startDrag);
    slider.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('mousemove',  onDrag);
    window.addEventListener('touchmove',  onDrag, { passive: false });
    window.addEventListener('mouseup',    endDrag);
    window.addEventListener('touchend',   endDrag);

    // Start ved 50 %
    setPos(50);
});
