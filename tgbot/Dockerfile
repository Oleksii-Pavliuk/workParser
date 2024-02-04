FROM --platform=linux/amd64  node:20-bullseye-slim

WORKDIR .

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm","run","start" ]
