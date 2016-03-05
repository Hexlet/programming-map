/* @flow */

var yaml = require('js-yaml');
var fs = require('fs');

var data = function () {
  var mapFiles = fs.readdirSync('maps');
  var pagesFiles = fs.readdirSync('pages');
  var pointLangs = fs.readdirSync('points');
  // var doc = yaml.safeLoad(fs.readFileSync("/home/ixti/example.yml", "utf8"));

  var maps = mapFiles.reduce(function (acc, value) {
    var content = yaml.safeLoad(fs.readFileSync('maps/' + value, 'utf8'));
    var stackName = value.split('.')[0];
    acc[stackName] = content;
    return acc;
  }, {});

  var pages = pagesFiles.reduce(function (acc, value) {
    var content = yaml.safeLoad(fs.readFileSync('pages/' + value, 'utf8'));
    var params = value.split('.');
    var lang = params[1];
    if (acc[lang] === undefined) {
      acc[lang] = {};
    }
    acc[lang][params[0]] = content;

    return acc;
  }, {});

  var points = pointLangs.reduce(function (acc, lang) {
    var langPointFiles = fs.readdirSync('points/' + lang);

    var langPoints = langPointFiles.reduce(function (acc, value) {
      var content = yaml.safeLoad(fs.readFileSync('points/' + lang + '/' + value, 'utf8'));
      var pointName = value.split('.')[0];
      acc[pointName] = content;
      return acc;
    }, {});

    acc[lang] = langPoints;
    return acc;
  }, {});

  return { pages: pages, maps: maps, points: points };
};

module.exports = data;
