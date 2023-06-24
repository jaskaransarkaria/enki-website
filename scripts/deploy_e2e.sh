#!/bin/sh

set -eux

docker buildx -t jaskaransarkaria/enki-website:e2e-test-${E2E_VERSION_NUM} . 

docker push jaskaransarkaria/enki-website:e2e-test-${E2E_VERSION_NUM}

sed -i "s/replace_with_git_tag/e2e-test-$E2E_VERSION_NUM/" .kubernetes/e2e-test-deployment.yaml

kubectl apply -f .kubernetes/e2e-test-deployment.yaml

sed -i "s/e2e-test-$E2E_VERSION_NUM/replace_with_git_tag/" .kubernetes/e2e-test-deployment.yaml

exit 0

