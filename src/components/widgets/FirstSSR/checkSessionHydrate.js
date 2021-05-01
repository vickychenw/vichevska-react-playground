import React from "react";
import { hydrate } from "react-dom";
import CheckSession from "./checksession";

//pick up inputName from the window object
hydrate(
  //the session var will be made available via props
  <CheckSession inputName={window.inputName} />,
  document.getElementById("reactele")
);
