FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json  ./

RUN npm install --production

COPY . .

EXPOSE 5000

ENV HOST=0.0.0.0

RUN chown -R node:node /usr/src/app

USER node

CMD ["npm", "start" ]