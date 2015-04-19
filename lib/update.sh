#!/usr/bin/env bash

gitlab-ctl stop > /dev/null 2>&1
pushd /opt/gitlab/embedded/service > /dev/null 2>&1

rm -rf gitlab-rails
cp -pR gitlab-rails.bk gitlab-rails
cd gitlab-rails
patch -p1 < /vagrant/patches/v${GITLAB_VERSION}/app_ja.patch > /dev/null 2>&1
if [ -d /var/opt/gitlab/gitlab-rails/tmp/cache ]; then
  # Since v6.8.1, permission error occurs in this directory
  chown -R git:root /var/opt/gitlab/gitlab-rails/tmp/cache
fi
rm -rf ./public/assets > /dev/null 2>&1
export PATH=/opt/gitlab/embedded/bin:$PATH
bundle exec rake assets:precompile RAILS_ENV=production > /dev/null 2>&1

popd > /dev/null 2>&1
gitlab-ctl start > /dev/null 2>&1
