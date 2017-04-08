'use strict';

module.exports.translate = (version) => {
  const shell = require('shelljs');
  const fs = require('fs');
  const path = require('path');
  const yaml = require('js-yaml');
  const async = require('async');
  const numCPUs = require('os').cpus().length;
  const cluster = require('cluster');
  const glob = require('glob');
  const mkdirp = require('mkdirp');
  const execSync = require('child_process').execSync;

  if (!shell.which('git')) {
    console.log('This script requires git');
    process.exit(1);
    return;
  }

  let queue = [];
  let versions;
  if (!version) {
    let gitlabConfig = yaml.load(fs.readFileSync('config/gitlab.yml', 'utf8'));
    versions = Object.keys(gitlabConfig.versions);
  } else {
    versions = [version];
  }

  if (cluster.isMaster) {
    mkdirp('.gitlabhq');
    // Starting server
    let Server = function() {
      this.running = false;
    };
    Server.prototype.start = function() {
      if (!this.running) {
        this.running = true;
        // Remove previous lock files if exist
        let files = glob.sync('.gitlabhq/**/.lock', {nodir: true});
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
        let cb = queue.shift();
        this.getResource(function(res) {
          process.nextTick(function() {
            async.waterfall([
              (cb2) => {
                // Callback with resource
                cb(res);
                cb2();
              }
            ], () => {
              // Do nothing
            });
          });
        }.bind(this));
      }
      setTimeout(this.process.bind(this), 100);
    };
    Server.prototype.getResource = function(cb) {
      for (let i = 1; i <= numCPUs; i++) {
        if (!fs.existsSync(path.join('.gitlabhq', '' + i, '.lock'))) {
          let dir = path.join('.gitlabhq', '' + i);
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
    let server = new Server();
    server.start();

    async.parallel(versions.map((v) => {
      return (cb) => {
        server.request((res) => {
          let worker = cluster.fork();
          worker.on('message', (msg) => {
            if (msg.cmd !== 'exit') {
              console.warn('Master received message from worker but the exit param is not defined');
              return;
            }
            cb();
          });
          worker.on('error', (err) => {
            console.log('error');
            console.log(err);
          });
          worker.send({start: true, version: v, res: res});
        });
      };
    }), () => {
      // done
      server.stop();
    });
  } else {
    process.on('message', (msg) => {
      if (!msg.start) {
        console.warn(`Child received invalid message: ${msg}`);
        return;
      }
      let v = msg.version;
      let res = msg.res;
      //console.log('Start worker process with resource: ' + res + ', pid: ' + cluster.worker.process.pid);
      console.log(`Translate ${v}`);

      let repoPath = path.join('.gitlabhq', '' + res, 'gitlabhq');
      if (!fs.existsSync(repoPath)) {
        // Cloning submodule here instead of using original repo to make builds faster
        execSync('git clone ../../gitlabhq gitlabhq', {cwd: path.join('.gitlabhq', '' + res)});
      }
      execSync('git clean -d -f', {cwd: repoPath});
      execSync('git fetch --tags', {cwd: repoPath});
      execSync(`git checkout -f ${v} 2> /dev/null`, {cwd: repoPath});

      execSync(`i18n-patch --statistics --unmatched --condition version=${v.replace(/v/, '')} -- ja .gitlabhq/${res}/gitlabhq 2> unmatched.log`);
      mkdirp.sync('patches/' + v);
      execSync('git add .', {cwd: repoPath});
      execSync(`git diff --cached > ../../../patches/${v}/app_ja.patch`, {cwd: repoPath});

      // Cleanup
      execSync('git reset --hard HEAD', {cwd: repoPath});
      execSync('git clean -d -f', {cwd: repoPath});

      // Unlock before send exit message to the master
      fs.unlinkSync(path.join('.gitlabhq', '' + res, '.lock'));

      // Tell the master process that this process will exit
      process.send({cmd: 'exit'});

      process.exit();
    });
  }
};
