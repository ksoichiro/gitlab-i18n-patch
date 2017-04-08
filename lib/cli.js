#!/usr/bin/env node
'use strict';

const command = process.argv[2];

switch (command) {
case 'translate':
  var version = process.argv[3];
  require('./translate').translate(version);
  break;

case 'readme':
  require('./update-readme').update();
  break;

case 'check':
  var maxVersions = require('./check-update').check();
  maxVersions.forEach((e) => {
    console.log(`Patch for v${e} should be created.`);
  });
  break;

case 'update':
  require('./check-update').update();
  break;

default:
  console.log(`Unknown command ${command}`);
  process.exit(1);
  break;
}
