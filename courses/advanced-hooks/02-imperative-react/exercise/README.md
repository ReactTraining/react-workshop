# Imperative React

## Task: Get the Twitter API working

Open the `TwitterFeed.js`. The `Tweet` component is the only one you'll need to work on.

You'll need these various parts of code to get it working:

```js
// How you can imperatively create a script tag to load the Twitter API
let script = document.createElement('script')
script.setAttribute('src', '//platform.twitter.com/widgets.js')
document.body.appendChild(script)
script.onload = () => {
  // do something when the script is loaded and ready
}

// This is how you can tell the Twitter API to load a Twitter ID
// into a DOM element
window.twttr.widgets.createTweetEmbed(id, element)

// This is how you can tell if the Twitter API is loaded
// into JavaScript
if (window.twttr) {
}
```

Plan of attack!

The biggest consideration is that we only want to load the Twitter API's `script` element once -- even if there's multiple tweets or the `Tweet` components get unmounted and re-mounted.

1. First, just get the dynamic script tag loaded and render the tweets. For now, just use an effect with an empty dependency array to get it working. Ignore any dependency array warnings, we can fix those later.
2. You probably have two `script` DOM elements being created. We need to somehow have one of them kick off the creation of the `script` while the other one waits. One trick for this is to create a queue.
3. Create a `queueTweets = []` array OUTSIDE OF YOUR COMPONENT. This will allow multiple instances of elements all work with the same queue.
4. In your effect, check to see if the ``queueTweets.length === 0`and if so, that's when you'll start making that`script`element. Regardless of that condition, you'll want to add a callback function to the queue. This is the renderTweet function that we have commented out for you. You might see later why it's better not as an anonymous function. In a small amount of time after the`script`tag is added, the Twitter API will load and then the`script.onload` will be called.
5. When the `script` loads, you'll now have a queue of callbacks you can call to run each element's `renderTweet` function.
6. Finally, if the Tweet elements get unmounted then re-mounted, you might want to use `window.twttr` as a condition to see if we can skip that `script` loading process. In that case we can just call `renderTweet` directly.

Code algorithms are difficult to describe in words. Check out the solution if you get lost.
