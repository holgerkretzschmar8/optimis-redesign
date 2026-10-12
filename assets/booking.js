/*
 * Optimis AI – Termin-Pop-up (Calendly)
 *
 * Alle Links/Buttons mit dem Attribut data-booking öffnen dieses Pop-up.
 * Ohne JavaScript oder ohne hinterlegten Link bleibt der normale E-Mail-Link aktiv.
 *
 * Datenschutz: Der Calendly-Kalender wird erst nach einem Klick auf "Kalender laden"
 * eingebunden. Vorher werden keine Daten an Calendly übertragen.
 */
(function () {
  // >>> Hier den Calendly-Link eintragen, z. B. "https://calendly.com/optimis-ai/beratung"
  var CALENDLY_URL = "";
  // <<<

  var MAIL = "info@optimis-ai.com";
  if (!CALENDLY_URL) return; // ohne Link: Buttons bleiben E-Mail-Links

  var T = {
    de: {
      title: "Kostenlose Beratung buchen",
      lead: "Wählen Sie einen freien Termin für Ihr kostenloses, unverbindliches Erstgespräch.",
      consent: "Der Terminkalender wird von Calendly bereitgestellt. Beim Laden werden Daten (z. B. Ihre IP-Adresse) an Calendly LLC in den USA übertragen.",
      load: "Kalender laden",
      remember: "Diese Entscheidung für den Besuch merken",
      alt: "Lieber per E-Mail?",
      close: "Schließen",
      privacy: "Datenschutzerklärung",
      loading: "Kalender wird geladen …"
    },
    en: {
      title: "Book a free consultation",
      lead: "Pick a time for your free, no-obligation first call.",
      consent: "The booking calendar is provided by Calendly. Loading it transfers data (such as your IP address) to Calendly LLC in the USA.",
      load: "Load calendar",
      remember: "Remember this choice for this visit",
      alt: "Prefer email?",
      close: "Close",
      privacy: "Privacy policy",
      loading: "Loading calendar …"
    }
  };
  function lang() { return (document.documentElement.lang || "de").slice(0, 2) === "en" ? "en" : "de"; }

  var css = [
    "#opt-book{position:fixed;inset:0;z-index:100000;display:grid;place-items:center;padding:16px;}",
    "#opt-book[hidden]{display:none!important}",
    "#opt-book .bk-veil{position:absolute;inset:0;background:rgba(1,7,38,.72);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);animation:bkFade .2s ease}",
    "#opt-book .bk-panel{position:relative;width:min(980px,100%);height:min(760px,calc(100vh - 32px));display:flex;flex-direction:column;overflow:hidden;",
    "border-radius:26px;border:1px solid rgba(120,170,255,.22);color:#E8ECF4;font-family:'Geist','Helvetica Neue',Arial,sans-serif;",
    "background:radial-gradient(120% 60% at 100% 0%,rgba(10,100,248,.18),transparent 60%),linear-gradient(180deg,#08175A,#030B32);",
    "box-shadow:0 60px 120px -40px rgba(0,0,0,.9);animation:bkIn .28s cubic-bezier(.2,.7,.1,1)}",
    "#opt-book .bk-head{display:flex;align-items:flex-start;gap:16px;padding:24px 28px 18px;border-bottom:1px solid rgba(120,170,255,.16)}",
    "#opt-book .bk-head div{flex:1;min-width:0}",
    "#opt-book h2{margin:0 0 6px;font-family:'Bricolage Grotesque','Helvetica Neue',Arial,sans-serif;font-weight:500;font-size:clamp(22px,3vw,30px);letter-spacing:-.03em;line-height:1.1}",
    "#opt-book .bk-lead{margin:0;color:#AEB7C9;font-size:15px;max-width:60ch}",
    "#opt-book .bk-x{all:unset;cursor:pointer;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;color:#8E9CC4;border:1px solid rgba(120,170,255,.2);flex:none}",
    "#opt-book .bk-x:hover{color:#fff;border-color:rgba(30,208,248,.5)}",
    "#opt-book .bk-x:focus-visible{outline:2px solid #1ED0F8;outline-offset:2px}",
    "#opt-book .bk-body{flex:1;min-height:0;position:relative}",
    "#opt-book .bk-gate{height:100%;display:grid;place-items:center;padding:28px;text-align:center}",
    "#opt-book .bk-gate-in{max-width:520px;display:grid;gap:18px;justify-items:center}",
    "#opt-book .bk-cal{width:84px;height:84px;border-radius:24px;display:grid;place-items:center;",
    "background:radial-gradient(circle at 35% 30%,rgba(30,208,248,.35),rgba(10,100,248,.15) 60%,transparent);border:1px solid rgba(30,208,248,.3)}",
    "#opt-book .bk-cal svg{width:38px;height:38px;color:#1ED0F8}",
    "#opt-book .bk-consent{margin:0;color:#AEB7C9;font-size:14px;line-height:1.6}",
    "#opt-book .bk-consent a{color:#1ED0F8}",
    "#opt-book .bk-load{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:10px;padding:14px 26px;border-radius:999px;font-weight:500;font-size:15px;color:#fff;",
    "background:linear-gradient(180deg,#2E86FF,#0A64F8);box-shadow:0 0 0 1px rgba(30,208,248,.5) inset,0 10px 40px -10px rgba(10,100,248,.8);transition:transform .2s}",
    "#opt-book .bk-load:hover{transform:translateY(-2px)}",
    "#opt-book .bk-load:focus-visible{outline:2px solid #1ED0F8;outline-offset:3px}",
    "#opt-book .bk-rem{display:flex;align-items:center;gap:8px;font-size:13px;color:#8E9CC4;cursor:pointer}",
    "#opt-book .bk-rem input{accent-color:#0A64F8;width:16px;height:16px}",
    "#opt-book .bk-alt{font-size:13px;color:#8E9CC4}",
    "#opt-book .bk-alt a{color:#1ED0F8}",
    "#opt-book .bk-frame{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff}",
    "#opt-book .bk-wait{position:absolute;inset:0;display:grid;place-items:center;color:#8E9CC4;font-size:14px}",
    "@keyframes bkFade{from{opacity:0}}",
    "@keyframes bkIn{from{opacity:0;transform:translateY(14px) scale(.98)}}",
    "@media (max-width:620px){#opt-book{padding:0}#opt-book .bk-panel{height:100%;width:100%;border-radius:0;border:0}#opt-book .bk-head{padding:calc(18px + env(safe-area-inset-top,0px)) 18px 14px}}",
    "@media (prefers-reduced-motion:reduce){#opt-book .bk-veil,#opt-book .bk-panel{animation:none}}"
  ].join("");
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var root = document.createElement("div");
  root.id = "opt-book";
  root.hidden = true;
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.setAttribute("aria-labelledby", "opt-book-title");
  root.innerHTML =
    '<div class="bk-veil" data-close></div>' +
    '<div class="bk-panel">' +
      '<div class="bk-head"><div><h2 id="opt-book-title"></h2><p class="bk-lead"></p></div>' +
        '<button class="bk-x" type="button" data-close><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      '<div class="bk-body">' +
        '<div class="bk-gate"><div class="bk-gate-in">' +
          '<div class="bk-cal" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4M8 14h2M12 14h2M16 14h0M8 17h2M12 17h2"/></svg></div>' +
          '<p class="bk-consent"></p>' +
          '<button class="bk-load" type="button"></button>' +
          '<label class="bk-rem"><input type="checkbox" id="opt-book-remember" checked><span></span></label>' +
          '<p class="bk-alt"></p>' +
        '</div></div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(root);

  var body = root.querySelector(".bk-body");
  var gate = root.querySelector(".bk-gate");
  var lastFocus = null;

  function consentGiven() { try { return sessionStorage.getItem("optimis-calendly-ok") === "1"; } catch (e) { return false; } }

  function texts() {
    var t = T[lang()];
    var privacyHref = "datenschutz.html";
    root.querySelector("#opt-book-title").textContent = t.title;
    root.querySelector(".bk-lead").textContent = t.lead;
    root.querySelector(".bk-consent").innerHTML = t.consent + ' <a href="' + privacyHref + '">' + t.privacy + "</a>";
    root.querySelector(".bk-load").textContent = t.load;
    root.querySelector(".bk-rem span").textContent = t.remember;
    root.querySelector(".bk-alt").innerHTML = t.alt + ' <a href="mailto:' + MAIL + '?subject=Kostenlose%20Beratung">' + MAIL + "</a>";
    root.querySelector(".bk-x").setAttribute("aria-label", t.close);
  }

  function loadCalendar() {
    if (body.querySelector("iframe")) return;
    var t = T[lang()];
    var url = CALENDLY_URL + (CALENDLY_URL.indexOf("?") > -1 ? "&" : "?") +
      "embed_type=Inline&hide_gdpr_banner=1&embed_domain=" + encodeURIComponent(location.hostname || "optimis-ai.com") +
      "&primary_color=0a64f8";
    gate.hidden = true;
    var wait = document.createElement("div");
    wait.className = "bk-wait";
    wait.textContent = t.loading;
    var f = document.createElement("iframe");
    f.className = "bk-frame";
    f.title = t.title;
    f.src = url;
    f.setAttribute("allow", "payment");
    f.addEventListener("load", function () { wait.remove(); });
    body.appendChild(wait);
    body.appendChild(f);
  }

  function open(e) {
    if (e) e.preventDefault();
    lastFocus = document.activeElement;
    texts();
    root.hidden = false;
    document.documentElement.style.overflow = "hidden";
    if (consentGiven()) loadCalendar();
    setTimeout(function () {
      var b = root.querySelector(gate.hidden ? ".bk-x" : ".bk-load");
      if (b) b.focus();
    }, 60);
  }
  function close() {
    root.hidden = true;
    document.documentElement.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  root.querySelector(".bk-load").addEventListener("click", function () {
    if (root.querySelector("#opt-book-remember").checked) {
      try { sessionStorage.setItem("optimis-calendly-ok", "1"); } catch (e) {}
    }
    loadCalendar();
  });
  root.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) close(); });
  document.addEventListener("keydown", function (e) {
    if (root.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "Tab") { // Fokus im Dialog halten
      var f = [].slice.call(root.querySelectorAll("button, a[href], input, iframe")).filter(function (x) { return !x.closest("[hidden]"); });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-booking]");
    if (a) open(e);
  });

  window.OptimisBooking = { open: open, close: close };
})();
