#!/bin/bash

pnpm use.test.prod
./node_modules/.bin/cp-cli nginx/nginx.local.conf nginx/nginx.conf
pnpm build

APP_NAME=lifepedia-fe
docker stop $APP_NAME | true
docker rm $APP_NAME | true
docker-compose up -d --build
