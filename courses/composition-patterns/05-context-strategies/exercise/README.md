# Strategies for React Context

When we started building our app, we decided to lump a bunch of global state into a global context object available for the app to use.

This was ok because we just started with a shopping cart, but then the feature requests started rolling in. We needed to add auth to our app for returning customers. Later someone thought it'd be cool and drive _engagement_ if you could save an item as a favorite with a little heart button. Business!

As the app grew, we started having some issues. Performance was noticably suffering, so we did the smart thing and looked at React Dev Tools and realized we needed to make some changes. It looked like frequent context updates were triggering slow renders cascading down the tree. Yikes!

Just as important, our reducer became a giant mess with a bunch of unrelated state logic piled together. We can probably improve this and pay off some technical debt.

Your task is to figure out how we refactor the context provider a bit so that it's easier to find our performance issues, and easier to reason about the different pieces of state we're managing in our application.

## Hints

Not everything has to be in a single provider! Not everything has to be in a single reducer!
