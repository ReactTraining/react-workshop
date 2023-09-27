# Rendering

## Goals

Make an Avatar component that when passed an image src will use an `<img />` tag but when not passed a src will use a `<div /> tag`

Since JSX is just "syntax sugar" for function calls (and not exactly HTML), you can do `<div />` as a self-closing tag if you want (which would not be allowed in real HTML)

## Task 1

Open `index.jsx` and modify the `user` object at the top to have your name. The JSX currently has a div tag that hard-codes the message "Your Name Here" like this:

```jsx
<div className="text-2xl text-slate-700">Your Name Here</div>
```

Modify it so your name from the user object shows there instead. Remember you can use `{}` curly braces in JSX where you want to send a variable. See the solution if you need help (`index.final.jsx`)

## Task 2

Where the `<img />` tag is in the index file is where we want to now have the Avatar component. Use the Avatar component like this:

```jsx
<Avatar src={user.avatarUrl} />
```

Now you'll have to add this `src` prop to the component in `Avatar.jsx`

Move the img code from the index to the Avatar component and return either the img or the div depending on whether the src was supplied or not. Essentially, you'll need something like this:

```jsx
return src ? <img /> : <div />
```

Now create a `size` prop where you can pass an integer and it will be used as the `width` of the div or the image. Do a default value for the size prop of 5

## Task 3

This last task should be considered more of a bonus task.

The developer who uses your Avatar component may want to pass other props in that get passed into the image tag. Allow them to pass a `className` into the Avatar component which gets added to the className string that's already in place in `<img />` tag of the component.

The developer may also want to add all kinds of other attributes to the image tag so we need to accept all of them and forward them into the `<img />`. This can be done by utilizing the "rest" operator when we destructure the props along with the "spread" operator to pass an object of properties into JSX. See the solution file for an example.

## Finished When

After Task 1 and 2 you should be done if you can see your avatar show up in the "Practice" box and also in the chat when you post a message.
