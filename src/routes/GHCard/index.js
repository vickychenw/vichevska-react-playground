import express from "express";
import GHCard from "../../components/widgets/GHCard";

import React from "react";
import { renderToString } from "react-dom/server";
import hbs from "handlebars";

const router = express.Router();
router.get("/", async (req, res) => {
  const theHtml = `
    <html>
        <head><title>GH Cards</title></head>
           <body>
            <h1></h1>
            <div id="cardsComp">{{{cardsComp}}}</div>
            <script src="/ghCard.js" charset="utf-8"></script>
            <script src="/vendor.js" charset="utf-8"></script>            
        </body>
    </html>
    `;

  const hbsTemplate = hbs.compile(theHtml);
  const reactComp = renderToString(<GHCard />);
  const htmlToSend = hbsTemplate({ cardsComp: reactComp });

  res.send(htmlToSend);
});

export default router;
