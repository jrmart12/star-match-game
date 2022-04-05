import React from "react";
import { utils, colors } from "../utils/utils";
const PlayNumber = (props) => {
  return (
    <button
      className="number"
      onClick={() => props.onClick(props.number, props.status)}
      style={{ backgroundColor: colors[props.status] }}
    >
      {props.number}
    </button>
  );
};

export default PlayNumber;
