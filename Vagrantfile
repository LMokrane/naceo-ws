Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
  config.vm.network "private_network",
    ip: "192.168.56.5"

  config.vm.provider "virtualbox"

  config.vm.define "app" do |app|
    app.vm.provision "docker" do |d|
      d.build_image "/vagrant/app" " -t naceo/websocket:1.2"
      d.run "naceo/websocket:1.2",
        args: "-v /vagrant/app:/home/node/app"

      d.pull_images "mongo:4.4.6"
      d.post_install_provision "shell",
        inline: "docker volume create mongodb-data"
      d.run "mongo:4.4.6",
        auto_assign_name: false,
        args: "-v mongodb-data:/data/db --name mongodb -p 27017:27017"
    end
  end
end
