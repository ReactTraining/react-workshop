import * as React from "react";
import * as ReactDOM from "react-dom";
import { position } from "./utils";
import "./styles.scss";

const Portal: React.FC = function Portal({ children }) {
  const portalNode = React.useRef<HTMLElement | null>(null);
  const [, forceUpdate] = React.useState<any>();

  React.useLayoutEffect(() => {
    portalNode.current = document.createElement("portal");
    document.body.appendChild(portalNode.current);
    forceUpdate({});
    return () => {
      if (portalNode.current) {
        document.body.removeChild(portalNode.current);
      }
    };
  }, []);

  return portalNode.current
    ? ReactDOM.createPortal(children, portalNode.current)
    : null;
};

interface PopoverProps {
  targetRef: React.RefObject<HTMLElement | null | undefined>;
}

const Popover: React.FC<PopoverProps> = function Popover({
  children,
  targetRef,
}) {
  const popoverRef = React.useRef<HTMLElement | null>(null);
  const [styles, setStyles] = React.useState({});

  // Doing this work in a ref callback helps overcome a race-condition where
  // we need to ensure the popoverRef has been established. It's established
  // later than we might expect because the div it's applied to is the children
  // of Portal which returns null initially (which it must do)
  function initPopoverRef(el: HTMLDivElement) {
    // initPopoverRef will be called numerous times, lets do this work once.
    if (!popoverRef.current) {
      popoverRef.current = el;
      if (targetRef.current && popoverRef.current) {
        const targetRect = targetRef.current.getBoundingClientRect();
        const popoverRect = popoverRef.current.getBoundingClientRect();
        setStyles(position(targetRect, popoverRect));
      }
    }
  }

  return (
    <Portal>
      <div
        ref={initPopoverRef}
        data-popover=""
        // So the window won't close the popup when it gets the click
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          ...styles,
        }}
      >
        {children}
      </div>
    </Portal>
  );
};

const Define: React.FC = function Define({ children }) {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useLayoutEffect(() => {
    const listener = (event: MouseEvent) => {
      if (event.target !== buttonRef.current) {
        setOpen(false);
      }
    };
    window.addEventListener("click", listener);
    return () => window.removeEventListener("click", listener);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        // This works, sort of. But it fails if we want to select the
        // text of the popup itself. So do the window listener instead.
        // onBlur={() => setOpen(false)}
        className="as-link"
      >
        {children}
      </button>
      {open && (
        <Popover targetRef={buttonRef}>
          Hooks are a way to compose behavior into components
        </Popover>
      )}
    </>
  );
};

export default function App() {
  return (
    <p>
      Modern React is filled with <Define>Hooks</Define>. They work with
      function-components and they give us an ability to use state and other
      React features similarly to class-based components.
    </p>
  );
}
