FROM node:alpine as base
EXPOSE 5000
WORKDIR /app
COPY package*.json ./
COPY ./ ./
RUN yarn

FROM base as dev
CMD yarn start

FROM base as production
RUN npm install -g serve
CMD serve -s build -l 5000