/* @flow */

import path from 'path';
import pug from 'pug';
import express from 'express';
import rollbar from 'rollbar';
import morgan from 'morgan';
import Mincer from 'mincer';
import i18n from 'i18n-2';
import _ from 'lodash';
import debug from 'debug';
import mung from 'express-mung';

const log = debug('app:http');
const app = express();

_.mixin({
  fetch: (object, property) => {
    const result = object[property];
    if (result === undefined) {
      throw new Error(`Property '${property}' is undefined`);
    }
    return result;
  },
});

i18n.expressBind(app, {
  locales: ['ru', 'en'],
  defaultLocale: 'ru',
  // cookieName: "locale"
});

app.use((req, res, next) => {
  // req.i18n.setLocaleFromQuery();
  // req.i18n.setLocaleFromCookie();
  req.i18n.setLocale('ru');
  next();
});

Mincer.logger.use(console);

let environment = new Mincer.Environment();
environment.enable('source_maps');
environment.enable('autoprefixer');
environment.appendPath('app/assets/javascripts');
environment.appendPath('app/assets/stylesheets');
environment.appendPath('node_modules');
environment.appendPath('bower_components');

app.use('/assets', Mincer.createServer(environment));
app.use(rollbar.errorHandler(process.env.ROLLBAR_BACKEND_TOKEN));

if (process.env.NODE_ENV === 'production') {
  environment.cache = new Mincer.FileStore(path.join(__dirname, 'cache'));
  environment.jsCompressor = 'uglify';
  environment.cssCompressor = 'csswring';
  environment = environment.index;
}

app.engine('pug', pug.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '../public')));

app.use(morgan('combined'));

const helpers = require('./helpers.js');
app.locals = helpers({ environment, _ });

const routes = require('./routes.js');
app.use('/', routes);

app.use(mung.json((body) => {
  return body.replace(/href="(.*?hexlet\.io.*?)"/i, 'href="$1?utm=ehu"');
}));

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  log('Example app listening at http://%s:%s', host, port);
});
