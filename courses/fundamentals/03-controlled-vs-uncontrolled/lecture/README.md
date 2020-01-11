# Notes for Instructor

When it comes to inputs, there are two types of them, "uncontrolled" and
"controlled" inputs.

In practical terms, an uncontrolled component is one whose value is changed
exclusively by the _user interacting with it_.

You can still set the initial state of an uncontrolled component with
defaultValue (and defaultChecked).

A controlled component is one that does not own its state, but rather its
state is controlled by the component that rendered it.

In practical terms it means the state is controlled exclusively by the
_programmer_.

The only time you need a controlled component is when you need to change the
value of an input by some other means than the user interacting with it.

If you need the value of a component in your state, but you don't ever set
the value of the component with anything other than the user interacting
with it, you can use either controlled or uncontrolled, it's the same.
