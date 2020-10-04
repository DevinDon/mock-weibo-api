FROM iinfinity/node

COPY dist/index.js /app/index.js
COPY src/main/@public /app/@public
COPY rester.json /app/rester.json
WORKDIR /app
ENV MODE=PROD

ENTRYPOINT [ "node", "index.js" ]
