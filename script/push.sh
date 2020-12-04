#!/bin/bash
if [ ! -n "$registry" ];
then
  registry='docker.io'
fi
cd dist
tee > ./Dockerfile <<-'EOF'
FROM iinfinity/node

COPY dist/index.js /app/index.js
COPY src/main/@public /app/@public
COPY rester.json /app/rester.json
WORKDIR /app
ENV MODE=PROD

ENTRYPOINT [ "node", "index.js" ]
EOF
docker build -t $registry/$npm_package_name .
docker push $registry/$npm_package_name
