FROM node:14-alpine3.12

WORKDIR /app
ENV NODE_ENV=PROD

COPY main.js resource* /app/
COPY rester.yaml /app/rester.yaml

ENTRYPOINT [ "node", "main.js" ]
