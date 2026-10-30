import { entries, hero, EMAIL, RESUME_HREF, type Block } from "./content";

// Build-time static HTML of the whole portfolio, injected into index.html (see vite.config.ts).
// Plain strings, no JSX, so the Vite config can import it without a React toolchain.
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function block(b: Block): string {
  switch (b.t) {
    case "p":
      return `<p>${esc(b.text)}</p>`;
    case "stats":
      return `<dl>${b.items.map((s) => `<dt>${esc(s.n)}</dt><dd>${esc(s.l)}</dd>`).join("")}</dl>`;
    case "list":
      return `<ul>${b.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
    case "tags":
    case "logos":
      return `<ul>${b.items.map((x) => `<li>${esc(typeof x === "string" ? x : x.name)}</li>`).join("")}</ul>`;
    case "roles":
      return b.items
        .map(
          (r) =>
            `<h4>${esc(r.role)}, ${esc(r.org)} <small>(${esc(r.when)})</small></h4>` +
            (r.points ? `<ul>${r.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""),
        )
        .join("");
    case "links":
      return `<ul>${b.items.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join("")}</ul>`;
    case "quote":
      return b.placeholder ? "" : `<blockquote><p>${esc(b.text)}</p><footer>${esc(b.who)}, ${esc(b.role)}</footer></blockquote>`;
  }
}

export function renderStaticContent(): string {
  const highlights = `<ul>${hero.map((h) => `<li><strong>${esc(h.n)}</strong> ${esc(h.l)}</li>`).join("")}</ul>`;
  const sections = entries
    .map((e) => `<section aria-labelledby="s-${e.id}"><h2 id="s-${e.id}">${esc(e.title)}</h2>${e.blocks.map(block).join("")}</section>`)
    .join("");
  return (
    `<article id="seo-content" class="sr-only" aria-label="Abhiram Lanka — portfolio in plain text">` +
    `<h1>Abhiram Lanka — Talent Acquisition, Recruitment Operations &amp; Client Partnerships</h1>` +
    `<p>Growth Consultant at OpenHire, based in Visakhapatnam, India. This page is an interactive illustrated office; everything in it is also written out below.</p>` +
    highlights +
    sections +
    `<p><a href="mailto:${EMAIL}">Email ${EMAIL}</a> · <a href="${RESUME_HREF}">Download résumé (PDF)</a></p>` +
    `</article>`
  );
}
