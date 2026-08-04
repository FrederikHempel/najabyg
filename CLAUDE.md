# Naja Byg — Hjemmeside

Dette dokument beskriver projektets nuværende tilstand og konventioner. Læs det grundigt inden du laver ændringer.

---

## Om projektet

En professionel, dansk **multi-page statisk hjemmeside** for **Naja Byg** (kommercielt navn — juridisk enhed er fortsat Nauntofte & Jacobsen ApS). Formålet er at fremstå seriøse og troværdige over for potentielle investorer, samarbejdspartnere og lejere — og fungere som et internt projektfremvisningsværktøj.

**Teknologi-stack:** Ren HTML5, CSS3 og vanilla JavaScript. Ingen frameworks, ingen build-tools, ingen package.json. Siden åbnes direkte i browser eller hostes som statisk site (fx Netlify, GitHub Pages).

**Adgangsbeskyttelse:** Siden er beskyttet af en password-gate (`gate.html`) der viser "Hjemmeside kommer snart" og et login-felt for interne brugere. Koden er pt. `naja2026` og kan ændres i `gate.html` under `const ACCESS_CODE`.

**Søgemaskine-indeksering:** Er blokeret. Alle HTML-sider har `<meta name="robots" content="noindex, nofollow">`, og `robots.txt` forbyder alle bots (`Disallow: /`). Fjernes når siden er klar til at gå live.

---

## Filer

| Fil | Beskrivelse |
|-----|-------------|
| `index.html` | Forsiden — navbar, hero-karrusel, om os, projekt-tiles, kontakt, footer |
| `style.css` | Al CSS for hele projektet (deles af alle sider) |
| `script.js` | JS til `index.html` — hero-karrusel, navbar, hamburger, adgangstjek |
| `skovvangsvej.html` | Detaljeside for Skovvangsvej-projektet |
| `skovvangsvej.js` | JS til `skovvangsvej.html` — tab-galleri, lightbox, rum-sliders, adgangstjek |
| `gate.html` | Password-beskyttet adgangsside (entry point) |
| `intern.html` | **Intern** dashboard-side — projektdata + beregner (skjult URL, ikke linket fra forsiden) |
| `intern.js` | JS til `intern.html` — projektkort, donut, drilldown-modal, beregner-formler |
| `data/skovvangsvej.json` | Konverterede Skovvangsvej-data (KPI, kategorier, bilag) |
| `data/baseline.json` | Referenceværdier til beregneren (faste/variable/semi-variable totaler) |
| `robots.txt` | Blokerer alle søgemaskine-bots (`Disallow: /`) |
| `scripts/excel-to-json.py` | Python-script der konverterer Excel-filer i `assets/project calculator/` til JSON |
| `CLAUDE.md` | Dette dokument |

---

## Brand & Design

### Identitet
- **Virksomhedsnavn:** Naja Byg
- **Undertitel:** Nauntofte & Jacobsen
- **Tagline:** Vi skaber varig værdi gennem ansvarlig ejendomsinvestering
- **Sprog:** Dansk

### Logo
- `assets/naja-logo.png` — stående version (bruges i hero-karrusel)
- `assets/naja-logo-horizontal.png` — vandret version (bruges i navbar, footer, gate)

### Farvepalette

| CSS-variabel | Hex | Brug |
|---|---|---|
| `--navy` | `#1B3A5C` | Primærfarve, overskrifter, knapper |
| `--warm-white` | `#F9F6F2` | Sidens baggrund |
| `--light-sand` | `#E8E0D5` | Alternativ sektionsbaggrund |
| `--warm-gray` | `#8C8278` | Brødtekst, sekundær tekst |
| `--gold` | `#C9A96E` | Accent — understregninger, hover, badges |
| `--white` | `#FFFFFF` | Kort, navbar, lightbox |

Alle farver skal bruges via CSS custom properties — aldrig hardkodet hex i CSS eller JS.

### Typografi
**Udelukkende Work Sans** (Google Fonts) — vægte 300, 400, 500, 600, 700.
- Overskrifter: 600–700, let negativ letter-spacing
- Brødtekst: 400
- Labels/badges: 500–600, positiv letter-spacing

> ⚠️ CLAUDE.md nævnte tidligere Playfair Display + Inter — det er ikke implementeret. Work Sans bruges gennemgående.

---

## Sidestruktur

### `index.html`

1. **Navbar** — sticky, logo til venstre, links til højre (Om os / Projekter / Kontakt), hamburger på mobil. Klassen `.scrolled` tilføjes ved scroll > 10px.

2. **Hero** — 72vh karrusel med 3 slides fra `assets/billeder/Skovvangsvej/Hero billeder/`. Progressbar i bunden. Logo centreret over gradient-overgang. Tagline + CTA-knap nedenunder.

3. **Om NAJA** (`#om`) — intro-tekst + 2 partnerkort side om side (stablet på mobil). Cirkulære portræt-billeder, navn, "Partner & Medinvestor", bio-tekst.

4. **Vores projekter** (`#projekter`) — grid af klikbare projekt-tiles. Hver tile har: baggrundsbillede, gradient-overlay, projektnavn, lokation, status-badge. Klikker man, navigeres til projektets detaljeside.

5. **Kontakt** (`#kontakt`) — email, telefon, by. Placeholders der udfyldes af brugeren.

6. **Footer** — vandret logo + copyright.

### `skovvangsvej.html`

1. **Projekt-hero** — 55vh baggrundsbillede (køkken efter), mørk overlay, "← Alle projekter"-link, projektnavn + undertitel.

2. **Om projektet** — 2-kolonne layout (stablet på mobil):
   - Venstre: stats (adresse, areal, rum, renovering, købspris, salgspris) + beskrivelsestekst
   - Højre: plantegning (`assets/billeder/Skovvangsvej/Plantegning.png`)

3. **Billedgalleri** (`#galleri`) — 3 tabs:
   - **Som købt** — 9 billeder fra `Som købt/`
   - **Under renovering** — 24 billeder fra `Byggeprocessen/`
   - **Færdigt resultat** — 11 billeder fra `Færdig lejlighed/`
   Klik på billede åbner lightbox med enkeltbillede-visning og prev/next-navigation.

4. **Rum for rum** (`#rum-sliders`) — 4 inline før/efter-sliders (drag eller touch):
   - Stuen
   - Køkken
   - Badeværelset (vinkel 1)
   - Badeværelset (vinkel 2)

5. **Google Maps** — embed for Skovvangsvej 167, 8200 Aarhus N.

6. **Footer** — identisk med `index.html`.

### `gate.html`

Selvstændig adgangsside med NAJA-logo, passwordfelt og "Fortsæt →"-knap. Ved korrekt kode sættes `sessionStorage.naja_access = 'granted'` og brugeren redirectes til `index.html`. Forkert kode giver shake-animation + fejlbesked. Koden ændres i konstanten `ACCESS_CODE` øverst i `<script>`-blokken.

### `intern.html` — Intern projektoversigt

Intern dashboard-side med to formål:

1. **Færdige projekter** — udvideligt projektkort (klik headeren for at åbne) med:
   - **KPI-strip**: Købspris, salgspris, renovering, fortjeneste, ROI, LTV
   - **Donut-chart** (ren SVG): omkostningsfordeling pr. kategori
   - **Kategori-tabel**: klik på en række → drilldown-modal med alle bilag (dato, leverandør, produkt, beløb)

2. **Beregner — nyt projekt** — live-opdaterende inputfelter:
   - Projektnavn, adresse, købspris, salgspris, andre omkostninger
   - Areal (m²), antal bad, **stand (1-10 slider)**
   - Output: faste / variable / semi-variable omkostninger, total, fortjeneste, ROI, risiko-flags

**Skjult URL** — siden er ikke linket fra navbar, footer eller forsiden. Adgang sker ved at skrive `intern.html` direkte i URL'en. Beskyttet af samme `naja_access`-gate som resten af sitet.

**Beregningsformler** (Excel-tro fra `Estimering`-arket):
- `Faste = sum_faste × (antal_bad / ref_bad) × scope_faktor`
- `Variable = sum_variable × (m² / ref_m²)`
- `Semi-variable = sum_semi_variable × (m² / ref_m²) × scope_faktor`

**Stand → scope-faktor** (to-segments lineær):
- stand 1 → 0.3, stand 4 → 1.0 (Skovvangsvej baseline), stand 10 → 2.0
- 1-4: `0.3 + (stand-1) × 0.7/3`
- 4-10: `1.0 + (stand-4) × 1.0/6`

**Risiko-tjek** (fra Excel `Risikotjek`-arket):
- Renovering > 15% af salgspris → ⚠ rød
- Fortjeneste < 200.000 kr → ⚠ gul
- Negativ fortjeneste → ⚠ rød
- Tab ved 15% prisfald (stress test) → ⚠ gul

### Opdatering af projektdata

Når Excel-filerne i `assets/project calculator/` opdateres, køres konverteren igen:

```bash
python3 scripts/excel-to-json.py
```

Output: `data/skovvangsvej.json` og `data/baseline.json` overskrives. Beregneren og dashboard opdaterer automatisk næste gang siden indlæses.

### Tilføjelse af nyt færdigt projekt til den interne side

1. Læg Excel-fil i `assets/project calculator/[Projektnavn].xlsx`
2. Udvid `scripts/excel-to-json.py` så det også genererer `data/[projektnavn].json`
3. Tilføj fetch + render-kald i `intern.js` (i `loadData()` og `renderProjects()`)

---

## Adgangsbeskyttelse

`script.js`, `skovvangsvej.js` og `intern.js` tjekker ved load:

```js
if (sessionStorage.getItem('naja_access') !== 'granted') {
    window.location.replace('gate.html');
}
```

Sessionen nulstilles ved lukning af browsertab. Der er ingen server-side sikkerhed — beskyttelsen er tilstrækkelig til at holde siden ikke-offentlig, men ikke kryptografisk sikker.

---

## Mappestruktur (assets)

```
assets/
├── naja-logo.png                        ← Stående logo (hvid baggrund fjernet via Pillow)
├── naja-logo-horizontal.png             ← Vandret logo (hvid baggrund fjernet)
└── billeder/
    ├── Frederik/
    │   └── IMG_4038.jpeg                ← Portræt Frederik
    ├── Niclas/
    │   └── 83034665_...jpg              ← Portræt Niclas
    └── Skovvangsvej/
        ├── Hero billeder/               ← 3 billeder til index.html hero-karrusel
        │   ├── IMG_6434 copy.jpeg
        │   ├── IMG_6435 copy.jpeg
        │   └── IMG_6446 copy.jpeg
        ├── Som købt/                    ← 9 billeder — lejligheden som købt
        ├── Byggeprocessen/              ← 24 billeder — under renovering
        ├── Færdig lejlighed/            ← 11 billeder — færdigt resultat
        ├── Stuen/
        │   ├── Før/IMG_5032.jpeg
        │   └── Efter/IMG_6432.jpeg
        ├── Køkken/
        │   ├── Før/IMG_4981.jpeg
        │   └── Efter/IMG_6435.jpeg
        ├── Badeværelset/
        │   ├── Før 1/IMG_5034.jpeg
        │   ├── Efter 1/IMG_6443.jpeg
        │   ├── Før 2/IMG_6177.jpeg
        │   └── Efter 2/IMG_6445.jpeg
        └── Plantegning.png              ← Kopieret fra Trøjborg-mappen
```

---

## Tilføjelse af nyt projekt til forsiden

1. Læg billeder i `assets/billeder/[Projektnavn]/`
2. Tilføj et nyt `<a class="project-tile">` i `#projekter`-sektionen i `index.html`
3. Opret `[projektnavn].html` og `[projektnavn].js` baseret på `skovvangsvej.html`/`skovvangsvej.js`
4. Tilføj adgangstjek øverst i den nye `.js`-fil

---

## Tilføjelse af billeder til Skovvangsvej-galleriet

Billedlisten er hardkodet i `skovvangsvej.js` i `tabs`-objektet. Tilføj nye billedstier her:

```js
const tabs = {
    'som-koebt':   [ { src: '...', alt: '...' }, ... ],
    'byggeproces': [ { src: '...', alt: '...' }, ... ],
    'faerdig':     [ { src: '...', alt: '...' }, ... ],
};
```

---

## Tekniske konventioner

- Alle billeders stier er relative (ingen `/`-prefix) — siden er statisk
- `loading="lazy"` på alle `<img>` undtagen above-the-fold
- CSS custom properties til alle farver — aldrig hardkodet hex i CSS
- Adgangstjek øverst i hvert `.js`-fil (før al anden kode)
- Kommentarer på dansk
- Ingen frameworks, ingen npm, ingen build-step

---

## Hosting

Siden deployes som statisk site. Anbefalet flow:
- **Netlify Drop** — træk hele mappen til app.netlify.com/drop
- Del URL + adgangskode (`naja2026`) med samarbejdspartnere

For fremtidig auto-deploy ved ændringer: GitHub + Netlify CI/CD.

---

## Skovvangsvej — projektdata

| Felt | Værdi |
|------|-------|
| Adresse | Skovvangsvej 167, st. tv., 8200 Aarhus N |
| Renovering | 2026 |
| Købspris | 2.000.000 kr. |
| Salgspris | 2.650.000 kr. |
| Areal | udfyldes |
| Rum | udfyldes |

---

## Tone of voice

- **Professionel men tilgængelig** — ikke juridisk tung, ikke salgsagtigt
- **Kort og præcis** — ingen lange tekstblokke
- **Tillidsfuld** — vi viser hvem vi er, hvad vi har gjort, hvem vi er
- **Dansk** — korrekt retskrivning, ingen anglicismer
