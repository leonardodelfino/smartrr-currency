# development stage
FROM node:14-alpine as base

WORKDIR /usr/src/currency-api

COPY package.json tsconfig.json ./

COPY ./src ./src/currency-api

RUN ls -a

RUN yarn install --pure-lockfile && yarn compile




