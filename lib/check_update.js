'use strict';

module.exports.check = function check() {
  require('shelljs/global');
  var semver = require('semver');

  var minSupportedVersion = '8.13.0';

  if (!which('git')) {
    echo('This script requires git');
    exit(1);
  }

  var patches = [];
  ls('patches').forEach(function(e) {
    if (e.match(/^v[0-9]+\.[0-9]+\.[0-9]+$/)) {
      patches.push(e.substring(1));
    }
  });

  var candidates = new Object();
  cd('gitlabhq');
  exec('git fetch', {silent: true});
  exec('git tag -l', {silent: true}).stdout.split('\n').forEach(function(e) {
    if (e.match(/^v([0-9]+)\.([0-9]+)\.([0-9]+)$/)) {
      var ver = RegExp.$1 + '.' + RegExp.$2;
      var max = semver.maxSatisfying(patches, '~' + ver);
      var tag = e.substring(1);
      if (semver.lt(minSupportedVersion, tag) && patches.indexOf(tag) === -1) {
        if (max == null || semver.lt(max, tag)) {
          if (!candidates[ver]) {
            candidates[ver] = [];
          }
          candidates[ver].push(tag);
        }
      }
    }
  });
  var maxVersions = [];
  for (var ver in candidates) {
    var max = semver.maxSatisfying(candidates[ver], '~' + ver);
    maxVersions.push(max);
  }
  cd('..');
  return maxVersions;
};
