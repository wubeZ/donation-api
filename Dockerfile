FROM node:21-alpine

WORKDIR /app

COPY package*.json .

RUN npm install -g npm@10.5.1

RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "start"]