import React from "react";
import Button from "./Button";
import Display from "./Display";

//Demo of a class components
class App extends React.Component {
  //Don't need constructor if not initializing state nor binding methods
  constructor(props) {
    super(props); //initialize props

    //constructors are used for 2 purposes:
    //1. initialize local state by assigning an object to this.state
    //2. building event handler methods to an instance

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.incrementCounter = this.incrementCounter.bind(this);

    //start with an empty state
    this.state = {
      name: "",
      msg: "",
      counter: 0,
    };

    //Avoid introducing side-effects or subscriptions in the constructionr.  They should be used in componentDidMount() instead.
  }

  incrementCounter = (increment) => {
    //console.log(e);

    //React Hooks
    this.setState({ counter: this.state.counter + increment });
    //e.preventDefault();

    //console.log(`In incrementCounter () counter=${this.state.counter}`);
  };

  // Handlers
  handleButtonClick = (e) => {
    const nameLen = this.state.name.length;
    if (nameLen > 0) {
      this.setState({
        msg: `Your name has ${nameLen} characters including space`,
      });
    }
    e.preventDefault();
  };

  handleTextChange = (e) => {
    this.setState({ name: e.target.value });
    e.preventDefault();
  };

  //this is handled by React, do not trigger a Form submit
  handleReset = (e) => {
    this.setState({
      name: "",
      msg: "",
    });

    e.preventDefault();
  };
  // End of Handlers

  // This is the ONLY required method
  // should be pure and not modify any component state, return same result each time its invoked and DOES  NOT directly interact with the browser
  // this will not be invoked if shouldComponentUpdate() returns false
  render() {
    let msg;

    if (this.state.msg !== "") {
      msg = <p>{this.state.msg}</p>;
    } else {
      msg = "";
    }

    return (
      //do something here where there is a button that will replace the text
      <form id="myForm" name="formName" method="post">
        <div>
          <label>Your name: </label>
          <input
            type="text"
            id="txtName"
            name="txtName"
            value={this.state.name}
            onChange={this.handleTextChange}
            required
          />
          <button id="btnSubmit" type="button" onClick={this.handleButtonClick}>
            Calculate Name Length
          </button>
          <button id="btnReset" onClick={this.handleReset}>
            Reset All
          </button>
          <br />
          <Button
            onClickFunction={this.incrementCounter}
            counter={this.state.counter}
            increment={5}
          />
          <Button
            onClickFunction={this.incrementCounter}
            counter={this.state.counter}
            increment={10}
          />
          <Button
            onClickFunction={this.incrementCounter}
            counter={this.state.counter}
            increment={15}
          />
          <Display message={this.state.counter} />
          <hr />
          {msg}
        </div>

        <button type="submit" id="submitPage">
          Submit for Session
        </button>
      </form>
    );
  }
}

export default App;
