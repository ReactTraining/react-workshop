import * as React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "YesterTech/Notice.scss";

interface NoticeProps {
  type?: "default" | "error" | "success";
}

const Notice: React.FC<NoticeProps> = ({ children, type = "default" }) => (
  <div className={classnames("notice", `notice-type-${type}`)}>{children}</div>
);

Notice.propTypes = {
  type: PropTypes.oneOf(["default", "error", "success"]),
};

export default Notice;
