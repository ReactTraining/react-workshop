import * as React from "react";
import { GoVersions } from "react-icons/go";
import { Columns, Column } from "react-flex-columns";
import { ReactFCNoChildren } from "YesterTech/types";
import "YesterTech/PrimaryFooter.scss";

const PrimaryFooter: ReactFCNoChildren = (): React.ReactElement => (
  <footer className="primary-footer spacing">
    <hr />
    <Columns split>
      <Column>
        <GoVersions />
      </Column>
      <Column className="text-small">
        Copyright &copy; {new Date().getFullYear()} YesterTech Inc
      </Column>
    </Columns>
  </footer>
);

export default PrimaryFooter;
