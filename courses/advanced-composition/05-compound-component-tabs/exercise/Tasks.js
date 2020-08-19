import React from 'react'

export function TaskOne() {
  return (
    <ul>
      <li>
        Get some state working with context. Use `selectedIndex` and
        `setSelectedIndex`.
      </li>
      <li>
        Create a context called `TabsContext` and pass the
        `selectedIndex` and `setSelectedIndex` down through context.
      </li>
      <li>
        We're going to need to know the index of each tab. You'll need
        to iterate the `children` of `TabList` which are the Tabs. Use
        `React.Children.map` and pass the index of the Tab to it. You
        could use `React.cloneElement` but there are some drawbacks.
        Another way is to create another type of context so we can
        pass index down from `TabList` to `Tab`.
      </li>
      <li>
        For the panels, use the HTML `hidden` attribute to hide panels
        that are not active. Note, you are going to need to iterate in
        `TabPanels` similarly to the task above in order to pass down
        the index of each panel so it can compare itself to the
        selectedIndex it will get from context.
      </li>
      <li>
        Add a `data-selected` attribute to the tab that is selected.
      </li>
      <li>
        Add these ARIA roles to the appropriate places: `tablist`,
        `tab`, and `tabpanel`
      </li>
      <li>Add aria-selected="true" (or false) for each tab.</li>
      <li>Forward refs.</li>
    </ul>
  )
}

export function TaskTwo() {
  return (
    <ul>
      <li>
        Implement an `onChange` with the `Tabs` component so we can
        let the owner know when the index has changed.
      </li>
      <li>
        Implement an `onClick` with the `Tab` component. Be sure to
        wrap with `wrapEvent`. Remember the whole point of this is
        that we have our own onClick we're passing to tab so
        `wrapEvent` will make a single onClick function from the one
        passed in through props and our internal one. This will also
        allow the owner to do `event.preventDefault` which will cancel
        our internal event from firing.
      </li>
    </ul>
  )
}

export function TaskThree() {
  return (
    <ul>
      <li>
        Give the option for the owner to control the index by passing
        an `index` prop in.
      </li>
      <li>
        Implement `aria-controls` (The tab controls the panel) and
        `aria-labelledby` (the panel is labeled by the tab). This
        requires a unique ID for all Tabs and Tab Panels. One idea is
        to make a `tabsId` and then you can use this along with the
        indexes of Tabs and Tab Panels to create a completely unique
        ID
      </li>
    </ul>
  )
}
