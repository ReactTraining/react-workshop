type Props = {
  colors: string[]
  setColors: (colors: string[]) => void
}

export function BackgroundPicker({ colors, setColors }: Props) {
  function setColorByIndex(index: 0 | 1, color: string) {
    const colorsCopy = colors.slice()
    colorsCopy[index] = color
    setColors(colorsCopy)
  }

  return (
    <div className="horizontal-spacing">
      <input
        type="color"
        value={colors[0]}
        onChange={(e) => {
          setColorByIndex(0, e.target.value)
        }}
      />
      <input
        type="color"
        value={colors[1]}
        onChange={(e) => {
          setColorByIndex(1, e.target.value)
        }}
      />
    </div>
  )
}
