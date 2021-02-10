# State

Remember, the only files you'll ever work on will have corresponding `.final` files. These `.final` files are for you to review while your coding. They are the solution and it's okay to look. 🙂

## ✅ Task 1: Create State for Progress Slider

1. Open `Task.js`. There are also some inline comments for instructions in that file.
2. Make `completedMinutes` stateful with the `useState` hook.
3. When the progress slider is changed by the user, the function passed into it's `onChange` prop will be called. Use that to set your newly created state.

## ✅ Task 2: Create State for Progress Slider

4. Currently, the `Minutes.js` file already has state. Remove the state from the `Minutes` component and move it up into the `Task` component. This is called "lifting state".
5. Pass down `minutes` and `setMinutes` (the variables created from `useState`) as props into `Minutes` like this:

```jsx
<Minutes minutes={minutes} setMinutes={setMinutes} />
```

6. Remember you need to adjust the Minutes component to receive those props as arguments.
7. Implement the `onClick` for the "Complete" button so it will set the `completedMinutes` to equal the `minutes` value.

## Check Your Work

At this point, you should be able to use the UI to adjust minutes and the progress to see your results.

## ✅ BONUS TASK!

8. Make the button green when the task is complete. First you should make a `complete` boolean to know if the task is complete (if the minutes equals the completedMinutes). Use that boolean to adjust the `className` of the button:

```jsx
// Hint: Buttons with the `button` class will be the default blue color
<button className="button"/>

// Buttons with the extra class of `button-green` will be green
<button className="button button-green"/>
```

You'll need to figure out how to make the string you pass into the className dynamic. See the `.final` if you need to.

9. Also make the progress slider green if `complete` is true. The `Progress` component takes a prop called 'status' which is currently set to "progress", meaning we're in progress. But if you set the status to "complete", the progress bar will be green.
10. You might notice that if you decrease `minutes` to be less than `completedMinutes`, the UI will let you. This probably doesn't make sense to allow the user to do this. Let's ensure that `minutes` cannot be less than `completedMinutes` by passing a `minMinutes` prop into `Minutes` like this:

```jsx
<Minutes minutes={minutes} min={currentMinutes} setMinutes={setMinutes} />
```

If you open the `Minutes` component you'll already notice that the subtract function doesn't allow us to go below 0. Adjust the code so now it can't go below the `min` prop being passed in.
