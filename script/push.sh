#!/bin/bash
if [ ! -n "$registry" ];
then
  registry='docker.io'
fi
cd dist
tee > ./Dockerfile <<-'EOF'
FROM iinfinity/node

WORKDIR /app
ENV MODE=PROD

COPY index.js /app/index.js
COPY resources /app/resources
COPY rester.json /app/rester.json

ENTRYPOINT [ "node", "index.js" ]
EOF
docker build -t $registry/$npm_package_name .
docker push $registry/$npm_package_name
