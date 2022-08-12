Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
  config.vm.provider "virtualbox"
  config.vm.provision "docker" do |d|
    d.build_image "/vagrant/app" " -t naceo/websocket:1.0"
    d.pull_images "mongo"
    d.run "naceo/websocket:1.0",
      args: "-v /vagrant/app:/home/node/app"
  end
end
