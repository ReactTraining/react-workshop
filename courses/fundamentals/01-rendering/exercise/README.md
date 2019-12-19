# Rendering

In `index.js`, render the logic for the star ratings for the product.

That's pretty gross, isn't it? What you can do is instead compose a component that has all of
that logic encapsulated, so the Product Profile only needs to give it a rating. Establishing that
separation of concerns with composed components is one of the most beautiful aspects of React.

Luckily, we have that component composed for you in `YesterTech/StarRatings.js`.
