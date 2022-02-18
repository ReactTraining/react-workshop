# Data Loading Abstractions

- Review the components with attendees:
  - `<BrowseCourses />`
  - `<BrowseCourseLessons />`
  - `<PreviousNextCourse />`
- The data fetching hasn't been abstracted yet like the exercise of `04-side-effects`
- Talk about the difficulties of fetching course data for BrowseCourses, then needing to do that again for the course name on BrowseCourseLessons, then needing to do it again for the next and previous buttons. It would be a lot nicer if this data fetching happened once and then was passed down through context.
- Show the `useCourses` hook. If we didn't build a similar `usePromises` earlier in 04, we can perhaps do that now.
- Instead of calling `useCourses` on an individual component basis, we can show how to make a context provider for this purpose (it's already built and is mostly a show-and-tell).
- Wire all the components to this context.
