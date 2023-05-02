// Sorts an array of objects by the object's label
export function sortLabel<T extends { label: string }>(a: T, b: T) {
  return a.label < b.label ? -1 : 1
}
