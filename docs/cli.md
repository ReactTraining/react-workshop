# The CLI menu

```sh
# For loading the full app or an exercise. This is probably the choice the students will use the most
npm start

# You can also add a course to skip that part of the menu
# Or even a lesson of that course (words like `state` search by regex):
npm start core
npm start core 3
npm start core state

# For loading the full app or a lecture
npm start lecture

# You can also add a course to skip that part of the menu
# Or even a lesson of that course (words like `state` search by regex):
npm start lecture core
npm start lecture core 3
npm start lecture core state

# A shortcut for going strait to a specific app
npm start app
```

## Preferences

The CLI will ask if you want to save your course selection so you don't have to see that menu again. This is most convenient for students who are in the same course for a few days in a row. Preferences are saved on the root at `preferences.json`. Here are the valid options:

```json
{
  // advanced | electives | core
  "course": "core"
}
```

Also, the nice thing about having preferences set is that now you could just do:

```sh
npm start state
npm start lecture state
```
