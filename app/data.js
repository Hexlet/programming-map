// @flow

import yaml from 'js-yaml';
import fs from 'fs';

const data = (): Object => {
  const mapFiles = fs.readdirSync('maps');
  const pagesFiles = fs.readdirSync('pages');
  const pointLangs = fs.readdirSync('points');
  // const doc = yaml.safeLoad(fs.readFileSync("/home/ixti/example.yml", "utf8"));

  const maps = mapFiles.reduce((acc, value) => {
    const content = yaml.safeLoad(fs.readFileSync(`maps/${value}`, 'utf8'));
    const stackName = value.split('.')[0];
    acc[stackName] = content;
    return acc;
  }, {});

  const pages = pagesFiles.reduce((acc, value) => {
    const content = yaml.safeLoad(fs.readFileSync(`pages/${value}`, 'utf8'));
    const params = value.split('.');
    const lang = params[1];
    if (acc[lang] === undefined) {
      acc[lang] = {};
    }
    acc[lang][params[0]] = content;

    return acc;
  }, {});

  const points = pointLangs.reduce((acc, lang) => {
    const langPointFiles = fs.readdirSync(`points/${lang}`);

    const langPoints = langPointFiles.reduce((acc, value) => {
      const content = yaml.safeLoad(fs.readFileSync(`points/${lang}/${value}`, 'utf8'));
      const pointName = value.split('.')[0];
      acc[pointName] = content;
      return acc;
    }, {});

    acc[lang] = langPoints;
    return acc;
  }, {});

  return { pages, maps, points };
};

export default data;
