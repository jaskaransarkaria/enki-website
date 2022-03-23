FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY package*.json  ./

RUN npm install --production

COPY . ./

RUN npm run build

FROM node:14.19-alpine

WORKDIR /usr/src/app

RUN mkdir build
COPY --from=builder /usr/src/app/build/ .
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 5000

ENV HOST=0.0.0.0

RUN chown -R node:node /usr/src/app

USER node

ENV PORT=5000

RUN ls

CMD ["node", "index.js" ]
