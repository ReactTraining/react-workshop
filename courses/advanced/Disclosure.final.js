/**
 * Welcome to @reach/disclosure!
 *
 * A disclosure is a button that controls visibility of a panel of content. When
 * the content inside the panel is hidden, it is often styled as a typical push
 * button with a right-pointing arrow or triangle to hint that activating the
 * button will display additional content. When the content is visible, the
 * arrow or triangle typically points down.
 *
 * If you have a group of disclosures that stack vertically and exist within the
 * same logical context, you may want to use @reach/accordion instead.
 *
 * @see Docs     https://reacttraining.com/reach-ui/disclosure
 * @see Source   https://github.com/reach/reach-ui/tree/master/packages/disclosure
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.1/#disclosure
 */
​
import React, { forwardRef, useContext, useRef, useState } from "react";
import {
  createNamedContext,
  makeId,
  useForkedRef,
  wrapEvent,
} from "@reach/utils";
import { useId } from "@reach/auto-id";
import PropTypes from "prop-types";
import warning from "warning";
​
const DisclosureContext = createNamedContext("DisclosureContext", {});
const useDisclosureContext = () => useContext(DisclosureContext);
​
////////////////////////////////////////////////////////////////////////////////
​
const DisclosureStates = {
  Open: "open",
  Collapsed: "collapsed",
};
​
////////////////////////////////////////////////////////////////////////////////
​
/**
 * Disclosure
 *
 * The wrapper component and context provider for a disclosure's button and
 * panel components. A disclosure should only have one button and one panel
 * descendant.
 *
 * @see Docs https://reacttraining.com/reach-ui/disclosure#disclosure-1
 *
 * @param props
 */
export const Disclosure = ({
  children,
  defaultOpen = false,
  onChange,
  open: openProp,
  ...props
}) => {

  // # instance variables with refs
  // Here we're using a ref to keep track of the app changing between controlled
  // and uncontrolled.
  const isControlled = openProp !== null;
  const { current: wasControlled } = useRef(isControlled);
​
  const id = useId(props.id !== null ? String(props.id) : undefined) || "disclosure";
  const panelId = makeId("panel", id);
​
  const [open, setOpen] = useState(isControlled ? openProp : defaultOpen);
​
  if (__DEV__) {
    warning(
      !((isControlled && !wasControlled) || (!isControlled && wasControlled)),
      "Disclosure is changing from controlled to uncontrolled. Disclosure should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled Disclosure for the lifetime of the component. Check the `open` prop being passed in."
    );
  }
​
  function onSelect() {
    onChange && onChange();
    if (!isControlled) {
      setOpen(!open);
    }
  }
​
  const context = {
    onSelect,
    open,
    panelId,
  };
​
  if (isControlled && openProp !== open) {
    /*
     * If the component is controlled, we'll sync internal state with the
     * controlled state
     */
    setOpen(openProp);
  }
​
  return (
    <DisclosureContext.Provider value={context}>
      {children}
    </DisclosureContext.Provider>
  );
};
​
if (__DEV__) {
  Disclosure.displayName = "Disclosure";
  Disclosure.propTypes = {
    children: PropTypes.node.isRequired,
    defaultOpen: PropTypes.bool,
    onChange: PropTypes.func,
    open: PropTypes.bool,
  };
}
​
////////////////////////////////////////////////////////////////////////////////
​
/**
 * DisclosureButton
 *
 * The trigger button a user clicks to interact with a disclosure.
 *
 * @see Docs https://reacttraining.com/reach-ui/disclosure#disclosurebutton
 */
export const DisclosureButton = forwardRef(function DisclosureButton(
  {
    as: Comp = "button",
    children,
    onClick,
    onMouseDown,
    onPointerDown,
    ...props
  },
  forwardedRef
) {
  const { onSelect, open, panelId } = useDisclosureContext();
  const ownRef = useRef(null);
​
  const ref = useForkedRef(forwardedRef, ownRef);
​
  function handleClick(event) {
    event.preventDefault();
    ownRef.current && ownRef.current.focus();
    onSelect();
  }
​
  return (
    <Comp
      aria-controls={panelId}
      aria-expanded={open}
      {...props}
      ref={ref}
      onClick={wrapEvent(onClick, handleClick)}
      data-reach-disclosure-trigger=""
      data-state={open ? DisclosureStates.Open : DisclosureStates.Collapsed}
    >
      {children}
    </Comp>
  );
});
​
if (__DEV__) {
  DisclosureButton.displayName = "DisclosureButton";
  DisclosureButton.propTypes = {
    as: PropTypes.any,
    children: PropTypes.node,
  };
}
​
////////////////////////////////////////////////////////////////////////////////
​
/**
 * DisclosurePanel
 *
 * The collapsible panel in which inner content for an disclosure item is
 * rendered.
 *
 * @see Docs https://reacttraining.com/reach-ui/disclosure#disclosurepanel
 */
export const DisclosurePanel = forwardRef(function DisclosurePanel(
  { children, ...props },
  forwardedRef
) {
  const { panelId, open } = useDisclosureContext();
​
  return (
    <div
      ref={forwardedRef}
      hidden={!open}
      {...props}
      data-reach-disclosure-panel=""
      data-state={open ? DisclosureStates.Open : DisclosureStates.Collapsed}
      id={panelId}
      tabIndex={-1}
    >
      {children}
    </div>
  );
});
​
if (__DEV__) {
  DisclosurePanel.displayName = "DisclosurePanel";
  DisclosurePanel.propTypes = {};
}