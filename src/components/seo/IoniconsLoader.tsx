/**
 * Loads the Ionicons custom-element runtime from this site's own origin
 * (public/ionicons, populated by scripts/copy-ionicons.mjs) rather than a CDN,
 * so there is no third-party request and the SVGs stay same-origin.
 *
 * Deliberately a plain module script rather than next/script: next/script also
 * emits a <link rel="preload">, whose credentials mode does not match a module
 * fetch, so the file gets downloaded twice. Module scripts are deferred by
 * default, so this still stays off the critical path — icons are decorative
 * and their boxes are already sized, so a late upgrade shifts nothing.
 */
export function IoniconsLoader() {
  return <script type="module" src="/ionicons/ionicons.esm.js" async />;
}
