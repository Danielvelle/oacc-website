# MIGRATION_TO_WINDOWS — oacc-website

**Prioritet: lav.**
Ren statisk HTML/CSS/JS-side. Ingen build-pipeline, ingen dependencies, ingen database.

## Stack

- `index.html` + `style.css` + `script.js`
- Ingen Node, ingen build, ingen env

## Kritiske filer

Alle tre filer i rot:
- `index.html`
- `style.css`
- `script.js`

Pluss `.git/` hvis du vil beholde historikk (commit 9 dager siden).

## Start på Windows

Dobbel-klikk `index.html` åpner den i browser. Eller kjør en enkel statisk server:

```powershell
cd C:\Users\<brukernavn>\oacc-website
# Hvis Python er installert:
python -m http.server 8080
# Eller npx:
npx serve .
```

## Mac-spesifikke problemer

Ingen.

## Sjekkliste

- [ ] Kopiere hele `projects/oacc-website/`-mappen (inkludert `.git/`)
