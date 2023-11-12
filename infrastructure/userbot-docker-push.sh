#!/bin/bash

version=$1

docker build -t cplk01/userbot ../userbot

docker tag cplk01/userbot cplk01/userbot:latest

docker push cplk01/userbot:latest


if [ -n $version ]; then

  docker tag cplk01/userbot cplk01/userbot:$version
  docker push cplk01/userbot:$version

  echo "Container with version $version pushed"
fi