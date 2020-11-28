import * as React from "react";
import { GoVersions } from "react-icons/go";
import "YesterTech/Logo.scss";
import { ReactComponentWithoutChildren } from "YesterTech/types";

const Logo: ReactComponentWithoutChildren = function Logo(): React.ReactElement {
  return (
    <span className="logo vertical-middle">
      <GoVersions />{" "}
      <span>
        Yester<strong>Tech</strong>
      </span>
    </span>
  );
};

export default Logo;
