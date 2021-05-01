import express from "express";
import compression from "compression";
import { redisSession } from "./configuration/session/redis";
import https from "https";
import fs from "fs";
import ssr from "./routes/ssr";
import GHCard from "./routes/GHCard";
import StarGame from "./routes/StarGame";

//
//https://www.npmjs.com/package/express-session#options

const app = express();

//Used by cloud provided to trust first level proxy
app.set("trus proxy", 1);
app.use(compression()); //use compression to serve static content
app.use(express.static("public")); //serves static content from the public folder
//https://expressjs.com/en/api.html#express.json
app.use(express.json());
//https://expressjs.com/en/api.html#express.urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(redisSession);

app.use("/firstssr", ssr);
app.use("/ghCard", GHCard);
app.use("/starGame", StarGame);

//app.use("reactApp", )

const port = process.env.PORT || 3030;

// const fs = require('fs');
// var path = require('path');
// key: fs.readFileSync(path.resolve('server.key')),
// cert: fs.readFileSync(path.resolve('server.cert'))

// Create a server that allows our ap to run with HTTPS/SSL using self-signed cert
https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(port, () => {
    console.info(`Running on HTTPS on Port ${port}`);
  });
