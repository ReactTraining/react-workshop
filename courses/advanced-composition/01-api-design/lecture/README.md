# Notes for Instructor

1. First, have the students do the exercise before the lecture

- The main idea is to get them thinking about how to write components. They will probably write a single element or maybe even a single element with a render props thing.

2. Lecture

- The index file for lectures will have a checklist at the bottom of what needs to be solved
- Refactors:
  - Make Compound Components
    - Don't introduce context yet, the curriculum flows better if the know `React.Children.map` and `React.cloneElement` for the next lecture.
  - Add an `<Disclosure onChange>` onChange so the owner component can know the disclosure state and adjust the icon
  - adjust from class names to data-attributes
  - Forward Props
  - Forward Ref
  - Add display name because of forwarding ref
  - Add aria stuff (see checklist)
    - `useId()` gives us something more dynamic that just `id="panel"`
    - Show the real one being imported or just make one. The real one is a bit complex because of SSR and re-hydration.

A quick note on `propTypes`, we're not doing them because they take up so much space and lots of teams are using type systems anyways.

This whole thing is a great primer for "controlled vs uncontrolled components". Not that we're doing or going to talk about controlled yet (that's in the lessons later), but we do have our own `onChange` and `defaultOpen`, thus "uncontrolled".

3. Exercise

Let the attendees refactor to get caught up to where we have our lecture code. Main lesson learned: React gives us the ability to make a composable API which offer more flexibility.
