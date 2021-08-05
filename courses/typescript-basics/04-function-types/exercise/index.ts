// Converts a string to a slug (hyphen-lower-case)
export function slugify(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w\s-]/, '')
    .toLowerCase()
}

// Converts all elements in array into a string separated by separator.
export function join(array, separator = ',') {
  return array.join(separator)
}

// Gets an array of an object's keys
export function keys(object) {
  return Object.keys(object);
}

// Reduces a function into a single value (think array.reduce)
export function reduce(array, reducer, initialValue) {
  return array.reduce(reducer, initialValue)
}

// Takes an array of values that might also be arrays, and flattens them 1 level
// deep. Both depth and result are optional
export function flatten(array, depth = 1, result) {
  result || (result = [])

  if (array == null || !Array.isArray(array)) {
    return array
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
      result[result.length] = value
    }
  }
  return result
}

// Adds up arguments, but arguments may not be number types! it will typecheck
// first and try to parse the numeric value if the arguments are not numbers.
// The user might also pass a single argument where the values to be added are
// in an array.
export function add(...values) {
  let [first, ...rest] = values
  let allValues = Array.isArray(first) ? first : [first, ...rest]
  return allValues.reduce<number>((total, value) => {
    let v = typeof value === 'string' ? parseFloat(value) : typeof value === 'number' ? value : null
    if (v == null || isNaN(v)) {
      throw Error('Invalid argument type')
    }
    return v + total
  }, 0)
}
