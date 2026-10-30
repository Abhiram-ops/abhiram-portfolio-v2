import { useEffect, useRef } from "react";
import type { Entry } from "./content";

const logoFiles = import.meta.glob("./assets/logos/*.{svg,png,webp}", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const slug = (n: string) => n.toLowerCase().replace(/[^a-z0-9]/g, "");
const logoFor = (name: string) =>
  Object.entries(logoFiles).find(([p]) => p.split("/").pop()!.replace(/\.\w+$/, "") === slug(name))?.[1];

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
            case "h":
              return <h3 className="sub" key={i}>{b.text}</h3>;
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
            case "logos":
              return (
                <ul className="logos" key={i}>
                  {b.items.map((c) => {
                    const src = logoFor(c.name);
                    return (
                      <li key={c.name}>
                        {src ? <img src={src} alt={c.name} loading="lazy" /> : <span>{c.name}</span>}
                      </li>
                    );
                  })}
                </ul>
              );
            case "quote":
              if (b.placeholder && import.meta.env.PROD) return null;
              return (
                <figure className="quote" key={i}>
                  {b.placeholder && <span className="ph">Placeholder — edit in content.ts</span>}
                  <blockquote>{b.text}</blockquote>
                  <figcaption><b>{b.who}</b>, {b.role}</figcaption>
                </figure>
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
