/* @flow */

var path = require("path");

var express = require("express");
var rollbar = require("rollbar");
var morgan = require("morgan");
var app = express();
var Mincer = require("mincer");
var i18n = require('i18n-2');
var _ = require("lodash");
var debug = require('debug')('http')
var mung = require('express-mung');

_.mixin({
  'fetch': function(object, property) {
    var result = object[property];
    if (result === undefined) {
      throw new Error("Property '" + property + "' is undefined");
    }
    return result;
  }
});

i18n.expressBind(app, {
  locales: ["ru", "en"],
  defaultLocale: "ru"
  // cookieName: "locale"
});

app.use(function(req, res, next) {
  // req.i18n.setLocaleFromQuery();
  // req.i18n.setLocaleFromCookie();
  req.i18n.setLocale("ru");
  next();
});

Mincer.logger.use(console);

var environment = new Mincer.Environment();
environment.enable('source_maps');
environment.enable('autoprefixer');
environment.appendPath("app/assets/javascripts");
environment.appendPath("app/assets/stylesheets");
environment.appendPath("node_modules");
environment.appendPath("bower_components");

app.use('/assets', Mincer.createServer(environment));
app.use(rollbar.errorHandler(process.env.ROLLBAR_BACKEND_TOKEN));

if (process.env.NODE_ENV == "production") {
  environment.cache = new Mincer.FileStore(path.join(__dirname, "cache"));
  environment.jsCompressor  = 'uglify';
  environment.cssCompressor = 'csswring';
  environment = environment.index;
}

app.engine("jade", require("jade").__express);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.static(path.join(__dirname, "../public")));

app.use(morgan("combined"));

var helpers = require("./helpers.js");
app.locals = helpers({environment: environment, _: _});

var routes = require("./routes.js");
app.use("/", routes);

app.use(mung.json(function (body) {
  return body.replace(/href="(.*?hexlet\.io.*?)"/i, 'href="$1?utm=ehu"');
}))

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  debug('Example app listening at http://%s:%s', host, port);
});
