# Data Fetching with useEffect

## Review the component hierarchy

```
Board
├──> TaskGroup
     ├──> TaskCard     <-- Work on this file
     ├──> TaskDialog   <-- Work on this file
```

- Board implements numerous Task Groups (Which represent a column in the UI)
- Each `TaskGroup` implements the `TaskCards` which are the white boxes in the UI
- When a `TaskCard` is clicked, `TaskGroup` gets its respective `taskId` and opens the `TaskDialog` for that task
- The reason `TaskDialog` is directly under `TaskGroup` instead of under the `TaskCard` is so when one `TaskDialog` is open, we can more easily change to another `taskId` with that same dialog still open. This is done by having an array of all sibling tasks in the `TaskGroup` given to the `TaskDialog`.

## ✅ Task 1: TaskCard Data

1. Open `TaskCard.tsx`. In the browser, navigate to a board that has tasks.
2. Write an effect to get the task based on the `taskId` prop. Hint, the effect is identical to the code in TaskDialog if you want to peak 👀.
3. When the page loads, you should be able to see the Task Cards load with their data now.

## ✅ Task 2: Custom Hook

4. Since we now have the same useEffect logic twice, refactor `TaskCard` and `TaskDialog` to use the existing `useTask.ts` custom hook.

Remember, the main reason for custom hooks is code-reuse.
