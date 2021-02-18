const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient();

const sessionInit = function (app) {
  app.use(
    session({
      name: 'sess',
      store: new RedisStore({ client: redisClient }),
      secret: 'my-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 1800000 },
    })
  );
};

module.exports = { sessionInit, redisClient };
