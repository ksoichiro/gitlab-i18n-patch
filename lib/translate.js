#!/usr/bin/env node
'use strict';

// Usage: node translate.js VERSION
//  e.g.
//   node translate.js v8.2.0
//   -> patches/v8.2.0/app_ja.patch will be generated

require('shelljs/global');
var fs = require('fs');
var yaml = require('js-yaml');

if (!which('git')) {
  echo('This script requires git');
  exit(1);
}

var version = process.argv[2];

var versions;
if (!version) {
  var gitlabConfig = yaml.load(fs.readFileSync('config/gitlab.yml', 'utf8'));
  versions = Object.keys(gitlabConfig.versions);
} else {
  versions = [version];
}

for (var i = 0; i < versions.length; i++) {
  var v = versions[i];
  console.log("Translate " + v);
  cd('gitlabhq');
  exec('git clean -d -f', {silent: true});
  exec('git checkout -f ' + v, {silent: true});
  cd('..');

  exec('npm run build');
  mkdir('-p', 'patches/' + v);
  cd('gitlabhq');
  exec('git add .');
  exec('git diff --cached', {silent: true}).to('../patches/' + v + '/app_ja.patch');
  exec('git reset --hard HEAD', {silent: true});
  exec('git clean -d -f');
  cd('..');
}
