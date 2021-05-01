import React from "react";
import { hydrate } from "react-dom";
import App from "./App";
//import GHCard from '../GHCard';

/**
 * React is client side - it renders DOM and hydrate the components to get them working.
 *
 * e.g of a typical entry opint script:
 * ReactDOM.render(<MyApp/>, document.getElementByID('root'));
 *
 * When we render our components as plain HTML string, our application is just a plain
 * HTML application; not a React app, no rendering or binding occurred.
 *
 * In order to convert it into a React app, we need to hydrate the HTML
 *
 */

//This is the entry point to the app
//Webpack will build this entry polint and deploy it into the public folder/
//hydrate([<MyApp/>, <Display/>], document.getElementById("reactele"));//arrays of components

//hydrate(<div><MyApp/><Display/></div>, document.getElementById("reactele"));//embedded into a div react element

//Using React.Fragment, similar to using a div to wrap, no new parents introduced
// hydrate(<React.Fragment>
//         <MyApp/><Display/>
//     </React.Fragment>,
//      document.getElementById("reactele"));

//Empty tags, short form of React.Fragment
hydrate(
  <>
    <App />
  </>,
  document.getElementById("reactele")
);
