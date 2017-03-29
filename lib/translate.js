'use strict';

module.exports.translate = function(version) {
  require('shelljs/global');
  var fs = require('fs');
  var path = require('path');
  var yaml = require('js-yaml');
  var async = require('async');
  var numCPUs = require('os').cpus().length;
  var cluster = require('cluster');
  var glob = require('glob');
  var parallel = numCPUs;

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
        // Remove previous lock files if exist
        var files = glob.sync('.gitlabhq/**/.lock', {nodir: true});
        if (files) {
          for (var f of files) {
            fs.unlinkSync(f);
          }
        }
      }
      //console.log('Starting.. ');
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
        var cb = queue.shift();
        this.getResource(function(res) {
          process.nextTick(function() {
            async.waterfall([
              function(cb2) {
                // Callback with resource
                cb(res);
                cb2();
              }
            ], function() {
              // Do nothing
            });
          });
        }.bind(this));
      }
      setTimeout(this.process.bind(this), 100);
    };
    Server.prototype.getResource = function(cb) {
      for (var i = 1; i <= parallel; i++) {
        if (!fs.existsSync(path.join('.gitlabhq', '' + i, '.lock'))) {
          var dir = path.join('.gitlabhq', '' + i);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          //console.log('Lock resource: ' + i);
          if (fs.existsSync(path.join('.gitlabhq', '' + i, '.lock'))) {
            console.log('Interrupted: ' + i);
          } else {
            fs.writeFileSync(path.join('.gitlabhq', '' + i, '.lock'), '');
            process.nextTick(cb.bind(this, i));
          }
          return;
        }
      }
      // NG, wait
      process.nextTick(this.getResource.bind(this, cb));
    };
    Server.prototype.stop = function() {
      this.running = false;
      //console.log('Stopping..');
    };
    var server = new Server();
    server.start();

    async.parallel(versions.map(function(v) {
      return function(cb) {
        server.request(function(res) {
          var worker = cluster.fork();
          worker.on('message', function(msg) {
            if (msg.cmd !== 'exit') {
              console.warn('Master received message from worker but the exit param is not defined');
              return;
            }
            cb();
          });
          worker.on('error', function(err) {
            console.log('error');
            console.log(err);
          });
          worker.send({start: true, version: v, res: res});
        });
      };
    }), function() {
      // done
      server.stop();
    });
  } else {
    process.on('message', function(msg) {
      if (!msg.start) {
        console.warn('Child received invalid message: ' + msg);
        return;
      }
      var v = msg.version;
      var res = msg.res;
      //console.log('Start worker process with resource: ' + res + ', pid: ' + cluster.worker.process.pid);
      console.log("Translate " + v);

      cd('.gitlabhq/' + res);
      if (!fs.existsSync('gitlabhq')) {
        // Cloning submodule here instead of using original repo to make builds faster
        //exec('git clone https://github.com/gitlabhq/gitlabhq.git gitlabhq');
        exec('git clone ../../gitlabhq gitlabhq', {silent: true});
      }
      cd('gitlabhq');
      exec('git clean -d -f', {silent: true});
      exec('git checkout -f ' + v, {silent: true});
      cd('../../..');

      exec('i18n-patch --statistics --unmatched --condition version=' + v.replace(/v/, '') + ' -- ja .gitlabhq/' + res + '/gitlabhq 2> unmatched.log', {silent: true});
      mkdir('-p', 'patches/' + v);
      cd('.gitlabhq/' + res + '/gitlabhq');
      exec('git add .');
      exec('git diff --cached', {silent: true}).to('../../../patches/' + v + '/app_ja.patch');

      // Cleanup
      exec('git reset --hard HEAD', {silent: true});
      exec('git clean -d -f');
      cd('../../..');

      // Unlock before send exit message to the master
      fs.unlinkSync(path.join('.gitlabhq', '' + res, '.lock'));

      // Tell the master process that this process will exit
      process.send({cmd: 'exit'});

      //console.log('Exit: version: ' + v + ', res: ' + res + ' pid: ' + cluster.worker.process.pid);
      process.exit();
    });
  }
};
