FROM node:21.5-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

WORKDIR /usr/src/app

EXPOSE 8080

CMD ["npm", "run", "start:dev"]