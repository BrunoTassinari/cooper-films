FROM node:22

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm cache clean --force

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y netcat-openbsd

EXPOSE 4000

CMD ["sh", "./start.sh"]
