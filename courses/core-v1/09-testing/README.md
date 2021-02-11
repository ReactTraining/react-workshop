# Notes for Instructor

## Outline

- What is Jest?
- Explain basics of testing in React
  - best practices: Don't dip down into the component to manipulate the state. Test the component the way the user uses it, by behavior (clicks, key presses, etc.) and then expecting to see what they see.
- Red-green testing (make the tests fail first)
- Snapshot Testing
- Conversation about React Test Utils vs React Testing Library vs Enzyme

## Material

- Open `Quantity.js` and `Quantity.test.js`
  - `Quantity` is an uncontrolled stateful component
  - We'll test its initial state and then issue some events to see if the JSX has the content we expect
  - First there are React Testing Lib tests then the same tests in React Test Utils (from ReactDOM) for comparison.
- Open `ProductProfile.test.js`
  - Walk through the code to show mocks and async stuff

## How to install on your own project

```sh
npm install --save-dev jest
# If using @testing-library
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

In `package.json`

```json
"scripts": {
  "test": "jest"
}
"jest": {
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
  }
}
```

If you're using CSS/Sass Modules which are normally orchestrated by Wepback (which Jest won't be aware of), then you'll need to mock those out. We followed these instructions: https://jestjs.io/docs/en/webpack#handling-static-assets

## React Test Utils

These are the "built-in" ones from React itself. They are much more verbose to use compared to React Testing Library

## React Testing Library

Gives you helper methods to query your components and test them the way users use them.

React Testing Library re-exports everything from DOM Testing Library as well as these methods:

- render()
- cleanup()
- act()
