#!/usr/bin/env node
'use strict';

var command = process.argv[2];

switch (command) {
  case 'translate':
    var version = process.argv[3];
    require('./translate').translate(version);
    break;

  case 'readme':
    require('./update_readme').update();
    break;

  case 'check':
    var maxVersions = require('./check_update').check();
    maxVersions.forEach(function(e) {
      console.log('Patch for v' + e + ' should be created.');
    });
    break;

  case 'update':
    require('./check_update').update();
    break;

  default:
    console.log('Unknown command ' + command);
    process.exit(1);
    break;
}
