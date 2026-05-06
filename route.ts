/* ── Design tokens — match original POD Studio HTML ── */
:root {
  --bg: #000;
  --bg2: #080808;
  --bg3: #0f0f12;
  --bg4: #141418;
  --s1: #18181e;
  --s2: #202028;
  --s3: #282832;
  --w: #f4f4ff;
  --w2: #ccccee;
  --w3: #9898cc;
  --mu: #44445a;
  --mu2: #66667a;
  --mu3: #88889a;
  --b: rgba(255,255,255,0.07);
  --b2: rgba(255,255,255,0.12);
  --b3: rgba(255,255,255,0.18);

  /* POD Studio accent — cyan */
  --c: #00f5ff;
  --c2: rgba(0,245,255,0.12);
  --c3: rgba(0,245,255,0.06);
  --bc: rgba(0,245,255,0.25);

  /* Secondary accents */
  --m: #ff2d78;
  --m2: rgba(255,45,120,0.12);
  --v: #8b5cf6;
  --v2: #a78bfa;
  --t: #0ff4c6;
  --t2: rgba(15,244,198,0.12);

  --r: 8px;
  --r2: 12px;
  --r3: 16px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  background: var(--bg);
  color: var(--w);
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--s3); border-radius: 2px; }

/* Grid star field */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,245,255,0.012) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,245,255,0.012) 1px, transparent 1px);
  background-size: 44px 44px;
  pointer-events: none;
  z-index: 0;
}

/* Utility classes kept from original */
.g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
.fc { display: flex; flex-direction: column; gap: 10px; }
.mb16 { margin-bottom: 16px; }
.mb24 { margin-bottom: 24px; }
.mt8 { margin-top: 8px; }
.mt12 { margin-top: 12px; }
.w100 { width: 100%; }

/* Loading bar animation */
@keyframes lbar {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* AI output pulse */
@keyframes aip {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

/* Page fade in */
@keyframes pgIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.pg-in { animation: pgIn 0.3s ease; }
