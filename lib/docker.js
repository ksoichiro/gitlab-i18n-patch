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

  mkdirp.sync(`.docker/${version}`);

  // Create docker-compose.yml
  cp('docker/docker-compose.yml', `.docker/${version}/`);

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
