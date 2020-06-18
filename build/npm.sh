#!/usr/bin/env bash

IMAGE="node:13.12.0"

docker run --rm \
    -v "$(pwd)":/app \
    -w="/app" \
    --entrypoint="npm" \
    ${IMAGE} $@

exit $?
