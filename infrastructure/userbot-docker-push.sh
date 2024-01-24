#!/bin/bash
docker pull cplk01/userbot:latest

docker run \
  -d \
  --name work-parser\
  cplk01/userbot:latest
