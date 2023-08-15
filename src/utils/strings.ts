export function toTitleCase(value: string): string {
  if (value.length < 2) {
    return value.length === 1 ? value [0].toUpperCase() : ''
  }
  return value[0].toUpperCase() + value.slice(1).toLowerCase()
}