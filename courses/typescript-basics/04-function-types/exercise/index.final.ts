export function slugify(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w\s-]/, '')
    .toLowerCase()
}

export function join(array: any[], separator = ','): string {
  return array.join(separator)
}

// Gets an array of an object's keys
export function keys<Obj extends {}>(object: Obj): Array<keyof Obj> {
  return Object.keys(object) as Array<keyof Obj>
}

// Reduces a function into a single value (think array.reduce)
export function reduce<ReturnType, ArrayItem>(
  array: ArrayItem[],
  reducer: (
    previousValue: ReturnType,
    currentValue: ArrayItem,
    index: number,
    array: ArrayItem[]
  ) => ReturnType,
  initialValue: ReturnType
) {
  array.flat()
  return array.reduce(reducer, initialValue)
}

// Takes an array of values that might also be arrays, and flattens them 1 level
// deep. Both depth and result are optional
export function flatten<ArrayType extends any[], Depth extends number = 1>(
  array: ArrayType,
  depth: Depth = 1 as Depth,
  result: FlatArray<ArrayType, Depth>[] = []
): FlatArray<ArrayType, Depth>[] {
  if (array == null || !Array.isArray(array)) {
    throw Error('Argument must be an array!')
  }

  if (!array.length) {
    return []
  }

  for (const value of array) {
    if (!Array.isArray(value)) {
      result.push(value)
    } else if (depth > 0) {
      if (depth > 1) {
        flatten(value, depth - 1, result)
      } else {
        result.push(...value)
      }
    } else {
      result[result.length] = value as any
    }
  }
  return result
}

// Adds up arguments, but arguments may not be number types! it will typecheck
// first and try to parse the numeric value if the arguments are not numbers.
// The user might also pass a single argument where the values to be added are
// in an array.
export function add(values: Array<string | number>): number
export function add(...values: Array<string | number>): number
export function add(
  first: Array<string | number> | string | number,
  ...values: Array<string | number>
): number {
  let allValues = Array.isArray(first) ? first : [first, ...values]
  return allValues.reduce<number>((total, value) => {
    let v = typeof value === 'string' ? parseFloat(value) : typeof value === 'number' ? value : null
    if (v == null || isNaN(v)) {
      throw Error('Invalid argument type')
    }
    return v + total
  }, 0)
}
