gitlab-i18n-patch
=================

[![Build Status](https://travis-ci.org/ksoichiro/gitlab-i18n-patch.svg?branch=master)](https://travis-ci.org/ksoichiro/gitlab-i18n-patch)

[GitLab Community Edition](https://gitlab.com/gitlab-org/gitlab-ce)を勝手に日本語化していくプロジェクトです。

GitLabはi18nに対応しないとのことですが、  
社内で使う場合等で英語であるために導入の抵抗があるケースのために作っています。

このパッチを適用することによって生じたいかなる問題についても責任は負いかねます。  
各自の判断でご利用ください。

## 対応バージョン

patchesディレクトリ内にGitLabのバージョンごとにパッチを格納しています。  
バージョンが少しでも異なると適用できませんので、完全に一致するバージョンを選んでください。  
v8.3.0以降のパッチは [i18n-patch](https://github.com/ksoichiro/i18n-patch) を利用して生成しています。  
ご希望のバージョンが登録されていない場合は、ご自身で生成することができます。

## 動作確認環境

| ソフトウェア | バージョン等                                     |
| ------------ | ------------------------------------------------ |
| マシン       | MacBookPro                                       |
| OS           | OS X 10.12                                       |
| VM           | VirtualBox 5.1.4                                 |
| ゲストOS     | Ubuntu Precise 64 VirtualBox                     |
| GitLab       | GitLab Omnibus Package                           |
| Vagrant      | Vagrant 1.8.5                                    |
| Docker       | 17.03.1-ce                                       |
| Node.js      | v7.8.0                                           |

## 適用方法

### 前提

[GitLab Community Editionのパッケージ](https://about.gitlab.com/downloads/)がインストールされているものとします。  

### 基本

`patches/[GitLabバージョン]/app_ja.patch`がパッチです。  
パッチを適用するGitLabのバージョンと完全に一致するものを選びます。  
リポジトリをクローンするか、wget、curl などで直接パッチファイルをダウンロードします。  
以下は wget で v8.16.6 のパッチを取得する例です。

    $ wget https://raw.githubusercontent.com/ksoichiro/gitlab-i18n-patch/master/patches/v8.16.6/app_ja.patch

例えばホームディレクトリにパッチファイルを配置した場合、以下で適用します。

    $ cd /opt/gitlab/embedded/service/gitlab-rails
    $ patch -p1 < ~/app_ja.patch

なお、このプロジェクドでは過去にはGitLabのバージョンごとにブランチを用意して  
タグづけ(リリース)していたため、[masterブランチ以外のブランチ](https://github.com/ksoichiro/gitlab-i18n-patch/branches/all)や  
[v0.24.1などのリリース](https://github.com/ksoichiro/gitlab-i18n-patch/releases)が残っていますが、翻訳の作成方法を変更したため、これらは現在運用していません。  
masterブランチの最新のコミットを利用してください。

### 既に稼働させている場合

Javascriptファイルを変更するため、パッチ適用後にプリコンパイルされたファイルを一度削除してプリコンパイルし直してください。

例：

    $ cd /opt/gitlab/embedded/service/gitlab-rails
    $ rm -rf public/assets
    $ export PATH=/opt/gitlab/embedded/bin:$PATH
    $ bundle exec rake assets:precompile RAILS_ENV=production


## 動作確認

### Vagrantでの動作確認

各バージョンのパッチの動作確認のために、Vagrantで日本語反映版のGitLabを起動できます。

#### 起動

以下のコマンドで、指定のバージョン用の仮想マシン起動、GitLab Omnibusパッケージダウンロード、パッチ適用を行います。  
例えば v6.6.4 ならば以下のようにします。

    $ vagrant up v664

#### 停止

以下で停止します。

    $ vagrant halt

#### 破棄

以下で仮想マシンを破棄します。

    $ vagrant destroy

#### ポート番号

Webのポート番号(80)は、 `config/gitlab.yml` に定義する `base_port` の番号を起点として  
バージョン番号(v6.6.4なら664)を加えた番号にポートフォワードします。  
例えば、 `base_port: 9000` の状態で `vagrant up v664` を実行した場合は  
`http://localhost:9664` でGitLabにアクセスできます。  
v7.10.0の場合は(番号が飛びますが)7100 + 9000で16100です。

### Dockerでの動作確認

GitLab Community Edition の Docker イメージが公開されているものについては、Dockerを使って動作確認できます。  
公開されているイメージ(タグ)については[Docker Hub](https://hub.docker.com/r/gitlab/gitlab-ce/tags/)で確認してください。  
`9.0.4-ce.0` のように、`バージョン-ce.0`の形式になっているタグがあれば、  
日本語化版をビルドして利用することができます。

`docker`コマンドや`docker-compose`コマンドを利用して手作業でビルドしていただくことができますが、以下のような部分をバージョンに応じて切り替える手間を省き、手軽に動作確認できるようNode.js/npmのスクリプトでラッピングしています。

- ソースイメージのバージョン(DockerfileのFROM)
- 適用するパッチのバージョン
- マウントする各種ディレクトリ

#### 起動

以下を実行します。  
最後のバージョンは、必要に応じて読み替えてください。

    $ npm run docker up v9.0.4

アクセスできるようになるまでにはしばらく時間がかかります。

#### 停止

以下を実行します。  
最後のバージョンは、必要に応じて読み替えてください。

    $ npm run docker down v9.0.4

#### ビルド

以下を実行します。  
最後のバージョンは、必要に応じて読み替えてください。

    $ npm run docker build v9.0.4

#### その他の操作

各種ファイルは `.docker/バージョン` ディレクトリに生成され、ビルドされています。  
データやファイルもこのディレクトリに生成されています。  
上記以外の操作については、このディレクトリに移動して `docker-compose` コマンドで行なってください。

#### ポート番号

Vagrantの場合と同様です。  
v9.0.4を起動した場合は `http://localhost:9904` でアクセスできます。

## ライセンス

Copyright (c) 2014 Soichiro Kashima  
Licensed under the MIT license.
