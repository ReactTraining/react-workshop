# Build a chat feature

There's already a firebase database ready to go for you. You can use the following APIs to access it:

⭐️ BEFORE YOU START ⭐️ Change the `THREAD_NAME` variable from `all` to something that only you and your group will use so you're messages don't interfere with other's working on the same chat database. All your chat messages will be isolated by that name.

```js
const THREAD_NAME = 'all' // change

// Get Messages (Promise)
api.chat.getMessages(THREAD_NAME).then((messages) => {})

// Post Message (Promise)
api.chat.postMessage(input, userId, userName, avatarUrl, THREAD_NAME).then(/* no data */)

// Subscribe To Messages after a certain time (Subscription). This will return
// a function that can be called later to unsubscribe
const cleanup = api.chat.subscribe(Date.now(), (newMessages) => {}, thread)

// Unsubscribe
cleanup()
```

# Goals

- Load the existing messages upon first load of the chat (or refresh)
- Subscribe to any new messages that will exist after your page loads
- Create a sticky "scroll to bottom feature".
  - Each new message should scroll the user to the bottom of the chat view - "sticky mode"
  - If the user chooses to scroll up to see older chats, then sticky mode should be turned off and they will not be automatically scrolled to the bottom as new messages arrive.
  - If the user then scrolls back down to the bottom, then sticky mode will be turned back on.
- If the message "clear" is sent, it will remove all messages from the database. You should also reset the `messages` array to be empty so the UI correctly represents the cleared chat.

There's never just one right way to do things like this. But here's a game plan that will be successful. Note that we already made all the state for you that our final uses.

## Task 1

Get and Post Messages

Get all the messages using `api.chat.getMessages` in a `useEffect`. Set state for `messages` (we already made this for you).

Finish setting up the onSubmit event handler we started for you. Be sure to clear the input field after you submit and reset the focus back to the input field.

## Task 2

Start a subscription only after the previous effect is finished from Task 1. You'll need to keep track of a timestamp of when subscriptions are started (use `startSubscription` state). You can see from the API's above that `api.chat.subscribe` expects `Date.now()` to know when to start the subscription. Note that when the subscription returns new messages and you set their state, you might want to reset that timestamp to create a new subscription and cleanup the previous one. Otherwise you'll continue to get all messages created after the first timestamp.

## Task 3

Scroll to the bottom of the chat view after new messages are rendered. Here is the JS which will do this:

```js
chatBoardRef.current.scrollTop = chatBoardRef.current.scrollHeight
```

The key part to that is to scroll AFTER messages are rendered. If you set new state for messages and then try to immediately scroll, it wont work because setting state doesn't mean the DOM is updated yet to measure `scrollHeight` yet.
