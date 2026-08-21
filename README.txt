FudbalHub LIVE — serverless verzija

Ova verzija je napravljena za Cloudflare Pages + Pages Functions.
GitHub Pages sam po sebi NE izvršava functions/api/*.js, zato frontend treba deployati na Cloudflare Pages (repo ostaje na GitHubu).

ŠTA RADI:
- stvarni LIVE rezultati, osvježavanje svakih 15 sekundi
- utakmice za danas, sutra i jučer
- sve utakmice koje API-Football vrati za odabrani dan
- jake lige imaju prioritet: Liga prvaka, Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Eredivisie, Portugal, Turska, Saudijska Arabija, MLS, Belgija, BiH i Hrvatska
- tabele za prioritetne lige
- timovi iz prioritetnih liga
- vijesti iz više fudbalskih RSS izvora
- API ključ nije u browseru; čuva se kao Cloudflare secret FOOTBALL_API_KEY
- nema hardkodiranog samo-jednog datuma; datum se računa svaki dan

OBJAVA:
1. GitHub repo ostaje izvor koda.
2. U Cloudflare Pages napravi projekt iz GitHub repozitorija.
3. Build command: exit 0
4. Build output directory: .
5. Production branch: main
6. Settings -> Variables and Secrets -> Add variable/secret
   Name: FOOTBALL_API_KEY
   Value: tvoj API-Football ključ
   Obavezno označi Encrypt/Secret.
7. Deploy/Redeploy.

VAŽNO:
- API-Football plan mora imati dovoljno zahtjeva za željeni nivo korištenja.
- Live podaci ovise o dostupnosti API-Football izvora.
