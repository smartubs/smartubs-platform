// js/utils/icons.js
// Ícones SVG reutilizados pela interface. Centralizados aqui para evitar
// duplicação de markup dentro dos módulos de página.

export const icons = {
  logo: '<path d="M12 3v18M4 8l8-5 8 5M4 8v10a1 1 0 0 0 1 1h4v-6h6v6h4a1 1 0 0 0 1-1V8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  check: '<path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  close: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  arrowRight: '<path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  arrowLeft: '<path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  reception: '<path d="M3 21V9l9-6 9 6v12M9 21v-6h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  professional: '<path d="M12 3l7 3.5v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9v-5L12 3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.5 12l1.8 1.8L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  manager: '<path d="M4 19V10M10 19V5M16 19v-7M22 19H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  admin: '<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.35a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.65 15a1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.65 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.65a1.7 1.7 0 0 0 1.04-1.56V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.35 9a1.7 1.7 0 0 0 1.56 1.04H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.56 1.04z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  home: '<path d="M9 21V13h6v8M4 10l8-7 8 7v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  plus: '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>',
  empty: '<path d="M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="1.6"/>',
  users: '<circle cx="9" cy="8" r="3.2" stroke="currentColor" stroke-width="2"/><path d="M2.5 20c.6-3.6 3.3-6 6.5-6s5.9 2.4 6.5 6M16 8.5a3 3 0 1 0 0-6M21.5 20c-.4-2.6-1.8-4.6-3.8-5.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  clock: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3.5 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  stopwatch: '<circle cx="12" cy="13" r="8" stroke="currentColor" stroke-width="2"/><path d="M12 9v4l2.5 1.5M9 2h6M12 2v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  queue: '<path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  alertTriangle: '<path d="M12 9v4M12 17h.01M10.3 3.9L2.7 18a1.8 1.8 0 0 0 1.6 2.7h15.4a1.8 1.8 0 0 0 1.6-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  info: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v5M12 16h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  gauge: '<path d="M4.9 19a9 9 0 1 1 14.2 0M12 13l3-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  trend: '<path d="M3 17l6-6 4 4 8-8M21 7v6h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  trendUp: '<path d="M6 18L18 6M9 6h9v9" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
  trendDown: '<path d="M18 6L6 18M15 18H6V9" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
  building: '<path d="M4 21V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15M4 21h16M12 21V11a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v10M7 8h.01M7 12h.01M7 16h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  report: '<path d="M4 4h16v16H4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8 9h8M8 13h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',

  // ícones da avaliação inicial
  thermo: '<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  head: '<circle cx="12" cy="9" r="6" stroke="currentColor" stroke-width="2"/><path d="M9 21v-3M15 21v-3M12 15v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  body: '<circle cx="12" cy="5" r="2.5" stroke="currentColor" stroke-width="2"/><path d="M12 8v13M8 12h8M9 21l-1.5-6M15 21l1.5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  lungs: '<path d="M12 3v9M9 12c-2 0-4 1.5-4 5s1 5 3 5 2-2 2-4v-6zM15 12c2 0 4 1.5 4 5s-1 5-3 5-2-2-2-4v-6z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  throat: '<circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/><path d="M9 12v3a3 3 0 0 0 6 0v-3M12 19v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  breath: '<path d="M6 12a6 6 0 1 1 6 6M6 12H3M6 12l-2 2M6 12l-2-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  nausea: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M8 15s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  vomit: '<circle cx="12" cy="8" r="5" stroke="currentColor" stroke-width="2"/><path d="M9 20c0-3 1-5 3-5s3 2 3 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  diarrhea: '<path d="M12 3a4 4 0 0 1 4 4c0 2-4 5-4 5s-4-3-4-5a4 4 0 0 1 4-4zM7 21a5 5 0 0 1 10 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" stroke-width="2"/><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  chronic: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  pill: '<rect x="3" y="9" width="18" height="6" rx="3" stroke="currentColor" stroke-width="2" transform="rotate(-45 12 12)"/><path d="M9 9l6 6" stroke="currentColor" stroke-width="2"/>',
  allergy: '<path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>',
  note: '<path d="M4 4h16v16H4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8 9h8M8 13h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
};

export function svg(name, extra = ''){
  return `<svg viewBox="0 0 24 24" fill="none" ${extra}>${icons[name] || icons.note}</svg>`;
}
