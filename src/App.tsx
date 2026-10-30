import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Scene } from "./Scene";
import { Panel } from "./Panel";
import { byId, entries, TOTAL } from "./content";

const STORE = "ab-office-seen";

function loadSeen(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORE) || "[]"));
  } catch {
    return new Set();
  }
}

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
  const hintTimer = useRef<number>();
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = stage.current;
    if (s) s.scrollLeft = (s.scrollWidth - s.clientWidth) / 2;
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
      <div className="stage" ref={stage}>
        <Scene seen={seen} hinting={hinting} onOpen={open} onTip={setTip} labels={labels} />
      </div>

      <header className="topbar">
        <button className="pill" onClick={hint}>Hints</button>
        <button className="pill" onClick={() => setMenu((m) => !m)} aria-expanded={menu}>Menu</button>
      </header>

      <section className="welcome">
        <h1>Welcome to my office</h1>
        <p>I'm Abhiram — talent acquisition &amp; client partnerships. Click around and see what you find, or use the menu for a quicker way through.</p>
        <span className="count">{seen.size} OF {TOTAL} DISCOVERED</span>
      </section>

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
          </ul>
        </nav>
      )}

      {openId && byId[openId] && <Panel entry={byId[openId]} onClose={() => setOpenId(null)} />}
    </div>
  );
}
