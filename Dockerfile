FROM node:12-alpine as builder

WORKDIR /usr/src/app

COPY package*.json  ./

RUN npm install --production

COPY . .

RUN npm run build

FROM node:12-alpine

COPY --from=builder /usr/src/app/build .
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 5000

ENV HOST=0.0.0.0

RUN chown -R node:node /usr/src/app

USER node

CMD ["node", "index.js" ]
