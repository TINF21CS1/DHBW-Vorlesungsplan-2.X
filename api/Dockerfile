FROM node

COPY . /app
WORKDIR /app

RUN yarn install && yarn build

CMD yarn start