# Forms

# Main Topics to Cover

- ✅ Mapping over data in JSX, key prop
- ✅ Refs (Uncontrolled Input Fields)
- ✅ Controlled Input Fields
- ✅ React Event Delegation
- ✅ TypeScript

If doing TypeScript:

- Explain `React.FC`
- Make a `type BoardData`
- Explain Type Narrowing (`as HTMLInputElement`)
- Refactor into two components so you have a `BrowseBoardItem` with some props that are typed

# Lecture

- Map over state to create a board item (jsx) for each board in state

  - When showing how to map over data and use `key` prop, it could be a good time to reiterate on the virtual dom, reconciliation, and how React works behind the scenes.

- Submitting the form currently gets the form data from `getElementById`. Change to ref instead.
- Use refs to set focus back to the input after submission
- Change to a "controlled" strategy with the input field. Explain controlled vs uncontrolled
