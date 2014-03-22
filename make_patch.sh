#!/bin/sh

GITLAB_SERVICE_DIR=/opt/gitlab/embedded/service
GITLAB_RAILS_BAK_DIR=gitlab-rails.bk
GITLAB_RAILS_MOD_DIR=gitlab-rails
GITLAB_RAILS_APP_BAK_DIR=${GITLAB_RAILS_BAK_DIR}/app
GITLAB_RAILS_APP_MOD_DIR=${GITLAB_RAILS_MOD_DIR}/app
OUTPUT_DIR=`pwd`

pushd ${GITLAB_SERVICE_DIR} > /dev/null 2>&1

diff -urN ${GITLAB_RAILS_APP_BAK_DIR} ${GITLAB_RAILS_APP_MOD_DIR} > ${OUTPUT_DIR}/app_ja.patch

popd > /dev/null 2>&1
