import * as React from "react";
import { wrapEvent } from "../../utils";
import { useId } from "../../useId";

const AccordionContext = React.createContext();

/**
 * Accordion
 */

export const Accordion = React.forwardRef(
  (
    {
      children,
      onChange,
      index: controlledIndex,
      defaultIndex = 0,
      id,
      ...props
    },
    forwardedRef
  ) => {
    const [selectedIndex, setSelectedIndex] = React.useState(defaultIndex);
    const accordionId = useId(id);

    const isControlled = controlledIndex != null;
    const { current: startsControlled } = React.useRef(isControlled);
    if (isControlled !== startsControlled) {
      console.warn(
        "Cannot change from controlled to uncontrolled or vice versa."
      );
    }

    children = React.Children.map(children, (child, index) => {
      const panelId = `accordion-${accordionId}-panel-${index}`;
      const buttonId = `accordion-${accordionId}-button-${index}`;

      const context = {
        buttonId,
        panelId,
        selected: isControlled
          ? controlledIndex === index
          : selectedIndex === index,
        selectPanel: () => {
          onChange && onChange(index);
          if (!isControlled) {
            setSelectedIndex(index);
          }
        },
      };
      return <AccordionContext.Provider value={context} children={child} />;
    });

    return (
      <div data-accordion="" ref={forwardedRef} {...props}>
        {children}
      </div>
    );
  }
);

Accordion.displayName = "Accordion";

/**
 * Accordion Item
 */

export const AccordionItem = React.forwardRef(
  ({ children, ...props }, forwardedRef) => {
    const { selected } = React.useContext(AccordionContext);

    return (
      <div
        {...props}
        data-accordion-item=""
        data-state={selected ? "open" : "collapsed"}
        ref={forwardedRef}
      >
        {children}
      </div>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

/**
 * Accordion Button
 */

export const AccordionButton = React.forwardRef(
  ({ children, onClick, ...props }, forwardedRef) => {
    const { panelId, selected, selectPanel } = React.useContext(
      AccordionContext
    );

    return (
      <button
        {...props}
        onClick={wrapEvent(onClick, selectPanel)}
        data-accordion-button=""
        data-state={selected ? "open" : "collapsed"}
        aria-expanded={selected}
        aria-controls={panelId}
        ref={forwardedRef}
      >
        {children}
      </button>
    );
  }
);

AccordionButton.displayName = "AccordionButton";

/**
 * Accordion Panel
 */

export const AccordionPanel = React.forwardRef(
  ({ children, ...props }, forwardedRef) => {
    const { buttonId, panelId, selected } = React.useContext(AccordionContext);

    return (
      <div
        role="region"
        {...props}
        id={panelId}
        aria-labelledby={buttonId}
        hidden={!selected}
        data-accordion-panel=""
        data-state={selected ? "open" : "collapsed"}
        ref={forwardedRef}
      >
        {children}
      </div>
    );
  }
);

AccordionPanel.displayName = "AccordionPanel";
