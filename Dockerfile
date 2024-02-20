FROM node:21-alpine

WORKDIR /app

COPY package*.json .


RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "start"]