Using the `ColorEnum` here is better than accepting a `string` argument. We can limit the arguments to these three colors, but it's redundant and if the array is big or dynamic this wouldn't work:

```ts
const colors = ['red', 'blue', 'green']
type ColorEnum = 'red' | 'blue' | 'green'

function getColor(name: ColorEnum) {
  return colors.find((c) => c === name)
}
```

A better way is to make a type from a type

```ts
const colors = ['red', 'blue', 'green'] as const
type ColorEnum = typeof colors[number]
//   ColorEnum = 'red' | 'blue' | 'green
```
