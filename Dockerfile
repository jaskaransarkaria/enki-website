FROM node:16.16-alpine as builder

WORKDIR /usr/src/app

COPY package*.json  ./

RUN npm ci

COPY . ./

ENV PUBLIC_BUCKET_URL="https://storage.googleapis.com/enki-website"
ENV PUBLIC_SERVER_URL=https://server.enkionline.com
ENV PUBLIC_STRIPE_KEY="pk_live_51HpvnTAk37gvJ51oKXsYuAZsyletQkgqOky7L2yV9c9nDMj1koLPMvsC6sKBOCqveZMk8CHy730HDFSkiFsbzSRB0059ZpWGau"
ENV PUBLIC_INTERNAL_K8S_URL="http://enki-server.enki.svc.cluster.local:8080"

RUN npm run build

FROM node:16.16-alpine

WORKDIR /usr/src/app

RUN mkdir build
RUN mkdir src

COPY --from=builder /usr/src/app/build/ build/
COPY --from=builder /usr/src/app/package.json build/
COPY --from=builder /usr/src/app/node_modules build/node_modules
COPY --from=builder /usr/src/app/scripts/run.sh build/run.sh

EXPOSE 5000

ENV HOST=0.0.0.0

RUN chown -R node:node /usr/src/app

USER node

ENV PORT=5000

CMD ["./build/run.sh" ]
