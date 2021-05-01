import React from "react";
import Avatar from "./Avatar";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const profile = this.props;

    return (
      <div
        key={`card-${this.props.id}`}
        className="github-profile"
        style={{ margin: "1rem" }}
      >
        <Avatar url={profile.avatar_url} />
        <div
          key="cardBody"
          className="info"
          style={{ display: "inline-block", marginLeft: 10 }}
        >
          <div key="cardContent" className="name" style={{ fontSize: "125%" }}>
            {profile.name}
          </div>
          <div key="cardCompany" className="login">
            {profile.login}
          </div>
          <div key="cardCompany" className="company">
            {profile.company}
          </div>
          <div key="cardTitle" className="title">
            {this.props.title}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
