import * as React from "react";
import "YesterTech/SubNav.scss";

const SubNav: React.FC = function SubNav({ children }) {
  return <nav className="sub-nav">{children}</nav>;
};

export default SubNav;
