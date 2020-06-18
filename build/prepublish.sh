#!/usr/bin/env bash
set -e
DIR=${BASH_SOURCE%/*}
npm_script=npm.cmd
branch_name=$(git symbolic-ref -q HEAD)
branch_name=${branch_name##refs/heads/}
branch_name=${branch_name:-HEAD}
version=$(echo "${branch_name}" | tr / -)
${npm_script} --unsafe-perm --no-git-tag-version version prerelease --preid=${version}
${npm_script} publish
