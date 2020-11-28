import * as React from "react";

const TabsContext = React.createContext();
const TabContext = React.createContext();
const PanelContext = React.createContext();

export function Tabs({ children, ...props }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const context = {
    selectedIndex,
    setSelectedIndex,
  };

  return (
    <TabsContext.Provider value={context}>
      <div {...props} className="tabs">
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabList({ children, ...props }) {
  children = React.Children.map(children, (child, index) => {
    return <TabContext.Provider value={index} children={child} />;
  });

  return (
    <div {...props} className="tab-list" role="tablist">
      {children}
    </div>
  );
}

export function Tab({ children, disabled, ...props }) {
  const index = React.useContext(TabContext);
  const { selectedIndex, setSelectedIndex } = React.useContext(TabsContext);
  const selected = index === selectedIndex;

  return (
    <button
      role="tab"
      {...props}
      aria-selected={selected}
      disabled={disabled}
      className="tab"
      data-selected={selected ? "" : undefined}
      onClick={() => setSelectedIndex(index)}
    >
      {children}
    </button>
  );
}

export function TabPanels({ children, ...props }) {
  children = React.Children.map(children, (child, index) => {
    return <PanelContext.Provider value={index} children={child} />;
  });

  return (
    <div {...props} className="tab-panels">
      {children}
    </div>
  );
}

export function TabPanel({ children, ...props }) {
  const index = React.useContext(PanelContext);
  const { selectedIndex } = React.useContext(TabsContext);
  const selected = selectedIndex === index;

  return (
    <div role="tabpanel" {...props} hidden={!selected} className="tab-panel">
      {children}
    </div>
  );
}

export function DataTabs({ data }) {
  return (
    <Tabs>
      <TabList>
        {data.map((tab) => (
          <Tab>{tab.label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {data.map((tab) => (
          <TabPanel>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
