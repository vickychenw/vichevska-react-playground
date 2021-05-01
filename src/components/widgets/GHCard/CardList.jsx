import { render } from "react-dom";
import Card from "./Card";
import React from "react";

function CardList(props) {
  return (
    <div key="CardList">
      {props.profiles.map((profile) => (
        <Card key={profile.id} {...profile} />
      ))}
    </div>
  );
}

// Creates an array of components instances
// [<Card />, <Card />, <Card/>]
// [React.createElement(), React.createElement(), React.createElement()]

export default CardList;
