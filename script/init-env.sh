#!/usr/bin/env bash
docker rm -f rester-mongo
docker network create rester
docker run -d \
    --name rester-mongo \
    -p 27017:27017 \
    -e "MONGO_INITDB_ROOT_USERNAME=username" \
    -e "MONGO_INITDB_ROOT_PASSWORD=password" \
    -v rester-mongo:/data/db \
    --network rester \
    mongo:4
