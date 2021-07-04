FROM node:14-alpine3.12

WORKDIR /app
ENV MODE=PROD

COPY bundle.js /app
COPY resources /app/resources
COPY rester.yaml /app/rester.yaml

ENTRYPOINT [ "node", "bundle.js" ]
