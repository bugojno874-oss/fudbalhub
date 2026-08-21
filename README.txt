FudbalHub LIVE paket.
1) Zamijeni index.html.
2) Ubaci .github/workflows/live-data.yml.
3) Secret FOOTBALL_API_KEY mora postojati.
4) Pokreni workflow ručno jednom.
5) GitHub Pages ostaje na main.
Napomena: ovo je near-live. API-Football live podatke osvježava vrlo često, ali GitHub Actions schedule nije garantovano u sekundi. Za pravo 15-sekundno osvježavanje potreban je serverless/backend proxy.
