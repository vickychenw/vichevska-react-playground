import React from "react";

// This is a class component
class Avatar extends React.Component {
  //Don't need constructor if not initializing state nor binding methods
  // constructor(props) {
  //   super(props); //initialize props

  //   this.state={
  //     profiles:testData
  //   }
  // }

  //Same as having a constructor above
  // state = {
  //   profiles: testData,
  // };

  // getDerivedStateFromProps() {}

  // shouldComponentUpdate() {}
  render() {
    return (
      <div>
        <img src={this.props.url} />
      </div>
    );
  }

  // getSnapshotBeforeUpdate() {}

  // componentDidMount() {}

  // componentDidUpdate() {}

  // componentWillUnmount() {}

  //Error Handling
  // geteDerivedStateFromError() {}
  // componentDidCatch() {}

  //Other API
  // setState() {}
  // forceUpdate() {}
}

export default Avatar;
