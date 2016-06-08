// @flow

import highlightjs from 'highlight.js';
import marked from 'marked';
import querystring from 'querystring';

marked.setOptions({
  highlight: (code) => highlightjs.highlightAuto(code).value,
});

const helpers = (params: Object) => {
  return {
    asset: (logicalPath: string) => {
      const asset = params.environment.findAsset(logicalPath);
      return `/assets/${asset.digestPath}`;
    },

    assetCoverPath: (name: string) => {
      const filename = name.split(' ').map(word => word.toLowerCase()).join('_');
      const path = `/images/path_covers/${filename}.png`;
      return path;
    },

    marked,
    _: params._,

    hexletCourseLink: (course: string) => {
      const params = {
        utm_source: 'progmap',
        utm_medium: 'web',
        utm_campaign: 'progmap_course',
      };
      const link = `${course}?${querystring.stringify(params)}`;
      return link;
    },

    ozonPartnerLink: (ozonLink: string) => {
      const link = `${ozonLink}?partner=programming_map`;
      return link;
    },
  };
};

module.exports = helpers;
