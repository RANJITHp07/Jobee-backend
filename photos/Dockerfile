FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

EXPOSE 5443

CMD ["npm","start"]