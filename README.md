gitlab-i18n-patch
=================

[![Build Status](https://travis-ci.org/ksoichiro/gitlab-i18n-patch.svg?branch=master)](https://travis-ci.org/ksoichiro/gitlab-i18n-patch)

[GitLab Community Edition](https://gitlab.com/gitlab-org/gitlab-ce)を勝手に日本語化していくプロジェクトです。

GitLabはi18nに対応しないとのことですが、  
社内で使う場合等で英語であるために導入の抵抗があるケースのために作っています。

このパッチを適用することによって生じたいかなる問題についても責任は負いかねます。  
各自の判断でご利用ください。

## 対応バージョン

:mega: v8.3.0以降のパッチは [i18n-patch](https://github.com/ksoichiro/i18n-patch) で生成しています。

1. [GitLab CE v8.16.6](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.16.6 "GitLab CE v8.16.6") → [patches/v8.16.6ディレクトリ](patches/v8.16.6)
1. [GitLab CE v8.16.5](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.16.5 "GitLab CE v8.16.5") → [patches/v8.16.5ディレクトリ](patches/v8.16.5)
1. [GitLab CE v8.16.4](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.16.4 "GitLab CE v8.16.4") → [patches/v8.16.4ディレクトリ](patches/v8.16.4)
1. [GitLab CE v8.16.2](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.16.2 "GitLab CE v8.16.2") → [patches/v8.16.2ディレクトリ](patches/v8.16.2)
1. [GitLab CE v8.15.7](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.15.7 "GitLab CE v8.15.7") → [patches/v8.15.7ディレクトリ](patches/v8.15.7)
1. [GitLab CE v8.15.6](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.15.6 "GitLab CE v8.15.6") → [patches/v8.15.6ディレクトリ](patches/v8.15.6)
1. [GitLab CE v8.15.5](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.15.5 "GitLab CE v8.15.5") → [patches/v8.15.5ディレクトリ](patches/v8.15.5)
1. [GitLab CE v8.15.4](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.15.4 "GitLab CE v8.15.4") → [patches/v8.15.4ディレクトリ](patches/v8.15.4)
1. [GitLab CE v8.15.2](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.15.2 "GitLab CE v8.15.2") → [patches/v8.15.2ディレクトリ](patches/v8.15.2)
1. [GitLab CE v8.14.9](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.14.9 "GitLab CE v8.14.9") → [patches/v8.14.9ディレクトリ](patches/v8.14.9)
1. [GitLab CE v8.14.7](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.14.7 "GitLab CE v8.14.7") → [patches/v8.14.7ディレクトリ](patches/v8.14.7)
1. [GitLab CE v8.14.6](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.14.6 "GitLab CE v8.14.6") → [patches/v8.14.6ディレクトリ](patches/v8.14.6)
1. [GitLab CE v8.14.2](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.14.2 "GitLab CE v8.14.2") → [patches/v8.14.2ディレクトリ](patches/v8.14.2)
1. [GitLab CE v8.13.12](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.13.12 "GitLab CE v8.13.12") → [patches/v8.13.12ディレクトリ](patches/v8.13.12)
1. [GitLab CE v8.13.11](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.13.11 "GitLab CE v8.13.11") → [patches/v8.13.11ディレクトリ](patches/v8.13.11)
1. [GitLab CE v8.13.3](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.13.3 "GitLab CE v8.13.3") → [patches/v8.13.3ディレクトリ](patches/v8.13.3)
1. [GitLab CE v8.13.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.13.0 "GitLab CE v8.13.0") → [patches/v8.13.0ディレクトリ](patches/v8.13.0)
1. [GitLab CE v8.12.7](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.12.7 "GitLab CE v8.12.7") → [patches/v8.12.7ディレクトリ](patches/v8.12.7)
1. [GitLab CE v8.12.6](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.12.6 "GitLab CE v8.12.6") → [patches/v8.12.6ディレクトリ](patches/v8.12.6)
1. [GitLab CE v8.12.4](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.12.4 "GitLab CE v8.12.4") → [patches/v8.12.4ディレクトリ](patches/v8.12.4)
1. [GitLab CE v8.12.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.12.0 "GitLab CE v8.12.0") → [patches/v8.12.0ディレクトリ](patches/v8.12.0)
1. [GitLab CE v8.11.7](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.11.7 "GitLab CE v8.11.7") → [patches/v8.11.7ディレクトリ](patches/v8.11.7)
1. [GitLab CE v8.11.6](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.11.6 "GitLab CE v8.11.6") → [patches/v8.11.6ディレクトリ](patches/v8.11.6)
1. [GitLab CE v8.11.5](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.11.5 "GitLab CE v8.11.5") → [patches/v8.11.5ディレクトリ](patches/v8.11.5)
1. [GitLab CE v8.11.4](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.11.4 "GitLab CE v8.11.4") → [patches/v8.11.4ディレクトリ](patches/v8.11.4)
1. [GitLab CE v8.11.3](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.11.3 "GitLab CE v8.11.3") → [patches/v8.11.3ディレクトリ](patches/v8.11.3)
1. [GitLab CE v8.11.2](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.11.2 "GitLab CE v8.11.2") → [patches/v8.11.2ディレクトリ](patches/v8.11.2)
1. [GitLab CE v8.11.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.11.0 "GitLab CE v8.11.0") → [patches/v8.11.0ディレクトリ](patches/v8.11.0)
1. [GitLab CE v8.10.5](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.10.5 "GitLab CE v8.10.5") → [patches/v8.10.5ディレクトリ](patches/v8.10.5)
1. [GitLab CE v8.9.6](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.9.6 "GitLab CE v8.9.6") → [patches/v8.9.6ディレクトリ](patches/v8.9.6)
1. [GitLab CE v8.8.7](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.8.7 "GitLab CE v8.8.7") → [patches/v8.8.7ディレクトリ](patches/v8.8.7)
1. [GitLab CE v8.8.5](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.8.5 "GitLab CE v8.8.5") → [patches/v8.8.5ディレクトリ](patches/v8.8.5)
1. [GitLab CE v8.8.4](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.8.4 "GitLab CE v8.8.4") → [patches/v8.8.4ディレクトリ](patches/v8.8.4)
1. [GitLab CE v8.8.2](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.8.2 "GitLab CE v8.8.2") → [patches/v8.8.2ディレクトリ](patches/v8.8.2)
1. [GitLab CE v8.8.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.8.0 "GitLab CE v8.8.0") → [patches/v8.8.0ディレクトリ](patches/v8.8.0)
1. [GitLab CE v8.7.6](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.7.6 "GitLab CE v8.7.6") → [patches/v8.7.6ディレクトリ](patches/v8.7.6)
1. [GitLab CE v8.7.3](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.7.3 "GitLab CE v8.7.3") → [patches/v8.7.3ディレクトリ](patches/v8.7.3)
1. [GitLab CE v8.7.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.7.0 "GitLab CE v8.7.0") → [patches/v8.7.0ディレクトリ](patches/v8.7.0)
1. [GitLab CE v8.6.8](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.6.8 "GitLab CE v8.6.8") → [patches/v8.6.8ディレクトリ](patches/v8.6.8)
1. [GitLab CE v8.6.7](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.6.7 "GitLab CE v8.6.7") → [patches/v8.6.7ディレクトリ](patches/v8.6.7)
1. [GitLab CE v8.6.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.6.0 "GitLab CE v8.6.0") → [patches/v8.6.0ディレクトリ](patches/v8.6.0)
1. [GitLab CE v8.5.12](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.5.12 "GitLab CE v8.5.12") → [patches/v8.5.12ディレクトリ](patches/v8.5.12)
1. [GitLab CE v8.5.11](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.5.11 "GitLab CE v8.5.11") → [patches/v8.5.11ディレクトリ](patches/v8.5.11)
1. [GitLab CE v8.5.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.5.0 "GitLab CE v8.5.0") → [patches/v8.5.0ディレクトリ](patches/v8.5.0)
1. [GitLab CE v8.4.10](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.4.10 "GitLab CE v8.4.10") → [patches/v8.4.10ディレクトリ](patches/v8.4.10)
1. [GitLab CE v8.4.9](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.4.9 "GitLab CE v8.4.9") → [patches/v8.4.9ディレクトリ](patches/v8.4.9)
1. [GitLab CE v8.4.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.4.0 "GitLab CE v8.4.0") → [patches/v8.4.0ディレクトリ](patches/v8.4.0)
1. [GitLab CE v8.3.9](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.3.9 "GitLab CE v8.3.9") → [patches/v8.3.9ディレクトリ](patches/v8.3.9)
1. [GitLab CE v8.3.8](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.3.8 "GitLab CE v8.3.8") → [patches/v8.3.8ディレクトリ](patches/v8.3.8)
1. [GitLab CE v8.3.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.3.0 "GitLab CE v8.3.0") → [patches/v8.3.0ディレクトリ](patches/v8.3.0)


以下は旧来の方式(手作業)で作成したパッチです。

1. [GitLab CE v8.2.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.2.0 "GitLab CE v8.2.0") → [patches/v8.2.0ディレクトリ](patches/v8.2.0)
1. [GitLab CE v8.1.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.1.0 "GitLab CE v8.1.0") → [patches/v8.1.0ディレクトリ](patches/v8.1.0)
1. [GitLab CE v8.0.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v8.0.0 "GitLab CE v8.0.0") → [patches/v8.0.0ディレクトリ](patches/v8.0.0)
1. [GitLab CE v7.14.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v7.14.0 "GitLab CE v7.14.0") → [patches/v7.14.0ディレクトリ](patches/v7.14.0)
1. [GitLab CE v7.13.5](https://gitlab.com/gitlab-org/gitlab-ce/commits/v7.13.5 "GitLab CE v7.13.5") → [patches/v7.13.5ディレクトリ](patches/v7.13.5)
1. [GitLab CE v7.13.4](https://gitlab.com/gitlab-org/gitlab-ce/commits/v7.13.4 "GitLab CE v7.13.4") → [patches/v7.13.4ディレクトリ](patches/v7.13.4)
1. [GitLab CE v7.13.3](https://gitlab.com/gitlab-org/gitlab-ce/commits/v7.13.3 "GitLab CE v7.13.3") → [patches/v7.13.3ディレクトリ](patches/v7.13.3)
1. [GitLab CE v7.13.2](https://gitlab.com/gitlab-org/gitlab-ce/commits/v7.13.2 "GitLab CE v7.13.2") → [patches/v7.13.2ディレクトリ](patches/v7.13.2)
1. [GitLab CE v7.13.1](https://gitlab.com/gitlab-org/gitlab-ce/commits/v7.13.1 "GitLab CE v7.13.1") → [patches/v7.13.1ディレクトリ](patches/v7.13.1)
1. [GitLab CE v7.13.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v7.13.0 "GitLab CE v7.13.0") → [patches/v7.13.0ディレクトリ](patches/v7.13.0)
1. [GitLab CE v7.12.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v7.12.0 "GitLab CE v7.12.0") → [patches/v7.12.0ディレクトリ](patches/v7.12.0)
1. [GitLab CE v7.11.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v7.11.0 "GitLab CE v7.11.0") → [patches/v7.11.0ディレクトリ](patches/v7.11.0)
1. [GitLab CE v7.10.0](https://gitlab.com/gitlab-org/gitlab-ce/commits/v7.10.0 "GitLab CE v7.10.0") → [patches/v7.10.0ディレクトリ](patches/v7.10.0)
1. [GitLab CE v7.9.4](https://gitlab.com/gitlab-org/gitlab-ce/commit/b10de29edbaff7219547dc506cb1468ee35065c3 "GitLab CE v7.9.4") → [patches/v7.9.4ディレクトリ](patches/v7.9.4)
1. [GitLab CE v7.9.0](https://gitlab.com/gitlab-org/gitlab-ce/commit/16d6f0e35b8bd3a88e3a2e2e3ae8bf98be426f85 "GitLab CE v7.9.0") → [patches/v7.9.0ディレクトリ](patches/v7.9.0)
1. [GitLab CE v7.8.0](https://gitlab.com/gitlab-org/gitlab-ce/commit/bcc8dbd0659b89a20f6cbd955c7022ea09dd0172 "GitLab CE v7.8.0") → [patches/v7.8.0ディレクトリ](patches/v7.8.0)
1. [GitLab CE v7.7.0](https://gitlab.com/gitlab-org/gitlab-ce/commit/c04f11dab5b8890278f9fe3b47729353cded1c54 "GitLab CE v7.7.0") → [patches/v7.7.0ディレクトリ](patches/v7.7.0)
1. [GitLab CE v7.6.0](https://gitlab.com/gitlab-org/gitlab-ce/commit/07bee141b9a6d32e38bbdba59ce7371d36f8c320 "GitLab CE v7.6.0") → [patches/v7.6.0ディレクトリ](patches/v7.6.0)
1. [GitLab CE v7.5.3](https://gitlab.com/gitlab-org/gitlab-ce/commit/b656b8592fc67b466ae2dd3b99ad35d663721b37 "GitLab CE v7.5.3") → [patches/v7.5.3ディレクトリ](patches/v7.5.3)
1. [GitLab CE v7.4.0](https://gitlab.com/gitlab-org/gitlab-ce/commit/ba76dbc3667c2eb0a1a3687f8b0481e619946d73 "GitLab CE v7.4.0") → [patches/v7.4.0ディレクトリ](patches/v7.4.0)
1. [GitLab CE v7.3.0](https://gitlab.com/gitlab-org/gitlab-ce/commit/a04f0e5b3dece759bc82d89d32a4cadb67e6bb71 "GitLab CE v7.3.0") → [patches/v7.3.0ディレクトリ](patches/v7.3.0)
1. [GitLab CE v7.2.0](https://gitlab.com/gitlab-org/gitlab-ce/commit/da5d33e13ec51006edfffd9e286b0f33781a4c12 "GitLab CE v7.2.0") → [patches/v7.2.0ディレクトリ](patches/v7.2.0)
1. [GitLab CE v7.1.0](https://gitlab.com/gitlab-org/gitlab-ce/commit/68a9203bcef1e44bdf72acf4cc8d4977eec79b7a "GitLab CE v7.1.0") → [patches/v7.1.0ディレクトリ](patches/v7.1.0)
1. [GitLab CE v7.0.0](https://gitlab.com/gitlab-org/gitlab-ce/commit/d1e424bd5c403d73d399bf0f92e39aefde56e638 "GitLab CE v7.0.0") → [patches/v7.0.0ディレクトリ](patches/v7.0.0)
1. [GitLab CE v6.9.2](https://gitlab.com/gitlab-org/gitlab-ce/commit/e46b644a8857a53ed3f6c3f64b224bb74b06fd8e "GitLab CE v6.9.2") → [patches/v6.9.2ディレクトリ](patches/v6.9.2)
1. [GitLab CE v6.9.0](https://gitlab.com/gitlab-org/gitlab-ce/commit/f0a32c69494a1d4dda4c5ec8a7f3b94bc7ceed65 "GitLab CE v6.9.0") → [patches/v6.9.0ディレクトリ](patches/v6.9.0)
1. [GitLab CE v6.8.2](https://gitlab.com/gitlab-org/gitlab-ce/commit/bfdcbc5380119b82bfbe1927c7daf2ae1d53fe19 "GitLab CE v6.8.2") → [patches/v6.8.2ディレクトリ](patches/v6.8.2)
1. [GitLab CE v6.8.1](https://gitlab.com/gitlab-org/gitlab-ce/commit/319799073b502392fec9e45d617f566a90bef81e "GitLab CE v6.8.1") → [patches/v6.8.1ディレクトリ](patches/v6.8.1)
1. [GitLab CE v6.7.5](https://gitlab.com/gitlab-org/gitlab-ce/commit/00aa5c16ee6b06dabb5cd63349942f70bb131dda "GitLab CE v6.7.5") → [patches/v6.7.5ディレクトリ](patches/v6.7.5)
1. [GitLab CE v6.7.2](https://gitlab.com/gitlab-org/gitlab-ce/commit/dbbf4ea24c7bed7f1eddcfcbfebb3593bc30e92d "GitLab CE v6.7.2") → [patches/v6.7.2ディレクトリ](patches/v6.7.2)
1. [GitLab CE v6.6.4](https://gitlab.com/gitlab-org/gitlab-ce/commit/42e34aec97818981338401a47560cd40c05e686d "GitLab CE v6.6.4") → [patches/v6.6.4ディレクトリ](patches/v6.6.4)

## 動作確認環境

| ソフトウェア | バージョン等                                     |
| ------------ | ------------------------------------------------ |
| マシン       | MacBookPro                                       |
| OS           | OS X 10.10.1                                      |
| VM           | VirtualBox 4.3.20                                |
| ゲストOS     | Ubuntu Precise 64 VirtualBox                     |
| GitLab       | GitLab Omnibus Package                           |
| Vagrant      | Vagrant 1.5.4                                    |

## 適用方法

### 前提

[GitLab Community Editionのパッケージ](https://about.gitlab.com/downloads/)がインストールされているものとします。  

### 基本

`patches/[GitLabバージョン]/app_ja.patch`がパッチです。  
例えばホームディレクトリに配置した場合、以下で適用します。

    $ cd /opt/gitlab/embedded/service/gitlab-rails
    $ patch -p1 < ~/app_ja.patch


### 既に稼働させている場合

Javascriptファイルを変更するため、パッチ適用後にプリコンパイルされたファイルを一度削除してプリコンパイルし直してください。

例：

    $ cd /opt/gitlab/embedded/service/gitlab-rails
    $ rm -rf public/assets
    $ export PATH=/opt/gitlab/embedded/bin:$PATH
    $ bundle exec rake assets:precompile RAILS_ENV=production


## Vagrantでの動作確認

各バージョンのパッチのメンテナンスができるよう、Vagrantでこのプロジェクトから直接、  
日本語反映版のGitLabを動かすことができます。

### 起動

以下のコマンドで、各バージョン用の仮想マシン起動、GitLab Omnibusパッケージをダウンロード、パッチ適用を一度に行います。(非常に時間がかかります)

    $ vagrant up

特定のバージョンのみ起動するには、例えば v6.6.4 ならば以下のようにします。

    $ vagrant up v664

### 停止

以下で停止します。

    $ vagrant halt

### 破棄

以下で仮想マシンを破棄します。

    $ vagrant destroy

### ポート番号

Webのポート番号(80)は、 `config/gitlab.yml` に定義する `base_port` の番号を起点として  
バージョン番号(v6.6.4なら664)を加えた番号にポートフォワードします。  
例えば、 `base_port: 9000` の状態で `vagrant up v664` を実行した場合は  
`http://localhost:9664` でGitLabにアクセスできます。  
v7.10.0の場合は(番号が飛びますが)7100 + 9000で16100です。

## ライセンス

Copyright (c) 2014 Soichiro Kashima  
Licensed under the MIT license.
