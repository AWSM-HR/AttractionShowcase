FROM node

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "node", "server/index.js" ]

