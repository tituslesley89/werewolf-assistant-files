#!/bin/bash
base_path="../werewolf-assistant"
rm -rf ../werewolf-assistant/css/*
rm -rf ../werewolf-assistant/js/*
rm ../werewolf-assistant/index.html

cp ./dist/js/* "${base_path}/js/"
cp ./dist/css/* "${base_path}/css/"
cp ./dist/index.html "${base_path}/index.html"
