import express from "express";
import App from "../components/widgets/FirstSSR/App";
import CheckSession from "../components/widgets/FirstSSR/checksession";

import React from "react";
import { renderToString } from "react-dom/server";

// Using Handlebar as the template engine
import hbs from "handlebars";

const router = express.Router();
router.get("/", async (req, res) => {
  //Creating an HTML template for React DOM to render onto it
  const theHtml = `
    <html>
        <head><title>My First SSR</title></head>
           <body>
            <h1>My First Server Side Render</h1>
            <div id="reactele">{{{reactele}}}</div>
            <script src="/app.js" charset="utf-8"></script>
            <script src="/vendor.js" charset="utf-8"></script>
            
        </body>
    </html>
    `;

  //convert into a Handlebar Template
  const hbsTemplate = hbs.compile(theHtml);

  //call MyApp.render() and convert into string (HTML markups)
  //1 - session can be passed in here renderToString(<App  sessionVar={req.session.someVar}/>);
  // this will render the component with values from the server
  //2 - pass the session using 'window' object - this will render the value dueing component mount
  //e.g /checksession route below
  const reactComp = renderToString(<App />);

  //Replace the React DOM (MyApp) into the handlebar varible {{{reactele}}}
  const htmlToSend = hbsTemplate({ reactele: reactComp });

  //Return the HTML markup
  res.send(htmlToSend);
});

//req.session is available when we initialize our express server with RedisStore
//To retrieve a session - req.session.inputName
router.post("/", async (req, res) => {
  console.log("something is being posted");

  //req.session refers to the RedisStore we configured in server.js

  //Create a session (name=inputName) and store the posted value
  req.session.inputName = req.body.txtName;

  //Adding the session to the window object
  const sessionValue = `<script type="text/javascript">
   window.inputName="${req.session.inputName}";
   </script>`;

  //Add the above script to this template, to be hydrated and shipped as a React comp
  const theHtml = `
   <html>
   <head>
       <title>My First SSR</title>
       ${sessionValue}
   </head>
   <body>
   <div id="reactele">{{{reactele}}}</div>
   <script src="/checkSession.js" charset="utf-8"></script>
   <script src="/vendor.js" charset="utf-8"></script>
   </body>
   </html>
   `;

  //After the user post the value, it gets added to the session req.session.input (Redis)
  //then gets redirected to this page (/checksession), which injects the session => window obj
  //compile the CheckSession comp that loads the session
  //the comp gets sent to the browser, and then loads the value onto the comp on mount
  const hbsTemplate = hbs.compile(theHtml);
  const reactComp = renderToString(<CheckSession />);
  const htmlToSend = hbsTemplate({ reactele: reactComp });
  console.log(req.session.inputName);
  return res.send(htmlToSend);

  //alternatively, can redirect onto another page to display the session
  return res.redirect("/firstssr/checksession");
});

router.get("/checksession", async (req, res) => {
  //req.session => RedisStore

  //Adding the session to the window object
  const sessionValue = `<script type="text/javascript">
    window.inputName="${req.session.inputName}";
    </script>`;

  //Add the above script to this template, to be hydrated and shipped as a React comp
  const theHtml = `
    <html>
    <head>
        <title>My First SSR</title>
        ${sessionValue}
    </head>
    <body>
    <div id="reactele">{{{reactele}}}</div>
    <script src="/checkSession.js" charset="utf-8"></script>
    <script src="/vendor.js" charset="utf-8"></script>
    </body>
    </html>
    `;

  //After the user post the value, it gets added to the session req.session.input (Redis)
  //then gets redirected to this page (/checksession), which injects the session => window obj
  //compile the CheckSession comp that loads the session
  //the comp gets sent to the browser, and then loads the value onto the comp on mount
  const hbsTemplate = hbs.compile(theHtml);
  const reactComp = renderToString(<CheckSession />);
  const htmlToSend = hbsTemplate({ reactele: reactComp });
  console.log(req.session.inputName);
  return res.send(htmlToSend);
});

export default router;
