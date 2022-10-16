FROM node:lts-alpine

COPY package*.json ./

RUN npm i

COPY ./ ./ 

RUN npm run migrate-reset:prod

EXPOSE 5000

CMD [ "npm", "start" ]