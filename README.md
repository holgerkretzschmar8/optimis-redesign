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

Schriften (Bricolage Grotesque, Geist) kommen von Google Fonts.

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

## Vor dem Go-Live (wenn die neue Seite die alte ersetzen soll)

- [ ] `<meta name="robots" content="noindex, nofollow">` in `index.html` entfernen
- [ ] Rechtstexte (Impressum, Datenschutz, Nutzungsbedingungen) inhaltlich prüfen. Sie sind aus REV00
      übernommen. Bei Änderungen an den Texten beide Versionen pflegen oder nur noch REV01
- [ ] Datenschutzerklärung um einen Abschnitt zu Calendly ergänzen (Terminbuchung)
- [ ] Google-Ads-Tag (AW-18065908893) und ggf. PostHog übernehmen, mit Cookie-Banner.
      Absichtlich nicht in der Vorschau enthalten, damit Testbesuche eure Daten nicht verfälschen
- [ ] Englische Version für SEO unter `/en` mit hreflang ausliefern
      (der Umschalter in dieser Datei wechselt nur im Browser)

## Sprache

DE/EN-Umschalter oben rechts. Die Auswahl wird im Browser gespeichert.
Direktlink auf Englisch: `index.html#en`.
