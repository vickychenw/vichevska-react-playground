import React from "react";

// This is a function component
function Button(props) {
  //useEffects - React hook available globally
  // Hooks - global function that returns an array of 2 elements
  //use destructing to get the elements
  //const [counter, setCounter] = useState(0) ;//initialize to 0

  // const handleClick = () => setCounter(counter+1) ;
  // useState() results:
  // counter - state object (getter)
  // setCounter- updater function (setter)
  // return (
  //     <button type="button" onClick={ handleClick}>
  //     Counter: {counter}
  //     </button>
  // );

  const handleClick = () => props.onClickFunction(props.increment);
  return (
    <button type="button" onClick={handleClick}>
      + {props.increment}
    </button>
  );
}

export default Button;
