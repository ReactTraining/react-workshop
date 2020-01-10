# Docs for development on YesterTech app (for the fundamentals course)

## Database

json-server is automatically started when the app starts. Currently there are two "collections" (tables) in the database for `products` and `users`. We'll add more later for things like comments

Also, see our [database docs](./databases.md)

## Client-side API requests

There's an `api` folder which organizes all possible API requests into a single object so we can do

```js
import api from '../api

// Wraps `fetch`
api.users.getUser(1).then()
```

## Users (Signup and Login)

There are signup and login capabilities. Note that auth details like passwords are stored in plaintext in `json-server` database.

## Styles

We're using Sass Modules. We decided on an approach of having the `.scss` file be named the exact same way as the React component file that it serves and in the same folder. We're using "semantic looking" legible classnames as an approach which prevents the JSX from getting too cluttered (since we're teaching React and not trying to make the perfect CSS strategy)

### Global Styles

There are global styles in `modules/workshop/styles`. These are meant to be generic enough to be used for any of our courses and/or other mock apps.

There are some CSS utility classes which are layout and design-system in nature. They're documented in the Design System section.

## Design System

I'll eventually document a lot more things with storybook, but this is a small amount of info to get people started.

### `<Columns />` (flexbox)

For any content that is "side-by-side" and could benefit from flexbox, we use `react-flex-columns` which gives an abstraction over flexbox. Just think of it as something that gives you a lot of the flexbox API but in a way that feels symantec in JSX and doesn't require custom CSS

https://github.com/bradwestfall/react-flex-columns

### Layout Utility Classes

For vertical and horizontal gutters between sibling elements, we're using a pattern sometimes referred to as lobotomized owl. It's utility classes are: `.spacing-small`, `.spacing`, `.spacing-large`, `.horizontal-spacing-small`, `.horizontal-spacing`, `.horizontal-spacing-large`

There are some other utilities including

- `.vertical-middle` - When placed on a container will apply `vertical-align: middle` to the direct children
- `.align-left` - `text-align: left`
- `.align-right` - `text-align: right`
- `.align-center` - `text-align: center`

### Text Utility Classes

- `.text-warn` - Red Text
- `.text-success` - Green Text
- `.text-small` - Smaller Text
- `.text-large` - Larger text
- `.text-xlarge` - Larger Larger Text
- `.no-wrap` - Doesn't let text wrap, creates an ellipses instead
