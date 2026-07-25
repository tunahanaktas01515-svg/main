/**
 * Doğrulanmamış e-postaları maskeler: yalnızca ilk 7 karakter görünür,
 * kalan kısım nokta ile gizlenir, alan adı uzantısı korunur.
 */
export function maskEmail(email: string, visible = 7) {
  const at = email.indexOf('@');
  if (at < 0) return email.length > visible ? `${email.slice(0, visible)}•••` : email;

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  const dot = domain.lastIndexOf('.');
  const tld = dot > -1 ? domain.slice(dot) : '';

  if (local.length <= visible) {
    const remaining = visible - local.length;
    const shownDomain = domain.slice(0, remaining);
    return `${local}@${shownDomain}${'•'.repeat(Math.max(3, domain.length - remaining - tld.length))}${tld}`;
  }

  return `${local.slice(0, visible)}${'•'.repeat(Math.max(3, local.length - visible))}@${'•'.repeat(3)}${tld}`;
}
