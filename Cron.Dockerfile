FROM node:lts-bullseye-slim

RUN apt update

RUN apt install curl -y

RUN curl -LO "https://dl.k8s.io/release/v1.26.1/bin/linux/amd64/kubectl"

RUN install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

COPY scripts/cron.sh .

CMD ["./cron.sh"]

