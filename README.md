# Optimis AI – Redesign (Vorschau-Version)

Eigenständige statische Website. Sie ist vollständig unabhängig von der aktuellen
Live-Seite (React-App auf www.optimis-ai.com): kein gemeinsamer Code, kein Build-Schritt.

## Inhalt

| Datei | Zweck |
|---|---|
| `index.html` | Die komplette Seite (HTML, CSS, JavaScript, DE/EN-Übersetzung) |
| `impressum.html`, `datenschutz.html`, `nutzungsbedingungen.html` | Rechtsseiten im neuen Design. Texte 1:1 aus der bisherigen Seite übernommen (Stand REV00) |
| `assets/logo.webp` | Optimis-Logo, freigestellt (auch als Favicon genutzt) |
| `assets/booking.js` | Termin-Pop-up mit Calendly. Link oben in der Datei bei `CALENDLY_URL` eintragen. Ohne Link bleiben die Buttons E-Mail-Links. Calendly lädt erst nach Zustimmung des Besuchers |
| `assets/three.min.js` | 3D-Bibliothek für den Voice-Orb (three.js r128, MIT-Lizenz), lokal statt über ein CDN |

Schriften (Bricolage Grotesque, Geist, Geist Mono) liegen lokal in `assets/fonts` – keine Verbindung zu Google.

**Chatbot-Widget:** unten rechts. Es nutzt dieselbe Chat-API wie die bisherige Seite
(`https://optimis-ai-site.vercel.app/api/chat`). Gespräche landen also wie gewohnt in Supabase.
Das Widget funktioniert nur, solange das alte Vercel-Projekt `optimis-ai-site` mit dieser API online ist.

## Automatisches Deployment

Dieses Repo (`holgerkretzschmar8/optimis-redesign`) ist mit dem Vercel-Projekt **rev01** verbunden.
Jeder Push auf `main` wird automatisch auf **https://rev01.vercel.app** veröffentlicht.
Die Rechtsseiten sind dort auch ohne `.html` erreichbar (`/impressum`, `/datenschutz`, `/nutzungsbedingungen`).

## Lokal ansehen

Ordner öffnen und `index.html` per Doppelklick im Browser öffnen. Alternativ:

```
npx serve .
```

## Sicher deployen, ohne die Live-Seite zu verändern

Die bestehende Seite bleibt unberührt, solange du die Domain **www.optimis-ai.com
nicht** auf dieses neue Projekt umstellst.

**Empfohlen: eigenes Vercel-Projekt**

1. Auf vercel.com: *Add New → Project*. Diesen Ordner als neues Projekt hochladen
   (oder in ein neues GitHub-Repo legen, z. B. `optimis-redesign`, und importieren).
   **Nicht** in das bestehende Repo der Live-Seite einspielen.
2. Framework Preset: **Other**. Build Command: leer. Output Directory: `.`
3. Deploy. Du bekommst eine eigene Adresse, z. B. `optimis-redesign.vercel.app`.
4. Optional eine Subdomain wie `neu.optimis-ai.com` im neuen Projekt hinterlegen.
   Die Hauptdomain bleibt beim alten Projekt.

Alternativ per CLI im Ordner: `npx vercel` (legt automatisch ein neues Projekt an).
Auch Netlify Drop (Ordner per Drag & Drop) funktioniert.

Die Seite hat `noindex` gesetzt. Google nimmt die Vorschau also nicht auf, und sie
konkurriert nicht mit der Live-Seite.

## Launch (Domain umziehen)

1. Vercel → Projekt **optimis-ai-site** → Settings → Domains: `www.optimis-ai.com` und `optimis-ai.com` entfernen.
2. Vercel → Projekt **rev01** → Settings → Domains: beide Domains hinzufügen (`optimis-ai.com` → Weiterleitung auf `www`).
3. Das Projekt `optimis-ai-site` **nicht löschen**: Darüber läuft die Chat-API (`optimis-ai-site.vercel.app/api/chat`).
4. Zurück zur alten Seite: Domains wieder umgekehrt zuordnen.

Suchmaschinen: Auf `rev01.vercel.app` sendet Vercel `X-Robots-Tag: noindex` (siehe `vercel.json`).
Unter www.optimis-ai.com ist die Seite indexierbar, alle Seiten verweisen per Canonical auf www.optimis-ai.com.
Alte URLs (`/ki-beratung`, `/privacy-policy`, `/terms-of-service`, `/en/...`, `/de/...`) werden weitergeleitet.

## Offen

- [ ] Datenschutzerklärung um die Abschnitte aus `Entwurf_Datenschutz_Ergaenzungen.md` ergänzen (liegt im Ordner über REV01)
- [ ] Calendly-Termin auf Deutsch umstellen
- [ ] Optional: KI-Beratung-Seite im neuen Design (aktuell Weiterleitung auf die Startseite)
- [ ] Optional: Google-Ads-Tracking (dann Cookie-Banner nötig), eigene /en-URLs

## Sprache

DE/EN-Umschalter oben rechts. Die Auswahl wird im Browser gespeichert.
Direktlink auf Englisch: `index.html#en`.
