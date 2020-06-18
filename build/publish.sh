#!/usr/bin/env bash
set -e
DIR=${BASH_SOURCE%/*}
npm_script="./build/npm.sh"
if [ -z "${1}" ];
then
  echo "Version muss angegeben werden"
  exit 1
fi
${npm_script} run compile
version=$(${npm_script} --unsafe-perm --no-git-tag-version version ${1})
${npm_script} publish
git commit -am "${version}"
git tag -a ${version} -m "tag ${version}"
git push --follow-tags
