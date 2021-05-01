import express from "express";
import StarMatch from "../../components/widgets/StarMatch";

import React from "react";
import { renderToString } from "react-dom/server";
import hbs from "handlebars";

const router = express.Router();
router.get("/", async (req, res) => {
  const theHtml = `
    <html>
        <head><title>Star Match Game</title></head>
           <body>
            <h1 class="center">Star Match Game</h1>
            <div id="starGame">{{{starGame}}}</div>
            <script src="/starGame.js" charset="utf-8"></script>
            <script src="/vendor.js" charset="utf-8"></script>   
            <link rel="stylesheet" href="/index.css">
        </body>
    </html>
    `;

  const hbsTemplate = hbs.compile(theHtml);
  const reactComp = renderToString(<StarMatch />);
  const htmlToSend = hbsTemplate({ starGame: reactComp });

  res.send(htmlToSend);
});

export default router;
