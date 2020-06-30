import React from "react";
import "./Button.scss";

type IProps = {
  text: string;
  clickHandler: () => void;
};

function Button(props: IProps) {
  return (
    <button className="form-button" onClick={props.clickHandler} type="submit">
      {props.text}
    </button>
  );
}

export { Button };
