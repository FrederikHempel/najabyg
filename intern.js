/* ==========================================================
   Naja Byg — Intern dashboard & beregner
   ========================================================== */

// Adgangstjek (samme mønster som script.js og skovvangsvej.js)
if (sessionStorage.getItem('naja_access') !== 'granted') {
    window.location.replace('gate.html');
}

/* ---------- Hjælpefunktioner ---------- */

const fmtKr = new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const fmtKrInt = new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
    maximumFractionDigits: 0,
});

const fmtNumDec = new Intl.NumberFormat('da-DK', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
});

const fmtPct = new Intl.NumberFormat('da-DK', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
});

const fmtDate = (iso) => {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    if (!y || !m || !d) return iso;
    return `${d}.${m}.${y}`;
};

const kr     = (v) => fmtKr.format(v || 0);
const krInt  = (v) => fmtKrInt.format(Math.round(v || 0));

// Farvepalette til donut/kategorier — afledt af brand-farver med justeret tone
const CAT_COLORS = [
    '#1B3A5C', // navy
    '#C9A96E', // gold
    '#8C8278', // warm gray
    '#5C7A99', // muted blue
    '#A88656', // dark gold
    '#4A5D70', // slate
    '#D4BA82', // light gold
    '#3F5A7C', // mid navy
    '#B8A18A', // sand-brown
    '#6F8AA8', // sky-blue
    '#9C7A50', // bronze
];

const STAND_DESCRIPTIONS = {
    1: 'cosmetic',
    2: 'meget let',
    3: 'let renovering',
    4: 'middel renovering',
    5: 'middel-tung',
    6: 'tung renovering',
    7: 'omfattende',
    8: 'meget omfattende',
    9: 'gennemgribende',
    10: 'totalrenovering',
};

/* ---------- Stand-til-faktor ---------- */
function standToFactor(stand) {
    if (stand <= 4) {
        return 0.3 + (stand - 1) * (0.7 / 3);   // 1→0.3, 4→1.0
    }
    return 1.0 + (stand - 4) * (1.0 / 6);        // 4→1.0, 10→2.0
}

/* ---------- State ---------- */
let projektData = null;
let baselineData = null;

/* ---------- Datafetch ---------- */
async function loadData() {
    try {
        const [projects, baseline] = await Promise.all([
            fetch('data/skovvangsvej.json').then(r => r.json()),
            fetch('data/baseline.json').then(r => r.json()),
        ]);
        projektData = projects;
        baselineData = baseline;
        renderProjects();
        initCalculator();
    } catch (err) {
        document.getElementById('projects-container').innerHTML =
            '<div class="loading-state">Kunne ikke indlæse projektdata.</div>';
        console.error('Datafejl:', err);
    }
}

/* ==========================================================
   PROJEKT-KORT MED KPI, DONUT OG KATEGORI-TABEL
   ========================================================== */
function renderProjects() {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    container.appendChild(buildProjectCard(projektData));
}

function buildProjectCard(p) {
    const card = document.createElement('article');
    card.className = 'project-card';

    // Header (klikbar)
    const header = document.createElement('div');
    header.className = 'project-card-header';
    header.innerHTML = `
        <div>
            <div class="project-card-title">${p.navn}</div>
            <div class="project-card-meta">${p.adresse} · ${p.kpi.m2_bbr} m² BBR · ${p.kpi.projektvarighed_mdr} mdr</div>
        </div>
        <span class="project-card-status">${p.status}</span>
        <span class="project-card-toggle" aria-hidden="true">▾</span>
    `;
    header.addEventListener('click', () => card.classList.toggle('open'));

    // Body
    const body = document.createElement('div');
    body.className = 'project-card-body';
    const inner = document.createElement('div');
    inner.className = 'project-card-inner';

    inner.appendChild(buildKpiGrid(p.kpi));
    inner.appendChild(buildCostSection(p.kategorier));

    body.appendChild(inner);
    card.appendChild(header);
    card.appendChild(body);

    // Åbn automatisk hvis kun ét projekt
    card.classList.add('open');

    return card;
}

function buildKpiGrid(kpi) {
    const grid = document.createElement('div');
    grid.className = 'kpi-grid';

    const fortjenestePositiv = kpi.fortjeneste_estimeret > 0;

    grid.innerHTML = `
        <div class="kpi-card">
            <span class="kpi-label">Købspris</span>
            <span class="kpi-value">${kr(kpi.købspris)}</span>
        </div>
        <div class="kpi-card">
            <span class="kpi-label">Salgspris (est.)</span>
            <span class="kpi-value">${kr(kpi.salgspris)}</span>
            <span class="kpi-sub">+${kr(kpi.salgspris - kpi.købspris)} værdistigning</span>
        </div>
        <div class="kpi-card">
            <span class="kpi-label">Renovering</span>
            <span class="kpi-value">${kr(kpi.renovering_total)}</span>
            <span class="kpi-sub">${Math.round(kpi.renovering_total / kpi.m2_bbr).toLocaleString('da-DK')} kr/m²</span>
        </div>
        <div class="kpi-card">
            <span class="kpi-label">Fortjeneste (est.)</span>
            <span class="kpi-value ${fortjenestePositiv ? 'positive' : 'negative'}">${kr(kpi.fortjeneste_estimeret)}</span>
            <span class="kpi-sub">Lav scenarie: ${kr(kpi.fortjeneste_lav)}</span>
        </div>
        <div class="kpi-card">
            <span class="kpi-label">ROI</span>
            <span class="kpi-value ${fortjenestePositiv ? 'positive' : 'negative'}">${kpi.roi_estimeret_pct.toFixed(1)} %</span>
            <span class="kpi-sub">Lav: ${kpi.roi_lav_pct.toFixed(1)} %</span>
        </div>
        <div class="kpi-card">
            <span class="kpi-label">LTV</span>
            <span class="kpi-value">${(kpi.ltv * 100).toFixed(0)} %</span>
            <span class="kpi-sub">Grænse 75 %</span>
        </div>
    `;
    return grid;
}

function buildCostSection(kategorier) {
    const section = document.createElement('div');
    section.className = 'cost-section';

    const heading = document.createElement('h3');
    heading.textContent = 'Renoveringsomkostninger pr. kategori';
    section.appendChild(heading);

    section.appendChild(buildDonut(kategorier));
    section.appendChild(buildCategoryTable(kategorier));

    return section;
}

/* ---------- Donut chart ---------- */
function buildDonut(kategorier) {
    const total = kategorier.reduce((sum, k) => sum + k.total, 0);
    const wrap = document.createElement('div');
    wrap.className = 'donut-wrap';

    const r = 70;
    const cx = 100;
    const cy = 100;
    const circumference = 2 * Math.PI * r;

    let offset = 0;

    const segments = kategorier.map((k, i) => {
        const fraction = k.total / total;
        const dashLen = fraction * circumference;
        const dashGap = circumference - dashLen;
        const seg = `
            <circle class="donut-segment"
                    cx="${cx}" cy="${cy}" r="${r}"
                    stroke="${CAT_COLORS[i % CAT_COLORS.length]}"
                    stroke-dasharray="${dashLen.toFixed(3)} ${dashGap.toFixed(3)}"
                    stroke-dashoffset="${(-offset).toFixed(3)}"
                    data-cat-index="${i}">
                <title>${k.navn}: ${kr(k.total)} (${(fraction * 100).toFixed(1)}%)</title>
            </circle>`;
        offset += dashLen;
        return seg;
    }).join('');

    wrap.innerHTML = `
        <svg class="donut-chart" viewBox="0 0 200 200">
            <g transform="rotate(-90 100 100)">
                ${segments}
            </g>
            <text class="donut-center-label" x="100" y="92">TOTAL</text>
            <text class="donut-center-total" x="100" y="110">${kr(total)}</text>
        </svg>
    `;

    // Klik på segment → drilldown
    wrap.querySelectorAll('.donut-segment').forEach(seg => {
        seg.addEventListener('click', () => {
            const idx = parseInt(seg.dataset.catIndex, 10);
            openDrilldown(kategorier[idx]);
        });
    });

    return wrap;
}

/* ---------- Kategori-tabel ---------- */
function buildCategoryTable(kategorier) {
    const total = kategorier.reduce((sum, k) => sum + k.total, 0);
    const table = document.createElement('table');
    table.className = 'cost-table';

    const rows = kategorier.map((k, i) => {
        const pct = (k.total / total) * 100;
        const color = CAT_COLORS[i % CAT_COLORS.length];
        return `
            <tr class="cost-row" data-cat-index="${i}">
                <td>
                    <span class="cost-color-dot" style="background:${color}"></span>
                    ${k.navn}
                    <span class="cost-type-tag">${k.type}</span>
                </td>
                <td class="num">${kr(k.total)}</td>
                <td class="num" style="color:var(--warm-gray); font-weight:500;">${pct.toFixed(1)} %</td>
                <td class="arrow">▸</td>
            </tr>
        `;
    }).join('');

    table.innerHTML = `
        <thead>
            <tr>
                <th>Kategori</th>
                <th class="num">Beløb</th>
                <th class="num">Andel</th>
                <th></th>
            </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
            <tr>
                <td>Total</td>
                <td class="num">${kr(total)}</td>
                <td class="num">100 %</td>
                <td></td>
            </tr>
        </tfoot>
    `;

    table.querySelectorAll('.cost-row').forEach(row => {
        row.addEventListener('click', () => {
            const idx = parseInt(row.dataset.catIndex, 10);
            openDrilldown(kategorier[idx]);
        });
    });

    return table;
}

/* ==========================================================
   DRILLDOWN MODAL
   ========================================================== */
const drilldownModal   = document.getElementById('drilldownModal');
const drilldownTitle   = document.getElementById('drilldownTitle');
const drilldownEyebrow = document.getElementById('drilldownEyebrow');
const drilldownTotal   = document.getElementById('drilldownTotal');
const drilldownCount   = document.getElementById('drilldownCount');
const drilldownBody    = document.getElementById('drilldownBody');

function openDrilldown(kategori) {
    drilldownTitle.textContent = kategori.navn;
    drilldownEyebrow.textContent = `${kategori.type.charAt(0).toUpperCase() + kategori.type.slice(1)} omkostning`;
    drilldownTotal.textContent = kr(kategori.total);
    drilldownCount.textContent = `${kategori.bilag.length} bilag`;

    drilldownBody.innerHTML = kategori.bilag.map(b => `
        <tr>
            <td class="dato">${fmtDate(b.dato)}</td>
            <td class="leverandør">${escapeHtml(b.leverandør)}</td>
            <td class="produkt">${escapeHtml(b.produkt)}${b.antal > 1 ? ` <span style="color:var(--warm-gray);">× ${b.antal}</span>` : ''}</td>
            <td class="beløb">${kr(b.beløb)}</td>
        </tr>
    `).join('') || `
        <tr><td colspan="4" style="text-align:center;padding:2rem;color:var(--warm-gray);">Ingen bilag registreret</td></tr>
    `;

    drilldownModal.hidden = false;
    document.body.style.overflow = 'hidden';
}

function closeDrilldown() {
    drilldownModal.hidden = true;
    document.body.style.overflow = '';
}

drilldownModal.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeDrilldown);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drilldownModal.hidden) closeDrilldown();
});

function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/* ==========================================================
   BEREGNER
   ========================================================== */
function initCalculator() {
    const form = document.getElementById('calcForm');
    const ref = baselineData.reference;
    const grænser = baselineData.risiko_grænser;

    const inputs = {
        m2:        document.getElementById('cM2'),
        bad:       document.getElementById('cBad'),
        stand:     document.getElementById('cStand'),
        ltv:       document.getElementById('cLTV'),
        købspris:  document.getElementById('cKøbspris'),
        salgspris: document.getElementById('cSalgspris'),
    };

    const out = {
        fast:        document.getElementById('oFast'),
        variable:    document.getElementById('oVariable'),
        semi:        document.getElementById('oSemi'),
        total:       document.getElementById('oTotal'),
        perM2:       document.getElementById('oPerM2'),
        køb:         document.getElementById('oKøb'),
        fin:         document.getElementById('oFin'),
        salg:        document.getElementById('oSalg'),
        andreTotal:  document.getElementById('oAndreTotal'),
        fortjeneste: document.getElementById('oFortjeneste'),
        roi:         document.getElementById('oROI'),
        renPct:      document.getElementById('oRenPct'),
    };

    const standValueLabel = document.getElementById('standValue');
    const standDescLabel  = document.getElementById('standDescription');
    const ltvValueLabel   = document.getElementById('ltvValue');
    const lånebeløbLabel  = document.getElementById('lånebeløbValue');

    // Procent-labels (kan opdateres hvis baseline.json ændres)
    const andrePct = baselineData.andre_omkostninger_pct || {
        køb_pct_af_købspris: 0.02,
        finansiering_pct_af_lånebeløb: 0.03,
        salg_pct_af_salgspris: 0.025,
    };
    document.getElementById('oKøbPct').textContent  = fmtNumDec.format(andrePct.køb_pct_af_købspris * 100);
    document.getElementById('oFinPct').textContent  = fmtNumDec.format(andrePct.finansiering_pct_af_lånebeløb * 100);
    document.getElementById('oSalgPct').textContent = fmtNumDec.format(andrePct.salg_pct_af_salgspris * 100);

    function compute() {
        const m2        = Math.max(1, +inputs.m2.value || 0);
        const bad       = Math.max(0, +inputs.bad.value || 0);
        const stand     = +inputs.stand.value || 4;
        const ltvPct    = Math.max(0, Math.min(100, +inputs.ltv.value || 0));
        const ltv       = ltvPct / 100;
        const købspris  = +inputs.købspris.value || 0;
        const salgspris = +inputs.salgspris.value || 0;

        const f         = standToFactor(stand);
        const totals    = baselineData.totals;

        // Renovering — Excel-tro formler
        const fast     = totals.faste         * (bad / ref.antal_bad) * f;
        const variabel = totals.variable      * (m2 / ref.m2);
        const semi     = totals.semi_variable * (m2 / ref.m2) * f;
        const total    = fast + variabel + semi;

        // Andre omkostninger — funktion af købspris, LTV og salgspris
        const lånebeløb     = købspris * ltv;
        const køb           = købspris  * andrePct.køb_pct_af_købspris;
        const finansiering  = lånebeløb * andrePct.finansiering_pct_af_lånebeløb;
        const salg          = salgspris * andrePct.salg_pct_af_salgspris;
        const andre         = køb + finansiering + salg;

        const samlede_omkostninger = total + andre;
        const fortjeneste = salgspris - købspris - samlede_omkostninger;
        const investering = købspris + samlede_omkostninger;
        const roi = investering > 0 ? (fortjeneste / investering) * 100 : 0;
        const renPct = salgspris > 0 ? total / salgspris : 0;

        // UI — renovering
        out.fast.textContent     = kr(fast);
        out.variable.textContent = kr(variabel);
        out.semi.textContent     = kr(semi);
        out.total.textContent    = kr(total);
        out.perM2.textContent    = `${fmtKrInt.format(Math.round(total / m2))}/m²`;

        // UI — andre omkostninger
        out.køb.textContent        = kr(køb);
        out.fin.textContent        = kr(finansiering);
        out.salg.textContent       = kr(salg);
        out.andreTotal.textContent = kr(andre);

        // UI — fortjeneste, ROI, renoveringspct
        out.fortjeneste.textContent = kr(fortjeneste);
        out.fortjeneste.className = 'econ-value ' + (fortjeneste >= 0 ? 'positive' : 'negative');

        out.roi.textContent = `${fmtNumDec.format(roi)} %`;
        out.roi.className = 'econ-value ' + (roi >= 0 ? 'positive' : 'negative');

        out.renPct.textContent = fmtPct.format(renPct);

        // UI — slider-labels
        standValueLabel.textContent = stand;
        standDescLabel.textContent  = STAND_DESCRIPTIONS[stand];
        ltvValueLabel.textContent   = ltvPct;
        lånebeløbLabel.textContent  = krInt(lånebeløb);

        // Risiko-flags
        renderRisks({
            total, fortjeneste, salgspris, købspris, renPct, ltv,
        }, grænser);
    }

    function renderRisks(data, g) {
        const flagsEl = document.getElementById('riskFlags');
        const flags = [];

        // LTV
        if (data.ltv > g.ltv_max) {
            flags.push({ level: 'red', ikon: '⚠',
                tekst: `Belåningsgrad ${fmtNumDec.format(data.ltv*100)} % over grænse (${(g.ltv_max*100).toFixed(0)} %)` });
        }

        // Renovering % af salgspris
        if (data.renPct > g.renovering_pct_max) {
            flags.push({ level: 'red', ikon: '⚠',
                tekst: `Renovering = ${fmtNumDec.format(data.renPct*100)} % af salgspris (grænse ${(g.renovering_pct_max*100).toFixed(0)} %)` });
        } else if (data.renPct > g.renovering_pct_max * 0.8) {
            flags.push({ level: 'yellow', ikon: '!',
                tekst: `Renovering tæt på grænse (${fmtNumDec.format(data.renPct*100)} % af salgspris)` });
        }

        // Fortjeneste
        if (data.fortjeneste < 0) {
            flags.push({ level: 'red', ikon: '⚠', tekst: 'Estimeret tab — projektet er ikke rentabelt' });
        } else if (data.fortjeneste < g.min_fortjeneste) {
            flags.push({ level: 'yellow', ikon: '!',
                tekst: `Fortjeneste under minimum (${kr(data.fortjeneste)} < ${kr(g.min_fortjeneste)})` });
        }

        // Stress test — prisfald 15%
        const stress_salgspris = data.salgspris * (1 - g.stress_prisfald_pct);
        const stress_fortjeneste = stress_salgspris - data.købspris - data.total;
        if (stress_fortjeneste < 0) {
            flags.push({ level: 'yellow', ikon: '!',
                tekst: `Ved ${(g.stress_prisfald_pct*100).toFixed(0)} % prisfald: tab på ${kr(Math.abs(stress_fortjeneste))}` });
        }

        if (flags.length === 0) {
            flags.push({ level: 'green', ikon: '✓', tekst: 'Alle nøgletal inden for investeringspolitikken' });
        }

        flagsEl.innerHTML = flags.map(f => `
            <div class="risk-flag ${f.level}">
                <span class="risk-icon">${f.ikon}</span>
                <span>${f.tekst}</span>
            </div>
        `).join('');
    }

    // Live update på alle input
    Object.values(inputs).forEach(el => {
        el.addEventListener('input', compute);
    });

    // Reset
    document.getElementById('calcReset').addEventListener('click', () => {
        inputs.m2.value        = ref.m2;
        inputs.bad.value       = ref.antal_bad;
        inputs.stand.value     = ref.stand;
        inputs.ltv.value       = Math.round((projektData.kpi.ltv || 0.6) * 100);
        inputs.købspris.value  = projektData.kpi.købspris;
        inputs.salgspris.value = projektData.kpi.salgspris;
        document.getElementById('cProjektnavn').value = '';
        document.getElementById('cAdresse').value = '';
        compute();
    });

    compute();
}

/* ---------- Init ---------- */
loadData();
