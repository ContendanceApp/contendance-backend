FROM node:lts-alpine

COPY package*.json ./

RUN npm ci --only=production

COPY ./ ./ 

RUN npm run migrate-reset:prod

EXPOSE 5000

CMD [ "npm", "start" ]