FROM node:lts-alpine

COPY package*.json ./

RUN npm i

RUN npm run swagger-autogen

COPY ./ ./ 

RUN npx prisma migrate reset --force

EXPOSE 5000

CMD [ "npm", "start" ]