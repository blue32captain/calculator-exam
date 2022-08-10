import React from "react";
import "./Button.css";

interface Props {
  name: string;
  orange?: boolean;
  gray?: boolean;
  wide?: boolean;
  clickHandler: (name: string) => void;
}

const Button = (props: Props) => {
  const handleClick = () => {
    props.clickHandler(props.name);
  };

  const className = [
    props.orange ? "orange" : "",
    props.gray ? "gray" : "",
    props.wide ? "wide" : "",
  ];

  return (
    <button className={className.join(" ").trim()} onClick={handleClick}>
      {props.name}
    </button>
  );
};

export default Button;
