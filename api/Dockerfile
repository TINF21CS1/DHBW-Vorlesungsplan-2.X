FROM node

COPY . /app
WORKDIR /app

RUN yarn install && yarn build && yarn global add serve

CMD serve -s build