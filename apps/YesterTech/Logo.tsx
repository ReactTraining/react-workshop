import * as React from "react";
import { GoVersions } from "react-icons/go";
import "YesterTech/Logo.scss";
import { ReactFCNoChildren } from "YesterTech/types";

const Logo: ReactFCNoChildren = (): React.ReactElement => (
  <span className="logo vertical-middle">
    <GoVersions />{" "}
    <span>
      Yester<strong>Tech</strong>
    </span>
  </span>
);

export default Logo;
