const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient();

const sessionInit = function (app) {
  app.use(
    session({
      name: "teste",
      store: new RedisStore({ client: redisClient }),
      secret: "my-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 20000 },
    })
  );
};

module.exports = { sessionInit, redisClient };
