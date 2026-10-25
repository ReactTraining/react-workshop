# Tests

There's no UI to run with `npm start`. These examples are the tests. From `app-react-router-spa`:

```sh
npm test
npm run test:watch
```

# Main Topics to Cover

- Vitest with React Testing Library
- Test the UI the way a person uses it
- Mock at the edges: network and child subtrees that fetch their own data

Also review:
https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

## What changed since the Jest version of this lesson

- The runner is Vitest. It uses the Vite config already in this app (aliases, plugins, JSX).
- Prefer `userEvent` over `fireEvent`. `fireEvent.click` dispatches one synthetic event. `userEvent.click` goes through hover, pointer, and mouse events the way a browser does.
- Prefer accessible queries: `getByRole`, then `getByLabelText`, then `getByText`. `getByTestId` is a last resort. The counter buttons are icon-only, so they have `aria-label`s instead of `data-testid`.
- `findBy*` retries until the element shows up. That replaces `await waitFor(() => screen.getByText(...))`.
- `vi.mocked(fn)` is the typed handle for a mock. Skip `fn as Mock`.
- Give a controlled component a tiny stateful parent in the test and assert on the screen. Asserting that `setCount` was called does not prove the count changed, and a test that passes `setCount={() => {}}` still "passes" if you only re-read the old value.
- Render URL-driven pages with `createMemoryRouter`. Mocking `useParams` skips the real router contract.
- `useSyncExternalStore` is the current way to subscribe to `matchMedia`. `useEffect` plus `useState` was missing updates when the query string changed, and `window &&` throws when `window` is not defined.
- happy-dom is still the right environment for this lesson. Vitest Browser Mode (and Playwright) run in a real browser and are a better fit for high-fidelity interaction tests. They are a different setup, not a requirement for these component tests.

## How to install on your own project

This repo is already set up. For another Vite app:

```sh
npm install --save-dev vitest happy-dom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

In `vite.config.ts`

```ts
/// <reference types="vitest/config" />

export default defineConfig({
  // ... your existing config
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['**/test.tsx', '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
})
```

`globals: true` is what lets React Testing Library register its cleanup between tests. With that on, you do not import `describe`, `it`, or `expect`. Import `vi` in files that mock, so the mock calls are obvious.

Create `src/test/setup.ts`

```ts
import '@testing-library/jest-dom/vitest'
```

In `package.json`

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
}
```

## TypeScript Tests

Vitest ships with its own types. Add this to your app `tsconfig`:

```json
"compilerOptions": {
  "types": ["vitest/globals"]
}
```

If you call `act` yourself (the `useMedia` test does, around a `matchMedia` change), import it from `@testing-library/react`. `react-dom/test-utils` is the old entry point.

## Patterns in these files

Counter (`Counter/test.tsx`): query by role and accessible name, drive the component with `userEvent`, assert with jest-dom (`toHaveValue`, `toBeDisabled`).

Vacation details (`VacationDetailsPage/test.tsx`): memory router for the `:vacationId` param, `vi.mock` for the API and for `SimilarVacations`, `findByRole` once the promise resolves. A loading test should hang the promise (`new Promise<Vacation>(() => {})`). Resolving `null` also leaves "Loading..." on screen, so that version of the test does not prove the request is still in flight.

`useMedia` (`useMedia/test.tsx`): `renderHook` for a hook with no UI, and `vi.stubGlobal('matchMedia', ...)` for the browser API. Call `vi.unstubAllGlobals()` in `afterEach`.

## Jest → Vitest cheat sheet

| Jest                                   | Vitest                     |
| -------------------------------------- | -------------------------- |
| `jest.fn()`                            | `vi.fn()`                  |
| `jest.mock()`                          | `vi.mock()`                |
| `jest.requireActual()`                 | `vi.importActual()`        |
| `jest.spyOn()`                         | `vi.spyOn()`               |
| `jest.clearAllMocks()`                 | `vi.clearAllMocks()`       |
| `jest.mocked(fn)` or `fn as jest.Mock` | `vi.mocked(fn)`            |
| `jest.useFakeTimers()`                 | `vi.useFakeTimers()`       |
| `testEnvironment: 'jsdom'`             | `environment: 'happy-dom'` |

| Older test                                    | Current test                                         |
| --------------------------------------------- | ---------------------------------------------------- |
| `fireEvent.click(button)`                     | `await user.click(button)` after `userEvent.setup()` |
| `getByTestId('add')`                          | `getByRole('button', { name: /add/i })`              |
| `waitFor(() => screen.getByText('name'))`     | `await screen.findByRole('heading', { name })`       |
| `expect(input.value).toEqual('0')`            | `expect(input).toHaveValue('0')`                     |
| `vi.mock('react-router')` to stub `useParams` | `createMemoryRouter` + `RouterProvider`              |
