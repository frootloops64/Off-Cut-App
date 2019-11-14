import React from "react";

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10, marginLeft: 10}} className={`btn ${props.buttonType}`}>
      {props.children}
    </button>
  );
}