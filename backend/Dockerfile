FROM node:current-alpine

ARG ENV
ENV NODE_ENV ${ENV}

RUN mkdir /backend
WORKDIR /backend

COPY package*.json ./
RUN yarn install

COPY . . 

EXPOSE 8080

CMD ["yarn", "start"]