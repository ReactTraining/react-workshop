# Developer Docs for this App

Just some starter info to help us all stay on the same page.

```sh
npm start

# Select
# - Fundamentals
# - App
```

## Where can I find stuff?

The folder structure is pretty strait forward. `pages` should only have components that are used by routes. General components can either go in `app/ui` or in `/modules/workshop`. In general, lets try to put lots of re-usable things in `/modules/workshop` so they can be used on other mock apps or in lessons. If something is so specific to this app and not very reusable for lessons, then it gan go in `app/ui`

When adding files to `/modules/workshop`, be sure to add them to the `index` file so all those files can be used via named imports.

## Database

We're using `json-server` which makes an Express API against a JSON powered database. It gives us a RESTful interface to the JSON file to feel like a real persistency layer.

json-server is automatically fired up along with the app because the presence of `db.json` is at the root of the app folder. Currently there are two "collections" (tables) in the database for `products` and `users`. We'll add more later for things like comments

## Client-side API requests

There's an `api` folder which organizes all possible API requests into a single object so we can do

```js
import api from '../api

api.users.getUser(1)
```

The underlying tech is `fetch`

## Users (Signup and Login)

There are signup and login capabilities. Note that auth details like passwords are stored in plaintext in `json-server` database.

## Authentication State

We're using context to store auth details. This file also syncs your logged-in status to localStorage. It's weird to couple these to things together (the context file and localStorage) but for the purposes of it being a workshop, it's nice for the user to have a simple API into auth stuff.

## Shopping Cart State

We're using context to store the shopping cart. Currently this does not persist the cart to anywhere on refresh (like localStorage) but we can fix that later.

## Styles

We're using Sass Modules. We decided on an approach of having the `.scss` file be named the exact same way as the React component file that it serves and in the same folder. We're using "semantic looking" legible classnames as an approach which prevents the JSX from getting too cluttered (since we're teaching React and not trying to make the perfect CSS strategy)

Naming collisions are easily prevented when this strategy is followed:

- If a component is called `Avatar`, make sure it's wrapping element has a class name that's similarly named: `<div className="avatar"></div>`
- The JS file and the SCSS file will be `Avatar.js` and `Avatar.scss`
- In the SCSS file, wrap all rules in an `.avatar` namespace:

```scss
.avatar {
  // Now that this is nested it won't collide with any other "sub-thing"
  .sub-thing {
  }
}
```

### Global Styles

There are global styles in `modules/workshop/styles`. These are meant to be generic enough to be used for any of our courses and/or other mock apps.

There are some CSS utility classes which are layout and design-system in nature. They're documented in the Design System section.

## Design System

I'll eventually document a lot more things with storybook, but this is a small amount of info to get people started

### Columns (flexbox)

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
- `.confine` - Doesn't let text wrap, creates an ellipses instead
