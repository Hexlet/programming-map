/* @flow */

import _ from 'lodash';
import express from 'express';
const router = express.Router();

import dataFunc from './data';

const data = dataFunc();

router.get('/', (req, res) => {
  const params = {
    title: req.i18n.__('welcome.index.title'),
    metaDescription: req.i18n.__('welcome.index.meta.description'),
  };
  res.render('index', params);
});

router.get('/pages/:id', (req, res) => {
  const page = _.fetch(data.pages.ru, req.params.id);
  const params = {
    page,
    title: page.name,
    header: page.name,
  };
  res.render('pages/show', params);
});

router.get('/stacks/:id', (req, res) => {
  const params = {
    name: req.params.id,
    points: data.points.ru,
    map: data.maps[req.params.id],
    startCourseUrl: req.i18n.__('stacks.show.' + req.params.id + '.startCourseUrl'),
    title: req.i18n.__('stacks.show.' + req.params.id + '.name'),
    metaDescription: req.i18n.__('stacks.show.' + req.params.id + '.description'),
  };

  res.render('stacks/show', params);
});

// router.get("/points/:id", function (req, res) {
//   res.render('stacks/show', data.map[req.params.id]);
// });

module.exports = router;
