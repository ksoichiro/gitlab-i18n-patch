#!/bin/sh

GITLAB_SERVICE_DIR=/opt/gitlab/embedded/service
GITLAB_RAILS_BAK_DIR=gitlab-rails.bk
GITLAB_RAILS_MOD_DIR=gitlab-rails
GITLAB_RAILS_APP_BAK_DIR=${GITLAB_RAILS_BAK_DIR}/app
GITLAB_RAILS_APP_MOD_DIR=${GITLAB_RAILS_MOD_DIR}/app
GITLAB_RAILS_CONFIG_BAK_DIR=${GITLAB_RAILS_BAK_DIR}/config
GITLAB_RAILS_CONFIG_MOD_DIR=${GITLAB_RAILS_MOD_DIR}/config
OUTPUT_DIR=`pwd`

pushd ${GITLAB_SERVICE_DIR} > /dev/null 2>&1

diff -urN ${GITLAB_RAILS_APP_BAK_DIR} ${GITLAB_RAILS_APP_MOD_DIR} > ${OUTPUT_DIR}/app_ja.patch.tmp
diff -urN ${GITLAB_RAILS_CONFIG_BAK_DIR} ${GITLAB_RAILS_CONFIG_MOD_DIR} >> ${OUTPUT_DIR}/app_ja.patch.tmp
sed -e 's/^\([+\-].*\)	.*$/\1	2014-03-22 09:00:00.000000000 +0900/' ${OUTPUT_DIR}/app_ja.patch.tmp > ${OUTPUT_DIR}/app_ja.patch
rm -f ${OUTPUT_DIR}/app_ja.patch.tmp

popd > /dev/null 2>&1
