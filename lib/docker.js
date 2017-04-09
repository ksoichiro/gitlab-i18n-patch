/* @flow */
'use strict';

require('shelljs/global');

module.exports.docker = (subcommand, version) => {
  switch (subcommand) {
  case 'up':
    up(version);
    break;
  case 'down':
    down(version);
    break;
  default:
    console.log(`Unknown subcommand ${subcommand}`);
    process.exit(1);
  }
};

function up(version) {
  if (!version) {
    console.log('version is not specified');
    process.exit(1);
  }

  const strippedVersion = version.replace(/v/, '');
  const fs = require('fs');
  const path = require('path');
  const mkdirp = require('mkdirp');
  const execSync = require('child_process').execSync;
  const yaml = require('js-yaml');
  const gitlabConfig = yaml.load(fs.readFileSync('config/gitlab.yml', 'utf8'));

  mkdirp.sync(`.docker/${version}`);

  // Create docker-compose.yml
  const httpPort = webPort(gitlabConfig.base_port, version)
  const dockerComposeYml = fs.readFileSync('docker/docker-compose.template.yml', 'utf8');
  fs.writeFileSync(`.docker/${version}/docker-compose.yml`, dockerComposeYml.replace(/@HTTP_PORT@/g, httpPort));

  // Create Dockerfile
  const dockerfile = fs.readFileSync('docker/Dockerfile.template', 'utf8');
  fs.writeFileSync(`.docker/${version}/Dockerfile`, dockerfile.replace(/@VERSION@/g, strippedVersion));

  // Copy patch file
  cp(`patches/${version}/app_ja.patch`, `.docker/${version}/`);

  execSync('docker-compose up -d', {cwd: path.join('.docker', version)});
}

function down(version) {
  if (!version) {
    console.log('version is not specified');
    process.exit(1);
  }

  const path = require('path');
  const execSync = require('child_process').execSync;

  execSync('docker-compose down', {cwd: path.join('.docker', version)});
}

function webPort(basePort, versionStr) {
  return parseInt(basePort) + parseInt(versionStr.replace(/v/, '').replace(/\./g, ''))
}
