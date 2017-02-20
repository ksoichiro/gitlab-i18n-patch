'use strict';

var semver = require('semver');

function check() {
  require('shelljs/global');

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

function update() {
  var fs = require('fs');
  var yaml = require('js-yaml');
  var maxVersions = check();
  var gitlabConfig = yaml.load(fs.readFileSync('config/gitlab.yml', 'utf8'));
  if (0 < maxVersions.length) {
    var versions = Object.keys(gitlabConfig.versions);
    for (var i = 0; i < maxVersions.length; i++) {
      var ver = maxVersions[i];
      var key = 'v' + ver;
      gitlabConfig.versions[key] = 'https://packages.gitlab.com/gitlab/gitlab-ce/packages/ubuntu/precise/gitlab-ce_' + ver + '-ce.0_amd64.deb/download';
    }
  }
  fs.writeFileSync('config/gitlab.yml', yaml.safeDump(gitlabConfig, {lineWidth: -1}));
}

module.exports.check = check;
module.exports.update = update;
