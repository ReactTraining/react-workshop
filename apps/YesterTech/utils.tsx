export function getInt(val: string | number, radix: number = 10) {
  return typeof val === 'number' ? val : parseInt(val, radix)
}
