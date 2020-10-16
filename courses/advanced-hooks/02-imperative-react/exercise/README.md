# Imperative React

## Task One: Get the Twitter API working

Open the `TwitterFeed.js`. The `Tweet` component is the only one you'll need to work on.

The biggest consideration is that we only want to load the Twitter API's `script` element once -- even if there's multiple tweets or the `Tweet` components get unmounted and re-mounted (which is why there's a "Show Tweets" button to demonstrate mounting and unmounting).

1. To start, you'll have a `useEffect` that has most of the basic imperative parts you'll need. The problem is it will run once for each instance of `<Tweet>` and therefore you'll notice two scripts get added to your DOM.
2. We need to somehow run the renderTweets function for each instance but only setup the script one time. In React, the instances will not know about each other so the best way to coordinate this is with a variable that lives outside of the component. Create a `queueRenders` array outside of the component.
3. In the effect, queue the `renderTweet` function by adding it to the array for all the instances of `<Tweet>` that are being rendered. Then, only run the logic to setup the script if the queue is empty.
4. In the `onload` for the script, instead of calling `render`, you now have a queue of render functions you need to iterate through and call each one.

This is a good stopping point to make sure things are working as expected. You should now be able to load the page and only one script gets created while both tweets get rendered.

The main problem that still persists is that if the `<Tweet>` components were to be unmounted and then re-mounted, nothing would render on the second mount because the only logic to render the tweets comes after a `script.onLoad` which we've purposely just forced to happen once.

5. In the effect function, use the presence of `window.twttr` which checks to see if the script for Twitter is loaded. Now you know if you should be doing all the logic you just wrote to establish the script and queue the renders, or just call render directly.

HINT: if `window.twttr` is available (is truthy), you just need to call `renderTweet` now.

---

Code algorithms are difficult to describe in words. Check out the solution if you get lost.

## Bonus Task: Tweet Options

Get the tweets to use some options so we can do `dark` or `light` themes. From a Twitter API standpoint, you just need to pass in options like this:

```
{
  theme: 'dark' // or 'light'
}
```

Remember, when objects are passed down as props, you might be re-creating that object again for each re-render which might be a problem if that object is used in a dependency array.
