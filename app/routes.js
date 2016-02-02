/* @flow */

var express = require("express");
var router = express.Router();
var _ = require("lodash");

var data = require("./data.js")();

router.get("/", function (req, res) {
  var params = {
    title: req.i18n.__("welcome.index.title"),
    metaDescription: req.i18n.__("welcome.index.meta.description")
  }
  res.render("index", params);
});

router.get("/pages/:id", function (req, res) {
  var page = _.fetch(data.pages["ru"], req.params.id);
  var params = {
    title: page.name,
    header: page.name,
    page: page
  }
  res.render("pages/show", params);
});

router.get("/stacks/:id", function (req, res) {
  var params = {
    name: req.params.id,
    points: data.points["ru"],
    map: data.maps[req.params.id],
    startCourseUrl: req.i18n.__("stacks.show." + req.params.id + ".startCourseUrl"),
    title: req.i18n.__("stacks.show." + req.params.id + ".name"),
    metaDescription: req.i18n.__("stacks.show." + req.params.id + ".description")
  };

  res.render('stacks/show', params);
});

// router.get("/points/:id", function (req, res) {
//   res.render('stacks/show', data.map[req.params.id]);
// });

module.exports = router;
