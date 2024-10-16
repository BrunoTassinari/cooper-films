FROM node:22

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y netcat-openbsd

RUN npm install --save-dev tsx typescript

EXPOSE 4000

CMD ["sh", "./start.sh"]
