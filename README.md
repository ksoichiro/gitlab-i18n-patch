gitlab-i18n-patch
=================

GitLab Community Editionを勝手に日本語化していくプロジェクトです。

GitLabはi18nに対応しないとのことですが、  
社内で使う場合等で英語であるために導入の抵抗があるケースのために作っています。

このパッチを適用することによって生じたいかなる問題についても責任は負いかねます。  
各自の判断でご利用ください。

## 対応バージョン

[GitLab CE v6.6.4](https://gitlab.com/gitlab-org/gitlab-ce/commit/42e34aec97818981338401a47560cd40c05e686d "GitLab CE v6.6.4")でのみ使えます。  
それ以降のバージョンでは不明です。

## 動作確認環境

| ソフトウェア | バージョン等                                  |
| ------------ | --------------------------------------------- |
| マシン       | MacBookPro                                    |
| OS           | OS X 10.9                                     |
| VM           | VirtualBox 4.3.8                              |
| ゲストOS     | CentOS 6.5                                    |
| GitLab       | GitLab Omnibus package CentOS 6.5 64bit 6.6.4 |
| Git          | 1.9.0                                         |

## 使い方

### 基本

`app_ja.patch`がパッチです。ホームディレクトリに配置した上で、以下で適用します。

    # cd /opt/gitlab/embedded/service/gitlab-rails
    # patch -p1 < ~/app_ja.patch


### 既に稼働させている場合

Javascriptファイルを変更するため、パッチ適用後にプリコンパイルされたファイルを一度削除してプリコンパイルし直してください。

例：

    # cd /opt/gitlab/embedded/service/gitlab-rails
    # rm -rf public/assets
    # export PATH=$PATH:/opt/gitlab/embedded/bin
    # rake assets:precompile RAILS_ENV=production

