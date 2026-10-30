import { useEffect, useRef } from "react";
import type { Entry } from "./content";

export function Panel({ entry, onClose }: { entry: Entry; onClose: () => void }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    ref.current?.focus();
    ref.current?.scrollTo(0, 0);
  }, [entry.id]);

  return (
    <div className="scrim" onClick={onClose}>
      <aside
        className="panel"
        role="dialog"
        aria-modal="true"
        aria-label={entry.title}
        tabIndex={-1}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close" onClick={onClose} aria-label="Close">×</button>
        <span className="kicker">{entry.kicker}</span>
        <h2>{entry.title}</h2>
        {entry.blocks.map((b, i) => {
          switch (b.t) {
            case "p":
              return <p key={i}>{b.text}</p>;
            case "stats":
              return (
                <div className="stats" key={i}>
                  {b.items.map((s) => (
                    <div key={s.l}><strong>{s.n}</strong><span>{s.l}</span></div>
                  ))}
                </div>
              );
            case "list":
              return <ul className="bul" key={i}>{b.items.map((x) => <li key={x}>{x}</li>)}</ul>;
            case "tags":
              return <div className="tags" key={i}>{b.items.map((x) => <span key={x}>{x}</span>)}</div>;
            case "roles":
              return (
                <div className="roles" key={i}>
                  {b.items.map((r) => (
                    <div className="role" key={r.role + r.when}>
                      <div className="role-top"><b>{r.role}</b><em>{r.when}</em></div>
                      <div className="org">{r.org}</div>
                      {r.points && <ul className="bul">{r.points.map((p) => <li key={p}>{p}</li>)}</ul>}
                    </div>
                  ))}
                </div>
              );
            case "links":
              return (
                <div className="links" key={i}>
                  {b.items.map((l) => (
                    <a key={l.href} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{l.label} →</a>
                  ))}
                </div>
              );
          }
        })}
      </aside>
    </div>
  );
}
