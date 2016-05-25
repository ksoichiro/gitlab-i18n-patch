#!/usr/bin/env node
'use strict';

// Usage: node translate.js VERSION
//  e.g.
//   node translate.js v8.2.0
//   -> patches/v8.2.0/app_ja.patch will be generated

require('shelljs/global');

if (!which('git')) {
  echo('This script requires git');
  exit(1);
}

var version = process.argv[2];

var versions;
if (!version) {
  versions = [
    "v8.3.0",
    "v8.3.8",
    "v8.3.9",
    "v8.4.0",
    "v8.4.9",
    "v8.4.10",
    "v8.5.0",
    "v8.5.11",
    "v8.5.12",
    "v8.6.0",
    "v8.6.7",
    "v8.6.8",
    "v8.7.0",
    "v8.7.3",
    "v8.7.6",
    "v8.8.0"
  ];
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
