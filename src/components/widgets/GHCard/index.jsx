import React, { useState } from "react";
import CardList from "./CardList";
import Form from "./Form";

const GHCard = (props) => {
  const [profiles, setProfiles] = useState([]);
  const [error, setErrMsg] = useState(null);

  const setStates = {
    profiles: setProfiles,
    error: setErrMsg,
  };

  //create a function and pass  it as a reference to the Form comp, so that it can call us and pass us some data back
  const addNewProfile = (profileData) => {
    console.log(`>>>profileData = ${JSON.stringify(profileData)}`);

    //Alternative to set state
    //setStates.profiles([profileData]);

    //Create a new array = existing + new profile
    setProfiles([...profiles, profileData]);
  };
  // setStates.profiles(testData);

  return (
    <div key="GHCard">
      <h1>GitHub Cards</h1>
      <Form onAddProfile={addNewProfile} />
      <CardList title="GitHub Cards" profiles={profiles} />
    </div>
  );
};

export default GHCard;
