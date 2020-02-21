# Notes for Instructor

Start by opening `index.js` and `Menu.js`

This is a three-part lecture:

1. Code Walk through (optional) - Explain how Reach uses portals to build the `Menu`'s dropdown.
2. Code Walk through (optional) - Explain and how we get indexes with `useDescendant()` and `useDescendants()`
3. Live Code - Keyboard events for navigation and accessibility.

## 1. Menu Popup (and dynamic portals) (optional)

- This is more of a code walk-through than any programming on the behalf of the instructor
- `Popover` and `Portal` are general use utility components used all over Reach UI.
- `Menu` uses `Popup` which creates a dynamic portal mounting node.
- The menu can be used in the following two ways:

```jsx
// The more conventional way is to use `MenuList` which is the combination of
// `MenuPopover` and `MenuItem` for easy use.
<Menu>
  <MenuButton>Menu</MenuButton>
  <MenuList>
    <MenuItem>Item One</MenuItem>
    <MenuItem>Item Two</MenuItem>
  </MenuList>
</Menu>

// For more custom use-cases, the owner can implement `MenuPopover` and `MenuItem`
// on their own, perhaps to have an arbitrary `div`
<Menu>
  <MenuButton>Menu</MenuButton>
  <MenuPopover>
    <div>
      <MenuItems>
        <MenuItem>Item One</MenuItem>
        <MenuItem>Item Two</MenuItem>
      </MenuItems>
    </div>
  </MenuPopover>
</Menu>
```

Main takeaways:

- Popups should use portals (to mount to root) so that we:
  - can avoid CSS pitfalls by doing the popup inline next to the target.
  - can do fancy algo stuff to adjust the popup's position so it doesn't collide with the viewport.
- Our code should be easy to use and it's possible we might need several things portalled at once. So we need to make the mount points for our portals dynamic.
- We need to get the target button's position. Since this is an imperative process to get DOM measurements, refs will be added
- The internal ref for the button needs to be known in several places in the Compound Component. So we'll create it at the top where the provider is and we'll pass it around using context.
- One issue is that we're already forwarding refs to the button, so we'll implement a utility for combining refs together so we can combine our internal ref with any possible refs forwarded to us.

## 2. Indexes with `useDescendant()` and `useDescendants()` (optional)

`useDescendants` is a way for a particular descendant (in our case `MenuItem`) to "register" itself with the top node of a Compound Component for the purposes of providing it's ref and index (order that it showed up). It's particularly useful since with Compound Components, children's indexes are unknown. See this page for a detailed explanation: https://github.com/reach/reach-ui/tree/master/packages/descendants

## 3. Keyboard Events

### `MenuButton`

- Handle `onKeyDown` for "DownArrow" to open the menu and set the `activeIndex` to 0
  - This might be a good chance to talk about useReducer and "jumbled state".

### `MenuItems`

- Handle `onKeyDown` for
  - "Escape" - closes
  - "Home" - selects first
  - "End" - selects last
  - "UpArrow" - moves up
  - "DownArrow" - moves down
  - "Tab" - `event.preventDefault` to prevent tabbing out when open

### `MenuItem`

- Handle `onKeyDown` for "Enter"
