#!/bin/bash

version=$1

docker build -t cplk01/work-parser ../tgbot

docker tag cplk01/work-parser cplk01/work-parser:latest

docker push cplk01/work-parser:latest


if [ -n $version ]; then

  docker tag cplk01/work-parser cplk01/work-parser:$version
  docker push cplk01/work-parser:$version

  echo "Container with version $version pushed"
fi