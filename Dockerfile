FROM iinfinity/node

COPY dist /app
COPY rester.json /app/rester.json
ENV MODE=PROD

ENTRYPOINT [ "node", "/app/index.js" ]
