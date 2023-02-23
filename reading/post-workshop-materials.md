# Post-Workshop Materials

What are some great articles and React concepts to read about after the Core workshop? We've got you covered here:

## Our Blog

At ReactTraining we have a blog that we post to now and then. It can be a great resource for learning about topics in React including some of the more complicated concepts that we covered in the workshop

https://reacttraining.com/blog

## How do I start a React project from scratch?

This highly depends on if you want to build a Single Page App (SPA) or if you want to server-render your app (SSR).

Traditionally, React is used as an SPA. That's how we teach it in our workshops. That's how everyone built React in its early years. React apps need a build-step (Webpack and Babel bundle and compile your code). Those can be complicated to setup for beginners so the React team made a tool that "scaffolding's" the Webpack and Babel setup for you. It's called Create React App (CRA) and you can `npm install` it and be up and running in minutes. Another popular option these days is Vite which compares to CRA. Vite uses Rollup instead of Webpack and it uses Babel to scaffold your project. (Webpack isn't the only good bundler these days).

Our personal preference is Vite.

https://create-react-app.dev/
https://vitejs.dev/guide/

There are many benefits to not doing an SPA though, especially for performance and SEO. It does require you to host React in a JavaScript runtime on the server (like Node). You can still use Java/C#/Ruby/Python too but the server responding with HTML will be JavaScript. You can treat the JS server as a thin HTTP response layer that uses another server for data (Java/C#, etc). In order to orchestrate React running on the server and then rehydrating to the client correctly, you'll probably want to use a "meta framework" like Remix.run or NextJS. These take care of the bundling/compiling too so you won't need CRA or Vite.

Learn more about using Remix/Node with a different stack for your data here: https://remix.run/docs/en/v1/guides/bff

Next and Remix seem like they are very similar but there are substantial differences. For example Remix can be hosted anywhere that does Node or similar JS runtimes. Next hosting is usually done with their parent company Vercel and it can be difficult to host anywhere else. For transparency, the owners of ReactTraining are also the creators of Remix.

## Where can I practice React in the browser without running a local environment

Codesandbox and StackBlitz are the best:

https://react.new (codesandbox)
https://stackblitz.com/edit/react-ts

Both allow you to add dependencies (similar to `npm install`)

## How do I organize a React project?

There's no one right way to organize React code. We agree with the React docs though, "don't overthink it".

https://reactjs.org/docs/faq-structure.html

Usually you'll have a `/src` or `/app` folder in your repo where all your React code goes. Inside that it's common to have a `/components` folder for your common re-usable components (forms, buttons, dialogs, etc). From there it's common to have folders that are in the `/src` folder related to pages or specific areas of your app like `/customer-profile` or `/shopping-cart`.

## Error Handling

React has a feature of class-based components called "error boundaries". It's the only class-component feature that doesn't have an equivalent in hooks. It catches "render phase errors". For any async errors like data fetching it won't catch and you'r supposed to come up with your own solution. This article does a great job of detailing your options:

https://www.developerway.com/posts/how-to-handle-errors-in-react

## CSS

There are lots of options for styling approaches in React. First, you can use regular CSS files and `<link />` includes if you want. React does not prescribe you to using an older or newer way to do CSS. You can also use a cool idea called CSS modules or Sass modules (we use Sass modules in the workshop). With these, you "import" css/sass files into JS files but don't consider this to mean that your CSS becomes apart of your JS bundle. Tools like Webpack use those imports to signal that this CSS is associated with this JS but the end result is Webpack makes a JS bundle of your code and a separate CSS bundle of your CSS code.

You can also use approaches that are more catered towards the power of JSX like CSS-in-JS strategies. These are NOT "inline styles" although they might appear to be at a glance. Popular libraries for this approach are Emotion and Styled Components. Both of them attempt to give you an approach to writing CSS that encapsulates the styles to exactly the DOM you meant for it to style and to couple writing CSS to the DOM in a way where it becomes very easy to find what styles are being applied to a particular DOM node.

A third an very popular approach is to use Tailwind which is not made specifically for React but is a "utility class" library. Instead of writing CSS files separate from their JS component files, you just add whatever utility classes you may need as class names right in the JSX. In theory, you would need 1000's of utilities available to do all the possibilities of CSS properties which would mean a very big CSS file that you only use a fraction of. But tailwind cleverly looks at your JSX for what className utilities you're actually using and makes a tailored CSS file just for the ones you use. Because of the nature of utility classes, Tailwind also offers the same assurances that CSS-in-JS offers: encapsulation to the exact DOM you meant to style and easy maintenance of knowing exactly what styles are being applied to a particular DOM node.

Here's a good article to get you started: https://css-tricks.com/different-ways-to-write-css-in-react/

## TypeScript

If you're interested in learning more about how to do TypeScript with React, we compiled a list of resources. There's also a very well known "React TypeScript Cheat Sheet" that is well maintained:

[Our list of resources](./typescript-resources.md)
https://github.com/typescript-cheatsheets/react

## Microfrontends

There are so many different ways you could use React as a part of your app but also use other technologies like Angular or jQuery. You might be in the middle of a migration perhaps. You might have chosen microfrontends as an architecture from the beginning. There's no one piece of advice we can give you that works for everyone, but we can tell you that often times React Portals are a big part of the equation for getting React to share DOM manipulation with other technologies so perhaps start there:

https://reacttraining.com/blog/portals-with-context/
