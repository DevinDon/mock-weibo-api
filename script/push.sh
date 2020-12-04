#!/bin/bash
if [ ! -n "$registry" ];
then
  registry='docker.io'
fi
cd dist
tee > ./Dockerfile <<-'EOF'
FROM iinfinity/nginx
COPY ["./", "/app/"]
EOF
docker build -t $registry/$npm_package_name .
docker push $registry/$npm_package_name
