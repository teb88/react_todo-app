FROM node:10-alpine

RUN mkdir -p /home/app

WORKDIR /home/app

COPY package.json .

RUN npm install

COPY . .

CMD ["/bin/sh", "-c", "npm start"]