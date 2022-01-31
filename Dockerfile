FROM node:11-alpine

WORKDIR /node-app

COPY package.json .

RUN npm config set unsafe-perm true

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 9000

CMD nodemon -L --watch . index.js

# 1 - preparar a aplicacao = maquina com ambiente => criação da imagem
# 2 - rodar essa aplicacao = node index.js ... => subida do container