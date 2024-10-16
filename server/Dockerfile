FROM node:22

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install --save-dev tsx typescript

EXPOSE 4000

CMD ["npm", "run", "dev"]
