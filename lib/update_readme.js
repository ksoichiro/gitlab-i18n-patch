'use strict';

module.exports.update = function() {
  require('shelljs/global');
  var fs = require('fs');
  var yaml = require('js-yaml');

  cp('README.template.md', 'README.md');

  var gitlabConfig = yaml.load(fs.readFileSync('config/gitlab.yml', 'utf8'));
  var versions = Object.keys(gitlabConfig.versions);

  var replaceVersions = '';
  for (var i = versions.length - 1; i >= 0; i--) {
    var v = versions[i];
    var line = '1. [GitLab CE ' + v + '](https://gitlab.com/gitlab-org/gitlab-ce/commits/' + v + ' "GitLab CE ' + v + '") → [patches/' + v + 'ディレクトリ](patches/' + v + ')'
    replaceVersions += line + '\n';
  }

  sed('-i', /@VERSIONS@/, replaceVersions, 'README.md');
};
