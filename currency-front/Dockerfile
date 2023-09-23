
FROM node:20-alpine As development

WORKDIR /usr/src/currency-front

COPY ./package.json ./usr/src/currency-front

COPY --chown=node:node . .

USER node



