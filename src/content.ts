export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "stats"; items: { n: string; l: string }[] }
  | { t: "list"; items: string[] }
  | { t: "tags"; items: string[] }
  | { t: "roles"; items: { role: string; org: string; when: string; points?: string[] }[] }
  | { t: "links"; items: { label: string; href: string }[] }
  | { t: "logos"; items: { name: string }[] }
  // placeholder quotes only render in dev builds, so the live site never shows filler
  | { t: "quote"; text: string; who: string; role: string; placeholder?: boolean };

export interface Entry {
  id: string;
  kicker: string;
  title: string;
  menu: string; // short label for the menu / tooltip
  blocks: Block[];
}

export const entries: Entry[] = [
  {
    id: "about",
    kicker: "Through the window",
    title: "Hi, I'm Abhiram.",
    menu: "About me",
    blocks: [
      {
        t: "p",
        text: "I'm a talent acquisition and recruitment operations professional with close to two years of experience across agency-side recruitment and campus talent partnerships, based in Visakhapatnam.",
      },
      {
        t: "p",
        text: "At OpenHire I manage enterprise client accounts and own delivery end to end — structured screening design, candidate pre-vetting, offer management and onboarding. I was promoted to Growth Consultant in October 2026, after an eight-month operations-focused internship.",
      },
      {
        t: "p",
        text: "My B.Tech in Computer Science Engineering from Andhra University means I can screen engineering and product candidates credibly, not just by keyword.",
      },
      { t: "tags", items: ["Talent Acquisition", "Recruitment Operations", "Client Partnerships", "Technical Screening"] },
    ],
  },
  {
    id: "now",
    kicker: "On the desk",
    title: "Right now",
    menu: "Right now",
    blocks: [
      {
        t: "p",
        text: "Growth Consultant at OpenHire — owning business development, outreach strategy and client acquisition for the firm's recruitment mandates, while still supporting delivery across active accounts alongside the founder.",
      },
      {
        t: "p",
        text: "What I'm looking for next: a talent acquisition or HR operations role within a large-scale, structured hiring environment.",
      },
      { t: "links", items: [{ label: "Say hello", href: "mailto:lankaabhiram16@gmail.com" }] },
    ],
  },
  {
    id: "results",
    kicker: "On the whiteboard",
    title: "Results, in numbers",
    menu: "Results",
    blocks: [
      { t: "h", text: "OpenHire · Growth Consultant" },
      {
        t: "stats",
        items: [
          { n: "5", l: "enterprise client accounts managed" },
          { n: "2 lakh+", l: "placements delivered" },
          { n: "10+", l: "industries covered with the founder" },
        ],
      },
      {
        t: "list",
        items: [
          "Reduced client hiring turnaround by restructuring sourcing channels and introducing pre-vetted candidate pipelines.",
          "Run the recruiter team's daily requisition flow against a same-day closure SLA.",
        ],
      },
      { t: "h", text: "Earlier · Caarya, Business Development Manager (Internship)" },
      {
        t: "stats",
        items: [
          { n: "35%", l: "pipeline conversion rate, campus partnership channel" },
          { n: "50%", l: "increase in partner onboarding" },
        ],
      },
      {
        t: "quote",
        text: "Replace this with one or two lines from your founder or a client about working with you.",
        who: "Name Surname",
        role: "Title, Company",
        placeholder: true,
      },
    ],
  },
  {
    id: "clients",
    kicker: "In the rolodex",
    title: "Accounts I've worked with",
    menu: "Clients",
    blocks: [
      { t: "p", text: "Enterprise client accounts spanning EdTech, BPO and SaaS, managed at OpenHire:" },
      // drop logo files into src/assets/logos/ named after the client (e.g. nxtwave.svg); the name is shown until then
      { t: "logos", items: [{ name: "NxtWave" }, { name: "Alorica" }, { name: "Transcom" }, { name: "Scaler" }, { name: "Codingal" }] },
      {
        t: "p",
        text: "Roles I've owned from requirement intake through to offer closure: International Sales, Field Operations and SaaS Business Development. Niche pipelines built for EdTech and waste management.",
      },
    ],
  },
  {
    id: "experience",
    kicker: "On the laptop",
    title: "Where I've worked",
    menu: "Experience",
    blocks: [
      {
        t: "roles",
        items: [
          {
            role: "Growth Consultant",
            org: "OpenHire",
            when: "Oct 2026 – Present",
            points: [
              "Moved from an internship-track operations role into a full-time position.",
              "Own business development, outreach strategy and client acquisition for the firm's recruitment mandates.",
              "Continue to support delivery operations across active client accounts alongside the founder.",
            ],
          },
          {
            role: "Growth & Operations Manager (Internship)",
            org: "OpenHire",
            when: "Feb 2026 – Oct 2026",
            points: [
              "Managed enterprise accounts across EdTech, BPO and SaaS, partnering with the founder to expand delivery across 10+ industries.",
              "Owned recruitment delivery for International Sales, Field Operations and SaaS BD roles, from intake to offer closure.",
              "Hired and onboarded OpenHire's own recruitment interns end to end — offer documentation, contract terms, joining coordination and pre-joining follow-through.",
              "Built candidate sourcing workflows for EdTech and SaaS client requirements.",
            ],
          },
          {
            role: "Community Relations Lead",
            org: "codeIAM Club, Andhra University",
            when: "Apr 2025 – May 2026",
            points: ["Led inter-club collaboration initiatives and community engagement."],
          },
          {
            role: "Business Development Manager (Internship)",
            org: "Caarya",
            when: "Jan 2025 – Dec 2025",
            points: [
              "Built and managed the campus partnership channel with universities and student bodies, creating a recruitment pipeline for partner organisations.",
              "35% pipeline conversion and a 50% increase in partner onboarding.",
              "Created TISA, an employer-branding interview series.",
            ],
          },
          {
            role: "Cybersecurity Chapter Lead",
            org: "codeIAM Club, Andhra University",
            when: "Apr 2024 – Mar 2025",
            points: ["Led the chapter; organised student summits and the Codeiam Spark Nation Hackathon."],
          },
          {
            role: "Cybersecurity Intern",
            org: "Techno Hacks",
            when: "Jul 2024 – Aug 2024",
          },
          {
            role: "Software Testing Intern",
            org: "IIT Bhubaneswar",
            when: "May 2024 – Jul 2024",
          },
        ],
      },
    ],
  },
  {
    id: "screening",
    kicker: "Case study",
    title: "Designing the screen",
    menu: "Case: Screening",
    blocks: [
      {
        t: "p",
        text: "High-intensity sales roles are easy to over-sell in an interview and hard to screen consistently across a team.",
      },
      {
        t: "p",
        text: "I designed the structured screening instruments the whole recruitment team uses: role-specific interview guides and call scripts that assess target attainment, conversion performance, objection handling and pipeline discipline.",
      },
      { t: "tags", items: ["Structured interviews", "Competency-based assessment", "Pre-vetting"] },
    ],
  },
  {
    id: "turnaround",
    kicker: "Case study",
    title: "Cutting turnaround",
    menu: "Case: Turnaround",
    blocks: [
      {
        t: "p",
        text: "Clients in niche sectors wait the longest, because every requisition starts from zero.",
      },
      {
        t: "stats",
        items: [{ n: "48 hrs", l: "pre-vetted pipeline turnaround" }],
      },
      {
        t: "list",
        items: [
          "Restructured sourcing channels and introduced pre-vetted candidate pipelines for niche sectors such as EdTech and waste management.",
          "Manage the team's daily requisition flow across job portals and direct sourcing, to a same-day closure SLA.",
          "Escalate client-side delays rather than absorb them.",
        ],
      },
      { t: "p", text: "Result: reduced client hiring turnaround time, with a 48-hour pre-vetted pipeline turnaround." },
    ],
  },
  {
    id: "campus",
    kicker: "Case study",
    title: "Building a campus channel",
    menu: "Case: Campus channel",
    blocks: [
      {
        t: "p",
        text: "At Caarya I built and managed the campus partnership channel from scratch, establishing institutional relationships with universities and student bodies to create a recruitment pipeline for partner organisations.",
      },
      {
        t: "stats",
        items: [
          { n: "35%", l: "pipeline conversion rate" },
          { n: "50%", l: "increase in partner onboarding" },
        ],
      },
      { t: "p", text: "Through structured outreach and account management." },
    ],
  },
  {
    id: "tisa",
    kicker: "Case study",
    title: "TISA — The Indian Startup Alphabet",
    menu: "Case: TISA",
    blocks: [
      {
        t: "p",
        text: "An employer-branding interview series I created at Caarya, documenting partner organisations' employee value propositions.",
      },
      {
        t: "p",
        text: "I authored the interview framework, covering three things candidates actually ask about: hiring philosophy, ideal candidate profile and workplace culture.",
      },
    ],
  },
  {
    id: "education",
    kicker: "On the wall",
    title: "Education & certificates",
    menu: "Education",
    blocks: [
      {
        t: "roles",
        items: [
          {
            role: "B.Tech, Computer Science Engineering",
            org: "Andhra University College of Engineering, Visakhapatnam",
            when: "2022 – 2026",
          },
          {
            role: "Higher Secondary School (MPC)",
            org: "St. Xavier International School, Bhubaneswar",
            when: "2020 – 2022",
          },
        ],
      },
      {
        t: "list",
        items: [
          "Foundations of Cybersecurity — Google · Coursera, May 2026",
          "Business Ethics — NPTEL · IIT, Apr 2026",
          "REMAC+ — Udemy, 2024",
        ],
      },
    ],
  },
  {
    id: "achievements",
    kicker: "On the shelf",
    title: "Achievements & leadership",
    menu: "Achievements",
    blocks: [
      {
        t: "list",
        items: [
          "1st Prize — ABVP Event, Andhra University, 2024",
          "Cybersecurity Chapter Lead, codeIAM Club — student summits and security workshops",
          "Organising Committee Member, Codeiam Spark Nation Hackathon",
          "Creator & maintainer of AgentSentry, an open-source security scanner",
          "Attendee, BSides Vizag 2025 Cybersecurity Conference",
          "Participant, 43rd State Conference (2025), Andhra University",
        ],
      },
    ],
  },
  {
    id: "sidequests",
    kicker: "In the corner",
    title: "The technical side quest",
    menu: "Side projects",
    blocks: [
      {
        t: "p",
        text: "Before recruitment, I was building and breaking software. It's why I can hold a real conversation with an engineering hiring manager.",
      },
      {
        t: "roles",
        items: [
          {
            role: "AgentSentry",
            org: "Open-source scanner for non-human identities and AI agents",
            when: "Python · AWS · NetworkX",
            points: [
              "Finds identities nobody owns — service roles, stale API keys, autonomous AI agents — and ranks them by what an attacker could reach.",
              "Enriches findings against 1,610 CISA Known Exploited Vulnerabilities.",
            ],
          },
          {
            role: "CityBus Live",
            org: "Real-time bus tracking using drivers' own smartphones",
            when: "Research paper · Flask · WebSocket",
            points: [
              "Live on 4 Visakhapatnam routes; saves ₹15,000 of GPS hardware per vehicle.",
              "287 ms average latency, 500+ concurrent sessions. First author of the IEEE-format paper.",
            ],
          },
          {
            role: "LeadFinder",
            org: "Standalone lead-scraping tool for sales prospecting",
            when: "Python · SerpAPI",
          },
        ],
      },
      {
        t: "links",
        items: [
          { label: "AgentSentry on GitHub", href: "https://github.com/Abhiram-ops/agent-sentry" },
          { label: "All repositories", href: "https://github.com/Abhiram-ops" },
        ],
      },
    ],
  },
  {
    id: "contact",
    kicker: "On the phone",
    title: "Say hello",
    menu: "Contact",
    blocks: [
      { t: "p", text: "Based in Visakhapatnam, Andhra Pradesh. Open to talent acquisition and HR operations roles." },
      {
        t: "links",
        items: [
          { label: "lankaabhiram16@gmail.com", href: "mailto:lankaabhiram16@gmail.com" },
          { label: "9556925563", href: "tel:+919556925563" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/abhiram-lanka-1696a5306/" },
          { label: "GitHub", href: "https://github.com/Abhiram-ops" },
        ],
      },
    ],
  },
  {
    id: "resume",
    kicker: "On the desk",
    title: "Résumé",
    menu: "Résumé",
    blocks: [
      { t: "p", text: "The full story on one page — three, to be honest." },
      { t: "links", items: [{ label: "Download résumé (PDF)", href: "./Abhiram_Lanka_Resume.pdf" }] },
    ],
  },
];

export const byId = Object.fromEntries(entries.map((e) => [e.id, e])) as Record<string, Entry>;
// The lamp is discoverable too, but it toggles the light instead of opening a panel.
// Headline proof points shown on the landing view (no clicks needed).
export const hero = [
  { org: "OpenHire", role: "Growth Consultant", items: [{ n: "5", l: "enterprise client accounts" }, { n: "2 lakh+", l: "placements delivered" }] },
  { org: "Earlier · Caarya", role: "BD Manager (Internship)", items: [{ n: "35%", l: "pipeline conversion" }, { n: "50%", l: "increase in partner onboarding" }] },
];

export const EMAIL = "lankaabhiram16@gmail.com";
export const RESUME_HREF = "./Abhiram_Lanka_Resume.pdf";

export const TOTAL = entries.length + 1;
