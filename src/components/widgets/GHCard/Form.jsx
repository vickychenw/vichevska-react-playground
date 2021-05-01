import React from "react";
import axios from "axios";

class Form extends React.Component {
  //Create a react ref to be used to reference the textbox
  //usernameInput = React.createRef();

  //Instead of using a ref, use state hooks
  state = {
    username: "",
  };

  handleSubmit = async (e) => {
    console.log("in handleSubmit");
    e.preventDefault(); //avoid postback

    //e.stopPropagation();
    //
    //let value = this.usernameInput.current.value;
    console.log(`>>> usernameInput=${this.state.username}`);

    //axios returns a data object
    const result = await axios.get(
      `https://api.github.com/users/${this.state.username}`
    );

    //console.log(`>>> result = ${data}`);

    //props is available to class and functional components for parents to pass to their children
    //The parent passed a ref to the onAddProfile() to down this child, so that we can execute the parent's function here
    //and pass back data to the parent
    this.props.onAddProfile(result.data);

    //reset the field
    this.setState({ username: "" });
  };

  /**
   * Since we are using a class component,we will also use class comp hooks
   * which requires to define a state objec and change this object on the
   * component's using onChange
   *
   */
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={(e) => this.setState({ username: e.target.value })}
          placeholder="GitHub username"
          required
        />
        <button>Add Card</button>
      </form>
    );
  }
}

export default Form;
