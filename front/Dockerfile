FROM node AS builder

COPY . /app
WORKDIR /app

RUN yarn install && yarn build

FROM nginx AS prod

COPY --from=builder /app/build/ /app/
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80