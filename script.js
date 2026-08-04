/* ==========================================================
   Naja Byg — script.js (index.html)
   Vanilla JS: navbar, hamburger, hero-karrusel med progress bar
   ========================================================== */

/* Adgangsbeskyttelse — tjek session ved hvert sideload */
if (sessionStorage.getItem('naja_access') !== 'granted') {
    window.location.replace('gate.html');
}

/* ----------------------------------------------------------
   Hero-karrusel med progress bar
   ---------------------------------------------------------- */
(function () {
    const slides = document.querySelectorAll('.hero-slide');
    const progressBar = document.getElementById('heroProgressBar');
    let current = 0;
    let timer = null;
    const INTERVAL = 7000;

    function startProgress() {
        if (!progressBar) return;
        progressBar.classList.remove('animating');
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        void progressBar.offsetWidth;
        progressBar.style.transition = `width ${INTERVAL}ms linear`;
        progressBar.classList.add('animating');
    }

    function goTo(index) {
        slides[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        startProgress();
    }

    function next() { goTo(current + 1); }

    function startTimer() {
        timer = setInterval(next, INTERVAL);
        startProgress();
    }

    function stopTimer() {
        clearInterval(timer);
        if (progressBar) {
            const computed = getComputedStyle(progressBar).width;
            const parentWidth = progressBar.parentElement.offsetWidth;
            const pct = (parseFloat(computed) / parentWidth) * 100;
            progressBar.style.transition = 'none';
            progressBar.style.width = pct + '%';
            progressBar.classList.remove('animating');
        }
    }

    const imagePanel = document.getElementById('heroCarousel');
    if (imagePanel) {
        imagePanel.addEventListener('mouseenter', stopTimer);
        imagePanel.addEventListener('mouseleave', startTimer);
    }

    if (slides.length) startTimer();
})();

/* ----------------------------------------------------------
   Navbar — skygge ved scroll
   ---------------------------------------------------------- */
const navbar = document.getElementById('navbar');
if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ----------------------------------------------------------
   Hamburger-menu på mobil
   ---------------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

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
