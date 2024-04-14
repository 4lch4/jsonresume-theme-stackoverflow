export function toLowerCase(str: string) {
  return str.toLowerCase()
}

export function spaceToDash(str: string) {
  return toLowerCase(str.replace(/\s/g, '-'))
}
