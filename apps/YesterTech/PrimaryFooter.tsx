import * as React from "react";
import { GoVersions } from "react-icons/go";
import { Columns, Column } from "react-flex-columns";
import { ReactComponentWithoutChildren } from "YesterTech/types";
import "YesterTech/PrimaryFooter.scss";

const PrimaryFooter: ReactComponentWithoutChildren = function PrimaryFooter(): React.ReactElement {
  return (
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
};

export default PrimaryFooter;
