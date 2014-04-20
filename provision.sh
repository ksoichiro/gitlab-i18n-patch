#!/usr/bin/env bash

VAGRANT_SYNC_DIR=/vagrant
INSTALLER_DIR=packages
INSTALLER=${INSTALLER_DIR}/gitlab_6.7.5-omnibus-1.ubuntu.12.04_amd64.deb
INSTALLER_URL=https://downloads-packages.s3.amazonaws.com/gitlab_6.7.5-omnibus-1.ubuntu.12.04_amd64.deb

if [ ! -d /opt/gitlab ]; then
  pushd /vagrant > /dev/null 2>&1
  if [ ! -d ${INSTALLER_DIR} ]; then
    mkdir ${INSTALLER_DIR}
  fi
  if [ ! -f ./${INSTALLER} ]; then
    echo "Getting gitlab omnibus installer..."
    pushd ./${INSTALLER_DIR} > /dev/null 2>&1
    wget ${INSTALLER_URL} > /dev/null 2>&1
    popd > /dev/null 2>&1
  fi
  echo "Installing gitlab..."
  dpkg -i ./${INSTALLER} > /dev/null 2>&1
  echo "Reconfiguring gitlab..."
  gitlab-ctl reconfigure > /dev/null 2>&1
  popd > /dev/null 2>&1
fi

which patch > /dev/null 2>&1
if [ $? -ne 0 ]; then
  # for editing files
  echo "Updating apt-get..."
  apt-get update
  apt-get install -y vim-gnome
  apt-get install -y language-pack-ja
  dpkg-reconfigure locales
  echo "set encoding=utf-8" >> ~vagrant/.vimrc
  echo "set fileencodings=iso-2022-jp,sjis,utf-8" >> ~vagrant/.vimrc
  chown vagrant:vagrant ~vagrant/.vimrc
  sed -i "s/#force_color_prompt/force_color_prompt/" ~vagrant/.bashrc

  echo "Installing patch..."
  apt-get install -y patch > /dev/null 2>&1
fi

pushd /opt/gitlab/embedded/service > /dev/null 2>&1
if [ ! -d ./gitlab-rails.bk ]; then
  echo "Creating backup of gitlab-rails..."
  cp -pR gitlab-rails gitlab-rails.bk
  cd gitlab-rails
  echo "Applying patch..."
  patch -p1 < /vagrant/app_ja.patch > /dev/null 2>&1
  echo "Refreshing assets (this may take minutes)..."
  rm -rf ./public/assets > /dev/null 2>&1
  export PATH=$PATH:/opt/gitlab/embedded/bin
  rake assets:precompile RAILS_ENV=production > /dev/null 2>&1
  echo "Restarting gitlab..."
  gitlab-ctl restart > /dev/null 2>&1
fi
popd > /dev/null 2>&1
