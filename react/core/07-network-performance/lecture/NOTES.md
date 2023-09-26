1. First, refactor from useEffect to useQuery on the vacation pages
2. Introduce the SimilarVacations component and how to use useQueries
3. Show the waterfall created by SimilarVacations
4. Refactor to loaders for Browse and Details pages
5. Waterfall is still there
6. Since we lost our cache too, add ReactQuery to loaders

Talk about how waterfalls like this one are difficult to get rid of, however React Router does have a solution for these with loaders. In our case caching does help because we won't have the need to make as many requests to vacations we've already seen
