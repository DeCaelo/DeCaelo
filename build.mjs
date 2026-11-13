// Génère les SVG du README de profil GitHub, sans aucune dépendance.
// Usage : node build.mjs  (depuis la racine du repo DeCaelo/DeCaelo)
//
// Les polices sont embarquées en base64 : un SVG chargé en <img> n'a pas le
// droit d'aller chercher une police externe, mais accepte une data: URI.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const YEAR = new Date().getFullYear();
const CAREER_START = 2016;

const font = (file) => readFileSync(new URL(`./fonts/${file}`, import.meta.url)).toString('base64');
const FONTS = `
  @font-face { font-family: N; src: url(data:font/ttf;base64,${font('Newsreader-SemiBold.ttf')}); }
  @font-face { font-family: M; src: url(data:font/ttf;base64,${font('RedHatMono-Regular.ttf')}); }`;

// Palette « encre & laiton » — mêmes rôles que src/styles/themes.css.
const THEMES = {
  light: { bg: '#efeae0', ink: '#161410', soft: '#3a362e', muted: '#6a6455', accent: '#856012', line: 'rgba(22,20,16,.16)' },
  dark:  { bg: '#13110c', ink: '#efeae0', soft: '#cfc8b8', muted: '#a39c8b', accent: '#c9a24e', line: 'rgba(239,234,224,.14)' },
};

// Même courbe que --ease-fx : départ franc, longue décélération.
const MOTION = `
  .r { opacity: 0; animation: up 1.3s cubic-bezier(.43,.195,.02,1) forwards; }
  @keyframes up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
  @media (prefers-reduced-motion: reduce) { .r { animation: none; opacity: 1; } }`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const svg = (w, h, t, body, label) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">
<style>${FONTS}${MOTION}
  .serif { font-family: N, Georgia, serif; fill: ${t.ink}; }
  .mono { font-family: M, ui-monospace, Menlo, monospace; text-transform: uppercase; letter-spacing: .1em; font-size: 13px; fill: ${t.muted}; }
  .accent { fill: ${t.accent}; }
</style>
<rect width="100%" height="100%" rx="5" fill="${t.bg}"/>
${body}
</svg>`;

const eyebrow = (x, y, text, t, cls = '') =>
  `<g class="${cls}"><circle cx="${x + 3}" cy="${y - 4.5}" r="3" fill="${t.accent}"/><text x="${x + 16}" y="${y}" class="mono">${esc(text)}</text></g>`;

// ---- En-tête : reprend le hero du site --------------------------------
const header = (t) => svg(1200, 460, t, `
  <text x="48" y="58" class="serif" font-size="22">L.C</text>
  <text x="1152" y="58" class="mono" text-anchor="end">Amiens, FR</text>
  <line x1="48" x2="1152" y1="84" y2="84" stroke="${t.line}"/>

  ${eyebrow(48, 136, 'Développeur Full Stack — Ruby · JavaScript · Rust', t, 'r')}

  <text x="40" y="262" class="serif r" font-size="132" letter-spacing="-3" style="animation-delay:.1s">Ludovic</text>
  <text x="250" y="380" class="serif r" font-size="132" letter-spacing="-3" style="animation-delay:.22s">Cleuet</text>

  <g class="r" style="animation-delay:.5s">
    <text x="860" y="196" class="serif" font-size="21" fill="${t.soft}" style="fill:${t.soft}">Des architectures propres</text>
    <text x="860" y="224" class="serif" font-size="21" style="fill:${t.soft}">pour des produits ambitieux.</text>
    <text x="860" y="262" class="mono">( ${CAREER_START} — ${YEAR} )</text>
  </g>

  <line x1="48" x2="1152" y1="420" y2="420" stroke="${t.line}"/>
  <g class="r" style="animation-delay:.66s">${eyebrow(48, 446, `Ouvert aux missions — ${YEAR}`, t)}</g>
  <text x="1152" y="446" class="mono" text-anchor="end">ludoviccleuet.com</text>
`, `Ludovic Cleuet — Développeur Full Stack Ruby, JavaScript & Rust à Amiens`);

// ---- Stack : reprend src/components/Stack.astro -----------------------
const ROWS = [
  ['Langages', 'Ruby · JavaScript · TypeScript · Rust · SQL'],
  ['Backend', 'Rails · Falcon · Actix · Tokio · Node.js · Python'],
  ['Frontend', 'React · React Native · GraphQL / Relay · TailwindCSS'],
  ['Architecture', 'DDD · CQRS · Event Sourcing · REST · FHIR'],
  ['Tests', 'RSpec · Vitest · Jest · Cypress · TDD'],
  ['Infra', 'Docker · Kubernetes · CI/CD · Heroku'],
];
const stack = (t) => {
  const top = 92, row = 58;
  const rows = ROWS.map(([k, v], i) => {
    const y = top + i * row;
    return `<g class="r" style="animation-delay:${0.08 * i}s">
    <line x1="48" x2="1152" y1="${y}" y2="${y}" stroke="${t.line}"/>
    <text x="48" y="${y + 36}" class="mono">${esc(k)}</text>
    <text x="300" y="${y + 37}" class="serif" font-size="23">${esc(v)}</text></g>`;
  }).join('\n');
  return svg(1200, top + ROWS.length * row + 40, t, `
  ${eyebrow(48, 56, 'Stack', t)}
  ${rows}
  <line x1="48" x2="1152" y1="${top + ROWS.length * row}" y2="${top + ROWS.length * row}" stroke="${t.line}"/>`,
  ROWS.map(([k, v]) => `${k} : ${v}`).join('. '));
};

// ---- Contact : reprend le bloc sombre du pied de page ------------------
// Toujours sombre, comme sur le site, quel que soit le thème GitHub.
const contact = () => {
  const t = THEMES.dark;
  return svg(1200, 330, t, `
  <defs><radialGradient id="g" cx="50%" cy="0%" r="80%"><stop offset="0" stop-color="#211b12"/><stop offset="1" stop-color="${t.bg}"/></radialGradient></defs>
  <rect width="100%" height="100%" rx="5" fill="url(#g)"/>
  ${eyebrow(48, 64, 'Pas de formulaire, juste un mail', t)}
  <text x="44" y="166" class="serif r" font-size="68" letter-spacing="-1">CONSTRUISONS <tspan font-style="italic" class="accent" style="fill:${t.accent}">quelque chose</tspan></text>
  <text x="44" y="240" class="serif r" font-size="68" letter-spacing="-1" style="animation-delay:.12s">DE SOLIDE</text>
  <text x="48" y="304" class="mono">©${YEAR} Ludovic Cleuet</text>
  <text x="1152" y="304" class="mono" text-anchor="end">Amiens, Hauts-de-France</text>
`, 'Construisons quelque chose de solide');
};

mkdirSync(new URL('./assets/', import.meta.url), { recursive: true });
const out = (name, content) => writeFileSync(new URL(`./assets/${name}`, import.meta.url), content);
for (const [mode, t] of Object.entries(THEMES)) {
  out(`header-${mode}.svg`, header(t));
  out(`stack-${mode}.svg`, stack(t));
}
out('contact.svg', contact());
console.log('SVG générés dans assets/');
