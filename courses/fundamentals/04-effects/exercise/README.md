# Effects

## Task

1. Open `ProductFilters.js`.
2. Currently `categories` is `null` so we need to make it stateful.
3. Then use an effect to query for the categories using the `getCategories` function.
4. Don't forget to do a cleanup function.

Hey! Are you getting this error "useEffect is called conditionally"?

Remember, we can't conditionally call our hooks. You might be doing the effect after that early-return if-statement which is also version of "conditionalizing hooks". So just move the effect above the if-statement
