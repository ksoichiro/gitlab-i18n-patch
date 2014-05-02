gitlab-i18n-patch
=================

GitLab Community Editionを勝手に日本語化していくプロジェクトです。

GitLabはi18nに対応しないとのことですが、  
社内で使う場合等で英語であるために導入の抵抗があるケースのために作っています。

このパッチを適用することによって生じたいかなる問題についても責任は負いかねます。  
各自の判断でご利用ください。

## 対応バージョン

1. [GitLab CE v6.7.5](https://gitlab.com/gitlab-org/gitlab-ce/commit/00aa5c16ee6b06dabb5cd63349942f70bb131dda "GitLab CE v6.7.5")  
   → `v6.7.5`ブランチ
2. [GitLab CE v6.7.2](https://gitlab.com/gitlab-org/gitlab-ce/commit/dbbf4ea24c7bed7f1eddcfcbfebb3593bc30e92d "GitLab CE v6.7.2")  
   → `v6.7.2`ブランチ
3. [GitLab CE v6.6.4](https://gitlab.com/gitlab-org/gitlab-ce/commit/42e34aec97818981338401a47560cd40c05e686d "GitLab CE v6.6.4")  
   → `v6.6.4`ブランチ

## 動作確認環境

| ソフトウェア | バージョン等                                     |
| ------------ | ------------------------------------------------ |
| マシン       | MacBookPro                                       |
| OS           | OS X 10.9                                        |
| VM           | VirtualBox 4.3.8                                 |
| ゲストOS     | Ubuntu precise 64 VirtualBox                     |
| GitLab       | v6.6.4, v6.7.2, v6.7.5 (GitLab Omnibus package)  |
| Vagrant      | Vagrant 1.5.1                                    |

## 使い方

### 基本

`app_ja.patch`がパッチです。  
例えばホームディレクトリに配置した場合、以下で適用します。

    # cd /opt/gitlab/embedded/service/gitlab-rails
    # patch -p1 < ~/app_ja.patch


### 既に稼働させている場合

Javascriptファイルを変更するため、パッチ適用後にプリコンパイルされたファイルを一度削除してプリコンパイルし直してください。

例：

    # cd /opt/gitlab/embedded/service/gitlab-rails
    # rm -rf public/assets
    # export PATH=$PATH:/opt/gitlab/embedded/bin
    # rake assets:precompile RAILS_ENV=production


### GitLab OmnibusパッケージをVagrantで実行して適用する場合

初回のみ、以下を実行します。

    $ vagrant box add precise64 http://files.vagrantup.com/precise64.box

以下のコマンドで、仮想マシン起動、GitLab Omnibusパッケージをダウンロード、パッチ適用します。

    $ vagrant up

以下で停止します。

    $ vagrant halt

以下で仮想マシンを破棄します。

    $ vagrant destroy
