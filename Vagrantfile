# -*- mode: ruby -*-
# vi: set ft=ruby :

require_relative 'lib/util.rb'

include GitLabI18NPatch::Util

Vagrant.configure("2") do |config|
  config.vm.box = "ksoichiro/gitlab-i18n-patch-box"
  config.vm.box_version = "= 0.1.0"
  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
    v.cpus = 2
  end

  {
    "6.6.4" => "https://downloads-packages.s3.amazonaws.com/gitlab_6.6.4-omnibus-1.ubuntu.12.04_amd64.deb",
    "6.7.2" => "https://downloads-packages.s3.amazonaws.com/gitlab_6.7.2-omnibus-1.ubuntu.12.04_amd64.deb",
    "6.7.5" => "https://downloads-packages.s3.amazonaws.com/gitlab_6.7.5-omnibus-1.ubuntu.12.04_amd64.deb",
    "6.8.1" => "https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_6.8.1-omnibus.4-1_amd64.deb",
    "6.8.2" => "https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_6.8.2-omnibus-1_amd64.deb",
    "6.9.0" => "https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_6.9.0-omnibus-1_amd64.deb",
    "6.9.2" => "https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_6.9.2-omnibus.2-1_amd64.deb",
    "7.0.0" => "https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_7.0.0-omnibus-1_amd64.deb",
    "7.1.0" => "https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_7.1.0-omnibus-1_amd64.deb",
    "7.2.0" => "https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_7.2.0-omnibus.3-1_amd64.deb",
    "7.3.0" => "https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_7.3.0-omnibus-1_amd64.deb",
    "7.4.0" => "https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_7.4.0-omnibus-1_amd64.deb",
    "7.5.3" => "https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_7.5.3-omnibus.5.2.1.ci-1_amd64.deb",
    "7.6.0" => "https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_7.6.0-omnibus.5.3.0.ci-1_amd64.deb",
    "7.7.0" => "https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_7.7.0-omnibus.5.4.0.ci-1_amd64.deb",
    "7.8.0" => "https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_7.8.0-omnibus-1_amd64.deb",
    "7.9.0" => "https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_7.9.0-omnibus.2-1_amd64.deb",
    "7.9.4" => "https://downloads-packages.s3.amazonaws.com/ubuntu-12.04/gitlab_7.9.4-omnibus.1-1_amd64.deb",
  }.each do |ver, url|
    config.vm.define "v#{ver.gsub(/\./, "")}" do |gl|
      gl.vm.network "forwarded_port", guest: 80, host: web_port(ver)
      gl.vm.provision :shell, path: 'lib/provision.sh', args: [ver, web_port(ver).to_s, url]
    end
  end
end
