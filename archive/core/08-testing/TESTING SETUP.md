# Tests

There's no code to run with `npm start`. Show the tests and run `npm test` if you want to show them pass/fail

# Main Topics to Cover

- ✅ Using Jest with React Testing Library
- ✅ Testing Approaches - Test the way the user interacts with the UI
- ✅ Mocking

Also review:
https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

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
  "testEnvironment": "jsdom", // Only needed in Jest v27 and up
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
  }
}
```

## TypeScript Tests

```
npm i --save-dev @types/jest ts-jest
```

Add "jest" to the "types" field in tsconfig

In `package.json`

```json
"transform": {
  "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
}
```
