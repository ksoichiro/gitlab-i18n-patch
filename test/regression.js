'use strict';

import test from 'ava';
import glob from 'glob';
require('shelljs/global');

test('ja', t => {
  let files = glob.sync('patches/**/app_ja.patch');

  // https://github.com/ksoichiro/gitlab-i18n-patch/issues/3
  t.is(grep(/\+ +\.location-badge= ラベル/, files).stdout, '\n');

  // https://github.com/ksoichiro/gitlab-i18n-patch/issues/4
  t.is(grep(/\+.*"v-for" => "[^"]* in 課題/, files).stdout, '\n');

  // https://github.com/ksoichiro/gitlab-i18n-patch/pull/6
  t.is(grep(/\+ +milestone: マイルストーン/, files).stdout, '\n');

  // https://github.com/ksoichiro/gitlab-i18n-patch/issues/8
  t.is(grep(/%td= render 'delete_form', application: アプリケーション/, files).stdout, '\n');
});
