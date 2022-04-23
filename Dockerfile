FROM node:14.19-alpine as builder

WORKDIR /usr/src/app

COPY package*.json  ./

RUN npm ci

COPY . ./

ENV VITE_SERVER_URL=https://server.enki.jobspeed.uk
ENV VITE_PUBLIC_STRIPE_KEY="pk_test_51HpvnTAk37gvJ51oYwywMtrDcDlL6FXuVY0aQ1EYEJUiw9MG70UElEMhhazqhhafUOslK1IugHRApQ7GWNUcnqT400dJ4HWjbp"

RUN npm run build

FROM node:14.19-alpine

WORKDIR /usr/src/app

RUN mkdir build
COPY --from=builder /usr/src/app/build/ build/
COPY --from=builder /usr/src/app/package.json build/
COPY --from=builder /usr/src/app/node_modules build/node_modules
COPY --from=builder /usr/src/app/run.sh build/run.sh

EXPOSE 5000

ENV HOST=0.0.0.0

RUN chown -R node:node /usr/src/app

USER node

ENV PORT=5000

CMD ["./build/run" ]
