#!/usr/bin/env bash

VAGRANT_SYNC_DIR=/vagrant
INSTALLER_DIR=packages
GITLAB_VERSION=$1
GITLAB_WEB_PORT=$2
GITLAB_VERSION_INT=`echo -n "${GITLAB_VERSION}" | sed -e "s/\.//g"`

if [ ${GITLAB_VERSION_INT} -ge 682 ]; then
  # Package URL format changed since v6.8.1
  INSTALLER=${INSTALLER_DIR}/gitlab_${GITLAB_VERSION}-omnibus-1_amd64.deb
  INSTALLER_URL=https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_${GITLAB_VERSION}-omnibus-1_amd64.deb
elif [ ${GITLAB_VERSION_INT} -ge 681 ]; then
  # Package URL format changed since v6.8.1
  INSTALLER=${INSTALLER_DIR}/gitlab_${GITLAB_VERSION}-omnibus.4-1_amd64.deb
  INSTALLER_URL=https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_${GITLAB_VERSION}-omnibus.4-1_amd64.deb
else
  INSTALLER=${INSTALLER_DIR}/gitlab_${GITLAB_VERSION}-omnibus-1.ubuntu.12.04_amd64.deb
  INSTALLER_URL=https://downloads-packages.s3.amazonaws.com/gitlab_${GITLAB_VERSION}-omnibus-1.ubuntu.12.04_amd64.deb
fi

echo "Provisioning GitLab v${GITLAB_VERSION}..."

if [ ! -d /opt/gitlab ]; then
  pushd /vagrant > /dev/null 2>&1
  if [ ! -f "./${INSTALLER}" ]; then
    echo "Getting gitlab omnibus installer..."
    pushd ./${INSTALLER_DIR}/ > /dev/null 2>&1
    wget ${INSTALLER_URL} > /dev/null 2>&1
    popd > /dev/null 2>&1
  fi
  echo "Installing gitlab..."
  dpkg -i ./${INSTALLER} > /dev/null 2>&1

  # $external_url is not replaced in /etc/gitlab/gitlab.rb:
  # https://gitlab.com/gitlab-org/omnibus-gitlab/commit/28731b656b350df9c0224e025dedeca1fee0eb06
  if [ ${GITLAB_VERSION_INT} -ge 740 ]; then
      sed -i -e "s/^external_url .*$/external_url 'http:\/\/gitlab.example.com'/" /etc/gitlab/gitlab.rb
  fi

  echo "Reconfiguring gitlab..."
  gitlab-ctl reconfigure > /dev/null 2>&1
  popd > /dev/null 2>&1
fi

grep -e "^export GITLAB_VERSION=" ~vagrant/.bashrc > /dev/null 2>&1
if [ $? -ne 0 ]; then
  sed -i -e "/^PS1=.*$/i export GITLAB_VERSION=${GITLAB_VERSION}" ~vagrant/.bashrc
  sed -i -e "/^PS1=.*$/i export GITLAB_VERSION=${GITLAB_VERSION}" ~root/.bashrc
  echo 'export PATH=${PATH}:/opt/gitlab/embedded/bin' >> ~vagrant/.bashrc
  echo 'export PATH=${PATH}:/opt/gitlab/embedded/bin' >> ~root/.bashrc
fi

pushd /opt/gitlab/embedded/service > /dev/null 2>&1
if [ ! -d ./gitlab-rails.bk ]; then
  echo "Creating backup of gitlab-rails..."
  cp -pR gitlab-rails gitlab-rails.bk
  cd gitlab-rails
  echo "Applying patch..."
  patch -p1 < /vagrant/patches/v${GITLAB_VERSION}/app_ja.patch > /dev/null 2>&1
  echo "Refreshing assets (this may take minutes)..."
  if [ -d /var/opt/gitlab/gitlab-rails/tmp/cache ]; then
    # Since v6.8.1, permission error occurs in this directory
    chown -R git:root /var/opt/gitlab/gitlab-rails/tmp/cache
  fi
  rm -rf ./public/assets > /dev/null 2>&1
  export PATH=/opt/gitlab/embedded/bin:$PATH
  bundle exec rake assets:precompile RAILS_ENV=production > /dev/null 2>&1
  echo "Restarting gitlab..."
  gitlab-ctl restart > /dev/null 2>&1
fi
popd > /dev/null 2>&1

echo "[33;1mDone![m"
echo "[33;1mGitLab v${GITLAB_VERSION} has been installed: http://localhost:${GITLAB_WEB_PORT}/[m"

