#!/bin/sh

set -ex

npx sitemap-generator-cli https://enkionline.com --last-mod --change-freq weekly --priority-map \"1.0\" --user-agent sitemap-generator-cli --filepath sitemap.xml --max-concurrency 10 --verbose --query true

kubectl create configmap sitemap --from-file=sitemap.xml -o yaml --dry-run | kubectl replace -f -

exit 0
