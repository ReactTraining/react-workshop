# Delegating State Control

Implement support for controlled and uncontrolled state in `Disclosure`.

Use the `open` prop along with `onChange` to allow consumers of `Disclosure` to manage its state externally. These are the same props used on native HTML `details` and `summary` components.

If the component is uncontrolled (or...controlled internally), `defaultOpen` can be used to establish the initial state of the panel. `onChange` should be called when the state changes regardless of who controls the state.

## Hints

You get to decide on how to compose the parts, how low- or high-level you want the API to be. You can also create lower level components and then compose them for a simpler API if you'd prefer. This is your design, just make sure it's intentional!
