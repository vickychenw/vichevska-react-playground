import session from "express-session";
const redis = require("redis");
const redisStore = require("connect-redis")(session);

//Redis support up to 16 multiple databases
const redisClient = redis
  .createClient({
    host: "localhost",
    port: 6379,
    password: "",
    db: 0,
  })
  .on("error", (err) => {
    console.log(err);
    throw err;
  });

//Initialize the session
//sessions are only sent via secured traffic, aka secure: true
const redisSession = session({
  secret: "some$ession$ecre+",
  resave: false,
  saveUninitialized: false,
  name: "mySession",
  cookie: {
    sameSite: true,
    secure: true,
    httpOnly: true,
    maxAge: 300000, //Equal to 5redis minutes
  },
  store: new redisStore({ client: redisClient }),
});

export { redisSession };
