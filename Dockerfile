FROM node:lts-alpine

COPY package*.json ./

RUN npm i

COPY ./ ./ 

RUN NODE_ENV=production npx prisma migrate reset --force

EXPOSE 5000

CMD [ "npm", "start" ]