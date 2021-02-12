const exphbs = require('express-handlebars');
const { PARTIALS_DIR, LAYOUTS_DIR, VIEWS_DIR } = require('./constants');

exports.init = function (app) {
  app.engine(
    'html',
    exphbs({
      extname: 'html',
      partialsDir: PARTIALS_DIR,
      layoutsDir: LAYOUTS_DIR,
      helpers: {
        section: function (name, options) {
          if (!this._sections) this._sections = {};
          this._sections[name] = options.fn(this);
          return null;
        },
        truncate: function (text) {
          let str = text?.length >= 100 ? text.slice(0, 100) + '...' : text;

          return str.replace(/(<([^>]+)>)/gi, '');
        },
        date: function () {
          return new Date().getFullYear();
        },
      },
    })
  );
  app.set('view engine', 'html');
  app.set('views', VIEWS_DIR);
};
