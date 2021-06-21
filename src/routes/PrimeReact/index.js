import express from "express";
import DataTableDemo from "../../components/widgets/PrimeReact";

import React from "react";
import { renderToString } from "react-dom/server";
import hbs from "handlebars";

const router = express.Router();
router.get("/", async (req, res) => {
  const theHtml = `
    <html>
        <head><title>React Prime DataTable Demo</title></head>
           <body>
            <h1></h1>
            <div id="datatableComp">{{{datatableComp}}}</div>
            <script src="/primeReact.js" charset="utf-8"></script>
            <script src="/vendor.js" charset="utf-8"></script>            
        </body>
    </html>
    `;

  const hbsTemplate = hbs.compile(theHtml);
  const reactComp = renderToString(<DataTableDemo />);
  const htmlToSend = hbsTemplate({ datatableComp: reactComp });

  res.send(htmlToSend);
});

export default router;
