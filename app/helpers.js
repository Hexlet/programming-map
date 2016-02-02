/* @flow */

const highlightjs = require('highlight.js');
var marked = require("marked");
var querystring = require("querystring");

marked.setOptions({
  highlight: function (code) {
    return highlightjs.highlightAuto(code).value;
  }
});

var helpers = function(params) {
  return {
    asset: function(logicalPath) {
      var asset = params.environment.findAsset(logicalPath);
      return "/assets/" + asset.digestPath;
    },

    assetCoverPath: function(name) {
      var filename = name.split(" ").map(function(word) { return word.toLowerCase(); }).join("_");
      var path = "/images/path_covers/" + filename + ".png"
      return path;
    },

    _: params._,
    marked: marked,

    hexletCourseLink: function(course) {
      var params = {
        utm_source: "progmap",
        utm_medium: "web",
        utm_campaign: "progmap_course"
      };
      var link = course + "?" + querystring.stringify(params);
      return link;
    },

    ozonPartnerLink: function(ozon_link) {
      var link = ozon_link + "?partner=programming_map";
      return link;
    }
  }
};

module.exports = helpers;
