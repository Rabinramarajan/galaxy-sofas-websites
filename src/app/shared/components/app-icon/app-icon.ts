import { Component, computed, input } from '@angular/core';

/** Fallback Lucide-style SVG paths used only when Font Awesome has no equivalent. */
export const ICON_PATHS: Record<string, string> = {
  sofa: 'M22 18v-3a2 2 0 0 0-2-2h-1.5v-2.5a4.5 4.5 0 0 0-4.5-4.5h-8A4.5 4.5 0 0 0 1.5 10.5V13H0v5h2v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h14v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h2Z M4 10.5V13h16v-2.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 10.5Z',
  bed: 'M2 4v16 M2 8h18a2 2 0 0 1 2 2v10 M2 17h20 M6 8v9',
  table: 'M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2 M3 9h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z M3 15v2 M6 17v2 M18 17v2 M12 17v2',
  tv: 'M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z M8 21h8 M12 17v4',
  chair: 'M5 7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1Z M5 11v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3 M7 15v5 M17 15v5',
  coffee: 'M4 8h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z M20 12h1a2 2 0 0 1 0 4h-1 M6 8V6a1 1 0 0 1 1-1h3 M10 8V5a1 1 0 0 1 1-1h1 M14 8V6a1 1 0 0 1 1-1h1',
  wardrobe: 'M4 4h16v16H4Z M9 4v16 M15 4v16 M9 9h2 M13 9h2',
  office: 'M3 21h18 M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14 M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2 M9 12h.01 M15 12h.01 M9 16h.01 M15 16h.01',
  home: 'M3 10.5 12 3l9 7.5 M5 9.5V21h14V9.5 M10 21v-6h4v6',
  tree: 'M12 22v-7 M12 15c-3 0-5-2-5-5 0-2 1-3.5 3-4.5A5 5 0 0 1 20 8c0 2-1 4-3 5 M8 22h8',
  hammer: 'M12 3c2 2 2 5 0 7s-5 2-7 0c2-2 5-2 7 0 M7 10 3 14l4 4 4-4 M7 14l9 9 2-2-9-9',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 6v6l4 2',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
  hand: 'M18 11V6a2 2 0 0 0-4 0v5 M14 10V4a2 2 0 0 0-4 0v6 M10 10.5V6a2 2 0 0 0-4 0v8 M7 14v-2a2 2 0 0 0-4 0v5c0 3 2 5 4 5h6c3 0 4-1.5 5-4l1-3.5a2 2 0 0 0-3-2.3L10 15',
  leaf: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12',
  truck: 'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2 M15 18h1a2 2 0 0 0 2-2v-3h2.7a1 1 0 0 0 .8-.4l2-2.7a1 1 0 0 0 .2-.6V8a2 2 0 0 0-2-2h-5 M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  sparkles: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9Z M5 3l.7 1.8L7.5 5.5l-1.8.7L5 8l-.7-1.8L2.5 5.5l1.8-.7Z',
  scissors: 'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M20 4 8.12 15.88 M14.47 14.48 20 20 M8.12 8.12 12 12',
  check: 'M20 6 9 17l-5-5',
  axe: 'm14 12-8.381 8.38a1 1 0 0 1-3.001-3L11 9 M15 15.5a.5.5 0 0 0 .5.5A6.5 6.5 0 0 0 22 9.5a.5.5 0 0 0-.5-.5h-1.672a2 2 0 0 1-1.414-.586l-5.062-5.062a1.205 1.205 0 0 0-1.704 0L9.352 5.648a1.205 1.205 0 0 0 0 1.704l5.062 5.062A2 2 0 0 1 15 13.828z',
  carve: 'M7 21h10 M12 21V10 M12 10c4 0 6-2 6-5V3c-4 0-6 2-6 5v2Z M12 10c-4 0-6-2-6-5V3c4 0 6 2 6 5v2Z',
  star: 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z',
  heart: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z',
  compare: 'M8 3 4 7l4 4 M4 7h16 M16 21l4-4-4-4 M20 17H4',
  search: 'M21 21l-4.35-4.35 M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z',
  cart: 'M6 6h15l-1.5 8.5a2 2 0 0 1-2 1.5H8.7a2 2 0 0 1-2-1.5L5 3H2 M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z M18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z M22 6l-10 7L2 6',
  map: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0 M12 10m-3 0a3 3 0 1 1 6 0a3 3 0 1 1 -6 0Z',
  instagram: 'M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M17.5 6.5h.01',
  facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  youtube: 'M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17 M10 15l5-3-5-3z',
  pinterest: 'M12 2a10 10 0 0 0-3.6 19.3c-.06-.84-.12-2.13.03-3.04l1.27-5.37s-.32-.64-.32-1.58c0-1.48.86-2.58 1.93-2.58.91 0 1.35.68 1.35 1.5 0 .91-.58 2.27-.88 3.53-.25 1.05.53 1.92 1.57 1.92 1.88 0 3.14-2.42 3.14-5.28 0-2.18-1.47-3.81-4.14-3.81-3.02 0-4.9 2.25-4.9 4.76 0 .86.26 1.48.66 1.96.18.22.21.31.14.56l-.22.87c-.07.28-.29.38-.64.23-1.2-.56-1.76-2.06-1.76-3.75 0-2.78 2.34-6.11 6.99-6.11 3.73 0 6.19 2.7 6.19 5.6 0 3.83-2.13 6.7-5.28 6.7-1.06 0-2.05-.57-2.39-1.22l-.65 2.58c-.2.78-.74 1.76-1.1 2.36A10 10 0 1 0 12 2Z',
  twitter: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z',
  arrowRight: 'M5 12h14 M12 5l7 7-7 7',
  arrowUp: 'm5 12 7-7 7 7 M12 19V5',
  arrowDown: 'm5 12 7 7 7-7 M12 5v14',
  chevronDown: 'm6 9 6 6 6-6',
  chevronLeft: 'm15 19-9-7 9-7',
  chevronRight: 'm9 18 6-6-6-6',
  menu: 'M4 6h16 M4 12h16 M4 18h16',
  close: 'M18 6 6 18 M6 6l12 12',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M4.93 19.07l1.41-1.41 M17.66 6.34l1.41-1.41',
  moon: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z',
  whatsapp: 'M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9Z',
  plus: 'M5 12h14 M12 5v14',
  minus: 'M5 12h14',
  ruler: 'M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z M14.5 12.5 12 10 M11.5 15.5 9 13 M8 19l6-6',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  quote: 'M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1Z M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1Z',
  gift: 'M20 12v10H4V12 M2 7h20v5H2z M12 22V7 M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7Z M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7Z',
  wrench: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  palette: 'M12 22a10 10 0 1 1 10-10c0 1.66-1.34 3-3 3h-2a2 2 0 0 0-2 2c0 .83.5 1.5 1 2a2.5 2.5 0 0 1-2 3.5 2.5 2.5 0 0 1-.5-.5 M6 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z M10 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z M15 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  compass: 'm9 15 3-6 3 6-3 2z M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z',
  gem: 'M6 3h12l4 6-10 13L2 9Z M11 3 8 9l4 13 4-13-3-6 M2 9h20',
  crown: 'm2 5 4 8 6-9 6 9 4-8-2 16H4Z M4 19h16',
  medal: 'M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15 M11 12 5.12 2.2 M13 12l5.88-9.8 M8 7h8 M12 18v-2h-.5 M12 17m-5 0a5 5 0 1 1 10 0a5 5 0 1 1 -10 0Z',
  headphones: 'M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3',
  play: 'M6 3 20 12 6 21Z',
  volume: 'M11 5 6 9H2v6h4l5 4z M15.54 8.46a5 5 0 0 1 0 7.07 M19.07 4.93a10 10 0 0 1 0 14.14',
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z',
  layers: 'M12 2 2 7l10 5 10-5-10-5Z M2 17l10 5 10-5 M2 12l10 5 10-5',
  award: 'M15.477 12.89 17 22l-5-3-5 3 1.523-9.11 M16 3h5v5c0 3-2 6-5 7-3-1-5-4-5-7V3h5Z M9 3H4v5c0 3 2 6 5 7',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  badge: 'M4.812 12.94a4.99 4.99 0 0 1 0-1.88L4.5 9.88a1 1 0 0 1 .36-1.1l.9-.63c.16-.11.3-.24.42-.39l.16-.24L7.2 7.22a1 1 0 0 1 .5-.47l.95-.32a1 1 0 0 1 .5-.1l.7-.1a4.07 4.07 0 0 1 .84 0h3.28a1 1 0 0 1 .55.1l1.17.44a1 1 0 0 1 .5.47l.32.95a1 1 0 0 0 .11.2l.7-1.21a1 1 0 0 1 .5-.31l1.13-.12a1 1 0 0 1 .7.28l2.94 2.93a1 1 0 0 1 .28.7L21.21 8.5a1 1 0 0 1-.21.55l-.12.34a4 1 0 0 0 .13.7 5 0 0 1 .48 2.3v1.7a4.98 4.98 0 0 1-.33 1.8l-.1.3a1 1 0 0 1 .04.7L20.95 11.5a1 1 0 0 1-.28.7l-2.2 2.2a1 1 0 0 1-.7.28.5.5 0 0 1-.5 0 .5 1 1 0 0 0-.8 1.2l.05 1.6',
  calendar: 'M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
  tag: 'M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z M7.5 7.5h.01',
  x: 'M18 6 6 18 M6 6l12 12',
  mapPin: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0 M12 12V8.5 M8.5 12H2 M12 8.5A3.5 3.5 0 0 1 12 15.5',
  userCheck: 'M17 21v-2a4 4 0 0 0-3.87-3.97 M9 21v-2a4 4 0 0 1 3.131-3.84 M16 3.13a4 4 0 0 1 0 7.75 M12 21v-2a4 4 0 0 0-4-4m9-14a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z M9 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  'pen-tool': 'M14.7 6.3a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 0 7.94-7.94l-3.76 3.76z',
  'message-square': 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  box: 'M20.59 13.41l-7.72 7.72a2.12 2.12 0 0 1-3 0L4 15.34a2.12 2.12 0 0 1 0-3l7.72-7.72a2.12 2.12 0 0 1 3 0l5.87 5.87a2 2 0 0 1 0 3Z M12 12v8 M8 12h8',
  scale: 'M12 3v18 M19 8l3 8a5 5 0 0 1-6 0zV7 M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1 M5 8l3 8a5 5 0 0 1-6 0zV7 M7 21h10',
  feather: 'M19.14 12.94a7 7 0 1 1-1.41-4.18 7 7 0 0 1 1.41 4.18Z M2 12l9 9 13 13',
  cpu: 'M12 20v2 M12 2v2 M9 16h6V8H9z M2 12h2 M2 17h2 M2 7h2 M20 12h2 M20 17h2 M20 7h2 M7 20v2 M7 2v2 M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
  gauge: 'M12 14l4-4 M3.34 19a10 10 0 1 1 17.32 0',
  droplet: 'M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z',
  repeat: 'm17 2 4 4-4 4 M3 11v-1a4 4 0 0 1 4-4h14 M7 22l-4-4 4-4 M21 13v1a4 4 0 0 1-4 4H3',
  link: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  'align-center': 'M21 6H3 M17 12H7 M19 18H5',
  unlock: 'M12 22h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z M8 12V7a4 4 0 0 1 8 0v5',
  clipboard: 'M9 11h6v6a2 2 0 0 1-6 0v-6Zm12-5h-1V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z',
  brush: 'M15 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M9 21V5a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 2v7 M3 21h18',
  pen: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
  recycle: 'M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5 M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12 M14 16l-3 3 3 3 M8.293 13.596 7.196 9.5 3.1 10.598 M9.344 5.811l1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843 M13.378 9.633l4.096 1.098 1.097-4.096',
  playCircle: 'M6 3 20 12 6 21Z',
  volume2: 'M2 8v8h4l5 4V8L6 4V8Z M15.54 8.46a5 5 0 0 1 0 7.07 M19.07 4.93a10 10 0 0 1 0 14.14',
  user: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2 M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  bot: 'M12 8V4H8 M2 14h2 M20 14h2 M15 13v2 M9 13v2 M4 8h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z',
  send: 'M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z M21.854 2.147l-10.94 10.939',
  loader: 'M21 12a9 9 0 1 1-6.219-8.56',
  'rotate-cw': 'M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8 M21 3v5h-5',
  'rotate-ccw': 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5',
  'user-check': 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7m-4 0a4 4 0 1 1 8 0a4 4 0 1 1 -8 0Z M16 11l2 2 4-4',
  square: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z',
  maximize: 'M8 3H5a2 2 0 0 0-2 2v3 M21 8V5a2 2 0 0 0-2-2h-3 M3 16v3a2 2 0 0 0 2 2h3 M16 21h3a2 2 0 0 0 2-2v-3',
  wine: 'M8 22h8 M7 10h10 M12 15v7 M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z',
  'paw-print': 'M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z M11 4a2 2 0 1 1 4 0 2M18 8a2 2 0 1 1 4 0M20 16a2 2 0 1 1 4 0',
  music: 'M9 18V5l12-2v13 M6 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M18 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  laptop: 'M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.129A1 1 0 0 1 20.38 20H3.62a1 1 0 0 1-.9-1.449L3.788 16.423a2 2 0 0 0 .212-.9V7a2 2 0 0 1 2-2z',
  baby: 'M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5 M15 12h.01 M19.36 6.814A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1 M9 12h.01',
  dumbbell: 'M17.6 12.8a2 2 0 1 0 2.9-2.9l-1.8-1.8a2 2 0 0 0 2.8-2.8L18.6 2.5a2 2 0 0 0-2.8 2.8l-1.8-1.8a2 2 0 1 0-2.8 2.8z M2.5 21.5l1.4-1.4 M20.1 3.9l1.4-1.4 M5.3 21.5a2 2 0 1 0 2.8-2.8l1.8 1.8a2 2 0 1 0 2.8-2.8L6.4 11.3a2 2 0 1 0-2.8 2.8l1.8 1.8a2 2 0 0 0-2.8 2.8z M9.6 14.4l4.8-4.8',
};

/** Font Awesome class map — semantic name -> FA classes. `f` is the family (solid/brands/regular). */
type Family = 'fa-solid' | 'fa-regular' | 'fa-brands';
const FA_MAP: Record<string, { f: Family; c: string }> = {
  sofa: { f: 'fa-solid', c: 'fa-couch'},
  bed: { f: 'fa-solid', c: 'fa-bed'},
  table: { f: 'fa-solid', c: 'fa-table'},
  tv: { f: 'fa-solid', c: 'fa-tv'},
  chair: { f: 'fa-solid', c: 'fa-chair'},
  home: { f: 'fa-solid', c: 'fa-house'},
  tree: { f: 'fa-solid', c: 'fa-tree'},
  hammer: { f: 'fa-solid', c: 'fa-hammer'},
  clock: { f: 'fa-solid', c: 'fa-clock'},
  shield: { f: 'fa-solid', c: 'fa-shield-halved'},
  hand: { f: 'fa-solid', c: 'fa-hand'},
  leaf: { f: 'fa-solid', c: 'fa-leaf'},
  truck: { f: 'fa-solid', c: 'fa-truck'},
  truck2: { f: 'fa-solid', c: 'fa-truck-fast'},
  sparkles: { f: 'fa-solid', c: 'fa-wand-magic-sparkles'},
  scissors: { f: 'fa-solid', c: 'fa-scissors'},
  check: { f: 'fa-solid', c: 'fa-check'},
  'check-circle': { f: 'fa-solid', c: 'fa-circle-check'},
  star: { f: 'fa-solid', c: 'fa-star'},
  heart: { f: 'fa-solid', c: 'fa-heart'},
  compare: { f: 'fa-solid', c: 'fa-scale-balanced'},
  search: { f: 'fa-solid', c: 'fa-magnifying-glass'},
  cart: { f: 'fa-solid', c: 'fa-cart-shopping'},
  phone: { f: 'fa-solid', c: 'fa-phone'},
  mail: { f: 'fa-solid', c: 'fa-envelope'},
  map: { f: 'fa-solid', c: 'fa-location-dot'},
  mapPin: { f: 'fa-solid', c: 'fa-location-pin'},
  instagram: { f: 'fa-brands', c: 'fa-instagram'},
  facebook: { f: 'fa-brands', c: 'fa-facebook'},
  youtube: { f: 'fa-brands', c: 'fa-youtube'},
  pinterest: { f: 'fa-brands', c: 'fa-pinterest'},
  twitter: { f: 'fa-brands', c: 'fa-x-twitter'},
  whatsapp: { f: 'fa-brands', c: 'fa-whatsapp'},
  arrowRight: { f: 'fa-solid', c: 'fa-arrow-right'},
  arrowUp: { f: 'fa-solid', c: 'fa-arrow-up'},
  arrowDown: { f: 'fa-solid', c: 'fa-arrow-down'},
  chevronDown: { f: 'fa-solid', c: 'fa-chevron-down'},
  chevronLeft: { f: 'fa-solid', c: 'fa-chevron-left'},
  chevronRight: { f: 'fa-solid', c: 'fa-chevron-right'},
  menu: { f: 'fa-solid', c: 'fa-bars'},
  close: { f: 'fa-solid', c: 'fa-xmark'},
  x: { f: 'fa-solid', c: 'fa-xmark'},
  sun: { f: 'fa-regular', c: 'fa-sun'},
  moon: { f: 'fa-solid', c: 'fa-moon'},
  plus: { f: 'fa-solid', c: 'fa-plus'},
  minus: { f: 'fa-solid', c: 'fa-minus'},
  ruler: { f: 'fa-solid', c: 'fa-ruler'},
  eye: { f: 'fa-solid', c: 'fa-eye'},
  quote: { f: 'fa-solid', c: 'fa-quote-left'},
  gift: { f: 'fa-solid', c: 'fa-gift'},
  wrench: { f: 'fa-solid', c: 'fa-wrench'},
  palette: { f: 'fa-solid', c: 'fa-palette'},
  gem: { f: 'fa-solid', c: 'fa-gem'},
  crown: { f: 'fa-solid', c: 'fa-crown'},
  medal: { f: 'fa-solid', c: 'fa-medal'},
  headphones: { f: 'fa-solid', c: 'fa-headphones'},
  play: { f: 'fa-solid', c: 'fa-play'},
  volume: { f: 'fa-solid', c: 'fa-volume-high'},
  grid: { f: 'fa-solid', c: 'fa-grid'},
  layers: { f: 'fa-solid', c: 'fa-layers'},
  award: { f: 'fa-solid', c: 'fa-award'},
  users: { f: 'fa-solid', c: 'fa-users'},
  badge: { f: 'fa-solid', c: 'fa-circle-check'},
  calendar: { f: 'fa-solid', c: 'fa-calendar-days'},
  tag: { f: 'fa-solid', c: 'fa-tag'},
  user: { f: 'fa-solid', c: 'fa-user'},
  'user-check': { f: 'fa-solid', c: 'fa-user-check'},
  'message-square': { f: 'fa-solid', c: 'fa-comment-dots'},
  box: { f: 'fa-solid', c: 'fa-box'},
  scale: { f: 'fa-solid', c: 'fa-scale-balanced'},
  feather: { f: 'fa-solid', c: 'fa-feather'},
  cpu: { f: 'fa-solid', c: 'fa-microchip'},
  gauge: { f: 'fa-solid', c: 'fa-gauge-high'},
  droplet: { f: 'fa-solid', c: 'fa-droplet'},
  repeat: { f: 'fa-solid', c: 'fa-repeat'},
  link: { f: 'fa-solid', c: 'fa-link'},
  'align-center': { f: 'fa-solid', c: 'fa-align-center'},
  unlock: { f: 'fa-solid', c: 'fa-lock-open'},
  clipboard: { f: 'fa-solid', c: 'fa-clipboard'},
  brush: { f: 'fa-solid', c: 'fa-brush'},
  pen: { f: 'fa-solid', c: 'fa-pen'},
  'pen-tool': { f: 'fa-solid', c: 'fa-pen-nib'},
  recycle: { f: 'fa-solid', c: 'fa-recycle'},
  'rotate-cw': { f: 'fa-solid', c: 'fa-arrow-rotate-right'},
  'rotate-ccw': { f: 'fa-solid', c: 'fa-arrow-rotate-left'},
  'rotate-3d': { f: 'fa-solid', c: 'fa-rotate'},
  square: { f: 'fa-solid', c: 'fa-square'},
  maximize: { f: 'fa-solid', c: 'fa-expand'},
  wine: { f: 'fa-solid', c: 'fa-wine-glass'},
  'paw-print': { f: 'fa-solid', c: 'fa-paw'},
  music: { f: 'fa-solid', c: 'fa-music'},
  laptop: { f: 'fa-solid', c: 'fa-laptop'},
  baby: { f: 'fa-solid', c: 'fa-baby'},
  dumbbell: { f: 'fa-solid', c: 'fa-dumbbell'},
  bot: { f: 'fa-solid', c: 'fa-robot'},
  send: { f: 'fa-solid', c: 'fa-paper-plane'},
  loader: { f: 'fa-solid', c: 'fa-spinner'},
  compass: { f: 'fa-solid', c: 'fa-compass'},
};

/** Scale factor so FA glyphs visually fill the requested box. */
const SIZE_FACTOR = 1.05;

/** Map a Tailwind `h-N` utility to a rem font-size so FA glyphs fill the box. */
function faSize(cls: string): string | null {
  const m = /\bh-(\d+(?:\.\d+)?)\b/.exec(cls);
  if (!m?.[1]) return null;
  return `${parseFloat(m[1]) * 0.25 * SIZE_FACTOR}rem`;
}

/** Lightweight icon component. Renders Font Awesome by default, falling back to SVG. */
@Component({
  selector: 'app-icon',
  imports: [],
  template: `
    @if (fa(); as fa) {
      <i
        [class]="fa.cls"
        [style.font-size]="fa.size"
        aria-hidden="true"
      ></i>
    } @else {
      <svg
        xmlns="http://www.w3.org/2000/svg"
        [attr.viewBox]="viewBox()"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        class="inline-block h-[1em] w-[1em]"
        [class]="class()"
      >
        <path [attr.d]="path()" />
      </svg>
    }
  `,
})
export class AppIcon {
  readonly name = input<string>('');
  readonly class = input('');
  readonly viewBox = input('0 0 24 24');

  readonly path = computed(() => ICON_PATHS[this.name()] ?? '');

  readonly fa = computed<{ cls: string; size: string | null } | null>(() => {
    const entry = FA_MAP[this.name()];
    if (!entry) return null;
    return {
      cls: `${entry.f} ${entry.c} inline-flex items-center justify-center align-middle leading-none ${this.class()}`,
      size: faSize(this.class()),
    };
  });
}