# Forms

NOTE! You will only work on the two files that have respective `.final.tsx` versions

## Review the component hierarchy

```
Board
├──> TaskGroup
     ├──> TaskDialog   <-- Work on this file
     ├──> TaskCard     <-- Work on this file
```

- Board implements numerous TaskGroups (Which represent a column in the UI)
- Each TaskGroup implements the TaskCards which are the white boxes in the UI
- When a TaskCard is clicked, TaskGroup gets the respective `taskId` and opens the TaskDialog for that task
- The Reason why TaskDialog is at this level instead of inside the TaskCard is so we can have one task open in the Dialog and easily change to another task. This is done by having an array of all sibling tasks in the TaskGroup given to the TaskDialog

## ✅ Task 1: TaskCard Data

1. Write an effect to get the task for TaskCard. We have a copy of it for you to review if you need to in TaskDialog.
2. Since we now have the same useEffect logic twice, refactor TaskCard and TaskDialog to use the existing `useTask.ts` custom hook.

Remember, the main reason for custom hooks is code-reuse.
