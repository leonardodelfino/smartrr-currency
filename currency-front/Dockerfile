
FROM node:20-alpine As development

WORKDIR /usr/src/currency-front

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node