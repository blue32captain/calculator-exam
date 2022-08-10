import React from "react";
import PropTypes from "prop-types";

import "./Display.css";

interface Props {
  value: string;
}

const Display = (props: Props) => {
  return (
    <div className="component-display">
      <div>{props.value}</div>
    </div>
  );
};

export default Display;
