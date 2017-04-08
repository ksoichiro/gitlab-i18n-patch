'use strict';

module.exports.update = () => {
  const shell = require('shelljs');
  const fs = require('fs');
  const yaml = require('js-yaml');

  shell.cp('README.template.md', 'README.md');

  let gitlabConfig = yaml.load(fs.readFileSync('config/gitlab.yml', 'utf8'));
  let versions = Object.keys(gitlabConfig.versions);

  let replaceVersions = '';
  for (let i = versions.length - 1; i >= 0; i--) {
    const v = versions[i];
    const line = `1. [GitLab CE ${v}](https://gitlab.com/gitlab-org/gitlab-ce/commits/${v} "GitLab CE ${v}") → [patches/${v}ディレクトリ](patches/${v})`;
    replaceVersions += line + '\n';
  }

  shell.sed('-i', /@VERSIONS@/, replaceVersions, 'README.md');
};
