export function getReturnTo(): string {
  if (typeof window === 'undefined') return '/'
  const params = new URLSearchParams(window.location.search)
  return params.get('returnTo') || '/'
}

export function setReturnTo(path: string): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  params.set('returnTo', path)
  window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`)
}