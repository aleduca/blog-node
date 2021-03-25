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
app.use(express.static(path.join(__dirname, '..', 'frontend', 'assets')));

app.use(function (request, response, next) {
  if (request?.session?.user) {
    response.locals.user = request.session.user;
  }
  next();
});

app.use('/', require('./routes/site'));
app.use('/post', require('./routes/post'));
app.use('/comment', require('./routes/comment'));
app.use('/login', require('./routes/login'));
app.use('/search', require('./routes/search'));
app.use('/categories', require('./routes/categories'));
app.use('/category', require('./routes/category'));
app.use('/profile', require('./routes/profile'));

app.listen(process.env.PORT || 3000);
