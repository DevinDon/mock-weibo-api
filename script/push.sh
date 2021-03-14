#!/usr/bin/env bash
set -e

if [ ! -n "$registry" ];
then
  registry='docker.io'
fi

cp script/Dockerfile dist/Dockerfile
cd dist
docker build -t $registry/$npm_package_name .
docker push $registry/$npm_package_name
