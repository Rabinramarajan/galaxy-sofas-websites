export function isActivePath(pathname: string, href: string): boolean {
  const normalize = (value: string) =>
    value.length > 1 && value.endsWith("/") ? value.slice(0, -1) : value;

  const current = normalize(pathname);
  const target = normalize(href);

  if (target === "/") {
    return current === "/";
  }

  return current === target || current.startsWith(`${target}/`);
}
