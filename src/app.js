const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { init: initHandlebars } = require('./helpers/handlebars');
const { sessionInit: initSession } = require('./helpers/redis');

const app = express();

initHandlebars(app);
initSession(app);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'assets')));

app.use(function (request, response, next) {
  response.locals.name = 'Alexandre';
  response.locals.age = 38;
  if (request.session.user) {
    response.locals.user = request.session.user;
  }
  next();
});

app.use('/', require('./routes/site'));

app.listen(process.env.PORT || 3000);
