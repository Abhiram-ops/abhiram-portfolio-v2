import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Scene } from "./Scene";
import { Panel } from "./Panel";
import { byId, EMAIL, entries, hero, RESUME_HREF, TOTAL } from "./content";

const STORE = "ab-office-seen";

function loadSeen(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORE) || "[]"));
  } catch {
    return new Set();
  }
}

const MOBILE = "(max-width: 720px)";

export default function App() {
  const [seen, setSeen] = useState<Set<string>>(loadSeen);
  const [openId, setOpenId] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [hinting, setHinting] = useState(false);
  const [tip, setTip] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [night, setNight] = useState(() => {
    const h = new Date().getHours();
    return h >= 19 || h < 6;
  });
  const [compact, setCompact] = useState(() => window.matchMedia(MOBILE).matches);
  const hintTimer = useRef<number>();

  useEffect(() => {
    const mq = window.matchMedia(MOBILE);
    const on = () => setCompact(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = night ? "night" : "day";
  }, [night]);

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify([...seen]));
    } catch {
      /* storage unavailable: discovery just won't persist */
    }
  }, [seen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenId(null);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = useCallback((id: string) => {
    setMenu(false);
    setSeen((s) => (s.has(id) ? s : new Set(s).add(id)));
    if (id === "lamp") {
      setNight((n) => !n);
      return;
    }
    setOpenId(id);
  }, []);

  const hint = () => {
    setHinting(true);
    window.clearTimeout(hintTimer.current);
    hintTimer.current = window.setTimeout(() => setHinting(false), 3200);
  };

  const labels = useMemo<Record<string, string>>(
    () => ({
      ...Object.fromEntries(entries.map((e) => [e.id, e.menu])),
      lamp: night ? "Desk lamp — switch to daylight" : "Desk lamp — change the light",
    }),
    [night],
  );

  return (
    <div className="app" onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
      <div className="stage">
        <Scene seen={seen} hinting={hinting} onOpen={open} onTip={setTip} labels={labels} compact={compact} />
      </div>

      <header className="topbar">
        <a className="pill cta" href={RESUME_HREF} download>
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M12 3v12m0 0l-5-5m5 5l5-5M5 20h14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span>Résumé<span className="long"> (PDF)</span></span>
        </a>
        <a className="pill icon" href={`mailto:${EMAIL}`} aria-label={`Email Abhiram at ${EMAIL}`} title={EMAIL}>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M3 6h18v12H3zM3 7l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
        </a>
        <button className="pill" onClick={hint}>Hints</button>
        <button className="pill" onClick={() => setMenu((m) => !m)} aria-expanded={menu}>Menu</button>
      </header>

      <section className="welcome">
        <h1>Welcome to my office</h1>
        <p>I'm Abhiram — talent acquisition &amp; client partnerships. Click around and see what you find, or use the menu for a quicker way through.</p>
        <span className="count">{seen.size} OF {TOTAL} DISCOVERED</span>
      </section>

      <div className="hero" role="group" aria-label="Highlights by company">
        {hero.map((g) => (
          <section key={g.org} aria-label={`${g.org}, ${g.role}`}>
            <h2>{g.org}<span> · {g.role}</span></h2>
            <ul>
              {g.items.map((h) => (
                <li key={h.l}><strong>{h.n}</strong><span>{h.l}</span></li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <nav className="explore" aria-label="Explore the office">
        {entries.map((e) => (
          <button key={e.id} onClick={() => open(e.id)}>{e.menu}{seen.has(e.id) && <i aria-label="seen" />}</button>
        ))}
        <button onClick={() => open("lamp")}>Desk lamp{seen.has("lamp") && <i aria-label="seen" />}</button>
      </nav>

      {tip && !openId && (
        <div className="tip" style={{ left: pos.x + 14, top: pos.y + 16 }}>{tip}</div>
      )}

      {menu && (
        <nav className="menu" aria-label="Quick links">
          <div className="menu-head">
            <span>Quick links</span>
            <button onClick={() => setMenu(false)} aria-label="Close menu">×</button>
          </div>
          <ul>
            {entries.map((e) => (
              <li key={e.id}>
                <button onClick={() => open(e.id)}>{e.menu}{seen.has(e.id) && <i aria-label="seen" />}</button>
              </li>
            ))}
            <li>
              <button onClick={() => open("lamp")}>Desk lamp{seen.has("lamp") && <i aria-label="seen" />}</button>
            </li>
          </ul>
        </nav>
      )}

      {openId && byId[openId] && <Panel entry={byId[openId]} onClose={() => setOpenId(null)} />}
    </div>
  );
}
