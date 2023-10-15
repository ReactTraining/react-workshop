const colors = ['black', 'white', 'blue', 'red', 'green', 'gray-1', 'gray-2', 'gray-3'] as const
type ColorType = typeof colors
type ColorEnumType = typeof colors[number]

type ColorMapType = {
  [key in ColorEnumType]: string
}

const vacations = [
  { type: 'beach', name: 'Maui' },
  { type: 'beach', name: 'Fiji' },
  { type: 'mountains', name: 'Colorado' },
] as const

type VacationTypes = typeof vacations[number]['type']
