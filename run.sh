#!/bin/sh

set -eux

# run website
node ./build/index.js &

# generate the sitemap
npx sitemap-generator-cli https://enki.jobspeed.uk --last-mod --change-freq daily --priority-map "1.0" --user-agent GoogleBot

