FROM node:lts-alpine

COPY package*.json ./

RUN npm i

COPY ./ ./ 

RUN npx prisma migrate deploy

RUN npx prisma generate

RUN npm run swagger-autogen

EXPOSE 5000

CMD [ "npm", "start" ]
