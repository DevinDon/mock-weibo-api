FROM iinfinity/node

COPY dist/index.js /app/index.js
COPY rester.json /app/rester.json
ENV MODE=PROD

ENTRYPOINT [ "node", "/app/index.js" ]
