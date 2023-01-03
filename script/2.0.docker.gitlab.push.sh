#!/bin/bash

# check architecture
UNAME=$(uname -a | tr "[:upper:]" "[:lower:]")
if [[ "$UNAME" != *"linux"* && "$UNAME" != *"release_x86_64"* ]]; then
  echo "please run it on linux or mac intel machine."
  exit 1
fi
# arguments check
GITLAB_REGISTRY_PASSWORD=$1
VERSION=$2
APP_NAME=lifepedia-fe
DOCKER_FILE=./Dockerfile
IMAGE_DEST_PATH_WITH_TAG=registry.gitlab.com/terry-development/lifepedia-devops/$APP_NAME:$VERSION
if [ -z "$VERSION" ]; then
  echo "Please enter the version"
  exit 1
fi 
# build image
pnpm use.prod
./node_modules/.bin/cp-cli nginx/nginx.prod.conf nginx/nginx.conf
pnpm build
docker image rm $IMAGE_DEST_PATH_WITH_TAG
docker build -t $IMAGE_DEST_PATH_WITH_TAG -f $DOCKER_FILE .
# gitlab login
docker login registry.gitlab.com -u wifrost -p $GITLAB_REGISTRY_PASSWORD
# push image to gitlab registry
docker push $IMAGE_DEST_PATH_WITH_TAG
