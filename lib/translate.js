'use strict';

module.exports.translate = function(version) {
  require('shelljs/global');
  var fs = require('fs');
  var path = require('path');
  var yaml = require('js-yaml');
  var async = require('async');
  var numCPUs = require('os').cpus().length;
  var cluster = require('cluster');
  var parallel = 3;

  if (!which('git')) {
    echo('This script requires git');
    exit(1);
  }

  var queue = [];
  var versions;
  if (!version) {
    var gitlabConfig = yaml.load(fs.readFileSync('config/gitlab.yml', 'utf8'));
    versions = Object.keys(gitlabConfig.versions);
  } else {
    versions = [version];
  }

  if (cluster.isMaster) {
    mkdir('-p', '.gitlabhq');
    // Starting server
    var Server = function() {
      this.running = false;
    };
    Server.prototype.start = function() {
      if (!this.running) {
        this.running = true;
      }
      console.log('Starting.. ');
      process.nextTick(this.process.bind(this));
    };
    Server.prototype.request = function(cb) {
      queue.push(cb);
    };
    Server.prototype.process = function() {
      // If there are any requests for getting resource in the queue, check it
      if (!this.running) {
        return false;
      }
      if (queue.length > 0) {
        //console.log(queue);
        var cb = queue.shift();
        console.log('Trying to get resource..');
        this.getResource(function(res) {
          process.nextTick(function() {
            async.waterfall([
              function(cb2) {
                console.log('Process request: ' + res);
                // Callback with resource
                cb(res);
                cb2();
              }
            ], function() {
              // Unlock the resource
              console.log('Unlock resource: ' + res);
              fs.unlinkSync(path.join('.gitlabhq', '' + res, '.lock'));
            });
          });
          console.log('Register processing resource: ' + res);
          //process.nextTick(this.process.bind(this));
        }.bind(this));
      //} else {
      //  process.nextTick(this.process.bind(this));
      }
      process.nextTick(this.process.bind(this));
    };
    Server.prototype.getResource = function(cb) {
      // Check .gitlabhq/1/.lock
      for (var i = 1; i <= parallel; i++) {
        if (!fs.existsSync(path.join('.gitlabhq', '' + i, '.lock'))) {
          // OK
          //console.log('Found resource');

          var dir = path.join('.gitlabhq', '' + i);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          console.log('Lock resource: ' + i);
          if (fs.existsSync(path.join('.gitlabhq', '' + i, '.lock'))) {
            console.log('Interrupted: ' + i);
          } else {
            fs.writeFileSync(path.join('.gitlabhq', '' + i, '.lock'), '');
            process.nextTick(cb.bind(this, i));
          }
          return;
        }
        //console.log('Unavailable: ' + i);
      }
      // NG, wait
      //console.log('Busy, wait..');
      process.nextTick(this.getResource.bind(this, cb));
    };
    Server.prototype.stop = function() {
      this.running = false;
      console.log('Stopping..');
    };
    var server = new Server();
    server.start();

    for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    // When queue is empty then stop server and finish
  } else {
    // Just shift queue and process it, while the queue is not empty
    process.on('message', function(msg) {
    });
    async.parallelLimit(versions.map(function(v) {
      return function(cb) {
        console.log("Translate " + v);
        server.request(function(res) {
          console.log('Got resource: ' + res);
          //cd('.gitlabhq/' + res);
          ////if (!fs.existsSync(path.join('.gitlabhq', '' + res, 'gitlabhq'))) {
          //if (!fs.existsSync('gitlabhq')) {
          //  exec('pwd && git clone https://github.com/gitlabhq/gitlabhq.git gitlabhq');
          //}
          //cd('gitlabhq');
          //exec('git clean -d -f', {silent: true});
          //exec('git checkout -f ' + v, {silent: true});
          //cd('../../..');

          //exec('i18n-patch --statistics --unmatched --condition version=' + v.replace(/v/, '') + ' -- ja .gitlabhq/' + res + '/gitlabhq 2> unmatched.log', {silent: true});
          //mkdir('-p', 'patches/' + v);
          //cd('.gitlabhq/' + res + '/gitlabhq');
          //exec('git add .');
          //exec('git diff --cached', {silent: true}).to('../../../patches/' + v + '/app_ja.patch');
          //// Cleanup
          //exec('git reset --hard HEAD', {silent: true});
          //exec('git clean -d -f');
          //cd('../../..');
          cb();
        });
      };
    }), parallel, function() {
      server.stop();
    });
  }
};
