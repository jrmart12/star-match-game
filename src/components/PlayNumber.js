import React from "react";

const PlayNumber = (props) => {
  const handleClick = () => {
    console.log("Num", props.number);
  };
  return (
    <button className="number" onClick={handleClick}>
      {props.number}
    </button>
  );
};

export default PlayNumber;
