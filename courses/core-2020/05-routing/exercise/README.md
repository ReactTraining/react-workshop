# Routing

## Task One: Create Routes for the Pages

1. `<main class="primary-content"></main>` is the container for all pages. Within it, create a `Switch` and several routes for `Home`, `Signup`, `Login`, and `ProductsLayout`.
2. Use `Redirect` for when no `Routes` match in the `Switch`.
3. Create a conditional route for `Checkout`. Only provide the checkout route if the cart has items (`cart.length`)
4. Create a conditional route for `Account`. Only provide the account route if `authenticated` is `true`.

## Task Two: Conditionally render `ProductSubNav` if the path is `/products`

1. Only route to `ProductSubNav` if the path is `/products`

Hint. Not all routes need to go in a `<Switch>`
