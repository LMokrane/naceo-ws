#!/usr/bin/env bash
# Configuration clavier français
echo "Clavier francais"
rm /etc/locale.gen
touch /etc/locale.gen
echo "fr_FR.UTF-8 UTF-8" > /etc/locale.gen
locale-gen
echo "LANG=fr_FR.UTF-8" > /etc/locale.conf
echo "KEYMAP=fr-latin1" > /etc/vconsole.conf
loadkeys fr

# Lien symbolique docker volume
echo "Lien symbolique docker volume"
ln -s /var/lib/docker/volumes/naceo-ws/_data /home/vagrant/data
