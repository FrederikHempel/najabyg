# Opgaver — fra 24. august-koden til designguide v4.8

Koden i mappen er bygget på designguide **v4.0** (24. august). Siden da er der truffet beslutninger, som ikke er i koden endnu. Det her er deltaen, i den rækkefølge den skal udføres. Hver opgave kan gives til Claude Code som én instruktion: *„Udfør opgave 3 i OPGAVER-v4.3.md.“*

Reglen for alle opgaver: **`naja-byg-designguide-v4.html` er facit.** Er der uenighed mellem denne liste og guiden, vinder guiden. Er der uenighed mellem guiden og eksisterende kode, ændres koden.

Sæt kryds, når en opgave er gjort, og skriv datoen.

**Status 7. september 2026:** opgave 0–9 udført af Claude Code. Opgave 10 verificeret med undtagelse af Lighthouse, som kræver et værktøj, der ikke er i mappen — køres, når sitet er på en URL.

---

## 0. Skrift og grundflade

Gøres først, fordi den rører hver eneste side og gør alt efterfølgende arbejde synligt i den rigtige skrift og på den rigtige grund.

**Grundflade — varm hvid:**

- [x] I `style.css` `:root`: `--nb-sand-50: #FAF6EE`, `--nb-sand-100: #F1EADB`, `--nb-sand-200: #E4DAC5`. Alle andre tokens uændrede *(7. sep. 2026)*
- [x] `grep -rin "F7E9C9\|EFDDB4\|E3CE9E\|F8E7C9" *.html *.css` skal være tomt bagefter — de gamle sandværdier må ikke findes hardkodet nogen steder, heller ikke i SVG-fills (logoets negativ-blad bruger `var(--nb-sand-50)`) *(7. sep. 2026)*
- [x] Hero-gradienten (`rgba(4,48,44,…)`) er uændret — den er teal, ikke sand *(7. sep. 2026)*

**Skrift — Work Sans:**

- [x] Google Fonts-linket i alle `<head>` erstattes med `https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap`. Bricolage og Instrument Sans fjernes helt *(7. sep. 2026)*
- [x] I `style.css`: `--nb-font-display` og `--nb-font-body` sættes begge til `"Work Sans", system-ui, sans-serif`. Findes tokens ikke, oprettes de, og alle `font-family`-deklarationer peger på dem *(7. sep. 2026)*
- [x] Fjern **alle** `font-variation-settings` — Work Sans har ingen bredde-akse. `grep -n "font-variation-settings" style.css *.html` skal være tomt *(7. sep. 2026)*
- [x] Overskrifter: `font-weight: 600`, `letter-spacing: -.03em`. Ordmærket: `700`, `-.035em`. Ingen overskrift må stå i 700 *(7. sep. 2026)*
- [x] Brødtekst 400, fremhævet 500, labels og knapper 600 *(7. sep. 2026)*
- [x] Tjek `.jobcard-title`, `.promise-n`, `.question-t`, `.stamp .t` og heroens h1 — de havde alle Bricolage-specifikke vægte og bredder *(7. sep. 2026)*

**Accept:** `grep -ri "bricolage\|instrument sans\|variation-settings\|F7E9C9" *.html *.css` er tomt. Siden loader én skriftfamilie og står på varm hvid.

---

## 1. Hovedbudskab og fravalgte linjer

Gennemsøg alle `.html`-filer og `style.css`.

- [x] Erstat `Faste priser. Faste aftaler. Faste folk.` med `Tømrer i Aarhus og opland.` i `<h1>` på forsiden. Lead-linjen under: `Vinduer, døre, tag, tilbygning, terrasse. Én opgave ad gangen — og timeprisen står her på siden.` Fjern linjen alle andre steder. `<title>` følger SEO-mønsteret i opgave 8, ikke hovedbudskabet *(7. sep. 2026)*
- [x] Erstat `Fortæl os drømmen. Vi får den i mål.` med `Du behøver ikke vide, hvad du skal bede om.` alle steder, **undtagen** kontakt-CTA'en på forsiden (se opgave 6) *(7. sep. 2026)*
- [x] Fjern enhver forekomst af „fast pris“ som løfte. Lead-teksten i heroen er OK som den er *(7. sep. 2026)*
- [x] Verificér med `grep -ri "faste priser\|fortæl os drømmen\|fast pris" *.html` — resultatet skal være tomt, bortset fra priser.html, hvor „fast timepris“ er korrekt *(7. sep. 2026)*

**Accept:** ingen af de fravalgte linjer findes i koden.

---

## 2. Løftelisten: seks → syv, ny ordlyd, ny placering

- [x] Erstat de seks løfter i `.promises` med de syv fra guidens afsnit 02, ordret. Hvert løfte med `promise-t` og — hvor guiden har en — `promise-s` *(7. sep. 2026)*
- [x] **Flyt** hele `#loefter`-sektionen fra `index.html` til `om-os.html`, placeret efter de to personer og før faktalinjen om ejendomsforretningen. Sektionsoverskrift: `Det her forpligter vi os til`. Eyebrow: `Syv løfter. Ingen tillægsord.` *(7. sep. 2026)*
- [x] Forsiden må **ikke** længere have løftelisten — der kommer stemplerne i stedet (opgave 3) *(7. sep. 2026)*
- [x] Opdatér `opgaver.html`-tomtilstanden og `kontakt.html`, hvis de citerer et af de gamle løfter *(7. sep. 2026)*
- [x] Spørgsmål 05 i `.questions` (nu på `kontakt.html`): *Har du sat et budget?* — begrundelsen uændret *(7. sep. 2026)*

**Accept:** løftelisten står ét sted på sitet (Om os) med syv punkter, ordret som guiden.

---

## 3. Kvalitetsstemplerne (ny komponent)

Guiden afsnit 13, „Kvalitetsstemplerne“. Der ligger færdig CSS i guidens eget `<style>` (`.stamps`, `.stamp`, `.stamp .rule`, `.stamp .t`, `.stamp .p`) — oversæt den til `--nb-`-tokens i `style.css`.

- [x] Byg `.stamps` som en grid-række med fem `.stamp`-elementer. Hvert element: rissestreg (`28 × 3 px`, Teal 950) → overskrift (Work Sans 600, ~1,04 rem, tracking −.025em) → én sætning (Work Sans 400, 0,89 rem, Sten 600) *(7. sep. 2026)*
- [x] Indsæt sektionen på `index.html` **direkte under heroen**, før „Vi spørger altid om“. Ingen sektionsoverskrift — stemplerne er selvforklarende. Baggrund: Sand 50 (ikke mørk sektion) *(7. sep. 2026)*
- [x] Ordlyden er guidens, ordret. Fem stempler, hver med sin sætning. Sætningen må aldrig udelades *(7. sep. 2026)*
- [x] Under rækken, højrestillet, et tekstlink: `Læs alle syv løfter →` til `om-os.html#loefter` *(7. sep. 2026)*
- [x] Mobil: rækken bryder 3 + 2, aldrig 4 + 1. Brug `grid-template-columns: repeat(auto-fit, minmax(min(100%, 215px), 1fr))` og test ved 375 px *(7. sep. 2026)*
- [x] **Forbudt:** ikoner, skjolde, flueben, cirkler, rust, ordene *garanti/certificeret/godkendt* *(7. sep. 2026)*

**Accept:** fem stempler under heroen, alle med sætning, ingen ikoner, ingen rust, bryder pænt på mobil.

---

## 4. Logo: døråbningen ind, ordmærket ud

Guiden afsnit 14. Kilder i `logo/bud-02-perspektiv-doer/`.

- [x] Tilføj `--nb-logo-ink: #064E3B` til `:root` i `style.css` *(7. sep. 2026)*
- [x] Erstat `.wordmark` i navbar og footer med et **standard-lockup**: inline `<svg viewBox="16 2 76 98">` (mærket) + „Naja Byg“ i Work Sans 700, tracking −0,035 em. Afstand mærke→navn: 0,45 × versalhøjden. Mærkets højde: 1,30 × skriftgraden *(7. sep. 2026)*
- [x] Mærket som inline SVG, ikke `<img>`. Bladet får `fill: var(--nb-logo-ink)` på lys bund og `fill: var(--nb-sand-50)` på mørk (footer). Åbningen er altid `var(--nb-rust-400)` *(7. sep. 2026)*
- [x] I **heroen** og på **Om os** bruges det fulde lockup med underteksten `NAUNTOFTE & JACOBSEN` — Work Sans 500, 0,72 rem, 0,13 em sperring, Sten 600 (lys) / Sten 400 (mørk), venstrekant flugter med N i Naja. Aldrig i to linjer, aldrig „og“, aldrig bindestreg *(7. sep. 2026)*
- [x] Favicon: mærket alene som `favicon.svg` (+ 32 px PNG-fallback). Læg `<link rel="icon">` i alle `<head>` *(7. sep. 2026)*
- [x] Fjern rustlinjen under det gamle ordmærke — den er ikke en del af det valgte mærke *(7. sep. 2026)*
- [x] **Tjek:** logoet står ingen steder klods op ad en rust-knap. I heroen skal „Book opmåling“ (rust) og logoet i navbaren have luft imellem sig — ellers flyttes knappen *(7. sep. 2026)*

**Accept:** døråbningen i navbar, footer, hero og favicon. Ingen `.wordmark` tilbage.

---

## 5. Prissiden: tre tal, tærsklen og dato

Guiden afsnit 02 (noten „Løfte 02 kræver tre tal“) og afsnit 05.

- [x] Omstrukturér `priser.html`, så de **tre tal** står side om side øverst, før tabellen: **Timepris** · **Kørsel** · **Materialer**. Tre lige store felter, Sand 100, hvert med tallet i `t-data`-stil og én forklarende linje *(7. sep. 2026)*
- [x] Tabellen med roller (mester/svend/lærling/tag) beholdes under de tre felter *(7. sep. 2026)*
- [x] Tilføj afsnittet **„Hvornår ringer vi?“** med tærsklen, ordret: *Overstiger vi det oplyste timeantal med mere end 10 % eller to timer — hvad der kommer først — stopper vi og ringer, før næste time bruges. Under den grænse arbejder vi videre.* *(7. sep. 2026)*
- [x] Tilføj `Priserne er sidst reguleret [dato]` under tabellen. Sæt en synlig `TODO`-placeholder, indtil Frederik giver datoen *(7. sep. 2026)*
- [x] Prisuddraget på forsiden (`#priser`) viser de tre tal, ikke rolletabellen. Rolletabellen er detaljen på prissiden *(7. sep. 2026)*
- [x] Værdierne for kørsel og materialer er **ikke besluttet** — behold guidens forslag (`0 kr. inden for Aarhus og 25 km` / `Indkøbspris + moms, bilag følger med`) og markér begge med `is-todo` *(7. sep. 2026)*

**Accept:** tre tal øverst, tærsklen skrevet ud, dato-placeholder, forside-uddrag matcher.

---

## 6. Forsiden som salgstragt

Guiden afsnit 16 er drejebogen — læs den først. Forsiden bygges om fra en komponentstak til **syv trin, der hver besvarer kundens næste spørgsmål**, og som ender i én handling.

1. **Hero** — Niclas i arbejde med billedtekst *Niclas Nauntofte · tømrer · [sted], [år]*. H1 *Tømrer i Aarhus og opland.*, lead og to knapper som i guiden afsnit 16
2. **Stempler** (opgave 3)
3. **Ydelser** — typografisk række uden ikoner: Vinduer og døre · Tag · Tilbygning · Renovering · Terrasse og træværk · Gulve · Køkkenmontering · Carport og garage. Linjen under: *Står din opgave ikke her, så ring alligevel. Laver vi det ikke, giver vi dig et navn på en, der gør.*
4. **Erfaring** — eyebrow *Hvem vi er*, H2 og tekst ordret fra guiden (klammer om Syddjurs Byg-fakta, `is-todo`). Under teksten: de tre jobkort
5. **Pris** — de tre tal + tærsklen + *Se hele prislisten →*
6. **Forløbet** — eyebrow *Sådan foregår det*, H2 *Fra du ringer, til vi afleverer*, fire nummererede trin ordret fra guiden. Link *Se, hvordan et tilbud fra os ser ud →* peger på `assets/tilbud-eksempel.pdf` — indsæt en `TODO`-placeholder-side, indtil PDF'en findes
7. **Snakken** — mørk sektion. H2 *Skal vi tage en uforpligtende snak?* Tekst og knapper ordret fra guiden

- [x] Fjern den nuværende „Vi spørger altid om“-sektion fra forsiden — de fem spørgsmål flytter til `kontakt.html` og nævnes i forløbets trin 2. Forsiden må ikke have to sektioner, der begge forklarer opmålingen *(7. sep. 2026)*
- [x] Fjern løftelisten fra forsiden (opgave 2) *(7. sep. 2026)*
- [x] „Skriv to linjer“-knappen erstatter „Book opmåling“ overalt. Den linker til `kontakt.html` *(7. sep. 2026)*
- [x] Kun **én** rust-knap pr. skærmbillede. Trin 7's *Skriv to linjer* er rust; heroens er primær (teal på lys / sand på mørk). Tjek ved 1440 × 900 og 375 × 812 *(7. sep. 2026)*
- [x] Mørk sektion kun i trin 7. Heroen er billede, ikke mørk flade *(7. sep. 2026)*
- [x] `.reveal` på trin 2–7, ikke på heroen *(7. sep. 2026)*

**Accept:** syv sektioner i den rækkefølge, hver med præcis det indhold guiden foreskriver. Scroll fra top til bund læses som én sammenhængende pitch, der ender i én handling.

---

## 7. Om os: folkene

- [x] Niclas: `Uddannet tømrer · 10+ år i faget · udfører arbejdet`. Ikke „erfaren“ *(7. sep. 2026)*
- [x] Frederik: `Tilbud, aftaler og opmåling`. Direkte nummer — `TODO`-placeholder, indtil det gives *(7. sep. 2026)*
- [x] Tilføj ét afsnit under de to: hvem der kommer ud til opmålingen, og hvem der kommer og laver arbejdet. Kunden skal vide, at det er de samme to ansigter hele vejen — det er stempel 05 *(7. sep. 2026)*
- [x] Faktalinjen om ejendomsforretningen bliver stående som én sætning. Ikke mere *(7. sep. 2026)*

**Accept:** to navne, to roller, ét afsnit om hvem der kommer, én faktalinje.

---

## 8. SEO-grundlag

Se afsnittet SEO i `CLAUDE.md`.

- [x] `<title>` på alle sider efter mønsteret `[Emne] · Tømrer i Aarhus · Naja Byg`. Forsiden: `Tømrer i Aarhus · Naja Byg`. Højst 60 tegn — tæl *(7. sep. 2026)*
- [x] Meta description på alle sider, 120–155 tegn, med ét konkret løfte og *Aarhus og opland*. Ingen af de forbudte ord *(7. sep. 2026)*
- [x] `<link rel="canonical">` på alle sider (`https://najabyg.dk/[side].html`) *(7. sep. 2026)*
- [x] Open Graph på alle sider: `og:title`, `og:description`, `og:type=website`, `og:image` → `assets/og-image.jpg` (1200 × 630, logo på Sand 50, lav den med Pillow) *(7. sep. 2026)*
- [x] JSON-LD `LocalBusiness` / `GeneralContractor` i `<head>` på alle sider. Felter: `name`, `telephone` (+4528186488), `email`, `url`, `image`, `address` (addressLocality Aarhus, addressCountry DK), `areaServed` (Aarhus, Skanderborg, Favrskov, Syddjurs, Odder), `priceRange`, `openingHoursSpecification`. `sameAs` tilføjes, når Google Business Profile findes *(7. sep. 2026)*
- [x] `sitemap.xml` med de seks offentlige sider. `robots.txt` der tillader alt, og peger på sitemappen. **Ikke `gate.html`, `intern.html` i sitemappen** *(7. sep. 2026)*
- [x] Én `<h1>` pr. side — verificér med `grep -c "<h1" *.html` *(7. sep. 2026)*

**Accept:** alle sider har title, description, canonical, OG og JSON-LD. Sitemap og robots findes. Validér JSON-LD med Googles Rich Results Test, når sitet er live.

---

## 9. Tekst-ordbogen

- [x] Gennemgå alle sider mod listerne i `CLAUDE.md` afsnit Sprog. `kvalitet`, `faglighed`, `erfaring` og `tryghed` er tilladt, **hvis** der står en kvittering (tal, navn, dato) i samme sætning — ellers skrives om. `uforpligtende tilbud` erstattes med `uforpligtende snak`. Søg efter `garanti`, `certificeret`, `godkendt` *(7. sep. 2026)*
- [x] Opmålingsspørgsmål 04 („Hvornår skal det stå færdigt“): ret begrundelsen fra „en fast slutdato“ til „en dato“ — ordret som guiden *(7. sep. 2026)*
- [x] `ydelser.html`: „Det laver vi“ = de ni fra guiden afsnit 06, inkl. tilbygning og renovering. „Det laver vi ikke“ = totalentreprise og nybyggeri. Fuldrenovering fjernes fra nej-listen *(7. sep. 2026)*

**Accept:** hver forekomst af `kvalitet`, `faglighed`, `erfaring`, `tryghed` har en kvittering i samme sætning. `uforpligtende tilbud` findes ikke.

---

## 10. Tjek af det, der allerede virker

Ingen ændringer — kun verifikation, så vi ved, hvor vi står.

- [x] Før/efter-slideren virker med mus, touch og piletaster *(7. sep. 2026)*
- [x] `.reveal` har en synlig hviletilstand — intet element må stå på `opacity: 0`, hvis `animation-timeline` ikke understøttes *(7. sep. 2026)*
- [x] Alt slukker ved `prefers-reduced-motion: reduce` *(7. sep. 2026)*
- [x] Ingen hardkodede hex-værdier i HTML (`grep -E "#[0-9A-Fa-f]{6}" *.html` — kun SVG-fills i logoet er tilladt, og de skal være `var(--nb-…)`) *(7. sep. 2026)*
- [x] Trykflader ≥ 44 × 44 px på mobil *(7. sep. 2026)*
- [ ] Lighthouse mobil: Performance ≥ 90, Accessibility ≥ 95

---

## Efter opgave 1–10: det, der venter på Frederik og Niclas

Disse kan koden ikke løse. De står i `CLAUDE.md` under Åbne punkter:

- Syddjurs Byg: antal år, må navnet nævnes, fortsætter faren?
- Et rigtigt, anonymiseret tilbud som PDF
- Timepris, kørsel, materialer — de tre rigtige tal
- Dato for sidste prisregulering
- Tre jobkort med rigtige tal og egne fotos
- Frederiks direkte nummer og mailadressen
- Formular-backend
- CVR-svar fra advokaten
- Grafikerens tur på logoet
- Google Business Profile
- Fjern gaten, når I går live

---

## Fase 2 — efter live

Ikke nu. Skrevet ned, så det ikke glemmes.

- Én side pr. ydelse med eget jobkort og prisuddrag (`terrasse.html`, `vinduer-og-doere.html`, `tag.html`, `carport.html`, `gulv.html`, `koekken.html`, `vaerelser.html`)
- Jobkort fra telefonen uden at åbne en editor — et simpelt CMS (Sanity, Decap eller et Google Sheet, der bygger til JSON). Vurderes, når der er ti jobkort, og det begynder at gøre ondt
- Tilbudsskabelon som PDF med løftelisten på side to
- Byg Garanti-mærke, når medlemskabet er på plads
