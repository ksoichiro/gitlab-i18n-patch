'use strict';

const semver = require('semver');

function check() {
  const shell = require('shelljs');

  let minSupportedVersion = '8.13.0';

  if (!shell.which('git')) {
    console.log('This script requires git');
    process.exit(1);
  }

  let patches = [];
  shell.ls('patches').forEach((e) => {
    if (e.match(/^v[0-9]+\.[0-9]+\.[0-9]+$/)) {
      patches.push(e.substring(1));
    }
  });

  let candidates = new Object();
  shell.cd('gitlabhq');
  shell.exec('git fetch', {silent: true});
  shell.exec('git tag -l', {silent: true}).stdout.split('\n').forEach((e) => {
    if (e.match(/^v([0-9]+)\.([0-9]+)\.([0-9]+)$/)) {
      let ver = RegExp.$1 + '.' + RegExp.$2;
      let max = semver.maxSatisfying(patches, '~' + ver);
      let tag = e.substring(1);
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
  let maxVersions = [];
  for (var ver in candidates) {
    const max = semver.maxSatisfying(candidates[ver], '~' + ver);
    maxVersions.push(max);
  }
  shell.cd('..');
  return maxVersions;
}

function update() {
  const fs = require('fs');
  const yaml = require('js-yaml');
  const maxVersions = check();
  const gitlabConfig = yaml.load(fs.readFileSync('config/gitlab.yml', 'utf8'));
  if (0 < maxVersions.length) {
    for (let i = 0; i < maxVersions.length; i++) {
      const ver = maxVersions[i];
      const key = 'v' + ver;
      gitlabConfig.versions[key] = `https://packages.gitlab.com/gitlab/gitlab-ce/packages/ubuntu/precise/gitlab-ce_${ver}-ce.0_amd64.deb/download`;
    }
  }
  fs.writeFileSync('config/gitlab.yml', yaml.safeDump(gitlabConfig, {lineWidth: -1}));
}

module.exports.check = check;
module.exports.update = update;
