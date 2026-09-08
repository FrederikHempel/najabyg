/* ══════════════════════════════════════════════════════════════
   Naja Byg — hjemmeside
   Kun bevægelse, der bekræfter noget, brugeren gør.
   Indtoning ved scroll ligger i CSS (animation-timeline: view()).
   ══════════════════════════════════════════════════════════════ */

/* ── Adgangstjek — sitet er ikke offentligt endnu ────────────── */
if (sessionStorage.getItem('naja_access') !== 'granted') {
    window.location.replace('gate.html');
}

/* ── Telefonbaren skifter til kompakt tilstand efter 10 px ───── */
(function phonebar() {
    const bar = document.getElementById('phonebar');
    if (!bar) return;

    const update = () => bar.classList.toggle('is-compact', window.scrollY > 10);
    update();
    window.addEventListener('scroll', update, { passive: true });
})();

/* ── Mobilmenu ───────────────────────────────────────────────── */
(function mobileNav() {
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
    });

    // Luk menuen når der navigeres
    links.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            links.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
})();

/* ── Før/efter-slider ────────────────────────────────────────
   Brugeren trækker selv. Virker med mus, touch og tastatur. */
(function beforeAfter() {
    document.querySelectorAll('.ba').forEach((el) => {
        let dragging = false;

        const setPos = (clientX) => {
            const r = el.getBoundingClientRect();
            const pct = Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
            el.style.setProperty('--pos', pct + '%');
            el.setAttribute('aria-valuenow', Math.round(pct));
        };

        const start = (e) => {
            dragging = true;
            setPos(e.clientX ?? e.touches[0].clientX);
        };
        const move = (e) => {
            if (!dragging) return;
            setPos(e.clientX ?? e.touches[0].clientX);
        };
        const end = () => { dragging = false; };

        el.addEventListener('pointerdown', start);
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', end);

        // Tastatur — pilene flytter håndtaget 4 % ad gangen
        el.addEventListener('keydown', (e) => {
            const now = parseFloat(el.getAttribute('aria-valuenow') || '50');
            let next = now;
            if (e.key === 'ArrowLeft')  next = Math.max(0, now - 4);
            if (e.key === 'ArrowRight') next = Math.min(100, now + 4);
            if (e.key === 'Home')       next = 0;
            if (e.key === 'End')        next = 100;
            if (next === now) return;
            e.preventDefault();
            el.style.setProperty('--pos', next + '%');
            el.setAttribute('aria-valuenow', Math.round(next));
        });
    });
})();

/* ── Opgavekort: „Se mere“ folder citatet ud ─────────────────── */
(function cardToggles() {
    document.querySelectorAll('.card-toggle').forEach((btn) => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.card');
            const open = card.classList.toggle('is-open');
            btn.setAttribute('aria-expanded', String(open));
        });
    });
})();
