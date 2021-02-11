type Colors = {
  [key: string]: string
}

// This is where we iterate over `colors` and for each one we do a call
// to window.getComputedStyle and get the `document.body` (aka :root in CSS)
// and get the custom color property we're iterating on

function getRootStyles(colors: string[]): Colors {
  return colors.reduce((all, property) => {
    return {
      ...all,
      [property.replace('--', '')]: window
        .getComputedStyle(document.body)
        .getPropertyValue(property)
        .trim(),
    }
  }, {})
}

type ThemeColors = {
  [key: string]: string
}

export function getTheme(): ThemeColors {
  return getRootStyles(['--red', '--green', '--brightBlue'])
}
