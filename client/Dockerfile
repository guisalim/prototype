FROM node:alpine as base
WORKDIR /app
COPY package*.json ./
COPY ./ ./
RUN yarn
COPY . .
RUN yarn run build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=base /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]