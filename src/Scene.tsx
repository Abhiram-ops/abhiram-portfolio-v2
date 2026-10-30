import { createContext, memo, useContext, type ReactNode, type KeyboardEvent } from "react";

interface Ctx {
  seen: Set<string>;
  hinting: boolean;
  onOpen: (id: string) => void;
  onTip: (label: string | null) => void;
  labels: Record<string, string>;
  compact: boolean; // phone layout: crop the empty wall/rug so the whole room fits the width
}
const SceneCtx = createContext<Ctx>(null as unknown as Ctx);

function Obj({ id, children }: { id: string; children: ReactNode }) {
  const { seen, hinting, onOpen, onTip, labels } = useContext(SceneCtx);
  const label = labels[id];
  const act = () => onOpen(id);
  const key = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      act();
    }
  };
  return (
    <g
      className={`obj${seen.has(id) ? " seen" : ""}${hinting && !seen.has(id) ? " hint" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={act}
      onKeyDown={key}
      onMouseEnter={() => onTip(label)}
      onMouseLeave={() => onTip(null)}
      onFocus={() => onTip(label)}
      onBlur={() => onTip(null)}
    >
      {children}
    </g>
  );
}

function Book({ id, x, h, fill, band }: { id: string; x: number; h: number; fill: string; band: string }) {
  return (
    <Obj id={id}>
      <rect x={x} y={470 - h} width="34" height={h} rx="3" fill={fill} />
      <rect x={x} y={470 - h + 18} width="34" height="6" fill={band} />
      <rect x={x} y={470 - h + h - 26} width="34" height="3" fill={band} opacity=".7" />
      <rect x={x - 6} y={470 - h - 6} width="46" height={h + 12} fill="transparent" />
    </Obj>
  );
}

export const Scene = memo(function Scene(props: Ctx) {
  return (
    <SceneCtx.Provider value={props}>
      <Art />
    </SceneCtx.Provider>
  );
});

function Art() {
  const { seen, compact } = useContext(SceneCtx);
  return (
    <svg className="scene" viewBox={compact ? "20 40 1160 530" : "0 0 1200 700"} preserveAspectRatio="xMidYMax meet" role="img" aria-label="An illustrated office. Click objects to explore.">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--sky-a)" />
          <stop offset="1" stopColor="var(--sky-b)" />
        </linearGradient>
        <radialGradient id="glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="var(--glow)" stopOpacity=".55" />
          <stop offset="1" stopColor="var(--glow)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* room */}
      <rect x="-2400" y="-2400" width="6000" height="2948" fill="var(--wall)" />
      <rect x="-2400" y="548" width="6000" height="1400" fill="var(--floor)" />
      <rect x="-2400" y="540" width="6000" height="12" fill="var(--base)" />
      <ellipse cx="600" cy="640" rx="360" ry="34" fill="var(--rug)" opacity=".85" />
      <ellipse cx="600" cy="640" rx="320" ry="26" fill="none" stroke="var(--paper)" strokeOpacity=".35" strokeWidth="3" strokeDasharray="10 10" />

      {/* window → about */}
      <Obj id="about">
        <rect x="58" y="62" width="250" height="262" rx="8" fill="var(--frame)" />
        <rect x="72" y="76" width="222" height="234" rx="3" fill="url(#sky)" />
        <circle cx="236" cy="130" r="22" fill="var(--sun)" />
        <g fill="var(--city)">
          <rect x="72" y="238" width="34" height="72" />
          <rect x="108" y="212" width="40" height="98" />
          <rect x="150" y="250" width="28" height="60" />
          <rect x="180" y="224" width="44" height="86" />
          <rect x="226" y="256" width="30" height="54" />
          <rect x="258" y="232" width="36" height="78" />
        </g>
        <g fill="var(--window-lit)" opacity=".85">
          <rect x="116" y="224" width="6" height="8" /><rect x="128" y="240" width="6" height="8" />
          <rect x="190" y="236" width="6" height="8" /><rect x="204" y="252" width="6" height="8" />
          <rect x="268" y="246" width="6" height="8" />
        </g>
        <rect x="179" y="76" width="6" height="234" fill="var(--frame)" />
        <rect x="72" y="188" width="222" height="6" fill="var(--frame)" />
        <rect x="50" y="322" width="266" height="12" rx="3" fill="var(--frame)" />
      </Obj>

      {/* whiteboard → results */}
      <Obj id="results">
        <rect x="340" y="58" width="390" height="250" rx="6" fill="var(--frame-dark)" />
        <rect x="350" y="68" width="370" height="230" rx="3" fill="var(--paper)" />
        <text x="372" y="108" className="hand" fontSize="30" fill="var(--accent)">THIS YEAR →</text>
        <text x="372" y="190" className="hand" fontSize="76" fill="var(--ink)">35%</text>
        <text x="372" y="226" className="hand" fontSize="22" fill="var(--ink-soft)">pipeline conversion</text>
        <text x="372" y="272" className="hand" fontSize="22" fill="var(--ink-soft)">+50% partner onboarding</text>
        <g stroke="var(--sage)" strokeWidth="8" strokeLinecap="round">
          <line x1="560" y1="268" x2="560" y2="240" />
          <line x1="590" y1="268" x2="590" y2="214" />
          <line x1="620" y1="268" x2="620" y2="186" />
          <line x1="650" y1="268" x2="650" y2="150" />
          <line x1="680" y1="268" x2="680" y2="112" />
        </g>
        <path d="M556 232 L596 206 L628 176 L660 140 L690 100" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="6 6" />
        <rect x="350" y="296" width="370" height="10" fill="var(--frame-dark)" />
        <rect x="380" y="290" width="38" height="8" rx="3" fill="var(--accent)" />
        <rect x="428" y="290" width="38" height="8" rx="3" fill="var(--sage)" />
      </Obj>

      {/* certificates → education */}
      <Obj id="education">
        <rect x="770" y="86" width="82" height="108" fill="var(--frame)" />
        <rect x="778" y="94" width="66" height="92" fill="var(--paper)" />
        <g stroke="var(--ink-soft)" strokeWidth="2" opacity=".6"><line x1="788" y1="114" x2="834" y2="114" /><line x1="788" y1="126" x2="834" y2="126" /><line x1="788" y1="138" x2="824" y2="138" /></g>
        <circle cx="811" cy="164" r="12" fill="var(--accent)" />
        <rect x="866" y="106" width="64" height="84" fill="var(--frame)" />
        <rect x="873" y="113" width="50" height="70" fill="var(--paper)" />
        <g stroke="var(--ink-soft)" strokeWidth="2" opacity=".6"><line x1="881" y1="130" x2="915" y2="130" /><line x1="881" y1="142" x2="915" y2="142" /></g>
        <circle cx="898" cy="164" r="9" fill="var(--mustard)" />
      </Obj>

      {/* wall shelf + trophy → achievements */}
      <rect x="770" y="258" width="160" height="10" rx="2" fill="var(--wood)" />
      <Obj id="achievements">
        <rect x="790" y="226" width="34" height="8" fill="var(--mustard)" />
        <rect x="802" y="212" width="10" height="16" fill="var(--mustard)" />
        <path d="M788 176 h38 v18 a19 19 0 0 1 -38 0 z" fill="var(--mustard)" />
        <path d="M788 182 h-10 a8 10 0 0 0 10 16 M826 182 h10 a8 10 0 0 1 -10 16" fill="none" stroke="var(--mustard)" strokeWidth="4" />
        <rect x="780" y="168" width="64" height="100" fill="transparent" />
      </Obj>
      <g>
        <rect x="868" y="238" width="30" height="20" rx="3" fill="var(--accent)" />
        <path d="M883 238 c-16 -18 -22 -34 -4 -40 c4 8 8 8 10 0 c14 6 10 26 -6 40" fill="var(--sage)" />
      </g>

      {/* credenza + monitor → side projects */}
      <rect x="58" y="420" width="222" height="124" rx="4" fill="var(--wood)" />
      <rect x="70" y="432" width="96" height="52" rx="2" fill="var(--wood-dark)" />
      <rect x="172" y="432" width="96" height="52" rx="2" fill="var(--wood-dark)" />
      <circle cx="118" cy="458" r="4" fill="var(--mustard)" /><circle cx="220" cy="458" r="4" fill="var(--mustard)" />
      <Obj id="sidequests">
        <rect x="84" y="330" width="130" height="86" rx="6" fill="var(--frame-dark)" />
        <rect x="92" y="338" width="114" height="64" rx="2" fill="#12201c" />
        <text x="100" y="360" fontFamily="monospace" fontSize="11" fill="#7be0a9">$ nhi-audit scan</text>
        <text x="100" y="376" fontFamily="monospace" fontSize="11" fill="#7be0a9" opacity=".75">2 critical findings</text>
        <rect x="100" y="384" width="7" height="11" fill="#7be0a9" className="blink" />
        <rect x="140" y="414" width="22" height="8" fill="var(--frame-dark)" />
        <rect x="120" y="420" width="62" height="6" rx="3" fill="var(--frame-dark)" />
      </Obj>
      <rect x="226" y="396" width="26" height="22" rx="3" fill="var(--accent)" opacity=".9" />
      <path d="M239 396 c-12 -14 -16 -28 -2 -32 c3 6 6 6 8 0 c10 4 8 20 -4 32" fill="var(--sage)" />

      {/* bookshelf → case studies */}
      <rect x="930" y="50" width="226" height="500" rx="4" fill="var(--shelf)" />
      <rect x="944" y="64" width="198" height="472" fill="var(--shelf-in)" />
      <g fill="var(--shelf)">
        <rect x="944" y="176" width="198" height="10" />
        <rect x="944" y="316" width="198" height="10" />
        <rect x="944" y="456" width="198" height="10" />
      </g>
      {/* decorative books */}
      <g>
        <rect x="954" y="104" width="16" height="72" fill="var(--sage)" /><rect x="972" y="94" width="18" height="82" fill="var(--accent)" />
        <rect x="992" y="110" width="14" height="66" fill="var(--paper)" /><rect x="1008" y="100" width="20" height="76" fill="var(--blue)" />
        <rect x="1040" y="130" width="60" height="46" rx="3" fill="var(--mustard)" opacity=".8" />
        <rect x="954" y="244" width="22" height="72" fill="var(--blue)" /><rect x="978" y="256" width="16" height="60" fill="var(--mustard)" />
        <rect x="1070" y="250" width="24" height="66" fill="var(--sage)" /><rect x="1096" y="238" width="30" height="78" fill="var(--accent)" />
        <rect x="954" y="386" width="64" height="70" rx="3" fill="var(--paper)" opacity=".9" />
        <circle cx="1090" cy="428" r="26" fill="var(--blue)" opacity=".85" /><rect x="1086" y="450" width="8" height="6" fill="var(--blue)" />
      </g>
      {/* case-study books sit on the 3rd shelf (baseline y=316) */}
      <g transform="translate(0,-154)">
        <Book id="screening" x={994} h={96} fill="var(--accent)" band="var(--paper)" />
        <Book id="turnaround" x={1032} h={110} fill="var(--blue)" band="var(--mustard)" />
        <Book id="campus" x={1070} h={90} fill="var(--sage)" band="var(--paper)" />
        <Book id="tisa" x={1108} h={104} fill="var(--mustard)" band="var(--ink)" />
      </g>

      {/* desk */}
      <rect x="304" y="452" width="580" height="22" rx="4" fill="var(--wood)" />
      <rect x="320" y="474" width="14" height="74" fill="var(--wood-dark)" />
      <rect x="854" y="474" width="14" height="74" fill="var(--wood-dark)" />
      <rect x="340" y="474" width="512" height="44" rx="2" fill="var(--wood-dark)" opacity=".85" />
      <ellipse cx="600" cy="560" rx="150" ry="10" fill="#000" opacity=".12" />

      {/* mug → right now */}
      <Obj id="now">
        <rect x="322" y="424" width="30" height="28" rx="4" fill="var(--paper)" />
        <path d="M352 430 q14 0 14 10 t-14 10" fill="none" stroke="var(--paper)" strokeWidth="5" />
        <rect x="322" y="424" width="30" height="7" rx="3" fill="var(--accent)" />
        <path d="M330 412 q-4 -8 2 -12 M342 412 q-4 -8 2 -12" fill="none" stroke="var(--ink-soft)" strokeWidth="2" opacity=".5" className="steam" />
        <rect x="316" y="396" width="56" height="60" fill="transparent" />
      </Obj>

      {/* laptop → experience */}
      <Obj id="experience">
        <rect x="400" y="446" width="156" height="8" rx="3" fill="var(--frame-dark)" />
        <rect x="414" y="364" width="128" height="84" rx="5" fill="var(--frame-dark)" />
        <rect x="421" y="371" width="114" height="70" rx="2" fill="var(--paper)" />
        <g fill="var(--accent)"><rect x="428" y="380" width="44" height="6" rx="2" /></g>
        <g fill="var(--ink-soft)" opacity=".55">
          <rect x="428" y="394" width="98" height="4" rx="2" /><rect x="428" y="404" width="80" height="4" rx="2" /><rect x="428" y="414" width="90" height="4" rx="2" />
        </g>
        <circle cx="518" cy="384" r="5" fill="var(--sage)" />
      </Obj>

      {/* rolodex → clients */}
      <Obj id="clients">
        <rect x="590" y="436" width="62" height="16" rx="4" fill="var(--frame-dark)" />
        <g>
          <rect x="598" y="404" width="46" height="34" rx="2" fill="var(--paper)" transform="rotate(-18 621 438)" />
          <rect x="598" y="404" width="46" height="34" rx="2" fill="var(--mustard)" transform="rotate(-4 621 438)" />
          <rect x="598" y="404" width="46" height="34" rx="2" fill="var(--paper)" transform="rotate(10 621 438)" />
        </g>
        <rect x="582" y="396" width="80" height="60" fill="transparent" />
      </Obj>

      {/* phone → contact */}
      <Obj id="contact">
        <path d="M690 452 q0 -22 22 -22 t22 22 z" fill="var(--accent)" />
        <rect x="682" y="426" width="60" height="9" rx="4.5" fill="var(--accent)" />
        <circle cx="712" cy="446" r="7" fill="var(--wall)" opacity=".5" />
        <rect x="676" y="414" width="72" height="42" fill="transparent" />
      </Obj>

      {/* résumé → download */}
      <Obj id="resume">
        <g transform="translate(-18 0) rotate(-6 800 446)">
          <rect x="766" y="436" width="78" height="14" rx="1" fill="var(--paper)" />
          <rect x="770" y="428" width="70" height="12" rx="1" fill="#fff" opacity=".9" />
          <rect x="776" y="431" width="34" height="3" fill="var(--ink-soft)" opacity=".6" />
        </g>
        <rect x="744" y="420" width="76" height="36" fill="transparent" />
      </Obj>

      {/* lamp → light switch */}
      <Obj id="lamp">
        <circle cx="838" cy="360" r="70" fill="url(#glow)" className="lampglow" />
        {!seen.has("lamp") && <circle cx="846" cy="370" r="30" fill="none" stroke="var(--mustard)" strokeWidth="3" className="cue" />}
        <rect x="826" y="446" width="26" height="8" rx="3" fill="var(--frame-dark)" />
        <path d="M838 446 L826 404 L850 372" fill="none" stroke="var(--frame-dark)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M834 360 L868 356 L858 384 L828 380 z" fill="var(--mustard)" />
        <rect x="824" y="350" width="56" height="106" fill="transparent" />
      </Obj>
    </svg>
  );
}
