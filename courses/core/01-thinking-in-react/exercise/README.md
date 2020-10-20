# Rendering

Most exercises are done just by the students with the instructor available for questions. This one, being the first, is a code-a-long and the instructor will lead the exercise with the group.

In `index.js`, render the logic for the star ratings for the product.

Iterate through the products and create a list of products that includes the star ratings for each. The logic to convert a number like `3.5` into the correct stars is pretty gross, isn't it? What you can do instead is compose a component that has all of that logic encapsulated, so the Product Profile only needs to give it a rating. Establishing that separation of concerns with composed components is one of the most beautiful aspects of React.

Notice that `StarRatings.js` is also available incase we need to peek at the algorithm.
