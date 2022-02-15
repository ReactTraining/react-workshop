## Task 1

Query for all the messages using `api.chat.getMessages` in a `useEffect`. Set the `messages` state that already exists. Look for the green dot 🟢 in the code

## Task 2

Start a subscription only after the previous effect is finished from Task 1. Hint, you can have a `messagesLoaded` state that is set to true and check for that boolean inside of this next effect at the blue dot 🔵

## Task 3

## Task 4

The input should clear and re-focus after a message is submitted by a user.

Add an `inputRef` to set the focus and set empty state when messages are submitted. In TypeScript you'll need to use a generic to identify what the ref will be for:

```ts
const inputRef = useRef<HTMLInputElement>(null!)
```

## Task 5

If the user typed the word "clear", this should clear the chat. Set the messages to be an empty array upon the successful call to `api.chat.postMessage`
