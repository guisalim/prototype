FROM node:16.8.0-alpine as base
EXPOSE 3001
WORKDIR /app
COPY package*.json /

FROM base as dev
RUN apk add inotify-tools
RUN yarn install --no-lockfile
COPY . /app
CMD yarn start

FROM base as production
RUN yarn install
COPY . /app
CMD yarn run prod
