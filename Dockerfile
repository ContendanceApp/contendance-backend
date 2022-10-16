FROM node:lts-alpine

COPY package*.json ./

RUN npm i

COPY ./ ./ 

RUN npx prisma migrate reset --force

EXPOSE 5000

CMD [ "npm", "start" ]