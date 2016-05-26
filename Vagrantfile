# -*- mode: ruby -*-
# vi: set ft=ruby :

require_relative 'lib/util.rb'
require 'yaml'

include GitLabI18NPatch::Util

Vagrant.configure("2") do |config|
  config.vm.box = "ksoichiro/gitlab-i18n-patch-box"
  config.vm.box_version = "= 0.1.0"
  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
    v.cpus = 2
  end

  gitlab_config = YAML.load_file('config/gitlab.yml')
  gitlab_config["versions"].each do |ver, url|
    config.vm.define ver.to_s.gsub(/\./, "") do |gl|
      gl.vm.network "forwarded_port", guest: 80, host: web_port(ver)
      gl.vm.provision :shell, path: 'lib/provision.sh', args: [ver, web_port(ver).to_s, url]
    end
  end
end
