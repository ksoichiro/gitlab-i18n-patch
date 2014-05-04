# -*- mode: ruby -*-
# vi: set ft=ruby :

require_relative 'lib/util.rb'

include GitLabI18NPatch::Util

Vagrant.configure("2") do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"

  ["6.6.4", "6.7.2", "6.7.5"].each do |ver|
    config.vm.define "v#{ver.gsub(/\./, "")}" do |gl|
      gl.vm.network "forwarded_port", guest: 80, host: web_port(ver)
      gl.vm.provision :shell, path: 'lib/provision.sh', args: [ver]
    end
  end
end
