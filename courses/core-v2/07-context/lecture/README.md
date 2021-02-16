# Context

# Main Topics to Cover

- ✅ "State Lifting" leads to "Prop Drilling"
- ✅ Prop Drilling vs Context
- ✅ Context with Custom Providers/Consumers
- ✅ Design System Theming

# Lecture

- Teach the basic concepts of context.
- Migrate the theme colors from a prop-drilling strategy to context
- Use `ThemeContext` to stay consistent with the exercise they'll be doing
- When context is finished, migrate to a `ThemProvider` custom component.

## CSS Custom Properties

In addition to explaining context in React, this particular code uses CSS Custom Properties which will probably be a new concept to some people. Maybe use this as an time to review how they work and checkout the `styles.scss` file to see how we're using them to add a `--taskColor` to the `TaskCard`.

In CSS you can do this:

```css
body {
  --themeColor: red;
}

div.some-component {
  --themeColor: blue;
}

div.some-component a {
  color: var(--themeColor); /* The anchor will be blue because it's more locally scoped */
}
```
