import React from "react";

// This is a function component
function Display(props) {
  // [counter, setCounter] = useState() - global function that returns an array of 2 elements

  // useState() results:
  // counter - state object (getter)
  // setCounter- updater function (setter)
  return <span>{props.message}</span>;
}

export default Display;
