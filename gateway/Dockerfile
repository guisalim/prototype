FROM node:16.8.0-alpine as base
EXPOSE 3000
WORKDIR /app
COPY package*.json /

FROM base as dev
RUN apk add inotify-tools
RUN yarn install --no-lockfile
COPY . /app
CMD yarn start

FROM base as production
COPY . /app
CMD yarn run prod
