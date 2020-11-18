FROM node:current-alpine

ARG ENV
ENV NODE_ENV ${ENV}

RUN mkdir /selenium
WORKDIR /selenium

COPY package*.json ./
RUN yarn install

COPY . . 

ENTRYPOINT ["tail", "-f", "/dev/null"]
