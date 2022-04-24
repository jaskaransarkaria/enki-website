#!/bin/sh

set -eux

# run website
NODE_PID=$(node ./build/index.js & echo $!)

# generate the sitemap
npx sitemap-generator-cli https://enki.jobspeed.uk --last-mod --change-freq daily --priority-map "1.0" --user-agent GoogleBot --filepath build/sitemap.xml --verbose

kill -9 $NODE_PID

node ./build/index.js

