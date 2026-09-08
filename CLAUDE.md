# Naja Byg — Hjemmeside

Dette dokument beskriver projektets nuværende tilstand og konventioner. Læs det grundigt, inden du laver ændringer.

**Grundlag — og hvad der er låst, og hvad der er åbent:**

Tre dokumenter ligger i mappen. De er grundlag, ikke facit. Frederik bygger sitet, og han bestemmer, hvordan det ser ud.

1. `naja-byg-frygtanalyse.html` — 49 kodede klagepunkter fra danske boligejere. Det er research, ikke smag. Forklarer *hvorfor* løfterne, stemplerne og tragten er, som de er.
2. `naja-byg-designguide-v4.html` (v4.8) — identiteten, som den er tænkt. Afsnit 02, 03, 05, 13 og 16 er tekst og struktur bygget på analysen; resten er visuelle valg.
3. `OPGAVER-v4.3.md` — den ordnede delta fra 24. august-koden. Brug den som liste, ikke som lov.

**Låst — fordi det bygger på analysen og er gennemgået af Frederik:**
- Løftelisten (syv) og kvalitetsstemplerne (fem), ordret — se Signaturkomponenter
- De tre tal på prissiden: timepris, kørsel, materialer — og tærsklen for varsling
- Forsiden som tragt: syv trin, ét kundespørgsmål hver, én CTA i bunden
- Sprogreglen: sig det ligeud; kvalitet/faglighed/erfaring kun med kvittering i samme sætning
- SEO-reglerne
- Work Sans · varm hvid grund · døråbningen som mærke

**Åbent — Frederiks valg, og Claude Code må afvige fra guiden her uden at spørge:**
- Layout, komposition, spacing, sektionshøjder, billedbeskæringer
- Hvor meget teal, hvor og hvordan. Guidens 24 % er en tommelfingerregel, ikke en grænse
- Komponenternes form — stemplerne skal have overskrift + sætning, men rissestregen er ét forslag
- Bevægelse, ud over reglen om `prefers-reduced-motion`
- Alt, der ikke står under Låst

`naja-byg-designguide.pdf` (v3.0) er forældet og må ikke bruges som reference.

---

## Om projektet

Dansk, statisk **multi-page hjemmeside** for **Naja Byg** — tømrerarbejde for private boligejere i Aarhus og opland. Små og mellemstore opgaver, én ad gangen.

Sitet svarer på to ting, og kun de to: at kunden ikke ved, hvad hun skal bede om, og at hun er bange for, at aftalerne ikke holder. Ikke „bedre håndværk“. Frygtanalysen viser, at kun 1 ud af 4 klager over håndværkere handler om selve håndværket — de 3 andre handler om, om nogen svarer, om prisen holder, om de møder op, og om det bliver færdigt. Det er dét, sitet skal bevise.

**Teknologi-stack:** Ren HTML5, CSS3 og vanilla JavaScript. Ingen frameworks, ingen build-tools, ingen package.json. Det er et bevidst valg for et site på seks sider, som skal kunne rettes af Frederik uden en udvikler.

**Adgangsbeskyttelse:** Sitet er beskyttet af `gate.html`, indtil det går live. Koden er pt. `naja2026` og ændres i konstanten `ACCESS_CODE`.

---

## Filer

| Fil | Beskrivelse |
|-----|-------------|
| `index.html` | Forsiden — en salgstragt i syv trin (guiden afsnit 16): hero → stempler → ydelser → erfaring + jobkort → pris → forløbet → „Skal vi tage en uforpligtende snak?“. Filen hedder index, fordi det er det navn, serveren leder efter — det ændres ikke |
| `ydelser.html` | Hvad vi laver — Syddjurs Bygs liste inkl. tilbygning og renovering — og hvad vi ikke laver: totalentreprise og nybyggeri |
| `opgaver.html` | Jobkort, før/efter-slidere og procesgalleri |
| `priser.html` | Åbne timepriser: **tre tal** (timepris, kørsel, materialer) + tærsklen for varsling + hvad der ikke er med |
| `om-os.html` | Niclas og Frederik, direkte numre, **den fulde løfteliste**, ejendomsforretningen som faktalinje |
| `kontakt.html` | Fem formularfelter med hjælpetekster + rækkefølgen for en opgave |
| `gate.html` | Adgangsside (entry point, kun indtil live) |
| `style.css` | Hele designsystemet, bygget på guidens v4-tokens. Komponenterne står under „Layout — forsiden som et tilbud på papir“ |
| `PRODUCT.md` / `DESIGN.md` | Produktsandhed og det byggede designsystem, til designværktøjerne. Holdes ude af repoet |
| `script.js` | Telefonbar, mobilmenu, før/efter-slider, adgangstjek |
| `sitemap.xml` / `robots.txt` | SEO — se afsnittet nedenfor |
| `intern.html` / `intern.js` / `intern.css` | **Intern** dashboard + beregner til ejendomsforretningen. Skjult URL, eget legacy-stylesheet — rører ikke det nye brand |
| `_arkiv-ejendomsinvest/` | Den gamle NAJA Ejendomsinvest-side, som den så ud før rebrandet |
| `logo/` | Logoarbejde. **Døråbningen (E8) er valgt** — se afsnittet Logo |
| `naja-byg-designguide-v4.html` | Designguiden, v4.8 |
| `naja-byg-grundflade.html` | Sammenligningen, der førte til valget af varm hvid. Historisk |
| `naja-byg-skriftvalg.html` | Skriftsammenligningen, der førte til valget af Work Sans. Historisk |
| `naja-byg-frygtanalyse.html` | Kundeanalysen bag budskaberne |
| `naja-billedudvalg.html` | 26 frit licenserede stockkandidater (kun til atmosfære, aldrig som bevis) |

---

## Brand & Design

### Identitet
- **Virksomhedsnavn:** Naja Byg
- **Undertekst i mærket:** Nauntofte & Jacobsen
- **Hovedbudskab (forsidens h1):** Tømrer i Aarhus og opland.
  *Besluttet 7. september: intet slogan. Fem kandidater faldt. Heroen siger, hvad det er — som Polestars „Polestar 4 coupé“ — og lead-linjen bærer differentieringen: „Vinduer, døre, tag, tilbygning, terrasse. Én opgave ad gangen — og timeprisen står her på siden.“ Overtalelsen sker i stemplerne under heroen, ikke i h1. Det er også den bedste h1 til lokal søgning.*
- **Indgangslinje (annoncer, kontakt-CTA):** Du behøver ikke vide, hvad du skal bede om.
- **Kontakt-CTA-overskrift (forsidens bund):** Skal vi tage en uforpligtende snak?
- **Telefon:** 28 18 64 88
- **Sprog:** Dansk

**Fravalgt — må ikke genindføres:** „Faste priser. Faste aftaler. Faste folk.“ (fast pris kan ikke holdes hver gang) · „Fortæl os drømmen. Vi får den i mål.“ (kliché) · „Vi lader håndværket tale for sig selv“ (lover tavshed, som er branchens hyppigste klage) · „Vi stopper først ved 100 %“ (gør os til dem, der afgør hvornår 100 % er nået) · „Du skal ikke gå og gætte“ (intet objekt) · „Aftalt er aftalt“ (faldt) · „Når kvalitet og pris går op i en højere enhed“ (Frederik afviste den selv på dag ét; seks af syv konkurrenter skriver den) · „Der er mere hus, end du tror“ (falder på to vinduer) · „kvalitet“, „faglighed“ eller „tryghed“ uden kvittering i samme sætning.

### Logo
**Døråbningen, variant E8**, er valgt. Master-skitser ligger i `logo/bud-02-perspektiv-doer/doer-e8.svg` og `doer-e8-negativ.svg`. Geometrien:

```svg
<svg viewBox="16 2 76 98">
  <path d="M16,10 L48,10 L48,92 L16,92 Z" fill="#E08356"/>   <!-- åbningen, rust lys -->
  <path d="M48,10 L92,2 L92,100 L48,92 Z" fill="#064E3B"/>   <!-- bladet, Emerald Ink -->
</svg>
```

- Mærket bruger **`#064E3B`** til bladet — ikke guidens Teal 950. Det er logoets egen farve og ligger som `--nb-logo-ink`. Alle andre steder på sitet bruges Teal 950.
- Rusten i mærket er *lyset i rummet bagved*, ikke accenten. **Logoet må aldrig stå klods op ad en rust-knap.** Står logoet i farve på en flade, er den flades accent brugt.
- Tre lockup-niveauer: **fuldt** (mærke + Naja Byg + NAUNTOFTE & JACOBSEN, min. 180 px — hero, tilbud, vogndør) · **standard** (mærke + Naja Byg, min. 90 px — navbar, footer) · **mærket alene** (favicon, min. 16 px).
- Ordmærket sættes i Work Sans 700, tracking −0,035 em, sætningskasse. Underteksten i Work Sans 500, versaler, 0,13 em sperring, Sten 600 på lys / Sten 400 på mørk, aldrig i to linjer.
- Mærket læses også som en opslået bog. Det er en kendt svaghed, som en grafiker skal løse (smallere åbning, kraftigere svaj). **Skitsen bruges, som den er, indtil da.**
- Forbudt i og omkring mærket: hus, tag, hammer, sav, blad, „NB“-monogram, dørhåndtag, og **enhver slange- eller S-form** (Naja er kobraslægtens latinske navn).

### Farvepalette (guide v4.8)

**Besluttet 7. september:** grundfladen er varm hvid, ikke sand. Token-navnene er uændrede — kun værdierne for `--nb-sand-50/100/200` er nye. Den gamle sand (`#F7E9C9`) må ikke findes i koden.

| CSS-variabel | Hex | Brug |
|---|---|---|
| `--nb-teal-950` | `#04302C` | Overskrifter, mørke sektioner, primær knap, footer, rissestregen i stemplerne |
| `--nb-teal-900` | `#063A35` | Brødtekst |
| `--nb-teal-800` | `#0A423C` | Kort på mørk bund |
| `--nb-logo-ink` | `#064E3B` | **Kun** logoets blad |
| `--nb-sand-50` | `#FAF6EE` | Sidebaggrund overalt — varm hvid. Læses som hvid, er det ikke. **Aldrig ren hvid, aldrig kølig grå** |
| `--nb-sand-100` | `#F1EADB` | Sektionsskift, kort, felter |
| `--nb-sand-200` | `#E4DAC5` | Tabellinjer og dividers — **kun dekorativt** |
| `--nb-sten-500` | `#847F6C` | Funktionelle rammer og inputfelter (klarer 3:1) |
| `--nb-sten-600` | `#5C5A4F` | Dæmpet tekst på lys |
| `--nb-sten-700` | `#474639` | Lead-afsnit, labels, billedtekst |
| `--nb-rust-600` | `#A8431F` | Accent, links på lys, fokusring |
| `--nb-rust-400` | `#E08356` | Accent og links på mørk bund, åbningen i logoet |

Fordeling: **68 % sand · 24 % teal · 5 % sten · 3 % rust.** Rust bruges til **én handling pr. skærmbillede** — overskrides det, holder den op med at være en accent. Logoet er den ene undtagelse (se ovenfor).

Ingen orange, gul, marineblå eller mintgrøn. Ingen gradienter eller glow. Eneste tilladte skygge er `--nb-shadow`. Alle farver via custom properties — aldrig hardkodet hex.

### Typografi
**Work Sans til alt** — besluttet 7. september 2026. Bricolage Grotesque og Instrument Sans er ude. Én familie, fire statiske vægte fra Google Fonts: `Work+Sans:wght@400;500;600;700`.

- **Overskrifter:** Work Sans 600, tracking −0,03 em, sætningskasse. Aldrig 700 i overskrifter — 700 er reserveret til ordmærket. Aldrig versal.
- **Brødtekst:** Work Sans 400, minimum 16,5 px, linjehøjde 1,62. Fremhævet tekst og data i 500. `tabular-nums` globalt.
- **Labels, knapper, eyebrows:** Work Sans 600, 0,72 rem, 0,14 em sperring, versaler.
- Ingen `font-variation-settings` nogen steder — Work Sans har ingen bredde-akse.
- Ingen udråbstegn.

Work Sans er også NAJA Ejendomsinvests skrift. Det er kendt og accepteret — palet, mærke og tone er forskellige.

### Form
Hjørneradius 2 px (aldrig over 4). Rammer 1 px. Maks. indholdsbredde 1140 px, tekstspalte 68ch. Trykflader mindst 44 × 44 px. Fokusring 2 px rust, offset 2 px.

---

## Layout — forsiden som et tilbud på papir (8. september 2026)

Frederiks dom over v4.8-koden: farvestriber, logo to gange, fem ens kasser, søgt prisoverskrift. Siden blev bygget om med friske øjne. Konceptet: **et godt tilbud på papir** — tal, klausuler og navne, sat ligeud på varm hvid med hårlinjer som eneste struktur.

- **Én header** (`.hdr`), lys, sticky: mærke · sider · nummeret i 600 · „Skriv til os“. Ingen mørk telefonbar. Ingen „vi tager den“.
- **Hero delt** (`.hero-grid`): tekst til venstre, fotoet til højre uden overlay og uden logo, bløder ud til skærmkanten. Fotoet afdækkes én gang fra venstre mod højre (`door-open`, 640 ms) — sidens eneste indtoning. Mobil: foto øverst, tekst under.
- **Klausuler** (`.clauses` / `.clause`): påstand i stor grad til venstre, mekanisme til højre, hårlinjer imellem. Bruges til stemplerne, løftelisten, spørgsmålene og ydelseslisten på undersiderne. **Aldrig kasser, aldrig ikoner, aldrig eyebrow-labels over overskrifter.**
- **Ydelseslisten** (`.services-list`): én stor typografisk liste i to spalter med pil.
- **Prisfeltet** (`.price-block`): sidens ene teal-felt. Tallene i op til 4,4 rem. Overskriften er „Hvad koster det?“ — ikke „Timeprisen står her. Ikke bag en formular.“ (fravalgt som søgt).
- **Jobrækker** (`.jobrows` / `.jobrow`): foto til venstre, fakta til højre, én pr. række. Erstatter kortgriddet.
- **Forløbet** (`.flow`): fire trin med store tal i teal.
- **Afslutningen** (`.close`): nummeret i op til 6 rem som sidens sidste ord, plus den ene rust-knap „Skriv til os“. Alle sider slutter sådan.
- **Hero-billederne** ligger i `assets/billeder/hero/` (split-beskæring til desktop, stående til mobil). Aldrig over 250 KB. Midlertidige, indtil de rigtige kommer.

Regler fra designværktøjets kvalitetsgulv, som nu gælder: ingen eyebrow over overskrifter · ingen ens kort som sidestruktur · ingen farvet kant over 1 px · ingen sektionsnumre uden betydning.

---

## Layout — forsiden som et tilbud på papir (8. sep. 2026)

Efter Frederiks afvisning af v4.8-udgaven (farvestriber, logo to gange, fem ens kasser, søgt prisoverskrift) er forsiden bygget om med friske øjne. Konceptet: siden er det tilbud, kunden sidder med ved køkkenbordet — tal, klausuler og navne, sat ligeud.

- **Én lys header.** Mærke, sider, nummeret i 600, „Skriv til os". Ingen telefonbar, ingen mørk bjælke.
- **Hero delt i to.** Tekst venstre på varm hvid, foto højre uden overlay og uden logo, bløder ud til kanten. Fotoet afdækkes én gang fra højre kant og ind (400 ms). Sidens eneste bevægelse.
- **Rissestregen** — en 36 × 3 px streg i tekstfarven over hver h2 — er sidens eneste strukturmærke. Sektioner adskilles af luft, ikke af fuldbredde-linjer. Hårlinjer bruges kun inde i tabeller (klausuler, jobrækker, prisposter).
- **Stemplerne som klausuler** (`.clauses`): påstand venstre i stor grad, mekanisme højre. Samme form bærer løftelisten på Om os og de fem spørgsmål på Kontakt.
- **Ydelserne som én sætning** i displaystørrelse (`.services-run`), som listen på en vogndør.
- **Priserne som poster i et tilbud** (`.price-lines`) i sidens **eneste** teal-felt. Footeren er lys.
- **Jobkort som rækker** (`.jobrows`): foto venstre, fakta højre. Rigtige fotos først, guidens eksempel sidst og mærket „Eksempel:".
- **Afslutningen er nummeret** i op til 6 rem (`.close`), med den ene rust-knap ved siden af.

**Skabelon-tegn, der bevidst holdes ude:** eyebrow-labels, versal-labels, midterprikker i meta-tekst („A · B · C"), pile efter links, ens kort i grid, farvede kanter over 1 px, tal der tæller op, indtoning på hver sektion. Se `DESIGN.md` for tokens og komponenter.

---

## Signaturkomponenter

Fem elementer bærer hele differentieringen. Rør dem ikke uden at læse guiden.

1. **Kvalitetsstemplerne** (`.stamps`) — fem korte forpligtelser i én række, direkte under heroen på forsiden. Hvert stempel er en overskrift (påstand) + én sætning (mekanisme). **Stemplet uden sin sætning er værdiløst.** Formen er *rissestregen* — en kort streg i Teal 950 over overskriften. Aldrig skjolde, segl, laurbær, ikoner eller flueben. Ingen rust. Ordlyd i guiden afsnit 13.
2. **Løftelisten** (`.promises`) — syv flade forpligtelser, **ordret ens** på Om os, i tilbuddet og på visitkortet. Står **ikke** på forsiden — dér er stemplerne den korte form. De to formater må aldrig stå på samme side. Ordlyd i guiden afsnit 02.
3. **Vi spørger altid om** (`.questions`) — fem spørgsmål. Pointen er ikke spørgsmålene, det er begrundelsen under hvert af dem. Spørgsmål 05 hedder *„Har du sat et budget?“* — ikke „hvad har du regnet med, det koster“.
4. **Jobkortet** (`.jobcard`) — ét telefonfoto i 4:3, seks faste felter, én sætning signeret med fornavn. Samme kort i 4:5 er en færdig Meta-annonce. Udbedring og oprydning *vises* her — de loves ikke.
5. **Åbne timepriser** (`priser.html`) — **tre tal side om side:** timepris, kørsel, materialer. Plus tærsklen: *„Overstiger vi det oplyste timeantal med mere end 10 % eller to timer, stopper vi og ringer, før næste time bruges.“* Aldrig bag en formular. Ingen „priser fra“.

### Løftelisten, ordret

```
01  Du får svar samme hverdag.
    Også når svaret er, at opgaven ikke er noget for os. Så får du et navn på en, der kan.
02  Samme timepris for alle. Den står på hjemmesiden.
    Sammen med, hvad kørsel og materialer koster.
03  Skrider tid eller pris, laver vi en ny aftale sammen — før vi arbejder videre.
    Aldrig først på fakturaen.
04  Én opgave ad gangen. Vi starter ikke hos dig, før vi er færdige hos den forrige.
    Det betyder, at du venter på, at vi starter — ikke på, at vi bliver færdige.
05  Du har én kontaktperson, der kender din sag fra start til slut.
    Frederik tager telefonen og aftalerne. Niclas, uddannet tømrer med 10+ år i faget, udfører arbejdet.
06  Bliver vi forsinket, får du besked, så snart vi ved det.
    Planlagte ændringer senest dagen før. Sker der noget på dagen, ringer vi med det samme.
07  Vi afslutter først, når listen er tom, og du er tilfreds.
    Vi går opgaven igennem sammen og skriver ned, hvad der mangler. Står der noget på listen, er vi ikke færdige.
```

Reglen fra Frederiks gennemgang: **sig det ligeud.** Findes der en smart formulering og en lige, vælges den lige.

### Kvalitetsstemplerne, ordret

```
Aftalt dag, aftalt tid     Bliver vi forsinket, får du besked, så snart vi ved det. Ikke når du har taget fri og venter.
Svar samme hverdag         Du venter ikke forgæves på et tilbud, der aldrig kommer.
Samme timepris for alle    Den står på hjemmesiden, sammen med kørsel og materialer.
Én opgave ad gangen        Du venter på, at vi starter. Ikke på, at vi bliver færdige.
Én kontaktperson           Frederik kender din sag fra start til slut. Niclas, uddannet tømrer med 10+ år i faget, laver arbejdet.
```

**Bevidst fravalgt som løfte eller stempel:** inkasso-politik (skrives aldrig), udbedring for egen regning og oprydning (gøres, men loves ikke — vises i jobkort og fotos).

---

## Sprog

**Erstat tillægsord med tal.** Kan en påstand ikke tælles, dateres eller navngives, skal den skrives om eller ud.

**Brug:** svar samme hverdag · timepris · kørsel · materialer · arbejdsdage · skriftligt · vi måler op · én opgave ad gangen · samme folk · senest dagen før · vi siger til, før vi arbejder videre · det laver vi ikke · vi giver dig et navn · vi afleverer sammen · uddannet tømrer, 10+ år i faget

**Kræver kvittering i samme sætning:** kvalitet · faglighed · erfaring · ordentlighed · tryghed · vi sætter en ære i. Ordene er ikke forbudte — de er værdiløse alene. „Høj faglighed“ = det, alle skriver. „Uddannet tømrer, ti år i faget“ = faglighed med kvittering. Tryghed er sitets *mål*, ikke dets ord.

**Undgå:** fast pris (som løfte) · slutdato (som løfte, indtil spredningen kendes) · uforpligtende *tilbud* (en uforpligtende *snak* er derimod den rigtige CTA) · glade kunder · skræddersyet · totalløsninger · store som små opgaver · vi brænder for · passion · trygge hænder · garanti / certificeret / godkendt om egne løfter · Dansk Byggeri (hedder DI Byggeri siden 2021) · 5 års reklamationsret (findes ikke for forbrugere) · inkasso (nævnes aldrig)

**Om folkene:** Niclas Nauntofte er uddannet tømrer med 10+ år i faget og udfører arbejdet. Frederik Jacobsen står for tilbud, opmåling og aftaler. Skriv det sådan — ikke „erfarne folk“.

**Syddjurs Byg:** Niclas' fars firma, hvis opgaver Naja Byg overtager. Det er det stærkeste tillidssignal, sitet har, og det bruges i forsidens trin 4. Tre fakta mangler, før linjen kan skrives færdig: antal år, om navnet må nævnes, om faren fortsætter i en rolle. Indtil da står linjen med klammer.

**Om ejendomsforretningen:** NAJA Ejendomsinvest nævnes **aldrig** som salgsargument, aldrig i en overskrift, aldrig i en annonce. Én faktalinje på Om os, som forklarer, hvor standarden kommer fra.

---

## SEO

Lokal søgning er den eneste kanal, der betyder noget for et tømrerfirma i Aarhus. Reglerne:

- **`<title>`-mønster:** `[Sidens emne] · Tømrer i Aarhus · Naja Byg`, højst 60 tegn. Forsiden: `Tømrer i Aarhus · Naja Byg`. Ordet *Aarhus* skal stå i alle titler.
- **Meta description:** 120–155 tegn, indeholder ét konkret løfte (timeprisen står på siden / svar samme hverdag) og *Aarhus og opland*. Aldrig „kvalitet“.
- **Én `<h1>` pr. side.** Forsidens h1 er hovedbudskabet, ikke et søgeord — søgeordet bæres af `<title>`, meta og den første `<p>`.
- **JSON-LD** på alle sider: `LocalBusiness` med `@type: "GeneralContractor"`, navn, telefon, mail, `areaServed` (Aarhus Kommune og nabokommuner), `address` (Aarhus, DK), `priceRange`, `openingHoursSpecification`, `image` (logo), `sameAs` (Google Business Profile, når den findes). Ligger som ét `<script type="application/ld+json">` i `<head>`.
- **Canonical** på alle sider. **Open Graph** (`og:title`, `og:description`, `og:image` 1200 × 630 med logo på sand) på alle sider.
- `sitemap.xml` og `robots.txt` i roden. Sitemap opdateres, når en side tilføjes.
- Alt-tekster som jobkortets titel: *„Ny zinkinddækning ved skotrende, Risskov 2026“*. Aldrig „byggefirma i Aarhus“.
- **Fase 2 (efter live):** én side pr. ydelse (`terrasse.html`, `vinduer-og-doere.html`, `tag.html`, `carport.html` …) med hver sin title, sit jobkort og sit prisuddrag. Det er den største organiske løftestang efter Google Business Profile.
- **Google Business Profile** er vigtigere end alt ovenstående. Kategori: Tømrer. Samme billeder, samme telefonnummer, samme åbningstider som sitet.

---

## Billeder

Systemet skal **løfte telefonbilleder, ikke kræve en fotograf.** Kræver det en fotograf at fodre sitet, dør brandet efter tre måneder.

- Faste beskæringsforhold: **4:3 i jobkort, 16:9 i hero, 4:5 i annoncer**
- Grading lægges på i CSS (`img { filter: saturate(.96) contrast(1.05) brightness(1.02) }`) — ikke i et redigeringsprogram. Send billeder ubehandlede
- **Aldrig stockfotos i jobkort, galleri eller før/efter.** Et jobkort uden eget foto får en tom fotoplads (`.jobcard-media--empty`) — aldrig et billede fra en anden opgave
- Aldrig: manden med boremaskinen · opstilling foran firmabil · hjelm-og-vest som tillidssignal · dronehero uden mennesker · kold eller HDR-grading
- Billederne på sitet nu er **midlertidige**. De skiftes, uden at layoutet skal røres.

---

## Bevægelse

Bevægelse, der bekræfter noget, brugeren gør, er god. Bevægelse, der optræder af sig selv, er dekoration. Intet over 400 ms. Intet gentager sig. Alt slukkes ved `prefers-reduced-motion`.

- **Før/efter-slider** — den vigtigste. `script.js`, virker med mus, touch og piletaster
- **Indtoning ved scroll** — `.reveal`, ren CSS via `animation-timeline: view()`, nul JavaScript. Intet må starte ved `opacity: 0` uden fallback
- **Blødt sideskift** — `@view-transition { navigation: auto }`
- **Telefonbaren** bliver kompakt efter 10 px
- **Jobkort zoomer 1,03 ved hover**, 400 ms

Aldrig: tal der tæller op · parallax · karruseller · autoplay-video i hero.

---

## Åbne punkter før live

- [ ] **CVR-forholdet.** Naja Byg findes ikke i CVR, og NAJA Ejendomsinvest ApS' formål (branchekode 681100) dækker ikke håndværksydelser til tredjemand. Footeren står med `NAJA Ejendomsinvest ApS · CVR 46 14 14 66`, indtil advokaten har svaret
- [ ] **Løftelisten v4.5** skal bekræftes af Niclas — den er skrevet efter Frederiks gennemgang, ikke Niclas'
- [ ] **Timepriserne skal valideres.** Tallene i `priser.html` er guidens estimater ud fra markedsdata — ikke jeres egne lønninger og dækningsbidrag
- [ ] **Kørselspolitik og materialetillæg** skal besluttes — de er de to tal, der mangler ved siden af timeprisen
- [ ] **Dato for sidste prisregulering** under pristabellen
- [ ] **Mindst tre jobkort med rigtige tal.** Søg efter `is-todo` og `TODO`
- [ ] **Frederiks direkte nummer** på `om-os.html`
- [ ] **Mailadresse** — `kontakt@najabyg.dk` er antaget, ikke bekræftet
- [ ] **Kontaktformularen har ingen backend.** `action="#"`. Sæt en formulartjeneste på
- [ ] **Logoet** skal gennem en grafiker (bog-læsningen). Skitsen bruges indtil da
- [ ] **Byg Garanti-mærket** må først vises, når medlemskab af DI Byggeri eller Dansk Håndværk er på plads
- [ ] **Google Business Profile** med de samme billeder
- [ ] **De rigtige billeder** — hero og jobkort er midlertidige
- [ ] **Syddjurs Byg** — tre fakta til forsidens trin 4 (år, navn, farens rolle)
- [ ] **Et rigtigt, anonymiseret tilbud** som PDF til forsidens trin 6

---

## De to tests, der betyder mest

1. **Dæk logoet til og læs siden.** Kunne den være seks andre danske byggefirmaers hjemmeside, er den ikke færdig. Sæt den ved siden af vibergtoemrerfirma.dk, akbyg.dk og hptomrer.dk.
2. **Kan I stadig fodre den om seks måneder?** Kræver et jobkort en fotograf, en tekstforfatter eller en fridag, er systemet bygget forkert. Fire minutter fra en telefon i bilen.

---

## Adgangsbeskyttelse

`script.js` og `intern.js` tjekker ved load:

```js
if (sessionStorage.getItem('naja_access') !== 'granted') {
    window.location.replace('gate.html');
}
```

Sessionen nulstilles ved lukning af browsertab. Der er ingen server-side sikkerhed. **Fjernes før live** — og `robots.txt` må ikke blokere sitet, når gaten er væk.

---

## Den interne side

`intern.html` (projektdashboard + beregner) hører til ejendomsforretningen og er **ikke** en del af Naja Byg-brandet. Den ligger på sin egen `intern.css` og er urørt af rebrandet. Ikke linket fra navigation eller footer. Datakonvertering: `python3 scripts/excel-to-json.py`. Dokumentation i `_arkiv-ejendomsinvest/CLAUDE.md`.

---

## Tilføj et jobkort

1. Tag ét telefonfoto i 4:3. Dagslys, ryddet motiv, lige telefon
2. Læg det i `assets/billeder/[Opgave]/`
3. Kopiér en `<article class="jobcard">` i `opgaver.html` og udfyld de seks felter: opgave · sted og måned · omfang · varighed · materialer · pris
4. Skriv én sætning i egen stemme, helst om noget der gik anderledes end planlagt. Signér med fornavn
5. Alt-tekst = titel + sted + år
6. Har du ikke fotoet endnu, så brug `.jobcard-media--empty` — aldrig et billede fra en anden opgave

---

## Tekniske konventioner

- Relative billedstier (ingen `/`-prefix) — sitet er statisk
- `loading="lazy"` på alle `<img>` undtagen above-the-fold
- CSS custom properties til alle farver — aldrig hardkodet hex
- Adgangstjek øverst i hver `.js`-fil (indtil live)
- Kommentarer på dansk
- Ingen frameworks, ingen npm, ingen build-step
- Undersiderne deler header og footer som kopieret markup. Ændrer du den ene, så ændr dem alle — søg efter `<!-- ═══ Navigation ═══ -->` og `<!-- ═══ Footer ═══ -->`
- Logoet indsættes som inline `<svg>` (ikke `<img>`), så bladet kan skifte farve i negativ

---

## Hosting

Deployes som statisk site. Produktionsrepoet ligger i `../GitHub/najabyg` (custom domain `najabyg.dk`) og indeholder stadig den **gamle** ejendomsinvest-udgave — det skal opdateres separat, når indholdet her er godkendt. Go-live er tidligst marts 2027.

---

## Tone of voice

- **Konkret** — tal, datoer og navne frem for tillægsord
- **Kort og præcis** — ingen lange tekstblokke
- **Ærlig om begrænsninger** — det er dér, autoriteten ligger
- **Dansk** — korrekt retskrivning, ingen anglicismer
