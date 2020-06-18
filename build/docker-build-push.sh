#!/usr/bin/env bash

docker build -t registry.garic.biz/skeletons/server:latest . && docker push registry.garic.biz/skeletons/server

exit $?
