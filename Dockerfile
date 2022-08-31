FROM alpine:latest

USER root

RUN apk add --no-cache nodejs npm

WORKDIR /generator

COPY . /generator

RUN npm init npm i

EXPOSE 8755

ENTRYPOINT node index.js

#