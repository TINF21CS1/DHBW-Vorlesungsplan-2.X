FROM node AS builder

COPY . /app
WORKDIR /app

RUN yarn install && yarn build

FROM nginx AS prod

COPY --from=builder /app/build /usr/share/nginx/html/

EXPOSE 80